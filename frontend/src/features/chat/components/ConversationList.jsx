import ChatItem from './ConversationItem';

export default function ConversationList({ chats }) {
    if (chats.length === 0) {
        return (
            <div className="flex-1 text-center text-xs italic text-grey-400">
                No conversations yet.
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
                <ChatItem key={chat.id} chat={chat} />
            ))}
        </div>
    );
}