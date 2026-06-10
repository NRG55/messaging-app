import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
