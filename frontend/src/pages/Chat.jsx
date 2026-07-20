import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Send } from 'lucide-react';
import { getChat, createChat, getChatMessages, createChatMessage } from '../api';

export default function Chat() {
    const { id: recipientId } = useParams();
    const navigate = useNavigate();    
    const [recipient, setRecipient] = useState({ username: '', avatarUrl: '' });
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [chatId, setChatId] = useState(null);

    useEffect(() => {
        const initializeChat = async () => {
            setLoading(true);

            try {
                let chat = null;

                try {                
                    chat = await getChat(recipientId);

                } catch (error) {               
                    if (error.responseData?.error === 'Chat not found.' || error.status === 404) {
                        chat = await createChat(recipientId);

                    } else {                    
                        throw error;
                    }
                }
                
                const recipientData = chat.participants.find(({ user }) => user.id === recipientId)?.user;

                if (recipientData) {
                    setRecipient({
                        username: recipientData.username || 'User',
                        avatarUrl: recipientData.avatarUrl || '',
                    });
                }

                setChatId(chat.id);           

                const existingMessages = await getChatMessages(chat.id);

                const formattedMessages = existingMessages.map((msg) => ({
                    id: msg.id,
                    text: msg.text,
                    sender: msg.senderId === recipientId ? 'Recipient' : 'Me',
                    time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }));

                setMessages(formattedMessages);

            } catch (error) {
                console.error('Failed to initialize chat:', error);
                navigate(-1);

            } finally {
                setLoading(false);
            }
        };

        initializeChat();
    }, [recipientId, navigate]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        const messageText = input.trim();
       
        if (!messageText || !chatId) {
            return;
        }
        
        setInput('');

        try {       
            const createdMessage = await createChatMessage(chatId, messageText);

            const newMessage = {
                id: createdMessage.id,
                text: createdMessage.text,
                sender: 'Me',
                time: new Date(createdMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            setMessages((prev) => [...prev, newMessage]);

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
                        {recipient.avatarUrl && (
                            <img src={recipient.avatarUrl} alt="User avatar" className="w-full h-full object-cover" />
                        )}
                    </div>

                    <span className="text-sm font-semibold text-gray-800 truncate">
                        {recipient.username || 'User'} {chatId}
                    </span>
                </div>
               
                <div className="min-w-18" aria-hidden="true" />

            </header>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10 text-sm italic">
                        No messages yet. Start the conversation!
                    </div>
                ) : (
                    messages.map((message) => (
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
                <div />
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
                    
