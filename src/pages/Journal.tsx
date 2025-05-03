import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Plus, Calendar, Search, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JournalEntryForm from '@/components/journal/JournalEntryForm';
import JournalPrompts from '@/components/journal/JournalPrompts';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?: number;
  tags?: string[];
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editEntry, setEditEntry] = useState<JournalEntry | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Example journal entries
  const sampleEntries = [
    {
      id: '1',
      title: "First Session with New Therapist",
      content: "Had my first session with Dr. Smith today. We discussed my anxiety triggers and she suggested some new breathing techniques. I feel hopeful about this approach.",
      date: "2025-04-28",
      mood: 4,
      tags: ["therapy", "anxiety"]
    },
    {
      id: '2',
      title: "Difficult Day at Work",
      content: "Today was challenging. The project deadline got moved up and I felt overwhelmed. I used the 5-4-3-2-1 grounding technique when I felt my anxiety rising. It helped somewhat.",
      date: "2025-04-29",
      mood: 2,
      tags: ["work", "stress", "anxiety"]
    },
    {
      id: '3',
      title: "Morning Meditation Success",
      content: "I finally managed to meditate for a full 10 minutes this morning. My mind was still racing, but I was better at bringing my focus back to my breath. Progress!",
      date: "2025-04-30",
      mood: 4,
      tags: ["meditation", "morning routine"]
    }
  ];
  
  useEffect(() => {
    // Load journal entries from localStorage or use sample data
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    } else {
      setEntries(sampleEntries);
    }
  }, []);
  
  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);
  
  const handleSaveEntry = (entry: JournalEntry) => {
    if (editEntry) {
      // Update existing entry
      setEntries(entries.map(e => e.id === entry.id ? entry : e));
      toast({
        title: "Entry Updated",
        description: "Your journal entry has been updated."
      });
    } else {
      // Add new entry
      setEntries([...entries, { ...entry, id: Date.now().toString() }]);
      toast({
        title: "Entry Added",
        description: "Your journal entry has been saved."
      });
    }
    setDialogOpen(false);
    setEditEntry(null);
  };
  
  const handleEditEntry = (entry: JournalEntry) => {
    setEditEntry(entry);
    setDialogOpen(true);
  };
  
  const handleDeletePrompt = (id: string) => {
    setEntryToDelete(id);
    setAlertOpen(true);
  };
  
  const handleDeleteEntry = () => {
    if (entryToDelete) {
      setEntries(entries.filter(entry => entry.id !== entryToDelete));
      toast({
        title: "Entry Deleted",
        description: "Your journal entry has been deleted."
      });
      setAlertOpen(false);
      setEntryToDelete(null);
    }
  };
  
  const filteredEntries = entries.filter(entry => {
    return (
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.tags && entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  });
  
  // Sort entries by date (newest first)
  const sortedEntries = [...filteredEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Journal</h1>
            <p className="text-muted-foreground">
              Document your thoughts, feelings, and experiences to support your mental health journey.
            </p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-serenity-600 hover:bg-serenity-700 mt-4 md:mt-0">
                <Plus className="mr-2 h-4 w-4" />
                New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editEntry ? 'Edit Journal Entry' : 'Create New Journal Entry'}
                </DialogTitle>
              </DialogHeader>
              <JournalEntryForm onSave={handleSaveEntry} entry={editEntry} />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="mb-6 relative">
              <Input
                placeholder="Search journal entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Search className="h-4 w-4" />
              </div>
            </div>
            
            {sortedEntries.length > 0 ? (
              <div className="space-y-4">
                {sortedEntries.map((entry) => (
                  <Card key={entry.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-lg">{entry.title}</CardTitle>
                          <p className="text-sm text-muted-foreground flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(new Date(entry.date), 'MMMM d, yyyy')}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditEntry(entry)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeletePrompt(entry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="whitespace-pre-line text-sm">
                        {entry.content}
                      </div>
                      
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1">
                          {entry.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-serenity-50 text-serenity-700 px-2 py-1 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground mb-4">No journal entries found.</p>
                <Button 
                  onClick={() => setDialogOpen(true)}
                  className="bg-serenity-600 hover:bg-serenity-700"
                >
                  Create Your First Entry
                </Button>
              </div>
            )}
          </div>
          
          <div>
            <JournalPrompts onSelectPrompt={(prompt) => {
              setEditEntry({
                id: '',
                title: prompt,
                content: '',
                date: format(new Date(), 'yyyy-MM-dd')
              });
              setDialogOpen(true);
            }} />
          </div>
        </div>
      </main>
      
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this journal entry. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEntry} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default Journal;
