
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { audioService } from '@/services/audioService';

interface GuidedMeditationProps {
  meditation: {
    id: string;
    title: string;
    description: string;
    duration: number;
    imageUrl: string;
    audioUrl?: string; // Optional audioUrl property
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
  const [imageError, setImageError] = useState(false);
  const { toast } = useToast();
  
  // Default audio if not provided
  const audioUrl = meditation.audioUrl || 'https://soundbible.com/mp3/meditation_gong-daniel_simon.mp3';
  
  // Fallback image in case the original doesn't load
  const fallbackImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=60';
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    // Clean up audio on component unmount
    return () => {
      audioService.stopAudio();
    };
  }, []);
  
  useEffect(() => {
    // Initialize audio when component mounts or when audioUrl changes
    const initAudio = async () => {
      try {
        console.log('Initializing audio with URL:', audioUrl);
        audioService.initializeAudio(audioUrl);
        audioService.setVolume(volume);
        audioService.setMuted(muted);
      } catch (error) {
        console.error("Error initializing audio:", error);
        toast({
          title: "Audio Error",
          description: "Could not load the meditation audio. Please try again.",
          variant: "destructive"
        });
      }
    };
    
    initAudio();
  }, [audioUrl]);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeRemaining > 0) {
      // Play audio when active
      try {
        console.log('Playing audio');
        audioService.playAudio();
      } catch (error) {
        console.error("Error playing audio:", error);
      }
      
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            clearInterval(interval!);
            setIsActive(false);
            audioService.stopAudio();
            toast({
              title: "Meditation Complete",
              description: "Great job completing your meditation session!",
            });
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (!isActive) {
      // Pause audio when not active
      try {
        console.log('Pausing audio');
        audioService.pauseAudio();
      } catch (error) {
        console.error("Error pausing audio:", error);
      }
      
      if (interval) {
        clearInterval(interval);
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining, toast]);
  
  useEffect(() => {
    // Update volume and mute status when they change
    try {
      audioService.setVolume(volume);
      audioService.setMuted(muted);
    } catch (error) {
      console.error("Error setting audio properties:", error);
    }
  }, [volume, muted]);
  
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
    audioService.stopAudio();
  };
  
  const handleBack = () => {
    if (isActive) {
      if (confirm("Your meditation is still in progress. Are you sure you want to exit?")) {
        audioService.stopAudio();
        onBack();
      }
    } else {
      onBack();
    }
  };
  
  const toggleMute = () => {
    setMuted(!muted);
  };
  
  const handleImageError = () => {
    console.error("Error loading image:", meditation.imageUrl);
    setImageError(true);
  };
  
  const progress = ((durationInSeconds - timeRemaining) / durationInSeconds) * 100;
  
  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={handleBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Meditations
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
          <img 
            src={imageError ? fallbackImage : meditation.imageUrl} 
            alt={meditation.title} 
            className="w-full h-full object-cover"
            onError={handleImageError}
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
            
            <div className={`transition-opacity duration-500 ${hasStarted ? 'opacity-100' : 'opacity-0 h-0'}`}>
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
