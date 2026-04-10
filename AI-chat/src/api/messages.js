export async function getMessages(conversationID) {
    const response = await fetch(`/api/messages?conversationID=${conversationID}`);
    return await response.json();
}

export async function createMessage(conversationID, text) {
    const conversationIDNumber = Number.parseInt(conversationID);
    const response = await fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify({ conversationID: conversationIDNumber, text }),
    });
    return await response.json();
}