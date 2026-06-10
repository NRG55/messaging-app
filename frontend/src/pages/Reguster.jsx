import AuthForm from '../components/AuthForm';

export default function Register() {
    const errors = [];
    
    const handleRegister = async () => {
        console.log('Register');
    };

    return (
        <div className="flex min-h-screen w-screen items-center justify-center px-4">
            <AuthForm
                type="register"
                onSubmit={handleRegister}
                errors={errors} 
            />
        </div>
    );
};
