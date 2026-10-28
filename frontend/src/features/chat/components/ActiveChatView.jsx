import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useCurrentUser } from '../../user/hooks';
import { useActiveChatDetails, useMarkChatAsReadMutation, useSendMessageMutation } from '../hooks';
import ActiveChatHeader from './ActiveChatHeader';
import ActiveChatMessages from './ActiveChatMessages';
import ActiveChatMessageInput from './ActiveChatMessageInput';

export default function ActiveChatView() {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const { user, isLoading: isAuthLoading } = useCurrentUser();
    const { chat, isLoading: isChatLoading, isError: isChatError } = useActiveChatDetails(chatId);

    const { mutate: sendMessage, isPending: isSendingMessage } = useSendMessageMutation(chatId);
    const { mutate: markChatAsRead } = useMarkChatAsReadMutation();
    
    useEffect(() => {
        if (chatId) {
            markChatAsRead(chatId);
        }
    }, [chatId, markChatAsRead]);

    function handleSendMessage(formData, mutationOptions) {
        formData.append('chatId', chatId);

        sendMessage(formData, mutationOptions);
    }

    function handleBackClick() {
        navigate(searchParams.get('from') === 'users' ? '/users' : '/');
    }

    if (isAuthLoading || isChatLoading) {
        return <div> Loading... </div>;
    }

    if (isChatError || !chat) {
        return  <div> Failed to display chat </div>;
    }

    return (
        <div className="relative flex-1 flex flex-col h-full bg-gray-50 overflow-hidden">
            <ActiveChatHeader
                chatData={chat}
                onBackClick={handleBackClick}
            />

            <ActiveChatMessages
                chatId={chatId}
                currentUserId={user?.id}
                chatType={chat.type}
            />

            <ActiveChatMessageInput
                chatId={chatId}
                onSend={handleSendMessage}
                isSendingMessage={isSendingMessage}
            />
        </div>
    );
}