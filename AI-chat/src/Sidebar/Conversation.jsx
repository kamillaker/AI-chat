'use client';
import { useRouter } from 'next/navigation';
import { deleteConversation } from '../api/conversations';

function Conversation({ id, title, isActive }) {
    const router = useRouter();
    const mutation = deleteConversation();

    function onDelete(e) {
        e.preventDefault();
        mutation.mutate(id, {
            onSuccess: () => {
                if (isActive) router.push('/');
            },
        });
    }

    return (
        <div className={`flex items-center justify-between rounded-lg p-2 my-1 ${isActive ? 'bg-gray-700' : ''}`}>
            <span className="flex-1 truncate">{title}</span>
            <button
                onClick={onDelete}
                disabled={mutation.isPending}
                className="ml-2 text-gray-400 hover:text-red-400 text-sm"
            >
                ✕
            </button>
        </div>
    );
}

export default Conversation;