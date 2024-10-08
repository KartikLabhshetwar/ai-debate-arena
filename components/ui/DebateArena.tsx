'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function DebateArena() {
  const [topic, setTopic] = useState('');
  const [mistralResponse, setMistralResponse] = useState('');
  const [gpt2Response, setGpt2Response] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMistralResponse('');
    setGpt2Response('');
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

      // GPT-2 API call (using Hugging Face)
      const gpt2Res = await fetch('/api/gpt2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const gpt2Data = await gpt2Res.json();
      if (!gpt2Res.ok) {
        throw new Error(`GPT-2 API error: ${gpt2Data.error || gpt2Res.statusText}`);
      }
      setGpt2Response(gpt2Data.response);
    } catch (error: unknown) {
      console.error('Error in debate submission:', error);
      setError(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">AI Debate Arena</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter debate topic"
          className="w-full"
        />
        <Button type="submit" disabled={isLoading} className="w-50">
          {isLoading ? 'Generating Debate...' : 'Start Debate'}
        </Button>
      </form>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mistral AI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{mistralResponse || 'Waiting for response...'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>GPT-2</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{gpt2Response || 'Waiting for response...'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}