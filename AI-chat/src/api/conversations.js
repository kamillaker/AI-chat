const CONVERSATION_DATABASE = [
    { id: 1, title: 'How is your day?' },
    { id: 2, title: 'Help me with homework' },
];

export async function getConversations() {
    return CONVERSATION_DATABASE;
}

export async function createConversation(title) {
    const id = COVERSATION_DATABASE.length + 1;
    const newConversation = {
        id,
        title,
    };
    CONVERSATION_DATABASE.push(newConversation);
    return newConversation;
}