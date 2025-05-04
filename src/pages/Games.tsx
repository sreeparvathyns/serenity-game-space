
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BreathingGame from '@/components/games/BreathingGame';
import MemoryGame from '@/components/games/MemoryGame';
import ColorRelaxGame from '@/components/games/ColorRelaxGame';

const Games = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  
  const games = [
    {
      id: "breathing",
      title: "Breathing Bubbles",
      description: "Pop bubbles by breathing in rhythm to reduce anxiety",
      image: "https://images.unsplash.com/photo-1551376347-075b0121a292?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1YmJsZXN8ZW58MHx8MHx8fDA%3D",
      component: BreathingGame
    },
    {
      id: "memory",
      title: "Mindful Memory",
      description: "Improve focus and memory with this matching game",
      image: "https://images.unsplash.com/photo-1605001008695-7b9bc1bdc0f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbW9yeSUyMGdhbWV8ZW58MHx8MHx8fDA%3D",
      component: MemoryGame
    },
    {
      id: "colorrelax",
      title: "Color & Relax",
      description: "A simple coloring activity to calm your mind",
      image: "https://images.unsplash.com/photo-1513708929605-6dd0e1b081bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbG9yaW5nJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D",
      component: ColorRelaxGame
    }
  ];
  
  const renderActiveGame = () => {
    const game = games.find(g => g.id === activeGame);
    if (!game) return null;
    
    const GameComponent = game.component;
    return (
      <div className="mt-4">
        <button 
          onClick={() => setActiveGame(null)} 
          className="text-serenity-600 hover:text-serenity-800 font-medium mb-4 flex items-center"
        >
          ← Back to Games
        </button>
        {activeGame === "breathing" && (
          <div className="mb-6">
            <AspectRatio ratio={16/9} className="overflow-hidden rounded-lg mb-4">
              <img 
                src="https://images.unsplash.com/photo-1551376347-075b0121a292?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1YmJsZXN8ZW58MHx8MHx8fDA%3D"
                alt="Breathing Bubbles Visualization"
                className="w-full h-full object-cover"
              />
            </AspectRatio>
            <p className="text-center text-muted-foreground italic mb-4">
              "Breathe in slowly as bubbles rise, breathe out as they float away. Find your rhythm and calm your mind."
            </p>
          </div>
        )}
        <GameComponent />
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl font-bold mb-2">Mental Wellness Games</h1>
          <p className="text-muted-foreground">
            Simple games designed to help you relax, focus, and improve your mental wellbeing.
            These activities can be a healthy way to take a break and practice mindfulness.
          </p>
        </div>
        
        {activeGame ? (
          renderActiveGame()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card 
                key={game.id} 
                className="overflow-hidden cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]"
                onClick={() => setActiveGame(game.id)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      console.log(`Error loading image for ${game.title}`);
                      e.currentTarget.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=60";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-semibold">{game.title}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm">{game.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {!activeGame && (
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4">Why Play Mental Wellness Games?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Reduce Stress</h3>
                <p className="text-muted-foreground">
                  These games provide a healthy distraction from stress and anxiety, helping you relax.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Improve Focus</h3>
                <p className="text-muted-foreground">
                  Many of these games require concentration, which can help train your attention skills.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Practice Mindfulness</h3>
                <p className="text-muted-foreground">
                  These activities encourage you to stay present and engaged in the moment.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Games;
