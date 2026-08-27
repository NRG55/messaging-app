import { User, Users, LogOut, X } from 'lucide-react';
import { useAuth, useLogoutMutation } from '../../../auth/hooks';

export default function MenuDrawer({ isOpen, onClose }) {
    const { user } = useAuth();
    const { mutate: logout, isPending } = useLogoutMutation();

    return (
        <>
            <div 
                onClick={onClose}
                className={`absolute inset-0 z-10 bg-black/30 backdrop-blur transition-opacity duration-300
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />
            
            <div 
                className={`absolute inset-y-0 left-0 z-20 w-78 flex flex-col bg-white shadow-xl transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                
                <div className="relative flex flex-col gap-3 p-5 border-b border-gray-200">
                    <button 
                        onClick={onClose}
                        disabled={isPending}
                        aria-label="Close menu"
                        className="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-4 w-4" />
                    </button>                    

                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-bold text-lg">
                        {user?.username?.charAt(0).toUpperCase() || ''}
                    </div>
                    
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 capitalize truncate">
                            {user?.username || ''}
                        </p>                        
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="py-2 border-b border-gray-200">
                        <button 
                            onClick={() => console.log('Open profile modal')}
                            disabled={isPending}
                            className="cursor-pointer w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <User className="h-5 w-5 text-gray-600" />
                            My Profile
                        </button>
                    </div>

                    <div className="py-2">
                        <button 
                            onClick={() => console.log('Open add group modal')}
                            disabled={isPending}
                            className="cursor-pointer w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <Users className="h-5 w-5 text-gray-600" />
                            New Group
                        </button>
                    </div>
                </div>
                
                <div className="py-2 border-t border-gray-200">
                    <button                         
                        onClick={() => logout()}                        
                        disabled={isPending}
                        className="cursor-pointer w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <LogOut className="h-5 w-5 text-gray-600" />
                        Log Out
                    </button>
                </div>
            </div>
        </>
    );
}