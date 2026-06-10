import { useState } from 'react';

export default function Input({ type, name, value, placeholder, ...rest }) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword
        ? passwordVisible
            ? 'text'
            : 'password'
        : type;

    return (
        <label className="relative block w-full mb-4">
            <span className="sr-only">{placeholder}</span>

            <input
                type={inputType}
                name={name}
                value={value}
                placeholder={placeholder}
                {...rest}
                className={`w-full rounded-xs px-4 py-2 bg-gray-100 transition-all
                          placeholder:text-gray-400 
                            focus:bg-transparent focus:outline focus:outline-black 
                            ${isPassword ? 'pr-12' : ''}
                           `}
            />

            {isPassword && (
                <button
                    type="button"
                    onClick={() => setPasswordVisible((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black flex items-center justify-center cursor-pointer p-1"
                >
                    <i
                        className={`fi fi-rr-eye${!passwordVisible ? '-crossed' : ''}`}
                    />
                </button>
            )}
        </label>
    );
}
