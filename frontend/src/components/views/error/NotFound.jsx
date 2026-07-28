import { Link } from 'react-router';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <p className="text-6xl font-bold text-gray-200">
                404
            </p>

            <p className="text-2xl font-medium mt-4 text-gray-900">
                Page not found
            </p>

            <p className="text-gray-500 mt-2">
                The page doesn't exist or has been moved.
            </p>

            <Link 
                to="/" 
                className="mt-8 bg-black text-white px-3 py-1 rounded-xs hover:opacity-80 transition"
            >
                Back to Homepage
            </Link>
        </div>
    );
}