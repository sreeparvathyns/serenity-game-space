
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?: number;
  tags?: string[];
}

interface JournalEntryFormProps {
  onSave: (entry: JournalEntry) => void;
  entry: JournalEntry | null;
}

const JournalEntryForm = ({ onSave, entry }: JournalEntryFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [mood, setMood] = useState<number>(3);
  const [tagsInput, setTagsInput] = useState('');
  
  useEffect(() => {
    if (entry) {
      setTitle(entry.title || '');
      setContent(entry.content || '');
      setDate(entry.date ? new Date(entry.date) : new Date());
      setMood(entry.mood || 3);
      setTagsInput(entry.tags ? entry.tags.join(', ') : '');
    } else {
      resetForm();
    }
  }, [entry]);
  
  const resetForm = () => {
    setTitle('');
    setContent('');
    setDate(new Date());
    setMood(3);
    setTagsInput('');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process tags
    const tags = tagsInput
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);
    
    onSave({
      id: entry?.id || '',
      title,
      content,
      date: format(date, 'yyyy-MM-dd'),
      mood,
      tags: tags.length > 0 ? tags : undefined
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entry title"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                id="date"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "MMMM d, yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label htmlFor="mood">Mood (1-5)</Label>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={`p-2 rounded-md flex flex-col items-center justify-center border transition-all ${
                  mood === value ? 'border-serenity-500 bg-serenity-50' : 'border-gray-200 hover:border-serenity-300'
                }`}
                onClick={() => setMood(value)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  value === 1 ? 'bg-red-100 text-red-700' :
                  value === 2 ? 'bg-orange-100 text-orange-700' :
                  value === 3 ? 'bg-yellow-100 text-yellow-700' :
                  value === 4 ? 'bg-green-100 text-green-700' :
                  'bg-serenity-100 text-serenity-700'
                }`}>
                  {value}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="content">Journal Entry</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts here..."
          rows={8}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="anxiety, therapy, meditation"
        />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-serenity-600 hover:bg-serenity-700">
          Save Entry
        </Button>
      </div>
    </form>
  );
};

export default JournalEntryForm;
