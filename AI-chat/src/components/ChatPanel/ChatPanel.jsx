'use client';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

function ChatPanel({ conversationId, initialMessages }) {
    const { messages, sendMessage, status } = useChat({
        id: conversationId,
        messages: initialMessages,
        transport: new DefaultChatTransport({ api: '/api/streaming-chat' }),
    });
    return (
        <main className="flex flex-col flex-1">
            <MessageList messages={messages} />
            <MessageForm conversationId={conversationId} sendMessage={sendMessage} isPending={status === 'streaming'} />
        </main>
    );
}

export default ChatPanel;