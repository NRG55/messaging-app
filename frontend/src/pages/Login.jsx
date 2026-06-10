import AuthForm from '../components/AuthForm';

export default function Login() {
    const errors = [];

    const handleLogin = async () => {
        console.log('Log in');
    };

    return (
        <div className="flex min-h-screen w-screen items-center justify-center px-4">
            <AuthForm
                type="login"
                onSubmit={handleLogin}
                errors={errors} 
            />
        </div>
    );
};
