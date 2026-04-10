import MessageList from './MessageList';
import MessageForm from './MessageForm';

function ChatPanel({ messages, appendMessage, loading }) {
    return (
        <main className="flex flex-col flex-1">
            <MessageList messages={messages} />

            {loading && (
                <div className="p-2 text-center text-gray-400">
                    AI is typing...
                </div>
            )}

            <MessageForm appendMessage={appendMessage} />
        </main>
    );
}

export default ChatPanel;