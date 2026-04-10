function Conversation({ title, isActive }) {
    return <div className={`block rounded-lg p-2 my-1 ${isActive ? 'bg-gray-700' : ''}`}>{title}</div>;
}

export default Conversation;