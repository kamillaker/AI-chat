import { llmRequest } from '../openrouter';

const MESSAGES_DATABASE: Map<number, any> = new Map([
    [
        1,
        [
            { id: 1, role: 'user', text: 'Hello, how are you?' },
            { id: 2, role: 'assistant', text: "I'm doing great, thanks for asking!" },
            { id: 3, role: 'user', text: "That's wonderful to hear!" },
            { id: 4, role: 'assistant', text: 'Thanks!' },
        ],
    ],
    [
        2,
        [
            {
                id: 1,
                role: 'user',
                text: 'Help me with my homework - I need to write an essay on the topic of the siege of Warsaw during the World War Two.',
            },
            { id: 2, role: 'assistant', text: 'Okay! What style do you prefer - consice or detailed?' },
        ],
    ],
]);

async function getMessages(conversationID: number) {
    return MESSAGES_DATABASE.get(conversationID) ?? [];
}

async function createMessage(conversationID: number, text: string) {
    const conversationHistory = MESSAGES_DATABASE.get(conversationID) ?? [];
    const id = conversationHistory.length + 1;
    const newMessage = { id, role: 'user', text };
    conversationHistory.push(newMessage);

    const openAImessages = conversationHistory.map(({ role, text }) => ({ role, content: text }));
    const aiResponse = await llmRequest(openAImessages);
    const aiMessage = { id: id + 1, role: 'assistant', text: aiResponse };
    conversationHistory.push(aiMessage);
    return aiMessage;
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const conversationIDstring = url.searchParams.get('conversationID') ?? '0';
    const conversationID = Number.parseInt(conversationIDstring);
    const data = await getMessages(conversationID);
    return Response.json(data);
}

export async function POST(request: Request) {
    const payload: { conversationID: number; text: string } = await request.json();
    const newMessage = await createMessage(payload.conversationID, payload.text);
    return Response.json(newMessage);
}