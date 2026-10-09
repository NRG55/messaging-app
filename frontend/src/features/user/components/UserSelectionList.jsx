import React, { useState } from 'react';
import { Search, User, Check } from 'lucide-react';
import { formatLastConversationDate } from '../../../utils/date';

export default function UserSelectionList({ allUsers = [], selectedUserIds = [], excludeUserIds = [], onToggleUserSelection }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = allUsers.filter(user => {
        const isUserExcluded = excludeUserIds.includes(user.id);
        const userMatchesSearch = user.username?.toLowerCase().includes(searchTerm.toLowerCase());

        return !isUserExcluded && userMatchesSearch;
    });

    return (
        <div className="flex-1 flex flex-col min-h-0">
            <div className="relative mb-6">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 rounded-xs bg-gray-100 outline-none border border-transparent transition-colors focus:bg-white focus:border-gray-200"
                />
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col divide-y divide-gray-50">
                {filteredUsers.length === 0 ? (
                    <div className="p-8 text-center text-xs text-gray-400">
                        No matching users
                    </div>
                ) : (
                    filteredUsers.map((user) => {
                        const isSelected = selectedUserIds.includes(user.id);

                        return (
                            <button
                                key={user.id}
                                type="button"
                                onClick={() => onToggleUserSelection(user.id)}
                                className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="shrink-0">
                                        {user.avatarUrl ? (
                                            <img
                                                src={user.avatarUrl}
                                                alt={`${user.username}'s avatar`}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold text-gray-500 uppercase bg-gray-100">
                                                {user.username?.charAt(0) || <User className="w-4 h-4 text-gray-400" />}
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <h4 className="text-sm text-gray-800 truncate capitalize">
                                            {user.username}
                                        </h4>

                                        <span className="block text-[11px] text-gray-400">
                                            last seen {formatLastConversationDate(user.lastSeen)}
                                        </span>
                                    </div>
                                </div>

                                <div className={`w-5 h-5 flex items-center justify-center rounded-full shrink-0 border duration-150 transition-all
                                    ${isSelected ? 'bg-green-600 border-green-600 text-white' : 'border-gray-300 bg-white'}`}
                                >
                                    {isSelected && <Check className="w-3 h-3" />}
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
}