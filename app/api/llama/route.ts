import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const response = await hf.textGeneration({
      model: 'meta-llama/Llama-2-7b-chat-hf',
      inputs: `You are participating in a debate. Provide a concise and logical argument for the following topic: ${prompt}`,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.7,
      },
    });

    return NextResponse.json({ response: response.generated_text });
  } catch (error) {
    console.error('Error in Hugging Face API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}