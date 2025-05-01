
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

const BreathingGame = () => {
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [phaseTime, setPhaseTime] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  
  // Game settings
  const bubbleInterval = 1000; // ms between new bubbles
  const breathCycleDuration = 8000; // 8 seconds per cycle (4 in, 4 out)
  
  // Initialize game
  useEffect(() => {
    if (gameActive) {
      setScore(0);
      setTimeLeft(60);
      setBubbles([]);
      
      // Start timer
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Add bubbles periodically
      const bubbleTimer = setInterval(() => {
        if (breathPhase === 'exhale') {
          addBubble();
        }
      }, bubbleInterval);
      
      return () => {
        clearInterval(timer);
        clearInterval(bubbleTimer);
        cancelAnimationFrame(requestRef.current!);
      };
    }
  }, [gameActive, breathPhase]);
  
  // Breathing cycle
  useEffect(() => {
    if (gameActive) {
      const breathTimer = setInterval(() => {
        setPhaseTime((prev) => {
          if (prev >= breathCycleDuration / 2) {
            setBreathPhase(breathPhase === 'inhale' ? 'exhale' : 'inhale');
            return 0;
          }
          return prev + 100;
        });
      }, 100);
      
      return () => clearInterval(breathTimer);
    }
  }, [gameActive, breathPhase]);
  
  // Animation loop
  useEffect(() => {
    if (gameActive && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw background
          ctx.fillStyle = '#f3f1fe';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw bubbles
          bubbles.forEach((bubble) => {
            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(155, 135, 245, ${0.4 + Math.sin(Date.now() * 0.003) * 0.2})`;
            ctx.fill();
            ctx.strokeStyle = '#7857ea';
            ctx.stroke();
          });
          
          // Draw breath indicator
          const indicatorY = canvas.height - 50;
          const indicatorWidth = canvas.width - 100;
          const indicatorHeight = 20;
          const indicatorX = 50;
          
          // Background
          ctx.fillStyle = '#e9e4fd';
          ctx.fillRect(indicatorX, indicatorY, indicatorWidth, indicatorHeight);
          
          // Progress
          const progress = phaseTime / (breathCycleDuration / 2);
          ctx.fillStyle = breathPhase === 'inhale' ? '#9b87f5' : '#7857ea';
          ctx.fillRect(
            indicatorX, 
            indicatorY, 
            indicatorWidth * progress, 
            indicatorHeight
          );
          
          // Text
          ctx.fillStyle = '#000';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(
            breathPhase === 'inhale' ? 'Breathe In' : 'Breathe Out',
            canvas.width / 2,
            indicatorY - 10
          );
          
          // Move bubbles
          setBubbles((prevBubbles) => 
            prevBubbles
              .map((bubble) => ({
                ...bubble,
                y: bubble.y - bubble.speed,
              }))
              .filter((bubble) => bubble.y + bubble.size > 0)
          );
          
          requestRef.current = requestAnimationFrame(animate);
        };
        
        requestRef.current = requestAnimationFrame(animate);
        
        return () => {
          cancelAnimationFrame(requestRef.current!);
        };
      }
    }
  }, [bubbles, gameActive, breathPhase, phaseTime]);
  
  const addBubble = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const newBubble = {
      id: Date.now(),
      x: Math.random() * (canvas.width - 50) + 25,
      y: canvas.height + 50,
      size: Math.random() * 30 + 20,
      speed: Math.random() * 2 + 1,
    };
    
    setBubbles((prev) => [...prev, newBubble]);
  };
  
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if correct phase for popping
    if (breathPhase !== 'inhale') {
      return;
    }
    
    // Check if click is on a bubble
    setBubbles((prevBubbles) => {
      let popped = false;
      
      const newBubbles = prevBubbles.filter((bubble) => {
        const dx = bubble.x - x;
        const dy = bubble.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= bubble.size) {
          popped = true;
          setScore((prev) => prev + 10);
          return false;
        }
        return true;
      });
      
      return newBubbles;
    });
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-1">Breathing Bubbles</h2>
            <p className="text-muted-foreground">
              Follow the breathing pattern. Pop bubbles when breathing in, watch them rise when breathing out.
            </p>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-medium">Score: {score}</div>
            <div className="text-lg font-medium">Time: {timeLeft}s</div>
          </div>
          
          <div className="relative w-full">
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              className="border rounded-lg w-full h-auto"
              onClick={handleCanvasClick}
            />
            
            {!gameActive && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 p-8 rounded-lg text-center">
                  <h3 className="text-xl font-bold mb-4">Breathing Bubbles</h3>
                  <p className="mb-6 text-muted-foreground">
                    Follow the breathing guide. Pop bubbles when breathing in, watch them rise when breathing out.
                    Synchronizing your breath with the game helps practice mindful breathing.
                  </p>
                  <Button 
                    onClick={() => setGameActive(true)}
                    className="bg-serenity-600 hover:bg-serenity-700"
                  >
                    Start Game
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreathingGame;
