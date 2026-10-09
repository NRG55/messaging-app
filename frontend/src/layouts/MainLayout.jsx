import { useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { useIsDesktop } from '../hooks/useIsDesktop';
import { useHeartbeat } from '../features/session/hooks';

import DesktopSidebar from './components/DesktopSidebar';
import MobileBottomNavbar from './components/MobileBottomNavbar';
import GroupChatCreationModal from '../features/chat/components/GroupChatCreationModal';
import MyProfileModal from '../features/user/components/MyProfileModal';
import UserProfileModal from '../features/user/components/UserProfileModal';
import GroupChatProfileModal from '../features/chat/components/GroupChatProfileModal';
import AddGroupMembersModal from '../features/chat/components/AddGroupMembersModal';

export default function MainLayout() {
    const { chatId } = useParams();
    const isDesktop = useIsDesktop();

    useHeartbeat(60000); // interval 1 minute

    const isActiveChat = Boolean(chatId);

    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
    const [isMyProfileModalOpen, setIsMyProfileModalOpen] = useState(false);
    const [userProfileData, setUserProfileData] = useState(null);
    const [groupChatId, setGroupChatId] = useState(null);
    const [isAddMembersOpen, setIsAddMembersOpen] = useState(false);

    const uiActions = {
        onTriggerCreateGroup: () => setIsCreateGroupModalOpen(true),
        onTriggerMyProfile: () => setIsMyProfileModalOpen(true),
        onTriggerUserProfile: (userData) => setUserProfileData(userData),
        onTriggerGroupProfile: (groupData) => setGroupChatId(groupData?.id || null), 
    };

    return (
        <div className="h-dvh w-screen overflow-hidden bg-white">
            {isDesktop ? (
                /* DESKTOP */
                <div className="flex h-full w-full">
                    <aside className="w-76 shrink-0 border-r border-gray-200">
                        <DesktopSidebar
                            onTriggerCreateGroup={uiActions.onTriggerCreateGroup}
                            onTriggerProfile={uiActions.onTriggerMyProfile}
                        />
                    </aside>

                    <main className="min-w-0 flex-1 overflow-hidden">
                        <Outlet context={uiActions} />
                    </main>
                </div>
            ) : (
                /* MOBILE */
                <div className="relative flex h-full w-full flex-col">
                    <main className="min-h-0 flex-1 overflow-hidden">
                        <Outlet context={uiActions} />
                    </main>

                    {!isActiveChat && <MobileBottomNavbar />}
                </div>
            )}

            {/* SHARED DESKTOP & MOBILE MODALS*/}
            <GroupChatCreationModal
                isOpen={isCreateGroupModalOpen}
                onClose={() => setIsCreateGroupModalOpen(false)}
            />

            <MyProfileModal
                isOpen={isMyProfileModalOpen}
                onClose={() => setIsMyProfileModalOpen(false)}
            />

            <UserProfileModal 
                isOpen={Boolean(userProfileData)} 
                onClose={() => setUserProfileData(null)}
                userData={userProfileData}
            />

            <GroupChatProfileModal 
                isOpen={Boolean(groupChatId)} 
                onClose={() => setGroupChatId(null)}
                chatId={groupChatId}
                onTriggerUserProfile={uiActions.onTriggerUserProfile}
                onOpenAddMembers={() => setIsAddMembersOpen(true)} 
            />

            <AddGroupMembersModal 
                isOpen={isAddMembersOpen}
                onClose={() => setIsAddMembersOpen(false)}
                chatId={groupChatId}
            />
        </div>
    );
}
