import { X, Users, UserPlus } from 'lucide-react';
import { useRef } from 'react';

export default function GroupProfileModal({ isOpen, onClose, groupData, onTriggerUserProfile }) {
    // Ref to keep group info visible during the close slide animation before it becomes null
    const groupDataRef = useRef(null);

    if (groupData) {
        groupDataRef.current = groupData;
    }
   
    const group = groupData || groupDataRef.current || {};

    return (
        <div 
            onClick={onClose}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity duration-300
                ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`flex flex-col p-3 bg-white duration-300 ease-in-out transition-all
                    fixed inset-y-0 left-0 h-full w-full
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                    md:static md:w-full md:max-w-md md:h-[65vh] md:rounded-xs md:shadow-xs md:overflow-hidden md:translate-x-0
                    ${isOpen ? 'md:translate-y-0' : 'md:translate-y-40'}`}
            >                
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close group profile"
                        className="cursor-pointer p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto flex flex-col p-3 gap-3">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden">
                            {group.avatarUrl ? (
                                <img
                                    src={group.avatarUrl}
                                    alt="Group avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-linear-to-tr from-green-700 to-green-800">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                            )}
                        </div>

                        <h3 className="text-sm font-semibold text-gray-800 capitalize">
                            {group.name}
                        </h3>

                        <p className="text-[11px] text-gray-400">
                            {group.members?.length || 0} members
                        </p>
                    </div>

                    <div className="max-h-60 flex flex-col overflow-y-auto divide-y divide-gray-100">
                        <button 
                            type="button"
                            className="w-full flex items-center gap-3 py-1.5 px-2 text-left hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                            <div className="w-7 h-7 flex items-center justify-center rounded-full">
                                <UserPlus className="w-4 h-4 text-blue-500" />
                            </div>

                            <span className="text-xs text-blue-500 font-medium flex-1">
                                Add Members
                            </span>
                        </button>

                        {group.members?.map((member) => (
                            <GroupMemberButton
                                key={member.id}
                                member={member}
                                onClick={() => onTriggerUserProfile(member)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function GroupMemberButton({ member, onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-3 py-1.5 px-2 text-left hover:bg-gray-50 cursor-pointer transition-colors"
        >
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 overflow-hidden">
                {member.avatarUrl ? (
                    <img 
                        src={member.avatarUrl}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    member.username ? (
                        <span className="w-full h-full flex items-center justify-center text-[11px] font-bold text-gray-600 uppercase">
                            {member.username.charAt(0)}
                        </span>
                    ) : (
                        <User className="w-3.5 h-3.5 text-gray-400" />
                    )
                )}
            </div>
            
            <span className="flex-1 text-xs text-gray-700 capitalize truncate">
                {member.username}
            </span>
        </button>
    );
}