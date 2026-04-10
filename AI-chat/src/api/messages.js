import { llmRequest } from './openrouter';

const MESSAGES_DATABASE = {
    1: [
        { id: 1, role: 'user', text: 'Hello, how are you?' },
        { id: 2, role: 'assistant', text: "I'm doing great, thanks for asking!" },
        { id: 3, role: 'user', text: "That's wonderful to hear!" },
        { id: 4, role: 'assistant', text: 'Thanks!' },
    ],
    2: [
        {
            id: 1,
            role: 'user',
            text: 'Help me with my homework - I need to write an essay on the topic of the siege of Warsaw during the World War Two.',
        },
        { id: 2, role: 'assistant', text: 'Okay! What style do you prefer - concise or detailed?' },
    ],
};

export async function getMessages(conversationID) {
    return MESSAGES_DATABASE[conversationID] ?? [];
}

export async function createMessage(conversationID, text) {
    const conversationHistory = MESSAGES_DATABASE[conversationID] ?? [];
    const id = conversationHistory.length + 1;
    const newMessage = { id, role: 'user', text };
    conversationHistory.push(newMessage);

    const openAImessages = conversationHistory.map(({ role, text }) => ({ role, content: text }));
    const aiResponseData = await llmRequest(openAImessages);
    const aiText = aiResponseData?.choices?.[0]?.message?.content ?? 'No response';
    const aiMessage = { id: id + 1, role: 'assistant', text: aiText };
    conversationHistory.push(aiMessage);

    return newMessage;
}