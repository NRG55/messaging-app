import { Link, useLocation } from 'react-router';
import { MessageCircle, Settings, UsersRound } from 'lucide-react'; 

export default function MobileBottomNavbar() {
    const location = useLocation();

    const navItems = [
        {
            label: 'Users',
            to: '/users',
            icon: UsersRound,
            isActive: location.pathname === '/users',
        },
        {
            label: 'Chats',
            to: '/',
            icon: MessageCircle,
            isActive: location.pathname === '/',
        },
        {
            label: 'Settings',
            to: '/settings',
            icon: Settings,
            isActive: location.pathname === '/settings',
        },                      
    ];

    return (
        <nav className="absolute bottom-4 left-1/2 -translate-x-1/2 h-14 flex items-center gap-2 px-2 py-1 rounded-full bg-white/40 border border-white/20 backdrop-blur-md shadow-xs z-30">
            
            {navItems.map((item) => {
                const IconComponent = item.icon;
                
                return (
                    <Link 
                        key={item.to}
                        to={item.to} 
                        className={`w-18 h-full flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium rounded-full
                            ${item.isActive ? 'text-blue-700 bg-gray-50' : 'text-gray-700'}`}
                    >
                        <IconComponent className="w-5 h-5 stroke-2" />

                        <span>{item.label}</span>
                    </Link>
                );
            })}
            
        </nav>
    );
}