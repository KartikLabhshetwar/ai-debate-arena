'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function DebateArena() {
  const [topic, setTopic] = useState('');
  const [mistralResponse, setMistralResponse] = useState('');
  const [llamaResponse, setLlamaResponse] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMistralResponse('');
    setLlamaResponse('');
    setIsLoading(true);

    const prompt = `Debate the following topic: ${topic}. Provide a concise opening statement.`;

    try {
      // Mistral API call
      const mistralRes = await fetch('/api/mistral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const mistralData = await mistralRes.json();
      if (!mistralRes.ok) {
        throw new Error(`Mistral API error: ${mistralData.error || mistralRes.statusText}`);
      }
      setMistralResponse(mistralData.response);

      // LLaMA API call (using Hugging Face)
      const llamaRes = await fetch('/api/llama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const llamaData = await llamaRes.json();
      if (!llamaRes.ok) {
        throw new Error(`LLaMA API error: ${llamaData.error || llamaRes.statusText}`);
      }
      setLlamaResponse(llamaData.response);
    } catch (error: any) {
      console.error('Error in debate submission:', error);
      setError(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Debate Arena</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter debate topic"
          className="w-full p-2 border rounded"
        />
        <Button type="submit" disabled={isLoading} className="mt-2">
          {isLoading ? 'Loading...' : 'Start Debate'}
        </Button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-bold">Mistral AI</h2>
          <p>{mistralResponse}</p>
        </div>
        <div>
          <h2 className="font-bold">LLaMA (Hugging Face)</h2>
          <p>{llamaResponse}</p>
        </div>
      </div>
    </div>
  );
}