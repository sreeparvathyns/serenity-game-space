
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';

interface GuidedMeditationProps {
  meditation: {
    id: string;
    title: string;
    description: string;
    duration: number;
    imageUrl: string;
  };
  onBack: () => void;
}

const GuidedMeditation = ({ meditation, onBack }: GuidedMeditationProps) => {
  const durationInSeconds = meditation.duration * 60;
  const [timeRemaining, setTimeRemaining] = useState(durationInSeconds);
  const [isActive, setIsActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const { toast } = useToast();
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            clearInterval(interval!);
            setIsActive(false);
            toast({
              title: "Meditation Complete",
              description: "Great job completing your meditation session!",
            });
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining, toast]);
  
  const toggleMeditation = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    setIsActive(!isActive);
  };
  
  const resetMeditation = () => {
    setIsActive(false);
    setTimeRemaining(durationInSeconds);
    setHasStarted(false);
  };
  
  const handleBack = () => {
    if (isActive) {
      if (confirm("Your meditation is still in progress. Are you sure you want to exit?")) {
        onBack();
      }
    } else {
      onBack();
    }
  };
  
  const toggleMute = () => {
    setMuted(!muted);
  };
  
  const progress = ((durationInSeconds - timeRemaining) / durationInSeconds) * 100;
  
  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={handleBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Meditations
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <img 
            src={meditation.imageUrl} 
            alt={meditation.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h2 className="text-2xl font-bold mb-1">{meditation.title}</h2>
              <p className="text-white/80">{meditation.duration} minutes</p>
            </div>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">About this meditation</h3>
              <p className="text-muted-foreground">{meditation.description}</p>
            </div>
            
            <div className={`transition-opacity duration-500 ${hasStarted ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex justify-center mb-4">
                <div className="text-3xl font-mono">
                  {formatTime(timeRemaining)}
                </div>
              </div>
              
              <div className="mb-6">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <Button 
                  onClick={toggleMeditation}
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
                      {hasStarted ? 'Resume' : 'Start Meditation'}
                    </>
                  )}
                </Button>
              </div>
              
              {hasStarted && (
                <>
                  <div className="flex items-center gap-4">
                    <Button onClick={toggleMute} variant="ghost" size="icon">
                      {muted ? <VolumeX /> : <Volume2 />}
                    </Button>
                    <Slider
                      value={[muted ? 0 : volume]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => {
                        setVolume(value[0]);
                        setMuted(value[0] === 0);
                      }}
                    />
                  </div>
                  
                  <Button onClick={resetMeditation} variant="outline" size="sm" className="self-end">
                    Reset
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuidedMeditation;
