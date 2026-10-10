import { useState } from 'react';
import { Search, User } from 'lucide-react';
import { useAllUsers } from '../hooks';
import { formatLastConversationDate } from '../../../utils/date';

export default function MobileUsersView() {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: allUsers = [] } = useAllUsers();

    const filteredUsers = allUsers.filter(user => user.username?.toLowerCase().includes(searchTerm.toLowerCase()));

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
                        <div 
                            key={user.id}
                            className="flex items-center gap-3 p-3 border-t border-gray-50 first:border-t-0 rounded-xs hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                            <div className="h-12 w-12 shrink-0 rounded-full object-cover shadow-sm overflow-hidden">
                                {user.avatarUrl ? (
                                    <img 
                                        src={user.avatarUrl} 
                                        alt={user.username} 
                                        className="w-full h-full object-cover" 
                                    />
                                ) : (
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-green-700 to-green-800 text-white font-bold shadow-sm uppercase">
                                        {user.username?.charAt(0) || <User className="w-5 h-5 text-green-100" />}
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <h4 className="text-sm font-semibold text-gray-900 capitalize truncate">
                                    {user.username}
                                </h4>

                                <span className="text-[11px] text-gray-500 truncate">
                                    {formatLastConversationDate(user.lastSeen)}
                                </span>
                            </div>
                        </div>
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