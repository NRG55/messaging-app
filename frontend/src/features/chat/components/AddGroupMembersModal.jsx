import { useState } from 'react';
import { useAllUsers } from '../../user/hooks';
import { useAddGroupMembersMutation, useUserChats } from '../hooks';
import UserSelectionList from '../../user/components/UserSelectionList';

export default function AddGroupMembersModal({ isOpen, onClose, chatId }) {
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    const { data: allUsers = [] } = useAllUsers();
    const { data: allChats = [] } = useUserChats();
    const { mutate: addMembers, isPending: isAdding } = useAddGroupMembersMutation();

    const group = allChats.find(chat => chat.id === chatId);
    const existingMemberIds = group?.members?.map(member => member.id) || [];

    const toggleUserSelection = (userId) => {
        setSelectedUserIds(prev => 
            prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId],
        );
    };

    const handleClose = () => {
        setSelectedUserIds([]);
        onClose();
    };

    const handleSubmit = () => {
        if (!group?.id || selectedUserIds.length === 0) {
            return;
        }

        addMembers({ chatId: group.id, newMembersIds: selectedUserIds },
            {
                onSuccess: () => {
                    handleClose();
                },
            },
        );
    };

    return (
        <div 
            onClick={handleClose}            
            className={`fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity duration-100 ease-out
                ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >            
            <div
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-md h-150 flex flex-col p-3 bg-white rounded-xs shadow-xs transition-all duration-100 ease-out
                    ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            >
                <header className="flex flex-col mb-3">
                    <h2 className="text-sm font-semibold text-gray-800">
                        Add Members
                    </h2>

                    <span className="block text-[10px] text-gray-400">
                        {selectedUserIds.length} selected
                    </span>
                </header>
                
                <UserSelectionList
                    allUsers={allUsers}
                    selectedUserIds={selectedUserIds}
                    excludeUserIds={existingMemberIds}
                    onToggleUserSelection={toggleUserSelection}
                />

                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                    <button 
                        type="button" 
                        onClick={handleClose} 
                        className="px-4 py-2 text-xs font-semibold text-gray-600 rounded-xs cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>

                    <button 
                        type="button" 
                        onClick={handleSubmit} 
                        disabled={isAdding || selectedUserIds.length === 0} 
                        className="px-4 py-2 text-xs font-semibold text-gray-600 rounded-xs cursor-pointer hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}