import { NavLink, useNavigate } from 'react-router';
import { Users, MessagesSquare, LogIn } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const navItems = [
    { icon: MessagesSquare, label: 'Public Chat', path: '/' },
    { icon: Users, label: 'Group Chats', path: '/groups' },
];

export default function DesktopSidebar() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    return (       
        <aside className="hidden md:flex w-20 shrink-0 h-full border-r border-gray-200 flex-col p-4">
            <div>
                <span>Logo</span>                
            </div>

            <nav className="flex-1 flex flex-col gap-2 items-center w-full px-2 py-6">
                {navItems.map(({ icon: Icon, label, path }) => (
                    <NavLink
                        key={label}
                        to={path}                        
                        className={({ isActive }) => `group relative flex items-center justify-center w-11 h-11 p-2 rounded-md ${
                            isActive ? 'bg-black text-white' : 'text-black hover:bg-gray-100'
                        }`}
                    >
                        <Icon size={24} />
                        
                        <div className="absolute left-14 hidden group-hover:flex items-center">                            
                            <div className="w-2 h-2 bg-black rotate-45 -mr-1" />                           
                            <div className="bg-black text-white tracking-wide whitespace-nowrap px-2.5 py-1.5 rounded-xs">
                                {label}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </nav>

            <div className="w-full flex justify-center pt-4 border-t border-gray-100">
                {loading ? (
                    <div>Loader...</div>
                ) : user ? (                   
                    <button
                        type="button"
                        onClick={() => navigate('/profile')}                        
                        className="group relative cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 border border-gray-200 overflow-visible"
                    >
                        <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                            {user?.avatarUrl && (
                                <img 
                                    src={user.avatarUrl} 
                                    alt="Profile avatar" 
                                    className="w-full h-full object-cover" 
                                />
                            )}
                        </div>

                        <div className="absolute left-14 hidden group-hover:flex items-center">
                            <div className="w-2 h-2 bg-black rotate-45 -mr-1" />
                            <div className="bg-black text-white tracking-wide whitespace-nowrap px-2.5 py-1.5 rounded-sm">
                                Profile Menu
                            </div>
                        </div>                     
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => navigate('/login')}                       
                        className="group relative cursor-pointer w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-100 overflow-visible transition"
                    >
                        <LogIn size={20} />

                        <div className="absolute left-14 hidden group-hover:flex items-center">
                            <div className="w-2 h-2 bg-black rotate-45 -mr-1" />
                            <div className="bg-black text-white tracking-wide whitespace-nowrap px-2.5 py-1.5 rounded-sm">
                                Log In
                            </div>
                        </div>                       
                    </button>
                )}
            </div>
        </aside>
    );
}