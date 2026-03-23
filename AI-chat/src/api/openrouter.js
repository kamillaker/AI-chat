const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = 'z-ai/glm-4.5-air:free';
export const BASE_URL = 'https://openrouter.ai/api/v1';

async function completionsRequest(model, messages, stream = false) {
    return await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            model: model,
            messages: messages,
            stream: stream,
        }),
    });
}

export async function llmRequest(messages) {
    const response = await completionsRequest(MODEL, messages);
    const data = await response.json();
    return data;
}