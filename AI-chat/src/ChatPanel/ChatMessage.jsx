function ChatMessage({ role, text }) {
    const classes = role === 'user' ? 'justify-start bg-gray-700' : 'justify-end bg-blue-500';
    return <div className={`p-2 flex ${classes}`}>{text}</div>;
}

export default ChatMessage;