import { Outlet } from 'react-router';
import MobileHeader from '../components/MobileHeader';
import DesktopSideNav from '../components/DesktopSideNav';
import MobileBottomNav from '../components/MobileBottomNav';

export default function Layout() {
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row pt-16 pb-16 md:pt-0 md:pb-0">            
            <MobileHeader />
            
            <DesktopSideNav />

            <main className="flex-1 w-full overflow-y-auto p-4 sm:p-6">               
                <Outlet />
            </main>
           
            <MobileBottomNav />
        </div>
    );
}
