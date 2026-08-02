import { Outlet, useParams } from 'react-router';
import ChatSidebar from '../components/ChatSidebar';

export default function MainLayout() {
    const { chatId } = useParams();
    const isActiveChat = Boolean(chatId);

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <aside className={`
                    ${isActiveChat ? 'hidden' : 'block w-full'} 
                    md:block md:w-90 shrink-0 border-r border-slate-200
                `}>
                <ChatSidebar />
            </aside>
            
            <main className={`
                    ${!isActiveChat ? 'hidden' : 'flex w-full'} 
                    md:flex md:flex-1 flex-col overflow-hidden
                `}>
                <Outlet />
            </main>
        </div>
    );
}
