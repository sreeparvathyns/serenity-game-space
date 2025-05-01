
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const colors = [
  '#9b87f5', // serenity-400
  '#7857ea', // serenity-500
  '#6e42db', // serenity-600
  '#f97316', // orange
  '#22c55e', // green
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#14b8a6', // teal
  '#f59e0b', // amber
];

// Simple mandala patterns for coloring
const patterns = [
  {
    id: 1,
    name: 'Simple Mandala',
    sections: 8,
    complexity: 'low',
  },
  {
    id: 2,
    name: 'Flower Mandala',
    sections: 12,
    complexity: 'medium',
  },
  {
    id: 3,
    name: 'Star Mandala',
    sections: 16,
    complexity: 'high',
  }
];

const ColorRelaxGame = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedPattern, setSelectedPattern] = useState(patterns[0]);
  const [coloredSections, setColoredSections] = useState<Record<string, string>>({});
  const [showIntro, setShowIntro] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Draw the selected pattern
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#f3f1fe';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw pattern outline
    drawPattern(ctx, centerX, centerY, radius);
    
    // Fill in colored sections
    Object.entries(coloredSections).forEach(([sectionId, color]) => {
      const [ringIndex, sectionIndex] = sectionId.split('-').map(Number);
      fillSection(ctx, centerX, centerY, radius, ringIndex, sectionIndex, color);
    });
  }, [selectedPattern, coloredSections]);
  
  const drawPattern = (
    ctx: CanvasRenderingContext2D, 
    centerX: number, 
    centerY: number, 
    maxRadius: number
  ) => {
    const { sections, complexity } = selectedPattern;
    const rings = complexity === 'low' ? 3 : complexity === 'medium' ? 4 : 5;
    
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    
    // Draw rings
    for (let r = 1; r <= rings; r++) {
      const currentRadius = (maxRadius / rings) * r;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw sections
      for (let s = 0; s < sections; s++) {
        const angle = (Math.PI * 2 * s) / sections;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + currentRadius * Math.cos(angle),
          centerY + currentRadius * Math.sin(angle)
        );
        ctx.stroke();
      }
    }
    
    // Draw inner and outer decorative elements based on complexity
    if (complexity === 'medium' || complexity === 'high') {
      for (let s = 0; s < sections; s++) {
        const angle = (Math.PI * 2 * s) / sections;
        const outerRadius = maxRadius + 10;
        
        ctx.beginPath();
        ctx.arc(
          centerX + outerRadius * Math.cos(angle),
          centerY + outerRadius * Math.sin(angle),
          5,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
    }
    
    if (complexity === 'high') {
      for (let s = 0; s < sections * 2; s++) {
        const angle = (Math.PI * 2 * s) / (sections * 2);
        const middleRadius = maxRadius * 0.6;
        
        ctx.beginPath();
        ctx.moveTo(
          centerX + (middleRadius - 15) * Math.cos(angle),
          centerY + (middleRadius - 15) * Math.sin(angle)
        );
        ctx.lineTo(
          centerX + (middleRadius + 15) * Math.cos(angle),
          centerY + (middleRadius + 15) * Math.sin(angle)
        );
        ctx.stroke();
      }
    }
  };
  
  const fillSection = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    maxRadius: number,
    ringIndex: number,
    sectionIndex: number,
    color: string
  ) => {
    const { sections } = selectedPattern;
    const rings = selectedPattern.complexity === 'low' ? 3 : 
                 selectedPattern.complexity === 'medium' ? 4 : 5;
    
    const innerRadius = ringIndex === 0 ? 0 : (maxRadius / rings) * ringIndex;
    const outerRadius = (maxRadius / rings) * (ringIndex + 1);
    
    const startAngle = (Math.PI * 2 * sectionIndex) / sections;
    const endAngle = (Math.PI * 2 * (sectionIndex + 1)) / sections;
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
    ctx.stroke();
  };
  
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Calculate distance from center and angle
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx);
    if (angle < 0) angle += Math.PI * 2;
    
    const maxRadius = Math.min(centerX, centerY) * 0.8;
    const rings = selectedPattern.complexity === 'low' ? 3 : 
                 selectedPattern.complexity === 'medium' ? 4 : 5;
    
    // Determine which ring was clicked
    if (distance > maxRadius) return; // Outside the mandala
    
    const ringIndex = Math.floor((distance / maxRadius) * rings);
    
    // Determine which section was clicked
    const { sections } = selectedPattern;
    const sectionIndex = Math.floor((angle / (Math.PI * 2)) * sections);
    
    // Update colored sections
    const sectionId = `${ringIndex}-${sectionIndex}`;
    setColoredSections((prev) => ({
      ...prev,
      [sectionId]: selectedColor,
    }));
  };
  
  const resetColoring = () => {
    setColoredSections({});
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-1">Color & Relax</h2>
            <p className="text-muted-foreground">
              Color this mandala pattern to practice mindfulness and relaxation. Take your time and enjoy the process.
            </p>
          </div>
          
          {showIntro ? (
            <div className="text-center p-8">
              <h3 className="text-xl font-semibold mb-4">Welcome to Color & Relax</h3>
              <p className="mb-6 text-muted-foreground">
                Coloring can be a form of meditation that helps reduce anxiety and increase mindfulness.
                Take your time, focus on each section, and enjoy the calming effects of this simple activity.
              </p>
              <Button 
                onClick={() => setShowIntro(false)}
                className="bg-serenity-600 hover:bg-serenity-700"
                size="lg"
              >
                Start Coloring
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="w-full md:w-1/4 space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Choose a Pattern</h3>
                    <div className="space-y-2">
                      {patterns.map((pattern) => (
                        <div
                          key={pattern.id}
                          className={`p-3 rounded-md cursor-pointer ${
                            selectedPattern.id === pattern.id
                              ? 'bg-serenity-100 border border-serenity-400'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                          onClick={() => setSelectedPattern(pattern)}
                        >
                          <div className="font-medium">{pattern.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Complexity: {pattern.complexity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Choose a Color</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {colors.map((color) => (
                        <div
                          key={color}
                          className={`w-full aspect-square rounded-md cursor-pointer ${
                            selectedColor === color ? 'ring-2 ring-black' : ''
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Button variant="outline" className="w-full" onClick={resetColoring}>
                      Reset Coloring
                    </Button>
                  </div>
                </div>
                
                <div className="w-full md:w-3/4">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={600}
                    className="w-full border rounded-lg cursor-pointer"
                    onClick={handleCanvasClick}
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorRelaxGame;
