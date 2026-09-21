import { useState } from 'react';
import { X, Search, Users, User } from 'lucide-react';
import { formatLastConversationDate } from '../../../utils/date';

export default function NewChatModal({ isOpen, onClose, allUsers = [], onTriggerCreateGroupFlow }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = allUsers.filter(user => user.username?.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleOpenDirectChat = (userId) => {
        console.log('user ID:', userId);
        setSearchTerm('');
        onClose();
    };

    return (        
        <div 
            onClick={onClose}
            className={`fixed inset-0 flex items-end z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out
                sm:items-center sm:justify-center
                ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >            
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`w-full flex flex-col h-[95vh] bg-white rounded-t-xs overflow-hidden shadow-xs transition-transform duration-300 ease-in-out 
                    sm:max-w-md sm:rounded-xs sm:h-150
                    ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
                <header className="px-4 py-3 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
                    <h2 className="text-sm font-semibold text-gray-800 tracking-wide select-none">
                        New Chat
                    </h2>

                    <button 
                        onClick={onClose}
                        aria-label="Close new chat modal"
                        className="p-2 rounded-full text-gray-400 cursor-pointer transition-colors duration-150
                        hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </header>

                <div className="p-3 border-b border-gray-50 bg-white shrink-0">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        
                        <input 
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 rounded-xs bg-gray-100 outline-none border border-transparent transition-colors
                            focus:bg-white focus:border-gray-200"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <button 
                        onClick={onTriggerCreateGroupFlow}
                        className="w-full flex items-center gap-3 py-3 px-6.5 mb-3 text-left border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors"
                    >                        
                        <Users className="w-5 h-5 stroke-2 text-blue-500" />

                        <span className="text-sm text-blue-500">
                            New Group
                        </span>
                    </button>

                    <div className="flex flex-col">
                        {filteredUsers.length === 0 ? (
                            <div className="p-8 text-center text-xs text-gray-400 italic">
                                No matching users
                            </div>
                        ) : (
                            filteredUsers.map((user) => (
                                <button
                                    key={user.id}
                                    onClick={() => handleOpenDirectChat(user.id)}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left cursor-pointer border-b border-gray-50"
                                >
                                    <div className="shrink-0">
                                        {user.avatarUrl ? (
                                            <img 
                                                src={user.avatarUrl} 
                                                alt={user.username} 
                                                className="w-10 h-10 rounded-full object-cover border border-gray-100"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 font-semibold text-sm uppercase bg-gray-100">
                                                {user.username?.charAt(0) || <User className="w-4 h-4 text-gray-400" />}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm text-gray-800 truncate capitalize">
                                            {user.username}
                                        </h4>

                                        <span className="text-xs text-gray-400 truncate">
                                            last seen {formatLastConversationDate(user.lastSeen)}
                                        </span>
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