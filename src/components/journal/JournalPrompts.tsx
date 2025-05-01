
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface JournalPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const JournalPrompts = ({ onSelectPrompt }: JournalPromptsProps) => {
  const prompts = [
    "What are three things that went well today?",
    "What's one challenge you faced recently and how did you handle it?",
    "Describe a moment when you felt proud of yourself this week.",
    "What are you grateful for today?",
    "What's something that made you smile recently?",
    "What's one thing you'd like to improve about your self-care routine?",
    "Write about a recent stressor and three ways you could address it.",
    "How did you practice self-compassion today?",
    "What boundaries do you need to set or maintain for your mental health?",
    "Reflect on a recent trigger for negative emotions. What can you learn from it?",
    "What activities help you feel calm and centered?",
    "What are you looking forward to in the coming week?"
  ];
  
  const tips = [
    "Write without judgment. There's no right or wrong way to journal.",
    "Try to journal regularly, even if it's just for a few minutes.",
    "Don't worry about grammar or spelling. Just let your thoughts flow.",
    "If you're stuck, use one of our prompts to get started.",
    "Review your entries periodically to notice patterns in your thoughts and feelings.",
    "Use journaling to track your progress and celebrate small wins.",
    "Express gratitude regularly to boost your mood and perspective."
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Journal Prompts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {prompts.slice(0, 5).map((prompt, index) => (
              <Button 
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => onSelectPrompt(prompt)}
              >
                {prompt}
              </Button>
            ))}
            <Button 
              variant="ghost"
              className="w-full text-sm text-serenity-700 hover:text-serenity-800"
              onClick={() => onSelectPrompt(prompts[Math.floor(Math.random() * prompts.length)])}
            >
              Give me a random prompt
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Journaling Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalPrompts;
