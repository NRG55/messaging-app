import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { sendHeartbeat } from '../features/user/api';
import { useCreateGroupChatMutation, useUserChats } from '../features/chat/hooks';
import { useAllUsers } from '../features/user/hooks';

import DesktopSidebar from './components/DesktopSidebar';
import MobileBottomNavbar from './components/MobileBottomNavbar';
import MobileChatsView from '../features/chat/components/MobileChatsView';
import GroupChatCreationModal from '../features/chat/components/GroupChatCreationModal';

export default function MainLayout() {
    const { chatId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const isChatListRoot = location.pathname === '/';
    const isActiveChat = Boolean(chatId);

    const { data: chats = [], isLoading } = useUserChats();
    const { data: allUsers = [] } = useAllUsers();
    const { mutate: createGroupChat } = useCreateGroupChatMutation();

    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

    const handleCreateGroupSubmit = (chatName, chatMembersIds, avatarFile) => {
        const formData = new FormData();

        formData.append('chatName', chatName);        
        formData.append('chatMembersIds', JSON.stringify(chatMembersIds));

        if (avatarFile) {
            formData.append('chatAvatar', avatarFile);
        }

        createGroupChat(formData, {
            onSuccess: (newChat) => {
                setIsCreateGroupModalOpen(false);
                if (newChat?.id) {
                    navigate(`/chat/${newChat.id}`);
                }
            },
        });
    };

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
                    <DesktopSidebar 
                        chats={chats} 
                        isLoading={isLoading}
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
                    {isChatListRoot ? (
                        <MobileChatsView 
                            chats={chats} 
                            isLoading={isLoading}
                            allUsers={allUsers}
                            onTriggerCreateGroup={() => setIsCreateGroupModalOpen(true)} 
                        />
                    ) : (
                        <Outlet />
                    )}
                </div>

                {!isActiveChat && <MobileBottomNavbar />}
            </div>

            <GroupChatCreationModal 
                isOpen={isCreateGroupModalOpen}
                onClose={() => setIsCreateGroupModalOpen(false)}
                onCreateGroup={handleCreateGroupSubmit}
                allUsers={allUsers}
            />
        </div>
    );
}
