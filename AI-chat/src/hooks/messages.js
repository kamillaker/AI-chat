import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useMessagesQuery(consversationId) {
    return useQuery({
        queryKey: ['messages', consversationId],
        queryFn: () => fetch(`/api/messages?consversationId=${consversationId}`).then((res) => res.json()),
    });
}

export function useMessagesMutation(consversationId, text) {
    const body = JSON.stringify({ consversationId, text });

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => fetch('/api/messages', { method: 'POST', body }).then((r) => r.json()),
        onMutate: () => {
            const newMessage = { id: 'temp', role: 'user', text };
            const queryKey = ['messages', consversationId];
            queryClient.setQueryData(queryKey, (old) => (old ? [...old, newMessage] : [newMessage]));
        },
        onSettled: () => {
            const queryKey = ['messages', consversationId];
            queryClient.invalidateQueries({ queryKey });
        },
    });
}