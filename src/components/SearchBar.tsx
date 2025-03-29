
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search Node.js documentation...", 
  className = "" 
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex w-full max-w-2xl relative ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pr-10 h-12 text-base shadow-lg focus-visible:ring-nodejs-green"
      />
      <Button 
        type="submit" 
        size="icon" 
        className="absolute right-1 top-1 h-10 w-10 bg-nodejs-green hover:bg-nodejs-lightGreen"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default SearchBar;
