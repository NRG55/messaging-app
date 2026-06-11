import { useState } from 'react';

export default function PasswordInput({ name = 'password', value, placeholder = 'Password', ...rest }) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <label className="relative block w-full mb-4">
            <span className="sr-only">{placeholder}</span>

            <input
                type={passwordVisible ? 'text' : 'password'}
                name={name}
                value={value}
                placeholder={placeholder}
                {...rest}               
                className="w-full rounded-xs pl-4 pr-12 py-2 bg-gray-100 placeholder:text-gray-400 
                           transition-all focus:bg-transparent focus:outline focus:outline-black"
            />

            <button
                type="button"
                onClick={() => setPasswordVisible((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black flex items-center justify-center cursor-pointer p-1"
            >
                <i className={`fi fi-rr-eye${!passwordVisible ? '-crossed' : ''}`} />
            </button>
        </label>
    );
}