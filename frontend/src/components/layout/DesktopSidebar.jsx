import { NavLink } from 'react-router';
import { Users, MessagesSquare, User } from 'lucide-react';

const navItems = [
    { icon: MessagesSquare, label: 'Chat', path: '/' },
    { icon: Users, label: 'Groups', path: '/groups' },
    { icon: User, label: 'Profile', path: '/profile' },
];

export default function DesktopSidebar() {
    return (       
        <aside className="hidden md:flex w-52 shrink-0 h-full border-r border-gray-200 flex-col p-4">
            <div className="pb-6 mb-6 border-b border-gray-100">
                <h1 className="text-lg font-bold">
                    Messaging App
                </h1>
            </div>

            <nav className="flex flex-col gap-2 flex-1">
                {navItems.map(({ icon: Icon, label, path }) => (
                    <NavLink
                        key={label}
                        to={path}
                        className={({ isActive }) => `px-4 py-2.5 rounded-sm text-sm font-bold tracking-wide uppercase transition-colors flex items-center gap-3 ${
                            isActive ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                        <Icon size={18} />
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}