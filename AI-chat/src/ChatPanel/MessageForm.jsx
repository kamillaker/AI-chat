'use client';
import { useState } from 'react';
import { createMessage } from '../api/messages';

function MessageForm({ conversationID }) {
    const [input, setInput] = useState('');
    const [counter, setCounter] = useState(0);

    const mutation = createMessage(conversationID, input);

    function onSubmit(event) {
        event.preventDefault();
        mutation.mutate();
        setInput('');
        setCounter(counter + 1);
        console.log(`Form submitted ${counter} times`);
    }

    return (
        <form className="p-4 flex" onSubmit={onSubmit}>
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Type your message here..."
                    className="w-full p-2 border"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
            <div>
                <button type="submit" className="mx-2 p-2 bg-gray-800" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Loading...' : 'Send'}
                </button>
            </div>
        </form>
    );
}

export default MessageForm;