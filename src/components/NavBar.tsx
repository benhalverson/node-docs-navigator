
import React from 'react';
import { Github, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <header className="w-full py-4 px-4 md:px-8 border-b border-border">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-nodejs-green rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">nodejs.ai</span>
          </Link>
        </div>
        
        <nav className="flex items-center gap-4">
          <Link to="/#features" className="text-sm hover:text-nodejs-green transition-colors hidden md:block">
            Features
          </Link>
          <Link to="/#examples" className="text-sm hover:text-nodejs-green transition-colors hidden md:block">
            Examples
          </Link>
          <Link to="/chat" className="text-sm hover:text-nodejs-green transition-colors flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">AI Chat</span>
          </Link>
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
