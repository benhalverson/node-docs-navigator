
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-nodejs-darkBlue/40 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeIn">
      <div className="flex items-center mb-4">
        <div className="bg-nodejs-green/10 p-3 rounded-full mr-4">
          <Icon className="h-6 w-6 text-nodejs-green" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
