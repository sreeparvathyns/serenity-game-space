
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MindfulnessTimer from '@/components/mindfulness/MindfulnessTimer';

// Validate image URLs are correct and accessible
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

const Mindfulness = () => {
  const [selectedExercise, setSelectedExercise] = useState<typeof mindfulnessExercises[0] | null>(null);
  
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
        
        <div className="space-y-6">
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
        </div>
        
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
