import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function getMessages(consversationId) {
    return useQuery({
        queryKey: ['messages', consversationId],
        queryFn: () => fetch(`/api/messages?consversationId=${consversationId}`).then((res) => res.json()),
    });
}

export function createMessage(consversationId, text) {
    const body = JSON.stringify({ consversationId, text });

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => fetch('/api/messages', { method: 'POST', body }).then((r) => r.json()),
        onSuccess: (r) => {
            queryClient.invalidateQueries({ queryKey: ['messages', consversationId] });
        },
    });
}