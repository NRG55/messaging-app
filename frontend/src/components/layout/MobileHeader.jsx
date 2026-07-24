import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import MobileSideNav from './MobileSideNav';

const HEADER_TITLES = [
    { route: '/chat', title: 'Public Chat' },
    { route: '/messages', title: 'Messages' },
    { route: '/friends', title: 'Friends' },
    { route: '/groups', title: 'Groups' },
    { route: '/profile', title: 'My Profile' },
    { route: '/users', title: 'User Profile' },
];

export default function MobileHeader() {
    const { user } = useAuth();
    const { pathname } = useLocation();    
    const [isOpen, setIsOpen] = useState(false);
    // Close the sidebar if it is still open when a user selects a different page through the bottom nav
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const matchedItem = HEADER_TITLES.find(item => pathname.startsWith(item.route));
   
    const headerTitle = matchedItem ? matchedItem.title : 'Messaging App';

    return (
        <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <h2 className="text-sm font-bold tracking-wide uppercase select-none">
                {headerTitle}
            </h2>

            <div>               
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer w-10 h-10 rounded-full flex items-center bg-gray-100 border border-gray-200 overflow-hidden"
                >
                    {user?.avatarUrl && (
                        <img 
                            src={user.avatarUrl} 
                            alt="Profile avatar" 
                            className="w-full h-full object-cover" 
                        />
                    )}
                </button>                
                
                <MobileSideNav 
                    isOpen={isOpen} 
                    onClose={() => setIsOpen(false)} 
                />
            </div>
        </header>
    );
}