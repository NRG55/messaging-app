import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createGroupChat, fetchChatMessages, fetchUserChats, getOrCreateDirectChat, sendChatMessage } from './api';

export function useUserChats() {
    return useQuery({
        queryKey: ['chats', 'list'],
        queryFn: fetchUserChats,
    });
}

export function useChatMessages(chatId) {
    return useQuery({
        queryKey: ['chats', 'messages', chatId],
        queryFn: () => fetchChatMessages(chatId),
        enabled: !!chatId,
    });
}

export function useGetOrCreateDirectChatMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: getOrCreateDirectChat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chats', 'list'] });
        },
    });
}

export function useCreateGroupChatMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createGroupChat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chats', 'list'] });
        },
    });
}

export function useSendMessageMutation(chatId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sendChatMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chats', 'messages', chatId] });
        },
    });
}