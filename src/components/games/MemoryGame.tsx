
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Mental health themed memory cards
const cardImages = [
  { id: 1, name: 'meditation', emoji: '🧘' },
  { id: 2, name: 'nature', emoji: '🌳' },
  { id: 3, name: 'exercise', emoji: '🏃' },
  { id: 4, name: 'sleep', emoji: '😴' },
  { id: 5, name: 'water', emoji: '💧' },
  { id: 6, name: 'food', emoji: '🍎' },
  { id: 7, name: 'journal', emoji: '📓' },
  { id: 8, name: 'connect', emoji: '👫' },
];

interface Card {
  id: number;
  name: string;
  emoji: string;
  matched: boolean;
  flipped: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState<Card | null>(null);
  const [secondChoice, setSecondChoice] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { toast } = useToast();
  
  // Create a new game
  const startNewGame = () => {
    // Duplicate and shuffle cards
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        id: index,
        matched: false,
        flipped: false,
      }));
    
    setCards(shuffledCards);
    setTurns(0);
    setFirstChoice(null);
    setSecondChoice(null);
    setGameStarted(true);
    setGameCompleted(false);
  };
  
  // Handle card selection
  const handleChoice = (card: Card) => {
    // Prevent selecting the same card twice or already matched cards
    if (card.matched || card.flipped || disabled) return;
    
    if (!firstChoice) {
      // First card selected
      setFirstChoice(card);
      flipCard(card.id, true);
    } else {
      // Second card selected
      setSecondChoice(card);
      flipCard(card.id, true);
      setTurns(prev => prev + 1);
      setDisabled(true);
    }
  };
  
  // Flip a card
  const flipCard = (id: number, flipped: boolean) => {
    setCards(prev => 
      prev.map(card => 
        card.id === id ? { ...card, flipped } : card
      )
    );
  };
  
  // Reset choices
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };
  
  // Check if the game is completed
  useEffect(() => {
    if (gameStarted && cards.length > 0 && cards.every(card => card.matched)) {
      setGameCompleted(true);
      toast({
        title: "Game Completed!",
        description: `You completed the game in ${turns} turns.`,
      });
    }
  }, [cards, gameStarted, toast, turns]);
  
  // Compare selected cards
  useEffect(() => {
    if (firstChoice && secondChoice) {
      // Check for a match
      if (firstChoice.name === secondChoice.name) {
        // Mark cards as matched
        setCards(prev => 
          prev.map(card => 
            card.name === firstChoice.name ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        // Flip cards back after a delay
        setTimeout(() => {
          flipCard(firstChoice.id, false);
          flipCard(secondChoice.id, false);
          resetTurn();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice]);
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-1">Mindful Memory</h2>
            <p className="text-muted-foreground mb-4">
              Match pairs of cards related to mental health practices. Focus on the present moment and train your memory.
            </p>
            
            {gameStarted && (
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Turns: {turns}</span>
                <Button onClick={startNewGame} variant="outline">
                  New Game
                </Button>
              </div>
            )}
          </div>
          
          {!gameStarted && !gameCompleted && (
            <div className="text-center mb-8">
              <Button 
                onClick={startNewGame}
                className="bg-serenity-600 hover:bg-serenity-700"
                size="lg"
              >
                Start Game
              </Button>
            </div>
          )}
          
          {gameStarted && (
            <div className="grid grid-cols-4 gap-3">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all transform ${
                    card.flipped
                      ? 'bg-white scale-[1.05]'
                      : 'bg-serenity-100 hover:bg-serenity-200'
                  } ${card.matched ? 'bg-green-100 cursor-default' : ''}`}
                  onClick={() => handleChoice(card)}
                >
                  {card.flipped || card.matched ? (
                    <span className="text-4xl">{card.emoji}</span>
                  ) : (
                    <span className="text-4xl text-serenity-100">?</span>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {gameCompleted && (
            <div className="text-center mt-8">
              <h3 className="text-xl font-bold text-green-600 mb-4">
                Congratulations! You completed the game!
              </h3>
              <p className="mb-4">
                You matched all pairs in {turns} turns.
              </p>
              <Button 
                onClick={startNewGame}
                className="bg-serenity-600 hover:bg-serenity-700"
              >
                Play Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MemoryGame;
