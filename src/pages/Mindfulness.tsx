
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MindfulnessTimer from '@/components/mindfulness/MindfulnessTimer';
import GuidedMeditation from '@/components/mindfulness/GuidedMeditation';

const mindfulnessExercises = [
  {
    id: "breathing",
    title: "Deep Breathing",
    description: "Focus on your breath to calm your mind",
    duration: 5,
    instructions: [
      "Find a comfortable seated position",
      "Close your eyes and relax your body",
      "Inhale deeply through your nose for 4 seconds",
      "Hold your breath for 2 seconds",
      "Exhale slowly through your mouth for 6 seconds",
      "Repeat this cycle for the duration of the exercise"
    ]
  },
  {
    id: "body-scan",
    title: "Body Scan",
    description: "Gradually focus attention on each part of your body",
    duration: 10,
    instructions: [
      "Lie down or sit comfortably",
      "Close your eyes and take a few deep breaths",
      "Start by focusing on your feet",
      "Slowly move your attention upward through your body",
      "Notice any sensations without judgment",
      "Release tension as you move through each area"
    ]
  },
  {
    id: "visualization",
    title: "Peaceful Place",
    description: "Visualize a calm and peaceful environment",
    duration: 8,
    instructions: [
      "Close your eyes and take several deep breaths",
      "Imagine a place where you feel safe and peaceful",
      "Notice the details of this place using all your senses",
      "What can you see, hear, smell, and feel?",
      "Take your time exploring this peaceful place",
      "When ready, slowly bring your awareness back"
    ]
  }
];

const guidedMeditations = [
  {
    id: "stress-relief",
    title: "Stress Relief",
    description: "A guided meditation to help reduce stress and anxiety",
    duration: 10,
    imageUrl: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVsYXglMjBtZWRpdGF0aW9ufGVufDB8fDB8fHww",
    audioUrl: "https://storage.googleapis.com/mind-website-prod/guided-meditations/Meditation_stress_relief_3min.mp3"
  },
  {
    id: "sleep-well",
    title: "Sleep Well",
    description: "Calm your mind and prepare for restful sleep",
    duration: 15,
    imageUrl: "https://images.unsplash.com/photo-1511295842304-9d6124fed2ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2xlZXB8ZW58MHx8MHx8fDA%3D",
    audioUrl: "https://storage.googleapis.com/mind-website-prod/guided-meditations/Meditation_sleep_5min.mp3"
  },
  {
    id: "morning-energy",
    title: "Morning Energy",
    description: "Start your day with positive energy and intention",
    duration: 8,
    imageUrl: "https://images.unsplash.com/photo-1506252374453-ef01bde4595d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9ybmluZyUyMHN1bnJpc2V8ZW58MHx8MHx8fDA%3D",
    audioUrl: "https://storage.googleapis.com/mind-website-prod/guided-meditations/Meditation_morning_3min.mp3"
  },
  {
    id: "self-compassion",
    title: "Self-Compassion",
    description: "Develop kindness and compassion toward yourself",
    duration: 12,
    imageUrl: "https://images.unsplash.com/photo-1602192509154-0b900ee1f851?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VsZiUyMGxvdmV8ZW58MHx8MHx8fDA%3D",
    audioUrl: "https://storage.googleapis.com/mind-website-prod/guided-meditations/Meditation_compassion_5min.mp3"
  }
];

const Mindfulness = () => {
  const [selectedExercise, setSelectedExercise] = useState<typeof mindfulnessExercises[0] | null>(null);
  const [selectedMeditation, setSelectedMeditation] = useState<typeof guidedMeditations[0] | null>(null);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8 max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Mindfulness Exercises</h1>
          <p className="text-muted-foreground">
            Take a moment for yourself with these mindfulness practices designed to help reduce stress, 
            improve focus, and enhance your overall mental wellbeing.
          </p>
        </div>
        
        <Tabs defaultValue="exercises" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="exercises">Simple Exercises</TabsTrigger>
            <TabsTrigger value="guided">Guided Meditations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="exercises" className="space-y-6">
            {selectedExercise ? (
              <MindfulnessTimer 
                exercise={selectedExercise} 
                onBack={() => setSelectedExercise(null)} 
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mindfulnessExercises.map((exercise) => (
                  <Card key={exercise.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-1">{exercise.title}</h3>
                        <p className="text-muted-foreground text-sm">{exercise.description}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{exercise.duration} minutes</span>
                        <Button onClick={() => setSelectedExercise(exercise)}>
                          <Play className="mr-2 h-4 w-4" />
                          Start
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="guided" className="space-y-6">
            {selectedMeditation ? (
              <GuidedMeditation 
                meditation={selectedMeditation} 
                onBack={() => setSelectedMeditation(null)} 
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guidedMeditations.map((meditation) => (
                  <Card key={meditation.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={meditation.imageUrl} 
                        alt={meditation.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="rounded-full bg-white/80 hover:bg-white"
                          onClick={() => setSelectedMeditation(meditation)}
                        >
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-2">
                        <h3 className="text-xl font-semibold">{meditation.title}</h3>
                        <p className="text-muted-foreground text-sm">{meditation.description}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{meditation.duration} minutes</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedMeditation(meditation)}
                        >
                          Start Meditation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">Benefits of Mindfulness</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Reduced Stress</h3>
              <p className="text-muted-foreground">
                Regular mindfulness practice has been shown to lower stress hormones and reduce anxiety levels.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Improved Focus</h3>
              <p className="text-muted-foreground">
                Mindfulness trains your attention and helps you stay present, enhancing concentration and productivity.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Better Sleep</h3>
              <p className="text-muted-foreground">
                Calming your mind with mindfulness can help you fall asleep faster and improve sleep quality.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Mindfulness;
