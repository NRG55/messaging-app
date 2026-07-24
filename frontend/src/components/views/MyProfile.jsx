import { useSearchParams } from 'react-router';
import { ChevronLeft, Edit2 } from 'lucide-react'; 
import useAuth from '../../hooks/useAuth.js';
import EditProfileForm from '../forms/EditProfileForm.jsx';

export default function MyProfile() {
    const { user } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();    
   
    const isEditing = searchParams.get('edit') === 'true';
   
    if (isEditing) {
        return (
            <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 animate-fadeIn">
                <div className="flex justify-start">
                    <button
                        type="button"                       
                        onClick={() => setSearchParams({})}
                        className="cursor-pointer flex items-center gap-1 text-xs text-gray-400 hover:text-black transition-colors"
                    >
                        <ChevronLeft size={14} />
                        Back
                    </button>
                </div>
                
                <EditProfileForm onCancel={() => setSearchParams({})} />
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto border border-gray-200 rounded-xs p-6">            
            <div className="flex flex-col gap-6 border-b border-gray-100 pb-6 mb-6">               
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">                       
                        <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden">
                            {user?.avatarUrl && (
                                <img 
                                    src={user.avatarUrl} 
                                    alt="Profile avatar" 
                                    className="w-full h-full object-cover" 
                                />
                            )}
                        </div>

                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold text-gray-800">
                                {user?.username || ''}
                            </h2>
                            <p className="text-[10px] tracking-wider text-gray-400">
                                Personal Account
                            </p>
                        </div>
                    </div>                   

                    <button
                        type="button"                        
                        onClick={() => setSearchParams({ edit: 'true' })}
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 text-gray-800 text-xs tracking-wide border border-gray-200 hover:border-black rounded-xs transition-colors"
                    >
                        <Edit2 size={13} />

                        Edit Profile
                    </button>
                </div>
            </div>
          
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 border border-gray-100 p-4 rounded-xs">
                    <p className="text-[10px] font-bold tracking-wider text-gray-400">
                        BIO
                    </p>

                    <p className="text-sm text-gray-700 italic">
                        {user?.bio || 'No bio information yet.'}
                    </p>
                </div>              
            </div>
        </div>
    );
}