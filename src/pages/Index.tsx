
import React, { useState } from 'react';
import { Search, Zap, Globe, Book, Code, Terminal } from 'lucide-react';
import NavBar from '@/components/NavBar';
import SearchBar from '@/components/SearchBar';
import FeatureCard from '@/components/FeatureCard';
import SampleSearchResult from '@/components/SampleSearchResult';
import TypewriterText from '@/components/TypewriterText';
import { Button } from '@/components/ui/button';

const exampleSearches = [
  "fs.readFile",
  "http server",
  "process.env",
  "async/await",
  "Buffer",
  "EventEmitter"
];

const sampleResults = [
  {
    title: "fs.readFile(path[, options], callback)",
    path: "File System > fs.readFile",
    excerpt: "Asynchronously reads the entire contents of a file. <span class='search-highlight'>fs.readFile</span> does not guarantee the order of reading operations.",
    tags: ["fs", "async", "core"]
  },
  {
    title: "fs.readFileSync(path[, options])",
    path: "File System > fs.readFileSync",
    excerpt: "Synchronous version of <span class='search-highlight'>fs.readFile</span>. Returns the contents of the file.",
    tags: ["fs", "sync", "core"]
  },
  {
    title: "Class: FileHandle",
    path: "File System > Class: FileHandle",
    excerpt: "A <FileHandle> object is an object wrapper for a numeric file descriptor. Instances of the <FileHandle> object are created by <span class='search-highlight'>fs.open()</span> methods.",
    tags: ["fs", "class", "file descriptor"]
  }
];

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(true);
    
    // In a real application, we would make an API call here
    console.log("Searching for:", query);
  };

  const handleExampleClick = (example: string) => {
    setSearchQuery(example);
    handleSearch(example);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        {/* Hero Section */}
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
          </div>
        </section>
        
        {/* Search Results Section (conditional) */}
        {showResults && (
          <section className="py-12 px-4 bg-muted/50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Results for "{searchQuery}"</h2>
              
              <div className="grid gap-4">
                {sampleResults.map((result, index) => (
                  <SampleSearchResult
                    key={index}
                    title={result.title}
                    path={result.path}
                    excerpt={result.excerpt}
                    tags={result.tags}
                  />
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button className="bg-nodejs-green hover:bg-nodejs-lightGreen">
                  View All Results
                </Button>
              </div>
            </div>
          </section>
        )}
        
        {/* Features Section */}
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
            </div>
          </div>
        </section>
        
        {/* Code Example Section */}
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
        
        {/* CTA Section */}
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
      
      {/* Footer */}
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
