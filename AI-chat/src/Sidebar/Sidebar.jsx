'use client';
import { useState, useEffect } from 'react';
import ConversationList from './ConversationList';
import AddButton from './AddButton';
import { createConversation, getConversations } from '../api/conversations';
import { redirect } from 'next/navigation';

function Sidebar({ activeConversationID }) {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        getConversations().then(setConversations);
    }, []);

    function createNewConversation() {
        createConversation('New Conversation').then((newConversation) => {
            redirect(`/chats/${newConversation.id}`);
        });
    }

    return (
        <aside className="flex flex-col w-64 bg-gray-900 text-white p-4">
            <div>
                <AddButton createNewConversation={createNewConversation} />
            </div>
            <ConversationList activeConversationID={activeConversationID} conversations={conversations} />
        </aside>
    );
}

export default Sidebar;