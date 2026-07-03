export default function UserList({ users = [], onUserClick }) {
    return (
        <div className="flex flex-col gap-1 w-full">
            {users.length === 0 ? (
                <div className="text-center text-sm text-gray-400 py-6">
                    No users found
                </div>
            ) : (
                users.map((user) => (
                    <button
                        key={user.id}
                        onClick={() => onUserClick?.(user)}
                        className="w-full flex items-center cursor-pointer gap-3 p-2 rounded-xs hover:bg-gray-50 active:bg-gray-100 text-left transition-colors"
                    >
                        <div className="w-9 h-9 rounded-full bg-gray-50 shrink-0 flex items-center justify-center overflow-hidden border border-gray-100">
                            {user.avatarUrl && (
                                <img 
                                    src={user.avatarUrl} 
                                    alt="Profile avatar" 
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        <span className="flex-1 block text-sm font-medium text-gray-700 truncate">
                            {user.username}
                        </span>
                    </button>
                ))
            )}
        </div>
    );
}