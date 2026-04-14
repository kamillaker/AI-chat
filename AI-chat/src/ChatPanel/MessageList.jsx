import ChatMessage from './ChatMessage';

function MessageList({ messages }) {
    const chatMessages = [];
    for (const message of messages) {
        chatMessages.push(<ChatMessage key={message.id} role={message.role} text={message.text} />);
    }
    return <div className="p-2 flex flex-col">{chatMessages}</div>;
}

export default MessageList;