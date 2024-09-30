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
      model: 'openai-community/gpt2',
      inputs: `Provide a concise and logical argument for the following debate topic: ${prompt}\n\nArgument:`,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.2,
        stop: ["\n", "Argument:"],
      },
    });

    const cleanedResponse = response.generated_text.trim().replace(/^Argument:\s*/, '');

    return NextResponse.json({ response: cleanedResponse });
  } catch (error: unknown) {
    console.error('Error in Hugging Face API:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}