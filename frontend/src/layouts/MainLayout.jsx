import { useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { useHeartbeat } from '../features/session/hooks';

import DesktopSidebar from './components/DesktopSidebar';
import MobileBottomNavbar from './components/MobileBottomNavbar';
import GroupChatCreationModal from '../features/chat/components/GroupChatCreationModal';
import ProfileModal from '../features/user/components/ProfileModal';

export default function MainLayout() {
    const { chatId } = useParams();

    useHeartbeat(60000); // interval 1 minute

    const isActiveChat = Boolean(chatId);

    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const uiActions = {
        onTriggerProfile: () => setIsProfileModalOpen(true),
        onTriggerCreateGroup: () => setIsCreateGroupModalOpen(true),
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden">

            {/* DESKTOP */}
            <div className="hidden md:flex h-full w-full">
                <aside className="w-76 shrink-0 border-r border-gray-200 bg-white">
                    <DesktopSidebar
                        onTriggerCreateGroup={() => setIsCreateGroupModalOpen(true)}
                        onTriggerProfile={() => setIsProfileModalOpen(true)} 
                    />
                </aside>

                <main className="flex-1 bg-white">
                    <Outlet context={uiActions} />
                </main>
            </div>

            {/* MOBILE */}
            <div className="flex md:hidden h-full w-full flex-col relative bg-white">
                <div className="flex-1 overflow-hidden">
                    <Outlet context={uiActions} />
                </div>

                {!isActiveChat && <MobileBottomNavbar />}
            </div>

            {/* DESKTOP & MOBILE MODALS*/}
            <GroupChatCreationModal
                isOpen={isCreateGroupModalOpen}
                onClose={() => setIsCreateGroupModalOpen(false)}
            />

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />
        </div>
    );
}
