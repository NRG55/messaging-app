import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUser, loginUser, logoutUser } from './api';
import { USER_QUERY_KEYS } from '../user/hooks';

export function useRegisterMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: registerUser,
        onSuccess: (newUserData) => {
            queryClient.setQueryData(USER_QUERY_KEYS.currentUser, newUserData);
        },
    });
}

export function useLoginMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (userData) => {
            queryClient.setQueryData(USER_QUERY_KEYS.currentUser, userData);
        },
    });
}

export function useLogoutMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.setQueryData(USER_QUERY_KEYS.currentUser, null);
            queryClient.clear();
        },
    });
}