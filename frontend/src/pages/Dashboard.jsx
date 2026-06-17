import { Outlet } from 'react-router';
import MobileBottomNav from '../components/MobileBottomNav.jsx';

export default function Dashboard() {    

    return (
        <div className="min-h-screen w-screen flex flex-col pb-16 md:pb-0">

            <main className="flex-1 p-6 max-w-7xl w-full mx-auto">         
                <Outlet />               
            </main>

            <MobileBottomNav />
        </div>
    );
}