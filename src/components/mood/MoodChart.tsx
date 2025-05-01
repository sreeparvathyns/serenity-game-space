
import React from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

interface MoodEntry {
  date: string;
  mood: number;
  note: string;
}

interface MoodChartProps {
  moodEntries: MoodEntry[];
}

const MoodChart = ({ moodEntries }: MoodChartProps) => {
  const chartData = moodEntries.map(entry => ({
    date: entry.date,
    mood: entry.mood,
    formattedDate: format(parseISO(entry.date), 'MMM d')
  }));
  
  return (
    <div className="h-[300px] w-full">
      {moodEntries.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="formattedDate" 
              tick={{ fontSize: 12 }} 
            />
            <YAxis 
              domain={[1, 5]} 
              ticks={[1, 2, 3, 4, 5]} 
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => [
                `Mood: ${value}`,
                ''
              ]}
              labelFormatter={(date) => `Date: ${date}`}
            />
            <Line 
              type="monotone" 
              dataKey="mood" 
              stroke="#7857ea" 
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No mood data available. Start tracking your mood!
        </div>
      )}
    </div>
  );
};

export default MoodChart;
