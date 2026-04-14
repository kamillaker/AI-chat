export async function getConversations() {
    const response = await fetch('/api/conversations');
    return await response.json();
}

export async function createConversation(title) {
    return await fetch('/api/conversations', {
        method: 'POST',
        body: JSON.stringify({ title }),
    });
}