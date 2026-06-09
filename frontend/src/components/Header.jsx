import { Link } from 'react-router';

export default function Header() {
    return (
        <header className="border-b border-gray-200 sticky top-0 z-50 p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link 
                    to="/" 
                    className="text-xl font-bold text-gray-700 hover:text-black"
                >
                    Messaging App
                </Link>

                <div className="flex gap-4 items-center">
                    <Link 
                        to="/login" 
                        className="text-gray-700 hover:text-black transition-colors"
                    >
                        Login
                    </Link>
                    <Link 
                        to="/register" 
                        className="px-4 py-1.5 text-white bg-gray-700 hover:bg-black rounded-xs transition-colors"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </header>
    );
};