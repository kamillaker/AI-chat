import { prisma } from '../db';

async function getConversations() {
    return await prisma.conversation.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

async function createConversation(title: string) {
    return await prisma.conversation.create({
        data: { title },
    });
}

export async function GET() {
    const data = await getConversations();
    return Response.json(data);
}

export async function POST(request: Request) {
    const payload: { title: string } = await request.json();
    const newConversation = await createConversation(payload.title);
    return Response.json(newConversation);
}

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id') ?? '';
    await prisma.message.deleteMany({ where: { conversationId: id } });
    await prisma.conversation.delete({ where: { id } });
    return Response.json({ success: true });
}