import { User, X } from 'lucide-react';
import { useRef } from 'react';

export default function UserProfileModal({ isOpen, onClose, userData }) {
    // Ref to keep user profile info visible during the close slide animation before it becomes null
    const userDataRef = useRef(null);

    if (userData) {
        userDataRef.current = userData;
    }
   
    const user = userData || userDataRef.current || {};

    return (
        <div 
            onClick={onClose}
            className={`fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity duration-300
                ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`flex flex-col p-3 bg-white duration-300 ease-in-out transition-all
                    fixed inset-y-0 left-0 h-full w-full
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                    md:static md:w-full md:max-w-md md:h-[65vh] md:rounded-xs md:shadow-xs md:overflow-hidden md:translate-x-0
                    ${isOpen ? 'md:translate-y-0' : 'md:translate-y-40'}`}
            >
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close user profile"
                        className="cursor-pointer p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto flex flex-col p-3 gap-3">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden">
                            {user.avatarUrl ? (
                                <img
                                    src={user.avatarUrl}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-linear-to-tr from-green-700 to-green-800">
                                    <User className="w-8 h-8 text-white" />
                                </div>
                            )}
                        </div>

                        <h3 className="text-sm font-semibold text-gray-800 capitalize">
                            {user.name}
                        </h3>
                            
                        <p className={`text-[11px] ${user.isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                            {user.isOnline ? 'online' : 'offline'}
                        </p>
                    </div>

                    <div className="flex flex-col gap-1.5 p-2">
                        <h4 className="text-[10px] font-bold text-gray-400 tracking-wider">
                            BIO
                        </h4>

                        <p className="text-xs text-gray-700">
                            {user.bio || 'No bio yet.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}