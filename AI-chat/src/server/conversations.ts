import { prisma } from './db';

export async function getConversations() {
    return await prisma.conversation.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export async function createConversation(title: string) {
    return await prisma.conversation.create({
        data: { title },
    });
}

export async function deleteConversation(id: string) {
    await prisma.message.deleteMany({ where: { conversationId: id } });
    return prisma.conversation.delete({ where: { id } });
}