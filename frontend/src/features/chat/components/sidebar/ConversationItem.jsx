import { NavLink } from 'react-router';
import { formatLastConversationDate } from '../../../../utils/date';

export default function ConversationItem({ chat }) {
    const latestMessage = chat.latestMessage?.text ?? 'No messages yet';
    const senderLabel = chat.latestMessage ? `${chat.latestMessage.senderName}: ` : '';   
    const lastConversationDate = chat.lastActivity ? formatLastConversationDate(chat.lastActivity) : '';
    const showOnlineIndicator = chat.type === 'DIRECT' && chat.isOnline;

    // TODO: add unreadCount logic to the backend
    chat.unreadCount = 22;

    return (
        <NavLink
            to={`/chat/${chat.id}`}
            className={({ isActive }) => `
                group flex items-center gap-3 p-3 text-black transition-colors duration-150 select-none
                ${isActive ? 'bg-green-800 text-white active' : 'hover:bg-gray-100'}
            `}
        >
            <div className="relative shrink-0">
                {chat.avatarUrl ? (
                    <img 
                        src={chat.avatarUrl} 
                        alt={chat.name} 
                        className="h-12 w-12 shrink-0 rounded-full object-cover shadow-sm"
                    />
                ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-green-700 to-green-800 text-white font-bold shadow-sm uppercase">
                        {chat.name?.charAt(0) || ''}
                    </div>
                )}

                {showOnlineIndicator && (
                    <span 
                        className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white group-[.active]:border-green-800 shadow-xs"
                        title="Online"
                    />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <h4 className="truncate text-sm font-semibold text-gray-900 group-[.active]:text-white capitalize">
                        {chat.name}
                    </h4>

                    <span className="text-[11px] text-gray-500 group-[.active]:text-white">
                        {lastConversationDate}
                    </span>
                </div>
        
                <div className="flex items-center justify-between mt-0.5">
                    <p className="max-w-[85%] truncate text-xs text-gray-500 group-[.active]:text-white">
                        <span className="text-gray-400 group-[.active]:text-white">
                            {chat.type === 'GROUP' && senderLabel}
                        </span>

                        {latestMessage}
                    </p>
                    
                    {chat.unreadCount > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] text-white bg-green-600">
                            {chat.unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </NavLink>
    );
}