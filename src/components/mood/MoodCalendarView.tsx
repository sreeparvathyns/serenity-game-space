
import React from 'react';
import { format, parseISO, isSameDay } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MoodEntry {
  date: string;
  mood: number;
  note: string;
}

interface MoodCalendarViewProps {
  moodEntries: MoodEntry[];
}

const MoodCalendarView = ({ moodEntries }: MoodCalendarViewProps) => {
  const getMoodForDay = (day: Date) => {
    const entry = moodEntries.find(e => isSameDay(parseISO(e.date), day));
    return entry ? entry.mood : null;
  };
  
  const getMoodClassName = (mood: number | null) => {
    if (mood === null) return '';
    
    switch (mood) {
      case 1: return 'bg-red-200 text-red-800';
      case 2: return 'bg-orange-200 text-orange-800';
      case 3: return 'bg-yellow-200 text-yellow-800';
      case 4: return 'bg-green-200 text-green-800';
      case 5: return 'bg-serenity-200 text-serenity-800';
      default: return '';
    }
  };
  
  const getNoteForDay = (day: Date) => {
    const entry = moodEntries.find(e => isSameDay(parseISO(e.date), day));
    return entry ? entry.note : null;
  };
  
  return (
    <div>
      <TooltipProvider>
        <Calendar
          mode="single"
          className="rounded-md border"
          modifiers={{
            mood1: (date) => getMoodForDay(date) === 1,
            mood2: (date) => getMoodForDay(date) === 2,
            mood3: (date) => getMoodForDay(date) === 3,
            mood4: (date) => getMoodForDay(date) === 4,
            mood5: (date) => getMoodForDay(date) === 5,
          }}
          modifiersClassNames={{
            mood1: 'bg-red-100',
            mood2: 'bg-orange-100',
            mood3: 'bg-yellow-100',
            mood4: 'bg-green-100',
            mood5: 'bg-serenity-100',
          }}
          components={{
            Day: ({ date, ...props }) => {
              const mood = getMoodForDay(date);
              const note = getNoteForDay(date);
              
              return (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      {...props}
                      className={`${props?.className || ''} ${mood ? 'font-medium' : ''}`}
                    >
                      <time dateTime={format(date, 'yyyy-MM-dd')}>
                        {format(date, "d")}
                      </time>
                      {mood && (
                        <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${getMoodClassName(mood)}`} />
                      )}
                    </button>
                  </TooltipTrigger>
                  {mood && note && (
                    <TooltipContent>
                      <div className="text-sm">
                        <div className="font-medium">Mood: {mood}/5</div>
                        <div className="mt-1">{note}</div>
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            },
          }}
        />
      </TooltipProvider>
    </div>
  );
};

export default MoodCalendarView;
