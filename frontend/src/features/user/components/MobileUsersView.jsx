import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, User } from 'lucide-react';
import { useAllUsers } from '../hooks';
import { formatLastConversationDate } from '../../../utils/date';
import { useGetOrCreateDirectChatMutation } from '../../chat/hooks';

export default function MobileUsersView() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const { data: allUsers = [] } = useAllUsers();
    const { mutate: getOrCreateChat, isPending: isRedirecting } = useGetOrCreateDirectChatMutation();

    const filteredUsers = allUsers.filter(user => user.username?.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleUserClick = (targetUser) => {
        if (isRedirecting) {
            return;
        }
        
        getOrCreateChat(
            targetUser.id, 
            {
                onSuccess: (chat) => {
                    navigate(`/chat/${chat.id}?from=users`);
                },
                onError: (error) => {
                    console.error('Failed to get or create direct chat:', error);
                },
            },
        );
    };

    return (
        <div className="h-full flex flex-col">
            <header className="h-14 flex flex-col items-center justify-center">
                <h1 className="font-semibold text-gray-800 tracking-wide">
                    Users
                </h1>
            </header>

            <div className="relative p-3">
                <Search className="w-4 h-4 absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />

                <input 
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 rounded-xs bg-gray-100 outline-none border border-transparent transition-colors
                            focus:bg-white focus:border-gray-200"
                />
            </div>

            <div className="flex-1 overflow-y-auto">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <button 
                            key={user.id}
                            type="button"
                            onClick={() => handleUserClick(user)}
                            disabled={isRedirecting}
                            className="w-full flex items-center gap-3 text-left p-3 border-t border-gray-50 first:border-t-0 rounded-xs hover:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                        >
                            <div className="h-12 w-12 rounded-full shrink-0 shadow-xs overflow-hidden">
                                {user.avatarUrl ? (
                                    <img
                                        src={user.avatarUrl}
                                        alt={user.username}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center rounded-full text-white font-bold uppercase bg-linear-to-tr from-green-700 to-green-800 shadow-xs">
                                        {user.username?.charAt(0) || <User className="w-5 h-5 text-white" />}
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <h4 className="mb-0.5 text-sm font-semibold text-gray-900 capitalize truncate">
                                    {user.username}
                                </h4>

                                <span className="block text-[11px] text-gray-400 truncate">
                                    last seen {formatLastConversationDate(user.lastSeen)}
                                </span>
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-16">
                        <p className="text-xs text-gray-400">
                            No matching users found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}