import { useUserChats } from '../../hooks';
import ConversationList from './ConversationList';

export default function ChatSidebar() {
    const { data: chats = [], isLoading } = useUserChats();

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="flex h-full flex-col border-r border-gray-200">
            <div className="p-3">
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full rounded-xs bg-gray-100 px-4 py-2 text-sm outline-none text-gray-800" 
                />
            </div>
            
            <ConversationList chats={chats} />
        </div>
    );
}