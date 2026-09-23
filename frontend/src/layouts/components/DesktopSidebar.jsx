import { Menu } from 'lucide-react';
import ConversationList from '../../features/chat/components/ConversationList';
import MenuDrawer from './DesktopSidebarMenuDrawer';
import { useState } from 'react';

export default function DesktopSidebar({ chats, isLoading, onTriggerCreateGroup }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    return (
        <div className="flex h-full flex-col">
            <MenuDrawer 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)}
                onTriggerCreateGroup={onTriggerCreateGroup} 
            />

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
            
            <div className="flex-1 flex flex-col overflow-hidden">
                {!isLoading && <ConversationList chats={chats} />}
            </div>
        </div>
    );
}