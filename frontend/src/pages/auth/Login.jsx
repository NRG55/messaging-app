import { Link } from 'react-router';
import LoginForm from '../../components/forms/LoginForm';

export default function Login() {
    return (
        <div className="w-[80%] max-w-100 flex flex-col items-center">            
            <h1 className="text-3xl text-center font-bold mb-8">
                Welcome Back
            </h1>
           
            <LoginForm />
           
            <p className="mt-8 text-sm text-gray-400 text-center">
                Don't have an account?
                <Link to="/auth/register" className="underline text-black ml-2 font-medium hover:text-gray-700">
                    Register
                </Link>
            </p>            
        </div>
    );
}
