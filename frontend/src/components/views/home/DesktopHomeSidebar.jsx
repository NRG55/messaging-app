import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getAllUsers } from '../../../api';
import UserList from '../../UserList';

export default function DesktopHomeSidebar() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();    
    const { userId } = useParams(); 

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await getAllUsers();

                if (data) {
                    setUsers(data);
                }

            } catch (error) {
                console.error('Failed to fetch users:', error);

            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col w-60 shrink-0 h-full bg-white border-r border-gray-200 overflow-hidden">
            <div className="p-4 font-bold">
                Users
            </div>

            <div className="flex-1 overflow-y-auto p-2">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <UserList 
                        users={users} 
                        selectedUserId={userId}                        
                        onUserClick={(user) => navigate(`/users/${user.id}`)}   
                    />
                )}
            </div>
        </div>
    );
}