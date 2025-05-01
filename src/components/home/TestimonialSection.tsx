
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah L.",
    text: "The breathing exercises helped me manage my anxiety attacks. I use them daily now and feel more in control.",
    avatar: "SL"
  },
  {
    name: "Michael R.",
    text: "The mood tracking feature helped me identify triggers for my depression. I've been able to make positive changes.",
    avatar: "MR"
  },
  {
    name: "Jamie T.",
    text: "This app provides simple but effective tools. The games are actually fun and help when I'm feeling overwhelmed.",
    avatar: "JT"
  },
  {
    name: "Alex D.",
    text: "The resource library helped me understand what I was experiencing and gave me practical ways to cope.",
    avatar: "AD"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Success Stories</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          Hear from people who have used our tools to support their mental health journey
        </p>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 pl-4">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-4 items-start mb-4">
                      <div className="w-10 h-10 rounded-full bg-serenity-200 flex items-center justify-center text-serenity-700 flex-shrink-0">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-muted-foreground text-sm">User</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="static transform-none mx-2" />
            <CarouselNext className="static transform-none mx-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialSection;
