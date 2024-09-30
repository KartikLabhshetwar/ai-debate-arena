import { NextResponse } from 'next/server';
import MistralClient from '@mistralai/mistralai';

const mistral = new MistralClient(process.env.MISTRAL_API_KEY);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const chatResponse = await mistral.chat({
      model: "mistral-tiny",
      messages: [
        { role: "system", content: "You are participating in a debate. Provide concise and logical arguments." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return NextResponse.json({ response: chatResponse.choices[0].message.content });
  } catch (error: any) {
    console.error('Error in Mistral AI API:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}