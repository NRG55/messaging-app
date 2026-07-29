import { useEffect, useRef, useState } from 'react';
import { createChatMessage, getPublicChat } from '../../api';
import { Send } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

export default function PublicChat() {
    const { user } = useAuth();   
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const bottomRef = useRef(null);

    useEffect(() => {
        async function fetchPublicChat() {
            try {
                const chatData = await getPublicChat();

                const formattedMessages = chatData.messages?.map((message) => ({
                    id: message.id,
                    text: message.text,
                    sender: user?.id && message.senderId === user.id ? 'Me' : 'Them',                    
                    username: message.sender?.username || 'User',
                    time: new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                })) || [];

                setMessages(formattedMessages);

            } catch (error) {
                console.error('Failed to fetch public chat:', error);

            } finally {
                setLoading(false);
            }
        }
       
        fetchPublicChat();
    }, [user?.id]);
    
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!user) {
            return;
        }

        const text = input.trim();

        if (!text) {
            return;
        }

        setInput('');

        try {       
            const createdMessage = await createChatMessage('publicChat', text);

            const formattedMessage = {
                id: createdMessage.id,
                text: createdMessage.text,
                sender: 'Me',
                username: user.username,
                time: new Date(createdMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            setMessages((prev) => [...prev, formattedMessage]);

        } catch (error) {
            console.error('Error delivering message:', error);
            setInput(text);
        }
    };

    if (loading) {
        return <div>Loading public chat...</div>;
    }

    return (
        <div className="flex flex-col h-full w-full max-w-2xl mx-auto">
            <div className="w-full p-4 border-b border-gray-200 flex font-bold text-start">
                Public Chat
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10 text-sm italic">
                        No messages yet.
                    </div>
                ) : (
                    messages.map((message) => (
                        <div 
                            key={message.id} 
                            className={`px-4 py-2 rounded-xl max-w-[75%] flex flex-col ${
                                message.sender === 'Me' 
                                    ? 'self-end bg-gray-700 text-white rounded-br-none' 
                                    : 'self-start bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                            }`}
                        >
                            {message.sender !== 'Me' && (
                                <span className="block text-[11px] text-gray-500 mb-0.5">
                                    {message.username}
                                </span>
                            )}

                            <p className="m-0 leading-relaxed wrap-break-words text-sm">
                                {message.text}
                            </p>

                            <span className="block self-end text-[10px] text-gray-400 mt-1 ">
                                {message.time}
                            </span>
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </div>

            <form 
                onSubmit={handleSendMessage} 
                className="flex items-center p-3 border-t border-gray-200 gap-2 shrink-0"
            >
                <input
                    type="text"
                    disabled={!user}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}                   
                    placeholder={user ? 'Type a message...' : 'Please log in to send a message...'}                    
                    className="flex-1 px-4 py-0 h-10 text-sm rounded-xs border border-gray-200 outline-none focus:border-black transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed disabled:placeholder-gray-400"
                />
                <button 
                    type="submit"                 
                    disabled={!user}                    
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 border border-gray-300 hover:bg-gray-50 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                >
                    <Send size={16} />
                </button>
            </form>
        </div>
    );
}