import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

// on the left on mobile, hidden on desktop
function MobileBackArrow({ onBackClick }) {

    return (
        <div className="flex items-center pointer-events-auto md:hidden">
            <button 
                onClick={onBackClick}
                aria-label="Back to chats"
                className="flex items-center justify-center h-10 w-10 rounded-full text-gray-800 bg-white/40 border border-white/20 backdrop-blur-md shadow-xs active:bg-white/60 transition-colors cursor-pointer"
            >
                <ArrowLeft className="h-5 w-5" />
            </button>
        </div>
    );
}

// in the middle on mobile, on the left on desktop
function ChatTitleDisplay({ title, subtitle }) {

    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[60%] pointer-events-auto md:static md:left-auto md:top-auto md:translate-x-0 md:translate-y-0 md:transform-none md:max-w-none md:w-auto md:flex-1 md:block min-w-0">
            <div className="px-4 py-1.5 rounded-full text-center bg-white/40 border border-white/20 backdrop-blur-md shadow-xs md:p-0 md:bg-transparent md:border-0 md:backdrop-blur-none md:shadow-none md:text-left">
                <h3 className="font-semibold text-xs text-gray-900 capitalize truncate leading-tight md:text-sm">
                    {title}
                </h3>
                <p className="text-[9px] text-gray-500 font-medium truncate leading-none mt-0.5 md:text-[10px] md:text-gray-400">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

// on the right on mobile, hidden on desktop
function MobileChatAvatar({ avatarUrl, chatName }) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="absolute right-4 flex items-center pointer-events-auto md:hidden">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 border border-white/30 backdrop-blur-md shadow-xs shrink-0 overflow-hidden">
                {avatarUrl && !imageError ? (
                    <img
                        src={avatarUrl}
                        alt={chatName || 'Chat avatar'}
                        onError={() => setImageError(true)}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span className="text-gray-800 font-bold text-sm">
                        {chatName?.charAt(0).toUpperCase() || '?'}
                    </span>
                )}
            </div>
        </div>
    );
}

export default function ActiveChatHeader({ chatTitle, chatSubtitle, chatAvatarUrl, onBackClick }) {

    return (
        <div className="absolute top-0 left-0 w-full h-14 flex items-center shrink-0 px-4 bg-transparent pointer-events-none md:static md:bg-white md:border-b md:border-gray-200 md:pointer-events-auto z-20">
            <MobileBackArrow onBackClick={onBackClick} />
            
            <ChatTitleDisplay title={chatTitle} subtitle={chatSubtitle} />
            
            <MobileChatAvatar avatarUrl={chatAvatarUrl} chatName={chatTitle} />
        </div>
    );
}