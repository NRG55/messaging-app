import { Menu } from 'lucide-react';
import { useUserChats } from '../../hooks';
import ConversationList from './ConversationList';
import MenuDrawer from './MenuDrawer';
import { useState } from 'react';

export default function ChatSidebar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { data: chats = [], isLoading } = useUserChats();

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="flex h-full flex-col border-r border-gray-200">
            <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <div className="p-3 flex items-center gap-2">                
                <button
                    type="button"
                    onClick={() => setIsMenuOpen(true)}
                    className="cursor-pointer h-9 w-9 flex items-center justify-center shrink-0 rounded-full text-gray-500 active:bg-gray-200 transition-colors"
                    aria-label="Open navigation menu"
                >
                    <Menu className="h-5 w-5" />
                </button>
               
                <div className="flex-1">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="w-full rounded-xs bg-gray-100 px-4 py-2 text-sm outline-none text-gray-800 placeholder-gray-400" 
                    />
                </div>
            </div>
            
            <ConversationList chats={chats} />
        </div>
    );
}