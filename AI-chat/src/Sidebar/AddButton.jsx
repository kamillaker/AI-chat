'use client';
import { createConversation } from '../api/conversations';

function AddConversationButton() {
    const mutation = createConversation('New Conversation');
    return (
        <button
            className="w-full bg-red-500 hover:bg-red-600 p-3 my-1"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
        >
            {mutation.isPending ? 'Loading...' : '+ New Chat'}
        </button>
    );
}

export default AddConversationButton;