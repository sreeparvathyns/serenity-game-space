
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const quotes = [
  {
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman"
  },
  {
    text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
    author: "Noam Shpancer"
  },
  {
    text: "Self-care is how you take your power back.",
    author: "Lalah Delia"
  },
  {
    text: "There is hope, even when your brain tells you there isn't.",
    author: "John Green"
  },
  {
    text: "You are not alone. You are seen. I am with you. You are not alone.",
    author: "Shonda Rhimes"
  }
];

const QuoteSection = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-16 bg-serenity-50">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <Card className="border-none shadow-lg bg-white overflow-hidden">
            <CardContent className="p-8 md:p-10">
              <div className="text-5xl text-serenity-300 font-serif leading-none mb-4">"</div>
              <blockquote className="text-xl md:text-2xl font-medium text-serenity-900 mb-4">
                {quotes[currentQuote].text}
              </blockquote>
              <footer className="text-right text-muted-foreground">
                — {quotes[currentQuote].author}
              </footer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
