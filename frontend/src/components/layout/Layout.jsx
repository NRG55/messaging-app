import { Outlet } from 'react-router';
import MobileHeader from './MobileHeader';
import MobileBottomNav from './MobileBottomNav';
import DesktopSidebar from './DesktopSidebar';

export default function Layout() {

    return (       
        <div className="h-dvh w-full flex flex-col md:flex-row overflow-hidden">            
            <MobileHeader />
           
            <DesktopSidebar />

            <main className="flex-1 w-full flex flex-col pt-16 pb-16 md:pt-0 md:pb-0 overflow-hidden">               
                <Outlet />
            </main>           
           
            <MobileBottomNav />
        </div>
    );
}
