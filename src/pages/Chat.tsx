
import React from 'react';
import NavBar from '@/components/NavBar';
import NodeJsChat from '@/components/NodeJsChat';

const Chat: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Chat with <span className="text-nodejs-green">Node.js</span> Documentation
            </h1>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Ask questions about Node.js API, modules, and features to get instant answers
            </p>
            
            <NodeJsChat />
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>This AI assistant provides information based on the Node.js documentation.</p>
              <p>For comprehensive details, always refer to the <a href="https://nodejs.org/docs/latest/api/" className="text-nodejs-green hover:underline" target="_blank" rel="noopener noreferrer">official Node.js documentation</a>.</p>
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
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .search-highlight {
          background-color: rgba(104, 211, 145, 0.2);
          padding: 0 2px;
          border-radius: 2px;
        }
        
        pre {
          background-color: #f1f1f1;
          border-radius: 4px;
          padding: 12px;
          overflow-x: auto;
          margin: 8px 0;
        }
        
        code {
          font-family: monospace;
        }
        `
      }}></style>
    </div>
  );
};

export default Chat;
