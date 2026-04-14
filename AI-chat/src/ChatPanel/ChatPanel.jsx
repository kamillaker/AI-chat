'use client';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { useState, useEffect } from 'react';
import { getMessages, createMessage } from '../api/messages';

function ChatPanel({ activeConversationID }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages(activeConversationID).then(setMessages);
    }, [activeConversationID]);

    function appendMessage(input) {
        const newMessages = [...messages, { role: 'user', text: input }];
        setMessages(newMessages);
        createMessage(activeConversationID, input).then((aiMessage) => {
            setMessages([...newMessages, aiMessage]);
        });
    }

    return (
        <main className="flex flex-col flex-1">
            <MessageList messages={messages} />
            <MessageForm appendMessage={appendMessage} />
        </main>
    );
}

export default ChatPanel;