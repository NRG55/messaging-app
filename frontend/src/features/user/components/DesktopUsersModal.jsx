import { useState } from 'react';
import { useNavigate } from 'react-router'; 
import { Search, User, X } from 'lucide-react';
import { useAllUsers } from '../hooks';
import { useGetOrCreateDirectChatMutation } from '../../chat/hooks';
import { formatLastConversationDate } from '../../../utils/date';

export default function DesktopUsersModal({ isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const { data: allUsers = [] } = useAllUsers();
    const { mutate: getOrCreateChat, isPending: isRedirecting } = useGetOrCreateDirectChatMutation();

    const filteredUsers = allUsers.filter(user => 
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleUserClick = (targetUser) => {
        if (isRedirecting) {
            return;
        }
        
        getOrCreateChat(targetUser.id, {
            onSuccess: (chat) => {
                handleCloseModal();
                navigate(`/chat/${chat.id}?from=users`);
            },
            onError: (error) => {
                console.error('Failed to get or create direct chat:', error);
            },
        });
    };

    const handleCloseModal = () => {
        onClose();
        // Wait for the slide-down transition before clearing state
        setTimeout(() => {
            setSearchTerm('');
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
                className={`w-full max-w-md h-150 flex flex-col rounded-xs shadow-xs bg-white overflow-hidden transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
                <div className="h-full flex flex-col p-3 overflow-hidden">
                    <header className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-gray-800 tracking-wide">
                            Users
                        </h2>
                        
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            disabled={isRedirecting}
                            className="cursor-pointer p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                            aria-label="Close users modal"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </header>

                    <div className="relative mb-4 shrink-0">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={isRedirecting}
                            className="w-full pl-9 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 rounded-xs bg-gray-100 outline-none border border-transparent focus:bg-white focus:border-gray-200 transition-colors"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
                        {filteredUsers.length === 0 ? (
                            <div className="p-8 text-center text-xs text-gray-400">
                                No matching users found.
                            </div>
                        ) : (
                            filteredUsers.map((user) => (
                                <button
                                    key={user.id}
                                    type="button"
                                    onClick={() => handleUserClick(user)}
                                    disabled={isRedirecting}
                                    className="w-full flex items-center justify-between p-2 text-left border-t border-gray-50 first:border-t-0 hover:bg-gray-100 cursor-pointer transition-colors"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="h-10 w-10 shrink-0 rounded-full shadow-xs overflow-hidden">
                                            {user.avatarUrl ? (
                                                <img
                                                    src={user.avatarUrl}
                                                    alt={`${user.username}'s avatar`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center rounded-full text-white font-bold uppercase bg-linear-to-tr from-green-700 to-green-800 shadow-xs">
                                                    {user.username?.charAt(0) || <User className="w-4 h-4 text-white" />}
                                                </div>
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <h4 className="mb-0.5 text-sm text-gray-800 truncate capitalize">
                                                {user.username}
                                            </h4>
                                            
                                            <span className="block text-[10px] text-gray-400 truncate">
                                                last seen {formatLastConversationDate(user.lastSeen)}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}