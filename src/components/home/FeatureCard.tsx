
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color: string;
}

const FeatureCard = ({ title, description, icon: Icon, to, color }: FeatureCardProps) => {
  return (
    <Link to={to}>
      <Card className="h-full transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", color)}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FeatureCard;
