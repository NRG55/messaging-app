import { Outlet, useLocation, useParams } from 'react-router';
import { useEffect } from 'react';
import { sendHeartbeat } from '../features/user/api';
import { useUserChats } from '../features/chat/hooks';

import DesktopSidebar from './components/DesktopSidebar';
import MobileBottomNavbar from './components/MobileBottomNavbar';
import MobileChatList from '../features/chat/components/MobileChatList';

export default function MainLayout() {
    const { chatId } = useParams();
    const location = useLocation();

    const isChatListRoot = location.pathname === '/';
    const isActiveChat = Boolean(chatId);

    const { data: chats = [], isLoading } = useUserChats();

    useEffect(() => {
        const sendHeartbeatRequest = async () => {
            try {
                await sendHeartbeat();

            } catch (error) {
                console.error('Send heartbeat request failed:', error.message);
            }
        };
        
        sendHeartbeatRequest();

        const heartbeatIntervalId = setInterval(sendHeartbeatRequest, 60000); // 1 minute
       
        return () => clearInterval(heartbeatIntervalId);
    }, []);

    return (
        <div className="flex h-screen w-screen overflow-hidden">

            {/* DESKTOP */}
            <div className="hidden md:flex h-full w-full">
                <aside className="w-76 shrink-0 border-r border-gray-200 bg-white">
                    <DesktopSidebar chats={chats} isLoading={isLoading} />
                </aside>

                <main className="flex-1 bg-white">
                    <Outlet />
                </main>
            </div>

            {/* MOBILE */}
            <div className="flex md:hidden h-full w-full flex-col relative bg-white">
                <div className="flex-1 overflow-hidden">
                    {isChatListRoot ? (
                        <MobileChatList chats={chats} isLoading={isLoading} />
                    ) : (
                        <Outlet />
                    )}
                </div>

                {!isActiveChat && <MobileBottomNavbar />}
            </div>
        </div>
    );
}
