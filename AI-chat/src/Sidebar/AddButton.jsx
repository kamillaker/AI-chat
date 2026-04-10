function AddConversationButton({ createNewConversation }) {
    return (
        <button className="w-full bg-red-500 hover:bg-red-600 p-3 my-1" onClick={createNewConversation}>
            + New Chat
        </button>
    );
}

export default AddConversationButton;