
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Calendar, Heart, Lightbulb, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeatureCard from '@/components/home/FeatureCard';
import QuoteSection from '@/components/home/QuoteSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import BreathingExercise from '@/components/home/BreathingExercise';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-serenity-50 to-serenity-100 py-16 md:py-24">
          <div className="container flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-serenity-950 mb-4">
                Your Path to <span className="text-serenity-600">Mental Wellness</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-md">
                Tools, exercises, and resources to support your mental health journey — all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-serenity-600 hover:bg-serenity-700">
                  <Link to="/mindfulness">Start a Mindfulness Session</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/mood">Track Your Mood</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-serenity-200 animate-float" />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-serenity-300/50 animate-float" style={{ animationDelay: '2s' }} />
                <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 md:p-8">
                  <BreathingExercise />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-4 w-12 h-12 bg-serenity-200 rounded-full animate-pulse-gentle hidden md:block" />
          <div className="absolute bottom-12 right-8 w-8 h-8 bg-serenity-300 rounded-full animate-pulse-gentle hidden md:block" style={{ animationDelay: '1s' }} />
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Tools For Your Mental Health Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                title="Mood Tracking" 
                description="Keep a daily log of your emotions to identify patterns and triggers"
                icon={Brain} 
                to="/mood"
                color="bg-serenity-100 text-serenity-700"
              />
              <FeatureCard 
                title="Mindfulness Exercises" 
                description="Guided sessions to help you practice mindfulness and reduce stress"
                icon={Heart} 
                to="/mindfulness"
                color="bg-blue-100 text-blue-700"
              />
              <FeatureCard 
                title="Mental Games" 
                description="Simple, calming games designed to reduce anxiety and improve focus"
                icon={Lightbulb} 
                to="/games"
                color="bg-green-100 text-green-700"
              />
              <FeatureCard 
                title="Resource Library" 
                description="Helpful articles and resources for understanding mental health"
                icon={Book} 
                to="/resources"
                color="bg-amber-100 text-amber-700"
              />
              <FeatureCard 
                title="Daily Journal" 
                description="A private space to record your thoughts and reflections"
                icon={Calendar} 
                to="/journal"
                color="bg-rose-100 text-rose-700"
              />
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <QuoteSection />
        
        {/* Testimonials Section */}
        <TestimonialSection />
        
        {/* CTA Section */}
        <section className="bg-serenity-100 py-16">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Start Your Wellness Journey?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Whether you're experiencing a difficult time or simply want to maintain good mental health, Serenity is here to help.
            </p>
            <Button asChild size="lg" className="bg-serenity-600 hover:bg-serenity-700">
              <Link to="/mindfulness">Begin with a Mindfulness Exercise</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
