import { prisma } from '../db';
import { llmRequest } from '../openrouter';

async function getMessages(conversationId: string) {
    return await prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
    });
}

async function createMessage(conversationId: string, text: string) {
    const connect = { conversation: { connect: { id: conversationId } } };
    const newMessage = await prisma.message.create({
        data: { ...connect, role: 'user', text },
    });
    const conersationHistory = await prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
    });
    conersationHistory.push(newMessage);

    const openAImessages = conersationHistory.map(({ role, text }: { role: string; text: string }) => ({
        role,
        content: text,
    }));
    const aiResponse = await llmRequest(openAImessages);

    const aiMessage = await prisma.message.create({
        data: { ...connect, role: 'assistant', text: aiResponse },
    });
    return aiMessage;
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const consversationId = url.searchParams.get('consversationId') ?? '0';
    const data = await getMessages(consversationId);
    return Response.json(data);
}

export async function POST(request: Request) {
    const payload: { consversationId: string; text: string } = await request.json();
    const newMessage = await createMessage(payload.consversationId, payload.text);
    return Response.json(newMessage);
}