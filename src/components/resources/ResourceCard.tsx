
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ResourceProps {
  resource: {
    id: number;
    title: string;
    description: string;
    category: string;
    tags: string[];
    url: string;
    featured?: boolean;
  };
}

const ResourceCard = ({ resource }: ResourceProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'crisis':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'support':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'education':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'tools':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  
  return (
    <Card className={`h-full flex flex-col ${resource.featured ? 'border-serenity-300' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          <Badge className={getCategoryColor(resource.category)}>
            {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
          </Badge>
        </div>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {resource.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            Visit Resource
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
