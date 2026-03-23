import { useState, useEffect } from 'react';
import ConversationList from './ConversationList';
import AddButton from './AddButton';
import { createConversation, getConversations } from '../api/conversations';

function Sidebar({ activeConversationID, setActiveConversationID }) {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
    getConversations().then(setConversations);
}, []);

    function createNewConversation() {
        createConversation('New Conversation').then((newConversation) => {
            setActiveConversationID(newConversation.id);
        });
    }

    return (
        <aside className="flex flex-col w-64 bg-gray-900 text-white p-4">
            <div>
                <AddButton createNewConversation={createNewConversation} />
            </div>
            <ConversationList
                conversations={conversations}
                activeConversationID={activeConversationID}
                setActiveConversationID={setActiveConversationID}
            />
        </aside>
    );
}

export default Sidebar;