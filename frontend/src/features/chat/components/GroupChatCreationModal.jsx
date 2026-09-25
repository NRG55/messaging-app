import { useRef, useState } from 'react';
import { Search, Check, Camera } from 'lucide-react';
import { formatLastConversationDate } from '../../../utils/date';

export default function GroupChatCreationModal({ isOpen, onClose, allUsers = [], onCreateGroup }) {
    const [panel, setPanel] = useState('DETAILS'); // panel DETAILS (group name and avatar), panel MEMBERS (group members selection)
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const fileInputRef = useRef(null);

    const filteredUsers = allUsers.filter(user => user.username?.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }
        
        const previewUrl = URL.createObjectURL(file);

        setPreviewAvatar(previewUrl);
        setAvatarFile(file);
    };

    const toggleUserSelection = (userId) => {
        setSelectedUserIds(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!groupName.trim() || selectedUserIds.length === 0) {
            return;
        }

        onCreateGroup(groupName.trim(), selectedUserIds, avatarFile);
        handleCloseModal();
    };

    const handleBackToDetailsPanel = () => {
        setSearchTerm('');
        setSelectedUserIds([]);
        setPanel('DETAILS');
    };

    const handleCloseModal = () => {
        onClose();
        // Wait for slide-down animation
        setTimeout(() => {
            setSearchTerm('');
            setSelectedUserIds([]);
            setGroupName('');
            setPanel('DETAILS');
            setPreviewAvatar(null);
            setAvatarFile(null);
        }, 300);
    };

    return (
        <div 
            onClick={handleCloseModal}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out
                ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-md flex flex-col rounded-xs shadow-xs bg-white overflow-hidden transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
                {/* PANEL 1: Group name and picture */}
                {panel === 'DETAILS' && (
                    <div className="flex flex-col h-full bg-white">
                        <header className="flex items-center px-4 py-3">
                            <h2 className="text-sm font-semibold text-gray-800 tracking-wide">
                                New Group
                            </h2>
                        </header>
                       
                        <div className="flex items-center gap-4 p-5">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                aria-label="Set group profile picture"
                                className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 bg-gray-100 shadow-xs shrink-0 cursor-pointer overflow-hidden"
                            >
                                {previewAvatar ? (
                                    <img 
                                        src={previewAvatar}
                                        alt="Group profile picture preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Camera className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                            
                            <input
                                type="text"
                                placeholder="Enter group name..."
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                maxLength={50}
                                className="w-full border-b border-gray-200 py-2 px-1 text-sm text-gray-800 font-medium outline-none placeholder-gray-400 focus:border-gray-500 transition-colors"
                            />

                        </div>
                       
                        <div className="flex justify-end gap-2 p-3">
                            <button 
                                type="button"
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xs cursor-pointer transition-colors"
                            >
                                Cancel
                            </button>
            
                            <button
                                type="button"
                                onClick={() => setPanel('MEMBERS')}
                                disabled={!groupName.trim()}
                                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xs disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* PANEL 2: Members selection */}
                {panel === 'MEMBERS' && (
                    <div className="flex flex-col h-150 bg-white">
                        <header className="px-4 py-3">
                            <h2 className="inline-block text-sm font-semibold text-gray-800">
                                Add members
                            </h2>

                            <span className="block text-[10px] text-gray-400">
                                {selectedUserIds.length} selected
                            </span>
                        </header>

                        <div className="px-3 pb-3 border-b border-gray-100">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    placeholder="Search members..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 rounded-xs bg-gray-100 outline-none border border-transparent transition-colors focus:bg-white focus:border-gray-200"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto flex flex-col">
                            {filteredUsers.length === 0 ? (
                                <div className="p-8 text-center text-xs text-gray-400 italic">
                                    No matching users
                                </div>
                            ) : (
                                filteredUsers.map((user) => {
                                    const isSelected = selectedUserIds.includes(user.id);

                                    return (
                                        <button
                                            key={user.id}
                                            onClick={() => toggleUserSelection(user.id)}
                                            className="w-full flex items-center justify-between px-4 py-2.5 text-left border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="shrink-0">
                                                    {user.avatarUrl ? (
                                                        <img
                                                            src={user.avatarUrl}
                                                            alt={user.username}
                                                            className="w-10 h-10 rounded-full object-cover border border-gray-100"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 font-semibold text-sm uppercase bg-gray-100">
                                                            {user.username?.charAt(0) || <User className="w-4 h-4 text-gray-400" />}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="min-w-0">
                                                    <h4 className="text-sm font-medium text-gray-800 truncate capitalize">
                                                        {user.username}
                                                    </h4>

                                                    <span className="text-xs text-gray-400">
                                                        last seen {formatLastConversationDate(user.lastSeen)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className={`w-5 h-5 flex items-center justify-center rounded-full border transition-all duration-150 shrink-0
                                                ${isSelected ? 'bg-green-600 border-green-600 text-white' : 'border-gray-300 bg-white'}`}
                                            >
                                                {isSelected && <Check className="w-3 h-3" />}
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                        <div className="flex justify-end gap-2 p-3 border-t border-gray-100 shrink-0">
                            <button
                                type="button"
                                onClick={handleBackToDetailsPanel}
                                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xs cursor-pointer transition-colors"
                            >
                                Cancel
                            </button>
            
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={selectedUserIds.length === 0}
                                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-40 cursor-pointer transition-opacity"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}