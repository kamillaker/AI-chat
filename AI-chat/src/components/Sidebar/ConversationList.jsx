'use client';
import Link from 'next/link';
import Conversation from './Conversation';

function ConversationList({ conversations, activeConversationID }) {
    return (
        <>
            {conversations.map((conversation) => (
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