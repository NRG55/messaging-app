import { useEffect, useRef } from 'react';
import { useChatMessages } from '../hooks';
import ActiveChatMessage from './ActiveChatMessage';

export default function ActiveChatMessages({ chatId, currentUserId, chatType }) {
    const messagesEndRef = useRef(null);
    const isInitialLoadRef = useRef(false);

    const { data: messages = [], isLoading, isError } = useChatMessages(chatId);

    useEffect(() => {
        isInitialLoadRef.current = false;
    }, [chatId]);

    useEffect(() => {
        if (isLoading || messages.length === 0) {
            return;
        }

        messagesEndRef.current?.scrollIntoView({
            behavior: isInitialLoadRef.current ? 'smooth' : 'auto',
            block: 'end',
        });

        isInitialLoadRef.current = true;
    }, [messages, isLoading]);

    if (isLoading) {
        return <div className="flex-1">Loading messages...</div>;
    }

    if (isError) {
        return <div className="flex-1">Failed to load messages</div>;
    }

    return (
        <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="flex flex-col gap-2 p-4">
                {messages.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center text-xs italic text-gray-400">
                        There are no messages in this chat yet.
                    </div>
                ) : (
                    messages.map((message) => (
                        <ActiveChatMessage
                            key={message.id}
                            message={message}
                            currentUserId={currentUserId}
                            chatType={chatType}
                            onImageLoad={() => {
                                messagesEndRef.current?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'end',
                                });
                            }}
                        />
                    ))
                )}
            </div>

            <div ref={messagesEndRef} />
        </div>
    );
}