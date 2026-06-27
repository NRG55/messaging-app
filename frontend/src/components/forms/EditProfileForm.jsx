
import { useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth.js';
import Input from '../Input.jsx';
import { updateUserProfile, uploadImageToCloudinary } from '../../api';
import useForm from '../../hooks/useForm.js';
import { Camera } from 'lucide-react';

export default function EditProfileForm() {
    const { user, updateUser } = useAuth();
    const [bioCharactersCount, setBioCharactersCount] = useState(user?.bio?.length || 0);
    const [avatarFile, setAvatarFile] = useState(null);

    const fileInputRef = useRef(null);

    const { submitForm, isSubmitting, errors } = useForm(updateUserProfile);

    const handleSubmit = async (e) => {        
        e.preventDefault();
        
        try {             
            let avatarUrl = user?.avatarUrl || '';
            
            if (avatarFile) {
                const cloudinaryData = await uploadImageToCloudinary(avatarFile);

                if (cloudinaryData.secure_url) {
                    avatarUrl = cloudinaryData.secure_url;
                    e.target.elements.avatarUrl.value = avatarUrl; 
                }
            }
            
            const data = await submitForm(e);
        
            if (data && data.user) {
                updateUser(data.user);
                setAvatarFile(null);
            }

        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };    

    return (
        <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xs p-6">
            {errors && errors.length > 0 && errors.map((error, index) => (
                <p key={'error-' + index} className="mb-4 text-red-400">
                    {error.msg}
                </p>
            ))}
                
            <div className="border-b border-gray-100 pb-4 mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                    Edit Profile
                </h3>                
            </div>            
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">               
                <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-wider text-gray-400">
                        Avatar
                    </label>
                    
                    <div className="flex items-center gap-4">
                        <input 
                            type="file"
                            ref={fileInputRef}
                            disabled={isSubmitting}
                            onChange={(e) => setAvatarFile(e.target.files[0])}
                            accept="image/*"
                            className="hidden"
                        />

                        <input 
                            type="hidden" 
                            name="avatarUrl" 
                            value={avatarFile ? URL.createObjectURL(avatarFile) : (user?.avatarUrl || '')} 
                        />

                        <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => fileInputRef.current?.click()}
                            className="group relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer border border-gray-100 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none transition-all"
                            aria-label="Change profile picture"
                        >
                               
                            <img 
                                src={
                                    avatarFile === null 
                                        ? user.avatarUrl
                                        : URL.createObjectURL(avatarFile)
                                }
                                alt="Profile avatar" 
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
                                <Camera size={18} className="text-white" />
                                <span className="text-[10px] font-bold text-white tracking-wide">
                                    Edit
                                </span>
                            </div>
                        </button>                        
                    </div>
                </div>
               
                <div className="flex flex-col gap-1.5">
                    <label 
                        htmlFor="username" 
                        className="text-xs tracking-wider text-gray-400"
                    >
                        Username
                    </label>
                    
                    <Input
                        type="text" 
                        id="username"
                        name="username" 
                        required 
                        defaultValue={user?.username || ''}
                        placeholder="Enter your username"                        
                    />                    
                </div>
                
                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center w-full">
                        <label 
                            htmlFor="bio" 
                            className="text-xs tracking-wider text-gray-400"
                        >
                            Bio
                        </label>
                       
                        <span className={`text-xs font-medium ${bioCharactersCount > 150 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                            {bioCharactersCount} / 160
                        </span>
                    </div>

                    <textarea 
                        id="bio"
                        name="bio" 
                        rows={4}
                        maxLength={160}
                        defaultValue={user?.bio || ''}
                        onChange={(e) => setBioCharactersCount(e.target.value.length)}
                        placeholder="Tell a little bit about yourself..."
                        className="w-full rounded-xs px-4 py-2 bg-gray-100 
                                placeholder:text-gray-400 
                                focus:bg-transparent focus:outline focus:outline-black resize-none transition-colors"
                    />
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4 mt-2">
                    <button 
                        type="button"
                        className="cursor-pointer text-black border border-black rounded-xs py-1 px-3 hover:text-gray-600 hover:border-gray-600 transition-colors"
                    >
                        Cancel
                    </button>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer bg-black text-white rounded-xs py-1 px-3 hover:bg-gray-700 transition-colors disabled:bg-gray-400"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
}