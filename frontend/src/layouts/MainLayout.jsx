import { useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router';
import { useHeartbeat } from '../features/session/hooks';
import { useUserChats } from '../features/chat/hooks';
import { useAllUsers } from '../features/user/hooks';

import DesktopSidebar from './components/DesktopSidebar';
import MobileBottomNavbar from './components/MobileBottomNavbar';
import MobileChatsView from '../features/chat/components/MobileChatsView';
import GroupChatCreationModal from '../features/chat/components/GroupChatCreationModal';
import ProfileModal from '../features/user/components/ProfileModal';

export default function MainLayout() {
    const { chatId } = useParams();
    const location = useLocation();

    useHeartbeat(60000); // interval 1 minute

    const isRootPath = location.pathname === '/';
    const isActiveChat = Boolean(chatId);

    const { data: chats = [], isLoading: isChatsLoading } = useUserChats();
    const { data: allUsers = [] } = useAllUsers();

    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    return (
        <div className="flex h-screen w-screen overflow-hidden">

            {/* DESKTOP */}
            <div className="hidden md:flex h-full w-full">
                <aside className="w-76 shrink-0 border-r border-gray-200 bg-white">
                    <DesktopSidebar 
                        chats={chats} 
                        isLoading={isChatsLoading}
                        onTriggerCreateGroup={() => setIsCreateGroupModalOpen(true)} 
                    />
                </aside>

                <main className="flex-1 bg-white">
                    <Outlet />
                </main>
            </div>

            {/* MOBILE */}
            <div className="flex md:hidden h-full w-full flex-col relative bg-white">
                <div className="flex-1 overflow-hidden">
                    {isRootPath ? (
                        <MobileChatsView 
                            chats={chats} 
                            isLoading={isChatsLoading}
                            allUsers={allUsers}
                            onTriggerCreateGroup={() => setIsCreateGroupModalOpen(true)} 
                        />
                    ) : (
                        <Outlet context={{ onTriggerProfileModal: () => setIsProfileModalOpen(true) }} />
                    )}
                </div>

                {!isActiveChat && <MobileBottomNavbar />}
            </div>

            {/* DESKTOP & MOBILE */}
            <GroupChatCreationModal
                isOpen={isCreateGroupModalOpen}
                onClose={() => setIsCreateGroupModalOpen(false)}
                allUsers={allUsers}
            />

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />
        </div>
    );
}
