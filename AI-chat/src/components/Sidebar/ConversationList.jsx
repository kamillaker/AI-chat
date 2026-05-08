'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Conversation from './Conversation';

function ConversationList({ conversations, activeConversationID }) {
    const { data = conversations } = useQuery({
        queryKey: ['conversations'],
        queryFn: () => fetch('/api/conversations').then(r => r.json()),
        initialData: conversations,
    });

    return (
        <>
            {data.map((conversation) => (
                <Link href={`/chats/${conversation.id}`} key={conversation.id}>
                    <Conversation
                        id={conversation.id}
                        title={conversation.title}
                        isActive={activeConversationID == conversation.id}
                    />
                </Link>
            ))}
        </>
    );
}

export default ConversationList;