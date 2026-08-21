import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router';
import { Send } from 'lucide-react';
import { useAuth } from '../../../auth/hooks';
import { useActiveChatDetails, useChatMessages, useSendMessageMutation } from '../../hooks';

export default function ActiveChatView() {
    const { chatId } = useParams();   
    const [messageText, setMessageText] = useState('');
    const messagesEndRef = useRef(null);
    
    const { user, isLoading: isAuthLoading } = useAuth();
    const { chat, isLoading: isChatLoading, isError: isChatError } = useActiveChatDetails(chatId);
    const { data: messages = [], isLoading: isMessagesLoading, isError: isMessagesError } = useChatMessages(chatId);
    const { mutate, isPending } = useSendMessageMutation(chatId);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    function handleSendMessage(event) {
        event.preventDefault();
        
        if (!messageText.trim() || isPending) {
            return;
        }
        
        mutate({
            chatId: chatId,
            text: messageText.trim(),
        }, {
            onSuccess: () => {
                setMessageText('');
            },
        });
    }

    if (isAuthLoading || isChatLoading || isMessagesLoading) {
        return <div> Loading... </div>;
    }

    if (isChatError || isMessagesError || !chat) {
        return  <div> Failed to display chat </div>;
    }

    const isGroup = chat.type === 'GROUP';   
    const memberCount = chat.members?.length || 0;

    const chatTitle = chat.name;
    const chatSubtitle = isGroup
        ? `${memberCount} ${memberCount === 1 ? 'member' : 'members'}`
        : 'Last activity placeholder...';

    return (
        <div className="flex-1 flex flex-col h-full bg-gray-50 overflow-hidden">
            <div className="h-14 flex items-center shrink-0 px-4 bg-white border-b border-gray-200">
                <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-gray-800 capitalize truncate">
                        {chatTitle}
                    </h3>

                    <p className="mt-0.5 text-[10px] text-gray-400">
                        {chatSubtitle}
                    </p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                {messages.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-xs text-gray-400 italic">
                        There are no messages in this chat yet.
                    </div>
                ) : (
                    messages.map((message) => {
                        const isMe = message.sender.id === user?.id;
                        const showSenderName = isGroup && !isMe;
                        const messageBubbleClasses = isMe 
                            ? 'self-end bg-gray-200 border rounded-2xl rounded-br-none border-gray-300'
                            : 'self-start bg-white border rounded-2xl rounded-bl-none border-gray-100';

                        return (
                            <div 
                                key={message.id} 
                                className={`flex flex-col max-w-[70%] p-3 shadow-xs ${messageBubbleClasses}`}
                            >
                                {showSenderName && (
                                    <span className="mb-0.5 text-[11px] capitalize text-blue-500 tracking-wide">
                                        {message.sender.username}
                                    </span>
                                )}

                                <p className="mt-0.5 text-sm text-gray-800 whitespace-pre-wrap wrap-break-words leading-relaxed">
                                    {message.text}
                                </p>

                                <span className="mt-1 text-[9px] text-gray-400 text-right">
                                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>);
                    })
                )}
                
                <div ref={messagesEndRef} />
            </div>

            <form 
                onSubmit={handleSendMessage}
                className="flex items-center gap-2 shrink-0 p-3 border-t border-gray-200 bg-white"
            >
                <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={isPending ? 'Sending message...' : 'Type your message...'}
                    disabled={isPending}
                    className="flex-1 px-4 py-2.5 text-sm text-gray-800 rounded-xs bg-gray-100 outline-none placeholder-gray-400 disabled:opacity-50 transition-all"
                />
                
                <button
                    type="submit"
                    disabled={isPending}
                    className="h-10 w-10 flex items-center justify-center shrink-0 text-white rounded-xs bg-gray-500 hover:bg-gray-600 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
                    aria-label="Send message"
                >
                    <Send className="h-4 w-4" />
                </button>
            </form>
        </div>
    );
}