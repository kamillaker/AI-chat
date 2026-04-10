const CONVERSATION_DATABASE = [
    { id: 1, title: 'How is your day?' },
    { id: 2, title: 'Help me with homework' },
];

async function getConversations() {
    return CONVERSATION_DATABASE;
}

async function createConversation(title: string) {
    const id = CONVERSATION_DATABASE.length + 1;
    const newConversation = {
        id,
        title,
    };
    CONVERSATION_DATABASE.push(newConversation);
    return newConversation;
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