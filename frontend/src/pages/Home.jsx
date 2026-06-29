import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="grow">
                <h1>Home</h1>
            </main>
            
            <Footer />
        </div>
    );
}
