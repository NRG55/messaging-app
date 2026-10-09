import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Camera } from 'lucide-react';
import { useCreateGroupChatMutation } from '../hooks';
import { useAllUsers } from '../../user/hooks';
import UserSelectionList from '../../user/components/UserSelectionList';

export default function GroupChatCreationModal({ isOpen, onClose }) {
    const [panel, setPanel] = useState('DETAILS'); // panel DETAILS (group name and avatar), panel MEMBERS (group members selection)
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [chatName, setChatName] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const { data: allUsers = [] } = useAllUsers();
    const { mutate: createGroupChat, isPending: isCreatingGroup } = useCreateGroupChatMutation();

    // Cleans up temporary avatar links and binary file data from RAM
    useEffect(() => {
        return () => {
    
            if (previewAvatar && previewAvatar.startsWith('blob:')) {
                URL.revokeObjectURL(previewAvatar);
            }
        };
    }, [previewAvatar]);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }
        
        const previewUrl = URL.createObjectURL(file);

        setPreviewAvatar(previewUrl);
        setAvatarFile(file);
    };

    const toggleUserSelection = (userId) => {
        setSelectedUserIds(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!chatName.trim()) {
            return;
        }
        
        const formData = new FormData();
        formData.append('chatName', chatName.trim());
        formData.append('chatMembersIds', JSON.stringify(selectedUserIds));
        
        if (avatarFile) {
            formData.append('chatAvatar', avatarFile);
        }

        createGroupChat(formData, {
            onSuccess: (newChat) => {
                handleCloseModal();

                if (newChat?.id) {
                    navigate(`/chat/${newChat.id}`);
                }
            },
        });
    };

    const handleBackToDetailsPanel = () => {
        setSelectedUserIds([]);
        setPanel('DETAILS');
    };

    const handleCloseModal = () => {
        onClose();
        // Wait for slide-down animation
        setTimeout(() => {
            setSelectedUserIds([]);
            setChatName('');
            setPanel('DETAILS');
            setPreviewAvatar(null);
            setAvatarFile(null);
        }, 300);
    };

    return (
        <div 
            onClick={handleCloseModal}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out
                ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-md flex flex-col rounded-xs shadow-xs bg-white overflow-hidden transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
                {/* PANEL 1: Group name and picture */}
                {panel === 'DETAILS' && (
                    <div className="h-full flex flex-col p-3 bg-white">
                        <header className="flex items-center">
                            <h2 className="text-sm font-semibold text-gray-800 tracking-wide">
                                New Group
                            </h2>
                        </header>
                       
                        <div className="flex items-center gap-4 p-5">
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
                                aria-label="Set group profile picture"
                                className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 bg-gray-100 shadow-xs shrink-0 cursor-pointer overflow-hidden"
                            >
                                {previewAvatar ? (
                                    <img 
                                        src={previewAvatar}
                                        alt="Group profile picture preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Camera className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                            
                            <input
                                type="text"
                                placeholder="Enter group name..."
                                value={chatName}
                                onChange={(e) => setChatName(e.target.value)}
                                maxLength={50}
                                className="w-full border-b border-gray-200 py-2 px-1 text-sm text-gray-800 font-medium outline-none placeholder-gray-400 focus:border-gray-500 transition-colors"
                            />
                        </div>
                       
                        <div className="flex justify-end gap-2">
                            <button 
                                type="button"
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xs cursor-pointer transition-colors"
                            >
                                Close
                            </button>
            
                            <button
                                type="button"
                                onClick={() => setPanel('MEMBERS')}
                                disabled={!chatName.trim()}
                                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xs disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* PANEL 2: Members selection */}
                {panel === 'MEMBERS' && (
                    <div className="h-150 flex flex-col p-3 bg-white">
                        <header className="mb-3">
                            <h2 className="inline-block text-sm font-semibold text-gray-800">
                                Add members
                            </h2>

                            <span className="block text-[10px] text-gray-400">
                                {selectedUserIds.length} selected
                            </span>
                        </header>

                        <UserSelectionList 
                            allUsers={allUsers}
                            selectedUserIds={selectedUserIds}        
                            onToggleUserSelection={toggleUserSelection}
                        />

                        <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 shrink-0">
                            <button
                                type="button"
                                onClick={handleBackToDetailsPanel}
                                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xs cursor-pointer transition-colors"
                            >
                                Cancel
                            </button>
            
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isCreatingGroup}
                                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-40 cursor-pointer transition-opacity"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}