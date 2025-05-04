
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { type DayPickerDayProps as DayProps } from 'react-day-picker';

// Map mood values to colors
const moodColors: Record<string, string> = {
  great: 'bg-green-400',
  good: 'bg-green-300',
  okay: 'bg-yellow-300',
  bad: 'bg-orange-300',
  terrible: 'bg-red-400'
};

type MoodEntry = {
  date: string;
  mood: number;
  note: string;
};

interface MoodCalendarViewProps {
  moodEntries: MoodEntry[];
}

const MoodCalendarView = ({ moodEntries }: MoodCalendarViewProps) => {
  // Format mood data for calendar display
  const formattedMoodData = moodEntries.reduce((acc: Record<string, string>, curr) => {
    // Store the mood for each date
    const moodText = 
      curr.mood === 1 ? 'terrible' :
      curr.mood === 2 ? 'bad' :
      curr.mood === 3 ? 'okay' :
      curr.mood === 4 ? 'good' : 'great';
    
    acc[curr.date] = moodText;
    return acc;
  }, {});
  
  // Custom day renderer for the calendar
  const renderDay = (day: Date, dayProps: DayProps) => {
    // Format the day to match our data format (YYYY-MM-DD)
    const dateKey = format(day, 'yyyy-MM-dd');
    
    // Check if we have mood data for this date
    const mood = formattedMoodData[dateKey];
    const moodClass = mood ? moodColors[mood] : '';
    
    return (
      <div
        className={cn(
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
          moodClass ? `${moodClass} hover:bg-opacity-80 text-gray-900` : '',
          dayProps.selected && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground'
        )}
      >
        <div className="flex h-full w-full items-center justify-center">
          {format(day, 'd')}
        </div>
      </div>
    );
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <Calendar
          className="p-0"
          mode="single"
          selected={new Date()}
          month={new Date()}
          showOutsideDays={true}
          fixedWeeks
          components={{
            Day: ({ date, ...dayProps }) => renderDay(date, dayProps as DayProps)
          }}
        />
      </CardContent>
    </Card>
  );
};

export default MoodCalendarView;
