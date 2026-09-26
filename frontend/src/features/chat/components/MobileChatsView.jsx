import { useState } from 'react';
import { Plus } from 'lucide-react';

import ConversationList from './ConversationList';
import NewChatModal from './NewChatModal';

export default function MobileChatsView({ chats, isLoading, allUsers, onTriggerCreateGroup }) {
    const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);   

    const handleStartGroupCreation = () => {
        setIsNewChatModalOpen(false);
        onTriggerCreateGroup();
    };

    return (
        <div className="flex flex-col h-full w-full">
            <header className="h-14 border-b border-gray-100 flex items-center justify-between px-4 shrink-0">
                <div className="w-9 shrink-0" />
                
                <h1 className="font-semibold text-gray-800 tracking-wide truncate">
                    Chats
                </h1>

                <button 
                    onClick={() => setIsNewChatModalOpen(true)}
                    className="p-2 rounded-full cursor-pointer hover:bg-gray-50 transition-colors"
                    aria-label="Open new chat modal"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </header>

            <div className="flex-1 flex flex-col overflow-hidden">
                {!isLoading && <ConversationList chats={chats} />}
            </div>

            <NewChatModal 
                isOpen={isNewChatModalOpen}
                onClose={() => setIsNewChatModalOpen(false)}
                allUsers={allUsers}
                isUsersLoading={false}
                onTriggerCreateGroupFlow={handleStartGroupCreation}
            />
        </div>
    );
}