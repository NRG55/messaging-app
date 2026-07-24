import { NavLink } from 'react-router';
import { MessageSquare, MessagesSquare, Users } from 'lucide-react';

const navItems = [    
    { icon: MessagesSquare, label: 'Public Chat', path: '/chat' },   
    { icon: Users, label: 'Groups', path: '/groups' },
];

export default function MobileBottomNav() {
    return (        
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-gray-200">          
            <ul className="flex items-center justify-around w-full h-full m-0 p-0 list-none">
                {navItems.map(({ icon: Icon, label, path }) => (                  
                    <li key={label} className="flex-1 h-full flex">
                        <NavLink
                            to={path}
                            className={({ isActive }) => `w-full h-full flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors relative ${
                                isActive 
                                    ? 'text-black before:content-[""] before:absolute before:top-0 before:left-[30%] before:right-[30%] before:h-0.5 before:bg-black before:rounded-b-sm' 
                                    : 'text-gray-500 hover:text-black'
                            }`}
                        > 

                            <Icon size={22} />                                    
                           
                            <span className="text-[11px] tracking-wide">
                                {label}
                            </span>

                        </NavLink>
                    </li>                    
                ))}
            </ul>            
        </nav>
    );
}

