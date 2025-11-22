import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Configure OpenAI client with DeepSeek base URL
const config = new Configuration({
  apiKey: process.env.DEEPSEEK_API_KEY,
  basePath: 'https://api.deepseek.com/v1',
});

const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages, data } = await req.json();
    
    // Extract context information from the request
    const contextInfo = data?.context || "User context unknown.";

    const systemMessage = {
      role: 'system',
      content: `You are the "BNBU Strategic Advisor AI" (BNBU 战略顾问 AI) inside a high-end study abroad planning application.
Your role is to provide professional, encouraging, and strategic advice to students at BNBU (a liberal arts college).
Keep responses concise, professional, and supportive.
Since you don't have access to real-time database data yet, if asked about specific entry requirements, provide general strategic advice rather than specific numbers, and remind them to check official sources.
Always answer in the language the user asks in (primarily Simplified Chinese).

CURRENT CONTEXT: ${contextInfo}
Use this context to tailor your advice, but do not explicitly mention "I see you are on page X" unless necessary. Just act like you know.`,
    };

    const response = await openai.createChatCompletion({
      model: 'deepseek-chat',
      stream: true,
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

