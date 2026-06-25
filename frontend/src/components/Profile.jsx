import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { ChevronLeft, Edit2 } from 'lucide-react'; 
import useAuth from '../hooks/useAuth.js';
import EditProfileForm from './forms/EditProfileForm.jsx';

export default function Profile() {
    const { user } = useAuth();
    const { id: profileId } = useParams(); 
 
    const [searchParams, setSearchParams] = useSearchParams();
    const isEditing = searchParams.get('edit') === 'true';
    
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);   
    
    const isOwnProfile = !profileId || String(user?.id) === String(profileId);

    useEffect(() => {       
        if (isOwnProfile) {
            setProfileData(user);
            return;
        }
       
        const fetchPublicProfile = async () => {
            setLoading(true);

            try {
                // TODO: api

            } catch (error) {
                console.error('Failed to load user profile', error);

            } finally {
                setLoading(false);
            }
        };

        fetchPublicProfile();
    }, [profileId, user, isOwnProfile]);
   
    const handleSendMessage = () => {
        console.log(`Send message ${profileId}`);
    };        

    const handleFriendRequest = () => {
        console.log(`Friend request ${profileId}`);       
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profileData) {
        return <div>User profile not found.</div>;
    }

    if (isEditing && isOwnProfile) {
        return (
            <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
                <div className="flex justify-start">
                    <button
                        type="button"                       
                        onClick={() => setSearchParams({})}
                        className="cursor-pointer flex items-center gap-1 px-3 py-1 text-sm text-gray-500 hover:text-black transition-colors"
                    >
                        <ChevronLeft size={14} />
                        Profile
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
                        <div className="w-20 h-20 rounded-full bg-black shrink-0"></div>

                        <h2 className="text-xl font-bold">
                            {profileData?.username || ''}                            
                        </h2>
                    </div>          
                    
                    {isOwnProfile && (
                        <button
                            type="button"                        
                            onClick={() => setSearchParams({ edit: 'true' })}
                            className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold text-xs tracking-wide px-4 py-2 rounded-xs cursor-pointer text-nowrap transition-colors"
                        >
                            <Edit2 size={13} />
                            Edit Profile
                        </button>
                    )}
                </div>
                
                {!isOwnProfile && (
                    <div className="flex flex-wrap items-center gap-2 w-full">
                        <button
                            type="button"
                            onClick={handleSendMessage}
                            className="bg-black hover:bg-gray-800 text-white font-bold text-xs tracking-wide px-4 py-2 rounded-xs cursor-pointer text-nowrap transition-colors"
                        >
                            Send Message
                        </button>

                        <button
                            type="button"
                            onClick={handleFriendRequest}
                            className="border border-gray-200 text-xs hover:text-gray-700 tracking-wide px-4 py-2 rounded-xs cursor-pointer text-nowrap transition-colors"
                        >                           
                            Send Friend Request
                        </button>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 border border-gray-100 p-4 rounded-xs">
                    <p className="text-xs font-bold tracking-wider text-gray-400">
                        Bio
                    </p>
                    
                    <p className="text-sm text-gray-700 font-medium leading-relaxed italic">
                        {profileData?.bio || 'No bio information yet.'}
                    </p>
                </div>              
            </div>
        </div>
    );
}