import { Outlet } from 'react-router';
import DesktopHomeSidebar from './DesktopHomeSidebar';

export default function HomeView() {   
    
    return (
        <div className="flex h-full w-full overflow-hidden">
            <DesktopHomeSidebar />
            
            <main className="flex-1 h-full overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}