import React, { useState } from 'react';
import { Search, Zap, Globe, Book, Code, Terminal, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import SearchBar from '@/components/SearchBar';
import FeatureCard from '@/components/FeatureCard';
import SampleSearchResult from '@/components/SampleSearchResult';
import TypewriterText from '@/components/TypewriterText';
import { Button } from '@/components/ui/button';
import { searchNodeJsDocs, getNodeJsDocContent } from '@/utils/api';
import { toast } from '@/components/ui/use-toast';

const exampleSearches = [
  "fs.readFile",
  "http server",
  "process.env",
  "async/await",
  "Buffer",
  "EventEmitter"
];

interface SearchResult {
  title: string;
  path: string;
  excerpt: string;
  tags: string[];
  url: string;
}

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    try {
      console.log("Searching for:", query);
      const searchResults = await searchNodeJsDocs(query);
      
      if (searchResults.length === 0) {
        setResults([]);
        setShowResults(true);
        toast({
          title: "No results found",
          description: "Try a different search term or check out the examples below.",
          variant: "default",
        });
        return;
      }
      
      const processedResults = await Promise.all(
        searchResults.slice(0, 3).map(async (result: any) => {
          try {
            const content = await getNodeJsDocContent(result.apiUrl);
            
            const lines = content.split('\n');
            let excerpt = '';
            
            for (let i = 0; i < lines.length; i++) {
              const line = lines[i].toLowerCase();
              if (line.includes(query.toLowerCase()) && i < lines.length - 3) {
                excerpt = lines.slice(i, i + 3).join('\n');
                break;
              }
            }
            
            if (!excerpt) {
              excerpt = lines.filter(line => !line.startsWith('#') && line.trim().length > 0)
                .slice(0, 3).join('\n');
            }
            
            const highlightedExcerpt = excerpt.replace(
              new RegExp(query, 'gi'), 
              (match) => `<span class='search-highlight'>${match}</span>`
            );
            
            const tags = ['node.js'];
            if (content.toLowerCase().includes('async')) tags.push('async');
            if (content.toLowerCase().includes('event')) tags.push('events');
            if (result.path.includes('fs')) tags.push('fs');
            if (result.path.includes('http')) tags.push('http');
            if (result.path.includes('buffer')) tags.push('buffer');
            if (content.toLowerCase().includes('class')) tags.push('class');
            
            return {
              title: result.title,
              path: `Node.js Documentation > ${result.path}`,
              excerpt: highlightedExcerpt,
              tags: tags.slice(0, 4),
              url: `https://nodejs.org/docs/latest/api/${result.path}.html`
            };
          } catch (error) {
            console.error("Error processing result:", error);
            return {
              title: result.title,
              path: `Node.js Documentation > ${result.path}`,
              excerpt: "Error retrieving content excerpt.",
              tags: ['node.js'],
              url: `https://nodejs.org/docs/latest/api/${result.path}.html`
            };
          }
        })
      );
      
      setResults(processedResults);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "There was an error processing your search. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setSearchQuery(example);
    handleSearch(example);
  };

  const handleViewAllResults = () => {
    window.open(`https://nodejs.org/docs/latest/api/all.html#all_${searchQuery.toLowerCase().replace(/\s+/g, '_')}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Search <span className="text-nodejs-green">Node.js</span> Documentation with AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Find what you need instantly, with examples for{" "}
              <TypewriterText 
                texts={exampleSearches} 
                className="text-nodejs-green font-medium"
              />
            </p>
            
            <div className="flex justify-center mb-8">
              <SearchBar 
                onSearch={handleSearch} 
                placeholder="Search Node.js documentation..." 
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="text-muted-foreground">Try:</span>
              {exampleSearches.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="text-nodejs-green hover:underline focus:outline-none"
                >
                  {example}
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <Link to="/chat">
                <Button className="bg-nodejs-green hover:bg-nodejs-lightGreen flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Try AI Chat Assistant
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {isSearching && (
          <section className="py-12 px-4 bg-muted/50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Searching for "{searchQuery}"...</h2>
              <div className="flex justify-center">
                <div className="flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce animation-delay-200">.</span>
                  <span className="animate-bounce animation-delay-400">.</span>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {showResults && !isSearching && (
          <section className="py-12 px-4 bg-muted/50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Results for "{searchQuery}"</h2>
              
              {results.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No results found for your search.</p>
                  <p>Try one of our examples or a different search term.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {results.map((result, index) => (
                    <SampleSearchResult
                      key={index}
                      title={result.title}
                      path={result.path}
                      excerpt={result.excerpt}
                      tags={result.tags}
                    />
                  ))}
                </div>
              )}
              
              {results.length > 0 && (
                <div className="mt-8 text-center">
                  <Button 
                    className="bg-nodejs-green hover:bg-nodejs-lightGreen"
                    onClick={handleViewAllResults}
                  >
                    View All Results
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}
        
        <section id="features" className="py-16 px-4 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">Features</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              nodejs.ai makes searching through Node.js documentation faster and more intuitive
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={Zap}
                title="Lightning Fast"
                description="Get instant results as you type with our optimized search engine."
              />
              <FeatureCard
                icon={Search}
                title="Semantic Search"
                description="Find what you need even if you don't know the exact API name."
              />
              <FeatureCard
                icon={Code}
                title="Code Examples"
                description="See practical code snippets alongside documentation."
              />
              <FeatureCard
                icon={Book}
                title="Complete Coverage"
                description="Search across all Node.js versions and documentation sections."
              />
              <FeatureCard
                icon={Terminal}
                title="CLI Integration"
                description="Use directly from your terminal with our CLI tool."
              />
              <FeatureCard
                icon={Globe}
                title="Always Updated"
                description="Documentation is synced with the latest Node.js releases."
              />
              <FeatureCard
                icon={MessageCircle}
                title="AI Chat Assistant"
                description="Ask questions about Node.js in natural language and get detailed answers."
              />
            </div>
          </div>
        </section>
        
        <section id="examples" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">How It Works</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Simple, fast, and developer-friendly
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">1. Search for what you need</h3>
                <p className="mb-6 text-muted-foreground">
                  Type your query in natural language or use specific API names. Our AI understands 
                  both and will find the most relevant documentation.
                </p>
                
                <h3 className="text-xl font-semibold mb-4">2. Get comprehensive results</h3>
                <p className="mb-6 text-muted-foreground">
                  See matching API docs, guides, tutorials, and community examples in one place.
                </p>
                
                <h3 className="text-xl font-semibold mb-4">3. Explore related concepts</h3>
                <p className="text-muted-foreground">
                  Discover related APIs and patterns that might help solve your problem more effectively.
                </p>
              </div>
              
              <div className="code-bg">
                <pre>
                  <code>
{`// Using nodejs.ai CLI
$ nodedocs fs.readFile

[nodejs.ai] Top result:
fs.readFile(path[, options], callback)

Asynchronously reads the entire contents of a file.

Example:
const fs = require('fs');
fs.readFile('/path/to/file', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

See also: fs.promises.readFile(), fs.readFileSync()`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 bg-nodejs-darkBlue text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to supercharge your Node.js development?</h2>
            <p className="text-lg mb-8 opacity-90">
              Start searching the Node.js documentation with the power of AI and find what you need instantly.
            </p>
            <div className="flex justify-center">
              <Button className="bg-nodejs-green hover:bg-nodejs-lightGreen text-white px-8 py-6 h-auto text-lg">
                Get Started
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} nodejs.ai - Not affiliated with the official Node.js project
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
