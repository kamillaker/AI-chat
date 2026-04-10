const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'google/gemini-3.1-flash-lite-preview';
export const BASE_URL = 'https://openrouter.ai/api/v1';

async function completionsRequest(model, messages, stream = false) {
    const body = JSON.stringify({ model, messages, stream });
    return fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
        body,
    });
}

export async function llmRequest(messages) {
    const response = await completionsRequest(MODEL, messages);
    const data = await response.json();
    console.info(`Response from OpenRouter: ${response.status}`);
    if (data.choices.length > 0) {
        return data.choices[0].message.content;
    }
    return '<...no answer from LLM...>';
}