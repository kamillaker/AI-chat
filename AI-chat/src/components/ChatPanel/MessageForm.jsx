'use client';
import { useState } from 'react';

function MessageForm({ conversationId, sendMessage, isPending }) {
    const [input, setInput] = useState('');
    const [counter, setCounter] = useState(0);

    function onSubmit(event) {
        event.preventDefault();
        sendMessage({ text: input }, { body: { conversationId } });
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
                <button type="submit" className="mx-2 p-2 bg-gray-800" disabled={isPending}>
                    {isPending ? 'Loading...' : 'Send'}
                </button>
            </div>
        </form>
    );
}

export default MessageForm;