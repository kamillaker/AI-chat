import ConversationList from './ConversationList';
import AddButton from './AddButton';
import { getConversations } from '@/src/server/conversations';

export default async function Sidebar({ activeConversationID }) {
    const conversations = await getConversations();

    return (
        <aside className="flex flex-col w-64 bg-gray-900 text-white p-4">
            <AddButton />
            <ConversationList
                conversations={conversations}
                activeConversationID={activeConversationID}
            />
        </aside>
    );
}