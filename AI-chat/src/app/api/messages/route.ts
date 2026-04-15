import { createMessage, getMessages } from '@/src/server/messages';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const consversationId = url.searchParams.get('consversationId') ?? '0';
    const data = await getMessages(consversationId);
    return Response.json(data);
}

export async function POST(request: Request) {
    const payload: { consversationId: string; text: string } = await request.json();
    const newMessage = await createMessage(payload.consversationId, payload.text, 'user');
    return Response.json(newMessage);
}