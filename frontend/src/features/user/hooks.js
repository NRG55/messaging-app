import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCurrentUser, fetchAllUsers, updateCurrentUserProfile } from './api';

export const USER_QUERY_KEYS = {
    currentUser: ['user', 'current'],
    usersList: ['users', 'list'],
};

export function useCurrentUser() {
    const { data: user, isLoading, isError } = useQuery({
        queryKey: USER_QUERY_KEYS.currentUser,
        queryFn: fetchCurrentUser,
        retry: false,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });

    return {
        user,
        isLoading,
        isAuthenticated: !!user && !isError,
    };
}

export function useAllUsers() {
    return useQuery({
        queryKey: ['users', 'list'],
        queryFn: fetchAllUsers,
    });
}

export function useUpdateProfileMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCurrentUserProfile,
        onSuccess: (updatedUserData) => {
            queryClient.setQueryData(USER_QUERY_KEYS.currentUser, updatedUserData);
        },
    });
}