import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function useForm(apiSubmitFunction) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {       
        e.preventDefault();
        setErrors([]);
        setLoading(true);
       
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData.entries());
        
        try {            
            const data = await apiSubmitFunction(payload);
            
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }

            navigate('/');

        } catch (error) {
            if (error && error.responseData) {
                const data = error.responseData;
 
                if (data.errors) {
                    setErrors(data.errors);

                } else {                   
                    setErrors([{ msg: data.message || 'An unexpected error occurred.' }]);
                }

            } else {                
                console.error(`Submission error on ${apiSubmitFunction.name}:`, error);
                setErrors([{ msg: 'Cannot connect to server. Please try again later.' }]);
            }

        } finally {
            setLoading(false);
        }
    };

    return {
        handleSubmit,
        loading,
        errors,        
    };
}