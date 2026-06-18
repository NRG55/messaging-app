import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import { loginUser } from '../../api/auth';
import Input from '../Input';
import PasswordInput from '../PasswordInput';

export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { submitForm, loading, errors } = useForm(loginUser);

    const handleSubmit = async (e) => {
        const data = await submitForm(e);
        
        if (data) {
            login(data.user);
            navigate('/dashboard');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-[80%] max-w-100">
            <h1 className="text-3xl text-center mb-18">
                Welcome Back
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
                disabled={loading}
            />

            <PasswordInput
                name="password"
                placeholder="Password"
                required
                disabled={loading}
            />

            <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full bg-black text-white rounded-xs py-2 px-6 mt-6 hover:bg-gray-700 transition-colors"                
            >
                {loading ? 'Logging in...' : 'Log in'}
            </button>

            <p className="mt-15 text-gray-400 text-center">
                Don't have an account?
                <Link to="/register" className="underline text-black ml-2">
                    Register
                </Link>
            </p>

            <div className="relative w-full flex items-center gap-2 my-6 opacity-10 text-black font-bold">
                <hr className="w-1/2 border-black" />
                <p>OR</p>
                <hr className="w-1/2 border-black" />
            </div>

            <p className="text-gray-400 text-center">
                Back to 
                <Link to="/" className="underline text-black ml-2">
                    Homepage
                </Link>
            </p>
        </form>
    );
}