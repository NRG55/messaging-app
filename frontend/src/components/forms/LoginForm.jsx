import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Input from '../Input';
import PasswordInput from '../PasswordInput';
import { useState } from 'react';
import { api } from '../../services/api';

export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState([]);
    
    async function handleSubmit(event) {
        event.preventDefault();    

        setErrors([]);
        setIsSubmitting(true);
        
        const formData = new FormData(event.currentTarget);
        const payload = Object.fromEntries(formData.entries());

        try {           
            const response = await api('/auth/login', {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            
            if (response && response.success) {
                login(response.user);
                navigate('/', { replace: true });
            }

        } catch (error) {
            if (error.responseData && error.responseData.errors) {                
                setErrors(error.responseData.errors);

            } else {                
                setErrors([{ msg: error.message || 'An unexpected error occurred.' }]);
            }

        } finally {           
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-[80%] max-w-100">
            {errors && errors.length > 0 && errors.map((error, index) => (
                <p key={'error-' + index} className="mb-4 text-red-400">
                    {error.msg}
                </p>
            ))}

            <Input
                type="text"
                name="username"
                placeholder="Username"
                required
                disabled={isSubmitting}
            />

            <PasswordInput
                name="password"
                placeholder="Password"
                required
                disabled={isSubmitting}
            />

            <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer w-full bg-black text-white rounded-xs py-2 px-6 mt-6 hover:bg-gray-700 transition-colors"
            >
                {isSubmitting ? 'Logging in...' : 'Log in'}
            </button> 
        </form>
    );
}