
import React, { useState } from 'react';
import { Book, HeartPulse, Brain, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ResourceCard from '@/components/resources/ResourceCard';

// Sample resource data
const resources = [
  {
    id: 1,
    title: "Understanding Anxiety",
    description: "Learn about the symptoms, causes, and treatments for anxiety disorders.",
    category: "education",
    tags: ["anxiety", "mental health", "symptoms"],
    url: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
    featured: true
  },
  {
    id: 2,
    title: "Mindfulness for Beginners",
    description: "A comprehensive guide to starting a mindfulness practice.",
    category: "education",
    tags: ["mindfulness", "meditation", "beginners"],
    url: "https://www.mindful.org/meditation/mindfulness-getting-started/"
  },
  {
    id: 3,
    title: "National Suicide Prevention Lifeline",
    description: "24/7 confidential support for people in distress.",
    category: "crisis",
    tags: ["crisis", "suicide", "helpline"],
    url: "https://988lifeline.org/",
    featured: true
  },
  {
    id: 4,
    title: "Psychology Today Therapist Directory",
    description: "Find therapists, psychiatrists, treatment centers, and support groups near you.",
    category: "support",
    tags: ["therapy", "mental health", "treatment"],
    url: "https://www.psychologytoday.com/us/therapists"
  },
  {
    id: 5,
    title: "Mental Health and Sleep",
    description: "Understanding the connection between sleep and mental health.",
    category: "education",
    tags: ["sleep", "mental health", "wellness"],
    url: "https://www.sleepfoundation.org/mental-health"
  },
  {
    id: 6,
    title: "Crisis Text Line",
    description: "Text HOME to 741741 to connect with a Crisis Counselor.",
    category: "crisis",
    tags: ["crisis", "text", "support"],
    url: "https://www.crisistextline.org/",
    featured: true
  },
  {
    id: 7,
    title: "NAMI Support Groups",
    description: "Find support groups and resources from the National Alliance on Mental Illness.",
    category: "support",
    tags: ["support group", "community", "NAMI"],
    url: "https://www.nami.org/Support-Education/Support-Groups"
  },
  {
    id: 8,
    title: "Mental Health Apps Guide",
    description: "Reviews and information about mental health apps.",
    category: "tools",
    tags: ["apps", "technology", "self-help"],
    url: "https://mindapps.org/"
  },
  {
    id: 9,
    title: "Breathing Techniques for Anxiety",
    description: "Simple breathing exercises to help manage anxiety symptoms.",
    category: "tools",
    tags: ["anxiety", "breathing", "techniques"],
    url: "https://www.healthline.com/health/breathing-exercises-for-anxiety"
  },
  {
    id: 10,
    title: "Therapy Worksheets",
    description: "Free printable CBT worksheets and resources.",
    category: "tools",
    tags: ["CBT", "worksheets", "therapy"],
    url: "https://www.therapistaid.com/therapy-worksheets"
  },
  {
    id: 11,
    title: "Mental Health America",
    description: "Resources, tools, and information about mental health conditions.",
    category: "education",
    tags: ["resources", "information", "conditions"],
    url: "https://mhanational.org/",
    featured: true
  },
  {
    id: 12,
    title: "Veterans Crisis Line",
    description: "Support for veterans and their loved ones.",
    category: "crisis",
    tags: ["veterans", "crisis", "support"],
    url: "https://www.veteranscrisisline.net/"
  }
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filterResources = () => {
    return resources.filter(resource => {
      // Filter by search query
      if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !resource.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }
      
      // Filter by category
      if (activeTab !== 'all' && resource.category !== activeTab) {
        return false;
      }
      
      return true;
    });
  };
  
  const filteredResources = filterResources();
  
  const getFeaturedResources = () => {
    return resources.filter(resource => resource.featured);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mental Health Resources</h1>
          <p className="text-muted-foreground">
            Explore our curated collection of mental health resources, from crisis support to 
            educational materials and practical tools.
          </p>
        </div>
        
        {/* Featured Resources */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFeaturedResources().map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Tabs 
              defaultValue="all" 
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="crisis">Crisis</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Resource List */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No resources found matching your criteria.</p>
          </div>
        )}
        
        {/* Mental Health Categories */}
        <div className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Mental Health Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                  <HeartPulse className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Crisis Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Immediate resources for those experiencing a mental health crisis or emergency.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Support Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Connect with others facing similar challenges through community and peer support.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                  <Book className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle>Educational Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Learn about mental health conditions, treatments, and wellness strategies.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Self-Help Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Practical exercises, worksheets, and resources to support your mental health journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-12 bg-serenity-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Important Note</h3>
          <p className="text-muted-foreground text-sm">
            These resources are provided for informational purposes only and are not a substitute for 
            professional medical advice, diagnosis, or treatment. If you're experiencing a mental health 
            emergency, please call your local emergency number or the National Suicide Prevention Lifeline 
            at 988.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
