
import React, { useState, useEffect } from 'react';
import { Line } from 'recharts';
import { Calendar, Heart, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MoodEntryForm from '@/components/mood/MoodEntryForm';
import MoodChart from '@/components/mood/MoodChart';
import MoodCalendarView from '@/components/mood/MoodCalendarView';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Sample mood data
const initialMoodData = [
  { date: '2025-04-25', mood: 3, note: 'Feeling okay today, work was stressful' },
  { date: '2025-04-26', mood: 4, note: 'Had a good day, enjoyed time with friends' },
  { date: '2025-04-27', mood: 2, note: 'Feeling down, didn\'t sleep well' },
  { date: '2025-04-28', mood: 5, note: 'Great day! Everything went well' },
  { date: '2025-04-29', mood: 3, note: 'Average day, nothing special' },
  { date: '2025-04-30', mood: 4, note: 'Productive day at work' }
];

const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState<Array<{date: string, mood: number, note: string}>>([]);
  const [viewMode, setViewMode] = useState<'chart' | 'calendar'>('chart');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  useEffect(() => {
    // Load mood data from localStorage or use sample data
    const savedMoods = localStorage.getItem('moodEntries');
    if (savedMoods) {
      setMoodEntries(JSON.parse(savedMoods));
    } else {
      setMoodEntries(initialMoodData);
    }
  }, []);
  
  const saveMoodEntry = (entry: {date: string, mood: number, note: string}) => {
    // Check if entry for this date already exists
    const entryIndex = moodEntries.findIndex(item => item.date === entry.date);
    
    let updatedEntries;
    if (entryIndex >= 0) {
      // Update existing entry
      updatedEntries = [...moodEntries];
      updatedEntries[entryIndex] = entry;
    } else {
      // Add new entry
      updatedEntries = [...moodEntries, entry];
    }
    
    // Sort by date
    updatedEntries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Save to state and localStorage
    setMoodEntries(updatedEntries);
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
    setDialogOpen(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Mood Tracker</h1>
            <p className="text-muted-foreground">Track your emotional wellbeing over time</p>
          </div>
          
          <div className="flex mt-4 md:mt-0">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-serenity-600 hover:bg-serenity-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Record Mood
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>How are you feeling today?</DialogTitle>
                </DialogHeader>
                <MoodEntryForm onSave={saveMoodEntry} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Mood Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Today's Date</div>
                  <div className="text-xl font-semibold">{format(new Date(), 'MMMM d, yyyy')}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Entries Recorded</div>
                  <div className="text-xl font-semibold">{moodEntries.length}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Average Mood</div>
                  <div className="text-xl font-semibold">
                    {moodEntries.length > 0 
                      ? (moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length).toFixed(1)
                      : "No entries"}
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="text-sm font-medium text-muted-foreground mb-3">Mood Scale</div>
                  <div className="flex justify-between">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center mb-1">
                        <span className="text-sm">1</span>
                      </div>
                      <span className="text-xs">Low</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center mb-1">
                        <span className="text-sm">2</span>
                      </div>
                      <span className="text-xs">.</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center mb-1">
                        <span className="text-sm">3</span>
                      </div>
                      <span className="text-xs">Neutral</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center mb-1">
                        <span className="text-sm">4</span>
                      </div>
                      <span className="text-xs">.</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-serenity-200 rounded-full flex items-center justify-center mb-1">
                        <span className="text-sm">5</span>
                      </div>
                      <span className="text-xs">High</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Mood History</CardTitle>
              <Tabs defaultValue="chart" className="w-[200px]">
                <TabsList>
                  <TabsTrigger value="chart" onClick={() => setViewMode('chart')}>
                    <Heart className="h-4 w-4 mr-2" />
                    Chart
                  </TabsTrigger>
                  <TabsTrigger value="calendar" onClick={() => setViewMode('calendar')}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {viewMode === 'chart' ? (
                <MoodChart moodEntries={moodEntries} />
              ) : (
                <MoodCalendarView moodEntries={moodEntries} />
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moodEntries.slice().reverse().slice(0, 5).map((entry, index) => (
                <div key={index} className="flex items-start gap-4 py-3 border-b last:border-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    entry.mood === 1 ? 'bg-red-100 text-red-700' :
                    entry.mood === 2 ? 'bg-orange-100 text-orange-700' :
                    entry.mood === 3 ? 'bg-yellow-100 text-yellow-700' :
                    entry.mood === 4 ? 'bg-green-100 text-green-700' :
                    'bg-serenity-100 text-serenity-700'
                  }`}>
                    {entry.mood}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{format(new Date(entry.date), 'MMMM d, yyyy')}</span>
                      <span className="text-muted-foreground text-sm">
                        {format(new Date(entry.date), 'EEEE')}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1">{entry.note}</p>
                  </div>
                </div>
              ))}
              
              {moodEntries.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No mood entries recorded. Start tracking your mood!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default MoodTracker;
