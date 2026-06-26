import { Outlet } from 'react-router';
import DesktopSideNav from '../components/DesktopSideNav';
import MobileBottomNav from '../components/MobileBottomNav';

export default function Dashboard() {
    return (
        <div className="flex h-screen w-full">            
            
            <DesktopSideNav />            

            <main className="flex-1 h-full p-6 md:p-8 pb-16 md:pb-8">
                <Outlet />
            </main>
            
            <MobileBottomNav />

        </div>
    );
}