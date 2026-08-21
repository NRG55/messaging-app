import { useRegisterMutation } from '../../hooks';
import Input from './Input';
import PasswordInput from './PasswordInput';

export default function RegisterForm() {
    const { mutate, isPending, isError, error } = useRegisterMutation();    

    function handleSubmit(event) {
        event.preventDefault();
        
        const formData = Object.fromEntries(new FormData(event.currentTarget));

        mutate(formData);
    }
    
    const fieldErrors = isError ? (error?.responseData?.errors || {}) : {};    
    const hasFieldErrors = Object.keys(fieldErrors).length > 0;

    const globalErrorMessage = (isError && !hasFieldErrors) ? error?.message : '';
    const showGlobalErrorMessage = isError && !hasFieldErrors && !!globalErrorMessage;

    return (
        <form onSubmit={handleSubmit} className="w-[80%] max-w-100">
            <div className={`min-h-5 text-center text-xs mb-2 transition-all duration-150 ${showGlobalErrorMessage ? 'text-red-500 opacity-100' : 'opacity-0 select-none pointer-events-none'}`}>
                {globalErrorMessage || ''}
            </div>

            <div className="flex flex-col gap-1">
                <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    disabled={isPending}
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
                    disabled={isPending}
                />

                <span className={`text-xs text-red-500 pl-1 min-h-4 transition-opacity duration-150 ${fieldErrors.password ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                    {fieldErrors.password || ''}
                </span>
            </div>

            <div className="flex flex-col gap-1">
                <PasswordInput
                    name="passwordConfirmation"
                    placeholder="Confirm password"
                    required
                    disabled={isPending}
                />

                <span className={`text-xs text-red-500 pl-1 min-h-4 transition-opacity duration-150 ${fieldErrors.passwordConfirmation ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                    {fieldErrors.passwordConfirmation || ''}
                </span>
            </div>              

            <button
                type="submit"
                disabled={isPending}
                className="cursor-pointer w-full bg-black text-white rounded-xs py-2 px-6 mt-6 hover:bg-gray-700 transition-colors"                
            >
                {isPending ? 'Creating Account...' : 'Sign up'}
            </button>
        </form>
    );
}