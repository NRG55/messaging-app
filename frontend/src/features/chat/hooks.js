import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    getOrCreateDirectChat,
    createGroupChat,
    fetchUserChats,
    sendChatMessage,
    fetchChatMessages,
    addGroupMembers } from './api';

export function useUserChats() {
    return useQuery({
        queryKey: ['chats', 'list'],
        queryFn: fetchUserChats,
    });
}

export function useActiveChatDetails(chatId) {
    const { data: chats = [], isLoading, isError } = useUserChats();
    const chat = chats.find((chat) => chat.id === chatId);

    return { chat, isLoading, isError };
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

export function useAddGroupMembersMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addGroupMembers,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chats', 'list'] });
        },
    });
}