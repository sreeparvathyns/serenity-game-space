
import React, { useState, useEffect } from 'react';

const BreathingExercise = () => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  const phaseDetails = {
    inhale: { duration: 4000, message: 'Breathe In' },
    hold: { duration: 2000, message: 'Hold' },
    exhale: { duration: 4000, message: 'Breathe Out' },
    pause: { duration: 2000, message: 'Pause' },
  };
  
  useEffect(() => {
    if (!isActive) return;
    
    const duration = phaseDetails[phase].duration;
    let startTime: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      if (elapsed < duration) {
        setProgress(elapsed / duration);
        requestAnimationFrame(step);
      } else {
        setProgress(1);
        // Move to next phase
        switch (phase) {
          case 'inhale': setPhase('hold'); break;
          case 'hold': setPhase('exhale'); break;
          case 'exhale': setPhase('pause'); break;
          case 'pause': setPhase('inhale'); break;
        }
      }
    };
    
    requestAnimationFrame(step);
    
    return () => {
      // cleanup
    };
  }, [phase, isActive]);
  
  const toggleExercise = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setPhase('inhale');
      setProgress(0);
    }
  };
  
  const getCircleStyle = () => {
    switch (phase) {
      case 'inhale':
        return { transform: `scale(${0.5 + progress * 0.5})` };
      case 'hold':
        return { transform: 'scale(1)' };
      case 'exhale':
        return { transform: `scale(${1 - progress * 0.5})` };
      case 'pause':
        return { transform: 'scale(0.5)' };
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-medium text-serenity-800 mb-4">Try a quick breathing exercise</h3>
      
      <div className="relative w-48 h-48 mb-6">
        <div
          className="absolute inset-0 bg-serenity-100 rounded-full transition-all duration-200"
          style={getCircleStyle()}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-lg font-medium text-serenity-700">
            {isActive ? phaseDetails[phase].message : 'Ready?'}
          </p>
        </div>
      </div>
      
      <button
        className={`px-6 py-2 rounded-full font-medium transition-colors ${
          isActive
            ? 'bg-red-100 text-red-700 hover:bg-red-200'
            : 'bg-serenity-100 text-serenity-700 hover:bg-serenity-200'
        }`}
        onClick={toggleExercise}
      >
        {isActive ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

export default BreathingExercise;
