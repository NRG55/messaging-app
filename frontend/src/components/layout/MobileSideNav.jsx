import { useNavigate } from 'react-router';
import { LogOut, User } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

export default function MobileSideNav({ isOpen, onClose }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const sidebarItems = [
        { path: '/profile', label: 'Profile', icon: <User size={15} /> },
        { path: '/path2', label: 'Button 2', icon: <User size={15} /> },
        { path: '/path3', label: 'Button 3', icon: <User size={15} /> },
    ];

    const handleNavigation = (path) => {
        onClose();
        navigate(path);
    };
   
    const handleLogOut = async () => {
        onClose();

        try {
            await logoutUser();

        } catch {
            console.error('Backend log out failed.');

        } finally {
            logout();
        }
    };

    return (
        <>            
            <div 
                onClick={onClose}
                className={`md:hidden fixed top-16 bottom-16 left-0 right-0 z-40 bg-black/20 transition-opacity duration-300 cursor-default ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            />
            
            <aside 
                className={`md:hidden fixed top-16 bottom-16 right-0 z-50 w-70 bg-white border-l border-gray-200 flex flex-col justify-between p-5 shadow-lg transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col gap-6">                   
                    <div className="flex flex-col px-3 pb-6 border-b border-gray-100">
                        <span className="text-[11px] tracking-wider text-gray-400">
                            Signed in as
                        </span>

                        <span className="font-bold text-gray-800 truncate mt-0.5">
                            {user?.username || 'guest'}
                        </span>
                    </div>
                   
                    <nav className="flex flex-col gap-2">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => handleNavigation(item.path)}
                                className="cursor-pointer w-full flex items-center px-4 py-2 hover:bg-gray-50 rounded-xs transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    {item.icon}
                                    {item.label}
                                </div>                                
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="border-t border-gray-100 pt-4">
                    <button
                        onClick={handleLogOut}
                        className="cursor-pointer w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xs transition-colors"
                    >
                        <LogOut size={15} />
                        Log out
                    </button>
                </div>
            </aside>
        </>
    );
}