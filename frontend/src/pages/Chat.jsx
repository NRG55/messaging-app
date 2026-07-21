import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Send } from 'lucide-react';
import { getChat, createChat, createChatMessage } from '../api';

export default function Chat() {
    const { id: recipientId } = useParams();   
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [chat, setChat] = useState({
        id: null,
        recipient: { username: '', avatarUrl: '' },
        messages: [],
    });
    const navigate = useNavigate();
    const bottomRef = useRef(null); 

    useEffect(() => {
        const initializeChat = async () => {
            setLoading(true);

            try {
                let chatData = null;

                try {                
                    chatData = await getChat(recipientId);

                } catch (error) {               
                    if (error.responseData?.error === 'Chat not found.' || error.status === 404) {
                        chatData = await createChat(recipientId);

                    } else {                    
                        throw error;
                    }
                }
                
                const recipientData = chatData.participants?.find(({ user }) => user.id === recipientId)?.user;
                
                const formattedMessages = (chatData.messages || []).map((msg) => ({
                    id: msg.id,
                    text: msg.text,
                    sender: msg.senderId === recipientId ? 'Recipient' : 'Me',
                    time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }));

                setChat({
                    id: chatData.id,
                    recipient: {
                        username: recipientData?.username || 'User',
                        avatarUrl: recipientData?.avatarUrl || '',
                    },
                    messages: formattedMessages,
                });

            } catch (error) {
                console.error('Failed to initialize chat:', error);
                navigate(-1);

            } finally {
                setLoading(false);
            }
        };

        initializeChat();
    }, [recipientId, navigate]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [chat.messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        const messageText = input.trim();
       
        if (!messageText || !chat.id) {
            return;
        }
        
        setInput('');

        try {       
            const createdMessage = await createChatMessage(chat.id, messageText);

            const newMessage = {
                id: createdMessage.id,
                text: createdMessage.text,
                sender: 'Me',
                time: new Date(createdMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            setChat((prev) => ({
                ...prev,
                messages: [...prev.messages, newMessage],
            }));

        } catch (error) {
            console.error('Error delivering message:', error);

            setInput(messageText);
        }
    };

    if (loading) {
        return <div>Loading chat...</div>;
    }

    return (
        <div className="relative flex flex-col h-full w-full max-w-2xl mx-auto overflow-hidden bg-slate-50">            
            <header className="w-full px-4 py-3 bg-white border-b border-gray-200 shrink-0 h-13 flex items-center justify-between z-10">               
                <div className="flex justify-start min-w-18">
                    <button
                        type="button"                       
                        onClick={() => navigate(-1)}
                        className="cursor-pointer flex items-center gap-1 text-xs text-gray-400 hover:text-black transition-colors"
                    >
                        <ChevronLeft size={14} />
                        Back
                    </button>
                </div>
               
                <div className="flex items-center gap-2 max-w-[60%] overflow-hidden">                   
                    <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center font-bold text-gray-400 text-xs uppercase">
                        {chat.recipient.avatarUrl && (
                            <img src={chat.recipient.avatarUrl} alt="User avatar" className="w-full h-full object-cover" />
                        )}
                    </div>

                    <span className="text-sm font-semibold text-gray-800 truncate">
                        {chat.recipient.username || 'User'} {chat.id}
                    </span>
                </div>
               
                <div className="min-w-18" aria-hidden="true" />

            </header>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {chat.messages.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10 text-sm italic">
                        No messages yet. Start the conversation!
                    </div>
                ) : (
                    chat.messages.map((message) => (
                        <div 
                            key={message.id} 
                            className={`px-4 py-2 rounded-xl max-w-[75%] ${
                                message.sender === 'Me' 
                                    ? 'self-end bg-gray-700 text-white rounded-br-sm' 
                                    : 'self-start bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                            }`}
                        >
                            <p className="m-0 leading-relaxed wrap-break-words">
                                {message.text}

                            </p>

                            <span className="text-[10px] opacity-75 float-right mt-1">
                                {message.time}
                            </span>
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center p-3 bg-white border-t border-gray-200 gap-2 shrink-0 pb-safe z-10">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."                   
                    className="flex-1 px-4 py-0 h-10 rounded-xs border border-gray-200 outline-none focus:border-black transition-colors"
                />
                <button 
                    type="submit"                   
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 border border-gray-300 hover:bg-gray-200"
                    aria-label="Send message"
                >
                    <Send size={16} />
                </button>
            </form>
        </div>
    );
}
                    
