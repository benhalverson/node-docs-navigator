
import React from 'react';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar: React.FC = () => {
  return (
    <header className="w-full py-4 px-4 md:px-8 border-b border-border">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-nodejs-green rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">nodejs.ai</span>
          </div>
        </div>
        
        <nav className="flex items-center gap-4">
          <a href="#features" className="text-sm hover:text-nodejs-green transition-colors hidden md:block">
            Features
          </a>
          <a href="#examples" className="text-sm hover:text-nodejs-green transition-colors hidden md:block">
            Examples
          </a>
          <a href="#about" className="text-sm hover:text-nodejs-green transition-colors hidden md:block">
            About
          </a>
          <Button variant="outline" size="sm" className="gap-2">
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
