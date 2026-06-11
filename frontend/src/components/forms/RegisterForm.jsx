import { Link } from 'react-router';
import Input from '../Input';
import PasswordInput from '../PasswordInput';

export default function RegisterForm() {
    const errors = [];
    
    const handleRegister = async () => {

    };

    return (
        <form onSubmit={handleRegister} className="w-[80%] max-w-100">
            <h1 className="text-3xl text-center mb-18">
                Create Account
            </h1>

            {errors && errors.map((error, i) => (
                <p key={'error-' + i} className="mb-4 text-red-400">
                    {error.msg}
                </p>
            ))}

            <Input
                type="text"
                name="username"
                placeholder="Username"
                required
            />

            <PasswordInput
                name="password"
                placeholder="Password"
                required
            />

            <PasswordInput
                name="passwordConfirmation"
                placeholder="Confirm password"
                required
            />              

            <button
                type="submit"
                className="cursor-pointer w-full bg-black text-white rounded-xs py-2 px-6 mt-6 hover:bg-gray-700 transition-colors"                
            >
                Sign up
            </button>

            <p className="mt-15 text-gray-400 text-center">
                Already have an account?
                <Link to="/login" className="underline text-black ml-2">
                    Log in
                </Link>
            </p>

            <div className="relative w-full flex items-center gap-2 my-6 opacity-10 text-black font-bold">
                <hr className="w-1/2 border-black" />
                <p>OR</p>
                <hr className="w-1/2 border-black" />
            </div>

            <p className="text-gray-400 text-center">
                Continue without registration
                <Link to="/" className="underline text-black ml-2">
                    Home
                </Link>
            </p>
        </form>
    );
}