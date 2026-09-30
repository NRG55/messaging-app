import { User, ChevronRight } from 'lucide-react';
import { useCurrentUser } from '../hooks';
import { useLogoutMutation } from '../../auth/hooks';
import { useOutletContext } from 'react-router';

export default function MobileSettingsView() {
    const { user } = useCurrentUser();
    const { mutate: logOut, isPending: isLoggingOut } = useLogoutMutation();
    const { onTriggerProfileModal } = useOutletContext() || {};

    return (
        <div className="h-full min-h-full flex flex-col pb-24 bg-gray-100 overflow-y-auto">            
            <div className="flex flex-col items-center text-center p-6 gap-2 shrink-0">
                <div className="w-24 h-24 flex items-center justify-center rounded-full overflow-hidden shadow-xs">
                    {user?.avatarUrl ? (
                        <img
                            src={user?.avatarUrl} 
                            alt="Profile avatar" 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="h-full w-full flex shrink-0 items-center justify-center bg-linear-to-tr from-green-700 to-green-800">
                            <User className="w-10 h-10 text-white" />
                        </div>
                    )}
                </div>

                <h2 className="font-semibold text-gray-800 capitalize">
                    {user?.username}
                </h2>

                <p className="text-xs text-gray-500 px-6 max-w-sm">
                    {user?.bio}
                </p>
            </div>

            <div className="px-4">
                <button
                    onClick={onTriggerProfileModal} 
                    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xs bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                >
                    <User className="w-4 h-4 text-gray-400 shrink-0" />

                    <span className="flex-1 text-left text-sm text-gray-700">
                        My Profile
                    </span>
                        
                    <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                </button>
            </div>
            
            <div className="mt-auto px-4 w-full">
                <button
                    onClick={() => logOut()}
                    disabled={isLoggingOut} 
                    className="w-full px-4 py-3.5 text-center text-sm text-red-600 rounded-xs bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}