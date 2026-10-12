import { User, Users, LogOut, X, CircleUserRound } from 'lucide-react';
import { useCurrentUser } from '../../features/user/hooks';
import { useLogoutMutation } from '../../features/auth/hooks';

export default function MenuDrawer({ isOpen, onClose, onTriggerProfile, onTriggerCreateGroup, onTriggerUsers }) {
    const { user } = useCurrentUser();
    const { mutate: logout, isPending } = useLogoutMutation();

    const menuItems = [
        { label: 'New Group', icon: Users, onClick: onTriggerCreateGroup },
        { label: 'Users', icon: User, onClick: onTriggerUsers },
    ];

    const handleProfileClick = () => {
        onClose();
        onTriggerProfile();
    };

    return (
        <>
            <div 
                onClick={onClose}
                className={`fixed inset-0 z-20 bg-black/30 backdrop-blur transition-opacity duration-300
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />
            
            <div 
                className={`fixed inset-y-0 left-0 z-30 w-78 flex flex-col bg-white shadow-xl transform transition-transform duration-300 ease-in-out
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
                    
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 capitalize truncate">
                            {user?.username || ''}
                        </p>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="py-2 border-b border-gray-200">
                        <button 
                            onClick={handleProfileClick}
                            disabled={isPending}
                            className="cursor-pointer w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <CircleUserRound className="h-5 w-5 text-gray-600" />
                            My Profile
                        </button>
                    </div>

                    <div className="flex flex-col py-2">
                        {menuItems.map((item) => {
                            const IconComponent = item.icon;
                        
                            return (
                                <button 
                                    key={item.label}
                                    type="button"
                                    onClick={() => {
                                        onClose();
                                        item.onClick();
                                    }}
                                    disabled={isPending}
                                    className="cursor-pointer w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <IconComponent className="h-5 w-5 text-gray-600" />
                                    
                                    {item.label}
                                </button>
                            );
                        })}
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