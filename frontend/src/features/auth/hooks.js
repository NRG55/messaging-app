import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUser, loginUser, logoutUser, fetchCurrentUser } from './api';

const AUTH_QUERY_KEY = ['auth', 'current-user'];

export function useAuth() {
    const { data: user, isLoading, isError } = useQuery({
        queryKey: AUTH_QUERY_KEY,
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

export function useRegisterMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: registerUser,
        onSuccess: (newUserData) => {
            queryClient.setQueryData(AUTH_QUERY_KEY, newUserData);
        },
    });
}

export function useLoginMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (userData) => {
            queryClient.setQueryData(AUTH_QUERY_KEY, userData);
        },
    });
}

export function useLogoutMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.setQueryData(AUTH_QUERY_KEY, null);
            queryClient.clear();
        },
    });
}