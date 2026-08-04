import { Link } from 'react-router';
import RegisterForm from '../../components/forms/RegisterForm';

export default function Register() {
    return (
        <div className="w-[80%] max-w-100 flex flex-col items-center">            
            <h1 className="text-3xl text-center font-bold mb-8">
                Create Account
            </h1>
            
            <RegisterForm />
           
            <p className="mt-8 text-sm text-gray-400 text-center">
                Already have an account?
                <Link to="/auth/login" className="underline text-black ml-2 font-medium hover:text-gray-700">
                    Log in
                </Link>
            </p>            
        </div>
    );
}