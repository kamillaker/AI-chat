import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const queryKey = ['conversations'];

export function useConversationsQuery() {
    return useQuery({
        queryKey,
        queryFn: () => fetch('/api/conversations').then((res) => res.json()),
    });
}

export function useConversationsMutation(title) {
    const router = useRouter();
    const body = JSON.stringify({ title });
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () =>
            fetch('/api/conversations', { method: 'POST', body }).then((r) =>
                r.json()
            ),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });
            const previous = queryClient.getQueryData(queryKey);
            const newConversation = { id: 'temp', title };
            queryClient.setQueryData(queryKey, (old) =>
                old ? [newConversation, ...old] : [newConversation]
            );
            return { previous };
        },
        onSuccess: async (r) => {
            await queryClient.invalidateQueries({ queryKey });
            router.push(`/chats/${r.id}`);
        },
        onError: (_err, context) => {
            queryClient.setQueryData(queryKey, context?.previous);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey });
        },
    });
}


export function useDeleteConversation() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (id) =>
            fetch(`/api/conversations?id=${id}`, {
                method: 'DELETE',
            }).then((r) => r.json()),

        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey });
            const previous = queryClient.getQueryData(queryKey);

            const newConversations = previous?.filter(
                (c) => c.id !== id
            );

            queryClient.setQueryData(queryKey, newConversations);

            return { previous };
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey });
            router.refresh();
        },

        onError: (_err, _id, context) => {
            queryClient.setQueryData(queryKey, context?.previous);
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey });
        },
    });
}