import { Link } from 'react-router';
import Input from './AuthFormInput';

export default function AuthForm({ type, onSubmit, errors }) {
    return (
        <form
            onSubmit={onSubmit} 
            className="w-[80%] max-w-100"
        >
            <h1 className="text-3xl text-center mb-18">
                {type === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>

            {
                errors && errors.map((error, i) => (
                    <p key={'error-' + i} className="mb-4 text-red-400">
                        {error.msg}
                    </p>
                ))
            }

            <Input
                type="text"
                name="username"
                placeholder="Username"
                required
            />

            <Input
                type="password"
                name="password"
                placeholder="Password"
                required
            />

            {
                type === 'register' &&

                <Input
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Confirm password"
                    required
                />              
            }

            <button
                type="submit"
                className="cursor-pointer w-full bg-black text-white rounded-xs py-2 px-6 mt-6 hover:bg-gray-700 transition-colors"                
            >
                { type === 'register' ? 'Sign up' : 'Log in' }
            </button>

            {
                type === 'register'
                    ?
                    <p className="mt-15 text-gray-400 text-center">
                        Already have an account?
                        <Link to="/login" className="underline text-black ml-2">
                            Log in
                        </Link>

                    </p>
                    :
                    <p className="mt-15 text-gray-400 text-center">
                        Don't have an account?
                        <Link to="/register" className="underline text-black ml-2">
                            Register
                        </Link>
                    </p>
            }

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
};
