import ChatMessage from './ChatMessage';

function MessageList({ messages }) {
    const chatMessages = [];
    for (const message of messages) {
        const parts = message.parts.filter((p) => p.type === 'text');
        const text = parts.map((p) => p.text).join(' ');
        chatMessages.push(<ChatMessage key={message.id} role={message.role} text={text} />);
    }
    return <div className="p-2 flex flex-col">{chatMessages}</div>;
}

export default MessageList;