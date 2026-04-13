import MessageList from './MessageList';
import MessageForm from './MessageForm';

function ChatPanel({ activeConversationID }) {
    return (
        <main className="flex flex-col flex-1">
            <MessageList conversationID={activeConversationID} />
            <MessageForm conversationID={activeConversationID} />
        </main>
    );
}

export default ChatPanel;