import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { getUserProfile } from '../api';

export default function UserProfile() {
    const { id: userId } = useParams();
    const navigate = useNavigate();
    
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);   

    useEffect(() => {       
        const fetchTargetProfile = async () => {
            setLoading(true);

            try {
                const data = await getUserProfile(userId);

                if (data) {
                    setProfileData(data);
                }

            } catch (error) {
                console.error('Failed to load user profile:', error);
                navigate('/friends');

            } finally {
                setLoading(false);
            }
        };

        fetchTargetProfile();
    }, [userId, navigate]);
   
    const handleSendMessage = () => {
        console.log(`Send message to user with id: ${userId}`);
    };        

    const handleFriendRequest = () => {
        console.log(`Friend request to user with id: ${userId}`);       
    };

    if (loading) {
        return <div>Loading user profile...</div>;
    }

    if (!profileData) {
        return <div>User profile not found.</div>;
    }

    return (
        <div className="w-full max-w-2xl mx-auto border border-gray-200 rounded-xs p-6">
            <div className="flex justify-start mb-4">
                <button
                    type="button"                       
                    onClick={() => navigate(-1)}
                    className="cursor-pointer flex items-center gap-1 text-xs text-gray-400 hover:text-black transition-colors"
                >
                    <ChevronLeft size={14} />
                    Back
                </button>
            </div>

            <div className="flex flex-col gap-6 border-b border-gray-100 pb-6 mb-6">               
                <div className="flex flex-col justify-between gap-4 w-full">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden">
                            {profileData?.avatarUrl && (
                                <img 
                                    src={profileData.avatarUrl} 
                                    alt="Profile avatar" 
                                    className="w-full h-full object-cover" 
                                />
                            ) }
                        </div>

                        <h2 className="text-xl font-bold text-gray-800">
                            {profileData?.username || ''}                            
                        </h2>
                    </div>                    

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleSendMessage}
                            className="cursor-pointer px-4 py-2 text-xs font-bold text-white tracking-wide bg-black hover:bg-gray-700 border border-black rounded-xs transition-colors"
                        >
                            Send Message
                        </button>

                        <button
                            type="button"
                            onClick={handleFriendRequest}
                            className="cursor-pointer px-4 py-2 text-xs tracking-wide text-gray-800 border border-gray-200 hover:border-black rounded-xs transition-colors"
                        >                           
                            Send Friend Request
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 border border-gray-100 p-4 rounded-xs bg-gray-50/50">
                    <p className="text-[10px] font-bold tracking-wider text-gray-400">
                        BIO
                    </p>
                    <p className="text-sm text-gray-700 italic">
                        {profileData?.bio || 'No bio information yet.'}
                    </p>
                </div>              
            </div>
        </div>
    );
}