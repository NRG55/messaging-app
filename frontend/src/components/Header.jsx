import { Link } from 'react-router';

export default function Header() {
    return (
        <header className="border-b border-gray-200 sticky top-0 z-50 p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link 
                    to="/" 
                    className="text-xl font-bold text-black hover:text-gray-700"
                >
                    Messaging App
                </Link>

                <div className="flex gap-4 items-center">
                    <Link 
                        to="/login" 
                        className="text-black hover:text-gray-700 transition-colors"
                    >
                        Login
                    </Link>
                    <Link 
                        to="/register" 
                        className="px-4 py-1.5 text-white bg-black hover:bg-gray-700 rounded-xs transition-colors"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </header>
    );
}
