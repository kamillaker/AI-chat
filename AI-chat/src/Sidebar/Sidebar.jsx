import ConversationList from './ConversationList';
import AddButton from './AddButton';

function Sidebar({ activeConversationID }) {
    return (
        <aside className="flex flex-col w-64 bg-gray-900 text-white p-4">
            <div>
                <AddButton />
            </div>
            <ConversationList activeConversationID={activeConversationID} />
        </aside>
    );
}

export default Sidebar;