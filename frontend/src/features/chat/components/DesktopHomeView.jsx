import { MessageSquare } from 'lucide-react';

export default function DesktopHomeView() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50 select-none">
            <div className="p-4 mb-3 border border-gray-200 rounded-full bg-white">
                <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>

            <h2 className="mb-1 text-sm font-semibold text-gray-700">
                Select a conversation
            </h2>

            <p className="max-w-xs text-center text-xs text-gray-400">
                Choose a conversation from the sidebar, or open the menu to find users and start a new chat.
            </p>
        </div>
    );
}