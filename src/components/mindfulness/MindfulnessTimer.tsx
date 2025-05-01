
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { audioService } from '@/services/audioService';

interface MindfulnessExercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  instructions: string[];
}

interface MindfulnessTimerProps {
  exercise: MindfulnessExercise;
  onBack: () => void;
}

// Ambient sound for mindfulness exercises
const AMBIENT_SOUND_URL = 'https://soundbible.com/mp3/rainforest_ambience-GlorySunz-1938133500.mp3';

const MindfulnessTimer = ({ exercise, onBack }: MindfulnessTimerProps) => {
  const durationInSeconds = exercise.duration * 60;
  const [timeRemaining, setTimeRemaining] = useState(durationInSeconds);
  const [isActive, setIsActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentInstruction, setCurrentInstruction] = useState(0);
  const { toast } = useToast();
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Initialize audio
  useEffect(() => {
    audioService.initializeAudio(AMBIENT_SOUND_URL);
    audioService.setVolume(60); // Lower volume for ambient sounds
    
    return () => {
      audioService.stopAudio();
    };
  }, []);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeRemaining > 0) {
      // Play ambient sound
      audioService.playAudio();
      
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            clearInterval(interval!);
            setIsActive(false);
            audioService.stopAudio();
            toast({
              title: "Exercise Complete",
              description: "Great job completing your mindfulness exercise!",
            });
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (!isActive) {
      // Pause ambient sound
      audioService.pauseAudio();
      
      if (interval) {
        clearInterval(interval);
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining, toast]);
  
  useEffect(() => {
    // Cycle through instructions
    if (isActive && exercise.instructions.length > 1) {
      const instructionInterval = setInterval(() => {
        setCurrentInstruction((current) => 
          (current + 1) % exercise.instructions.length
        );
      }, 10000); // Change instruction every 10 seconds
      
      return () => clearInterval(instructionInterval);
    }
  }, [isActive, exercise.instructions.length]);
  
  const toggleTimer = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeRemaining(durationInSeconds);
    setCurrentInstruction(0);
    setHasStarted(false);
    audioService.stopAudio();
  };
  
  const handleBack = () => {
    if (isActive) {
      if (confirm("Your session is still in progress. Are you sure you want to exit?")) {
        audioService.stopAudio();
        onBack();
      }
    } else {
      onBack();
    }
  };
  
  const progress = ((durationInSeconds - timeRemaining) / durationInSeconds) * 100;
  
  return (
    <div className="max-w-3xl mx-auto">
      <Button variant="ghost" onClick={handleBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Exercises
      </Button>
      
      <Card className="overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">{exercise.title}</h2>
            <p className="text-muted-foreground">{exercise.description}</p>
          </div>
          
          <div className={`transition-opacity duration-500 ${hasStarted ? 'opacity-100' : 'opacity-0 h-0'}`}>
            <div className="flex items-center justify-center mb-8">
              <div className="text-4xl font-mono">
                {formatTime(timeRemaining)}
              </div>
            </div>
            
            <div className="mb-8">
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="bg-serenity-50 p-6 rounded-lg mb-8 min-h-[100px] flex items-center justify-center">
              <p className="text-center text-lg">
                {exercise.instructions[currentInstruction]}
              </p>
            </div>
          </div>
          
          {!hasStarted && (
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-lg">Instructions:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={toggleTimer}
              className={`${isActive ? 'bg-amber-600 hover:bg-amber-700' : 'bg-serenity-600 hover:bg-serenity-700'}`}
              size="lg"
            >
              {isActive ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  {hasStarted ? 'Resume' : 'Start'}
                </>
              )}
            </Button>
            
            {hasStarted && (
              <Button onClick={resetTimer} variant="outline" size="lg">
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MindfulnessTimer;
