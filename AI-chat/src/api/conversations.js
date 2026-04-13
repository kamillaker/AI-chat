import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export function getConversations() {
    return useQuery({
        queryKey: ['conversations'],
        queryFn: () => fetch('/api/conversations').then((res) => res.json()),
    });
}

export function createConversation(title) {
    const body = JSON.stringify({ title });
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => fetch('/api/conversations', { method: 'POST', body }).then((r) => r.json()),
        onSuccess: (r) => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] }).then(() => {
                redirect(`/chats/${r.id}`);
            });
        },
    });
}