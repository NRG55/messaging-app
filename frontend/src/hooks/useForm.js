import { useState } from 'react';

export default function useForm(apiSubmitFunction) {
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const submitForm = async (e) => {       
        e.preventDefault();
        setErrors([]);
        setLoading(true);
       
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData.entries());
        
        try {            
            const data = await apiSubmitFunction(payload);

            return data;

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

            return null;

        } finally {
            setLoading(false);
        }
    };

    return {
        submitForm,
        loading,
        errors,        
    };
}