
import React from 'react';
import { Book, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SampleSearchResultProps {
  title: string;
  path: string;
  excerpt: string;
  tags?: string[];
  url?: string;
}

const SampleSearchResult: React.FC<SampleSearchResultProps> = ({ 
  title, 
  path, 
  excerpt, 
  tags = [],
  url = "https://nodejs.org/docs/latest/api/"
}) => {
  const handleReadMore = () => {
    window.open(url, '_blank');
  };

  return (
    <div className="border border-border bg-card p-4 rounded-md hover:shadow-md transition-shadow animate-slideIn">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <Book className="h-5 w-5 text-nodejs-green" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{path}</p>
          <p className="text-sm mb-3" dangerouslySetInnerHTML={{ __html: excerpt }} />
          
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-end">
            <span 
              onClick={handleReadMore}
              className="text-xs text-nodejs-green flex items-center gap-1 cursor-pointer hover:underline"
            >
              Read more <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleSearchResult;
