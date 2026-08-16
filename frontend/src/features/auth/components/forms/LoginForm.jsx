import { useLoginMutation } from '../../hooks';
import Input from './Input';
import PasswordInput from './PasswordInput';

export default function LoginForm() {
    const loginMutation = useLoginMutation();
    
    async function handleSubmit(event) {
        event.preventDefault();

        const formData = Object.fromEntries(new FormData(event.currentTarget));

        loginMutation.mutate(formData);        
    }

    const isErrorState = loginMutation.isError;
    const fieldErrors = isErrorState ? (loginMutation.error?.responseData?.errors || {}) : {};    
    const hasFieldErrors = Object.keys(fieldErrors).length > 0;
   
    const globalErrorMessage = (isErrorState && !hasFieldErrors) ? loginMutation.error?.message : '';
    const showGlobalErrorMessage = isErrorState && !hasFieldErrors && !!globalErrorMessage;

    return (
        <form onSubmit={handleSubmit} className="w-[80%] max-w-100 flex flex-col gap-1">
            <div className={`min-h-5 text-center text-xs mb-2 transition-all duration-150 ${showGlobalErrorMessage ? 'text-red-500 opacity-100' : 'opacity-0 select-none pointer-events-none'}`}>
                {globalErrorMessage || ''}
            </div>

            <div className="flex flex-col gap-1">
                <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    disabled={loginMutation.isPending}
                />

                <span className={`text-xs text-red-500 pl-1 min-h-4 transition-opacity duration-150 ${fieldErrors.username ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                    {fieldErrors.username || ''} 
                </span>
            </div>

            <div className="flex flex-col gap-1">
                <PasswordInput
                    name="password"
                    placeholder="Password"
                    required
                    disabled={loginMutation.isPending}
                />

                <span className={`text-xs text-red-500 pl-1 min-h-4 transition-opacity duration-150 ${fieldErrors.password ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                    {fieldErrors.password || ''}
                </span>
            </div>

            <button
                type="submit"
                disabled={loginMutation.isPending}
                className="cursor-pointer w-full bg-black text-white rounded-xs py-2 px-6 mt-4 hover:bg-gray-700 transition-colors"
            >
                {loginMutation.isPending ? 'Logging in...' : 'Log in'}
            </button> 
        </form>
    );
}