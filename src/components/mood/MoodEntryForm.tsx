
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface MoodEntryFormProps {
  onSave: (entry: {date: string, mood: number, note: string}) => void;
  initialDate?: Date;
  initialMood?: number;
  initialNote?: string;
}

const MoodEntryForm = ({ 
  onSave, 
  initialDate = new Date(),
  initialMood = 3,
  initialNote = ""
}: MoodEntryFormProps) => {
  const [date, setDate] = useState<Date>(initialDate);
  const [mood, setMood] = useState<number>(initialMood);
  const [note, setNote] = useState(initialNote);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      date: format(date, 'yyyy-MM-dd'),
      mood,
      note
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="date">Date</Label>
        <div className="mt-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
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
      </div>
      
      <div>
        <Label>How are you feeling today?</Label>
        <div className="grid grid-cols-5 gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className={`p-4 rounded-md flex flex-col items-center justify-center border transition-all ${
                mood === value ? 'border-serenity-500 bg-serenity-50' : 'border-gray-200 hover:border-serenity-300'
              }`}
              onClick={() => setMood(value)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                value === 1 ? 'bg-red-100 text-red-700' :
                value === 2 ? 'bg-orange-100 text-orange-700' :
                value === 3 ? 'bg-yellow-100 text-yellow-700' :
                value === 4 ? 'bg-green-100 text-green-700' :
                'bg-serenity-100 text-serenity-700'
              }`}>
                {value}
              </div>
              <span className="text-sm text-muted-foreground">
                {value === 1 ? 'Very Low' :
                 value === 2 ? 'Low' :
                 value === 3 ? 'Neutral' :
                 value === 4 ? 'Good' : 'Great'
                }
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <Label htmlFor="note">Notes (optional)</Label>
        <div className="mt-1">
          <Textarea
            id="note"
            placeholder="How was your day? Any notable events?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-serenity-600 hover:bg-serenity-700">
          Save Entry
        </Button>
      </div>
    </form>
  );
};

export default MoodEntryForm;
