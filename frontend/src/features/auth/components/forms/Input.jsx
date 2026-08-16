export default function Input({ type = 'text', name, value, placeholder, className = '', ...rest }) {
    return (
        <label className="relative block w-full">
            <span className="sr-only">{placeholder}</span>

            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                {...rest}                
                className={`w-full rounded-xs px-4 py-2 bg-gray-100 placeholder:text-gray-400 
                           transition-all focus:bg-transparent focus:outline focus:outline-black ${className}`}
            />
        </label>
    );
}