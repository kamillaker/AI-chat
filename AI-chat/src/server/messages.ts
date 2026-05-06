import { prisma } from './db';

export async function getMessages(conversationId: string) {
    return await prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
    });
}

export async function createMessage(conversationId: string, text: string, role: 'user' | 'assistant') {
    const connect = { conversation: { connect: { id: conversationId } } };
    return await prisma.message.create({
        data: { ...connect, role, text },
    });}