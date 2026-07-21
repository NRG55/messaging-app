const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

let logoutFromClient = null;

export const onSessionExpired = (logoutFn) => {
    logoutFromClient = logoutFn;
};

const handleResponse = async (response) => {
    if (response.status === 401) {
        if (logoutFromClient) {           
            logoutFromClient();

            throw new Error('UNAUTHORIZED');
        }
    }

    const data = await response.json();

    if (!response.ok) {
        const error = new Error('API Request Failed');
        error.responseData = data;

        throw error;
    }

    return data;
};

export const registerUser = async (userData) => {
    const response = await fetch(`${SERVER_DOMAIN}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
    });

    return handleResponse(response);
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${SERVER_DOMAIN}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });

    return handleResponse(response);
};

export const logoutUser = async () => {
    const response = await fetch(`${SERVER_DOMAIN}/auth/logout`, {
        method: 'POST',        
        credentials: 'include', 
        headers: { 'Content-Type': 'application/json' },
    });

    return handleResponse(response);
};

export const getMe = async () => {
    const response = await fetch(`${SERVER_DOMAIN}/users/me`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    return handleResponse(response);
};

export const updateUserProfile = async (profileData) => {
    const response = await fetch(`${SERVER_DOMAIN}/users`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(profileData),
    });

    return handleResponse(response);
};

export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
            method: 'POST',
            body: formData,
        },
    );

    return handleResponse(response);
};

export const getUserProfile = async (userId) => {
    const response = await fetch(`${SERVER_DOMAIN}/users/profile/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    return handleResponse(response);
};

export const getAllUsers = async () => {
    const response = await fetch(`${SERVER_DOMAIN}/users/all`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    return handleResponse(response);
};

export const getChat = async (recipientId) => {
    const response = await fetch(`${SERVER_DOMAIN}/chats?recipientId=${recipientId}`, {
        method: 'GET',
        credentials: 'include',
    });

    return handleResponse(response);
};

export const createChat = async (recipientId) => {
    const response = await fetch(`${SERVER_DOMAIN}/chats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ recipientId }),
    });

    return handleResponse(response);
};

export const createChatMessage = async (chatId, text) => {
    const response = await fetch(`${SERVER_DOMAIN}/chats/${chatId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text }),
    });
    return handleResponse(response);
};