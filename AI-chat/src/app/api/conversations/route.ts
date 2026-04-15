import { createConversation, getConversations, deleteConversation } from '@/src/server/conversations';

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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return new Response('Missing id', { status: 400 });
    }

    const result = await deleteConversation(id);
    return Response.json(result);
}