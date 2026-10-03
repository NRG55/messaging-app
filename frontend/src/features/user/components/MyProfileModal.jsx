import React, { useState, useEffect, useRef } from 'react';
import { Camera, User } from 'lucide-react';
import { useCurrentUser, useUpdateProfileMutation } from '../hooks';

export default function MyProfileModal({ isOpen, onClose }) {
    const { user } = useCurrentUser();
    const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfileMutation();
    
    const [panel, setPanel] = useState('VIEW'); // 'VIEW' or 'EDIT'
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    const [avatarFile, setAvatarFile] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const fileInputRef = useRef(null);

    const MAX_BIO_LENGTH = 160;
    const bioCharactersCount = bio.length;

    useEffect(() => {
        if (user && isOpen) {
            setUsername(user.username || '');
            setBio(user.bio || '');
            setPreviewAvatar(user.avatarUrl || null); 
            setAvatarFile(null);
        }
    }, [user, isOpen]);
    // Cleans up temporary avatar links and binary file data from RAM
    useEffect(() => {
        return () => {

            if (previewAvatar && previewAvatar.startsWith('blob:')) {
                URL.revokeObjectURL(previewAvatar);
            }
        };
    }, [previewAvatar]);

    const handleStartEditing = () => {
        setUsername(user?.username || '');
        setBio(user?.bio || '');
        setPreviewAvatar(user?.avatarUrl || null);
        setPanel('EDIT');
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }
        
        const previewUrl = URL.createObjectURL(file);

        setPreviewAvatar(previewUrl);
        setAvatarFile(file);
    };

    const handleCancel = () => {
        setUsername(user?.username || '');
        setBio(user?.bio || '');
        setPreviewAvatar(user?.avatarUrl || null);
        setAvatarFile(null);
        setPanel('VIEW');
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setUsername(user?.username || '');
            setBio(user?.bio || '');
            setPreviewAvatar(user?.avatarUrl || null);
            setAvatarFile(null);
            setPanel('VIEW');
        }, 300); // Animation delay
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const formData = new FormData();
        formData.append('username', username.trim());
        formData.append('bio', bio.trim());
    
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }
        
        updateProfile(formData, {
            onSuccess: () => setPanel('VIEW'),
        });
    };

    return (
        <div 
            onClick={handleClose}
            className={`fixed inset-0 z-50 flex items-center md:items-center justify-center bg-black/40 backdrop-blur-xs select-none transition-opacity duration-300 ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-md flex flex-col rounded-xs shadow-xs bg-white overflow-hidden transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
                
                {/* PANEL: VIEW */}
                {panel === 'VIEW' && (
                    <div className="h-full flex flex-col p-3">
                        <div className="flex flex-col items-center mb-3">
                            <div className="w-20 h-20 rounded-full overflow-hidden shadow-xs mb-3 shrink-0">
                                {user?.avatarUrl ? (
                                    <img 
                                        src={user.avatarUrl}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-linear-to-tr from-green-700 to-green-800">
                                        <User className="w-10 h-10 text-white" />
                                    </div>
                                )}
                            </div>

                            <h3 className="mb-2 text-sm font-semibold text-gray-800 capitalize">
                                {user?.username}
                            </h3>

                            <p className="text-xs text-gray-400 text-center">
                                {user?.bio || 'No biography yet.'}
                            </p>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button 
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xs cursor-pointer transition-colors"
                            >
                                Close
                            </button>
            
                            <button
                                type="button"
                                onClick={handleStartEditing}
                                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xs disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                )}

                {/* PANEL: EDIT */}
                {panel === 'EDIT' && (
                    <form onSubmit={handleSubmit} className="flex flex-col h-full p-3">
                        <div className="flex justify-center py-3">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                aria-label="Change profile picture"
                                className="group flex flex-col items-center gap-1.5 rounded-xs cursor-pointer"
                            >
                                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-50 shadow-xs overflow-hidden">
                                    {previewAvatar ? (
                                        <img 
                                            src={previewAvatar}
                                            alt="Profile picture preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Camera className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>

                                <span className="text-[10px] text-blue-500 group-hover:text-blue-600 transition-colors">
                                    {previewAvatar ? 'Change Photo' : 'Set Photo'}
                                </span>
                            </button>
                        </div>

                        <div className="flex flex-col gap-3 py-3 border-b border-gray-100 mb-3">
                            <div>
                                <input 
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Name"
                                    maxLength={16}
                                    required
                                    className="w-full p-1.5 text-xs text-gray-800 bg-gray-100 outline-none transition-colors"
                                />

                                <label className="px-1.5 py-1 block text-[10px] text-gray-400 tracking-wider">
                                    Enter your name
                                </label>
                            </div>

                            <div>
                                <textarea 
                                    value={bio} 
                                    onChange={(e) => setBio(e.target.value)}
                                    className="w-full h-16 p-1.5 text-xs text-gray-800 bg-gray-100 outline-none transition-colors resize-none"
                                    placeholder="Bio"
                                    maxLength={MAX_BIO_LENGTH}
                                />
                                    
                                <div className="flex justify-between items-center w-full">
                                    <label className="px-1.5 block text-[10px] text-gray-400 tracking-wider">
                                        A few words about you
                                    </label>
                       
                                    <span className={`text-xs font-medium ${bioCharactersCount > (MAX_BIO_LENGTH - 10) ? 'text-red-500' : 'text-gray-400'}`}>
                                        {bioCharactersCount} / {MAX_BIO_LENGTH}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xs cursor-pointer transition-colors"
                            >
                                Cancel
                            </button>
            
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-40 cursor-pointer transition-opacity"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}