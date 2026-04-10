function Conversation({ title, isActive, setActive }) {
    return (
        <div className={`block rounded-lg p-2 my-1 ${isActive ? 'bg-gray-700' : ''}`} onClick={setActive}>
            {title}
        </div>
    );
}

export default Conversation;