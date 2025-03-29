
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const NodeJsChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I can help answer your questions about Node.js documentation. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;
    
    const userMessage: Message = {
      role: 'user',
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Example responses for specific Node.js questions
      let responseContent = "I'm sorry, I don't have enough information to answer that question accurately. For more detailed information, please check the official Node.js documentation.";
      
      const question = input.toLowerCase();
      
      if (question.includes('fs.readfile')) {
        responseContent = 'fs.readFile(path[, options], callback) is an asynchronous method to read the contents of a file. Example: fs.readFile(\'/path/to/file\', \'utf8\', (err, data) => { if (err) throw err; console.log(data); });';
      } else if (question.includes('http server') || question.includes('create server')) {
        responseContent = 'To create an HTTP server in Node.js: const http = require(\'http\'); const server = http.createServer((req, res) => { res.writeHead(200, {\'Content-Type\': \'text/plain\'}); res.end(\'Hello World\\n\'); }); server.listen(3000);';
      } else if (question.includes('process.env')) {
        responseContent = 'process.env is an object containing the user environment. It allows you to access environment variables, for example: const port = process.env.PORT || 3000;';
      } else if (question.includes('buffer')) {
        responseContent = 'The Buffer class in Node.js is used to handle binary data. Create a buffer: Buffer.from(\'string\'), Buffer.alloc(size), or Buffer.allocUnsafe(size).';
      } else if (question.includes('event') || question.includes('eventemitter')) {
        responseContent = 'EventEmitter is a class that helps with handling events. Usage: const EventEmitter = require(\'events\'); class MyEmitter extends EventEmitter {}; const myEmitter = new MyEmitter(); myEmitter.on(\'event\', () => { console.log(\'event occurred!\'); }); myEmitter.emit(\'event\');';
      } else if (question.includes('async') || question.includes('await')) {
        responseContent = 'async/await is a syntax to handle promises in a more readable way. Example: async function fetchData() { try { const data = await getData(); console.log(data); } catch (error) { console.error(error); } }';
      }
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: responseContent
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col bg-card border rounded-lg shadow-md h-[500px] max-h-[80vh]">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="text-nodejs-green h-5 w-5" />
          <h3 className="font-medium">Node.js Documentation Assistant</h3>
        </div>
        <Badge variant="nodejs">AI-Powered</Badge>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-nodejs-green/10 text-foreground ml-12' 
                  : 'bg-muted text-foreground mr-12'
              }`}
            >
              <div className="flex items-start mb-1 gap-2">
                {message.role === 'assistant' && (
                  <Bot className="h-5 w-5 text-nodejs-green mt-1" />
                )}
                <div className="whitespace-pre-wrap">{message.content}</div>
                {message.role === 'user' && (
                  <User className="h-5 w-5 text-muted-foreground mt-1" />
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-muted text-foreground mr-12">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-nodejs-green" />
                <div className="flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce animation-delay-200">.</span>
                  <span className="animate-bounce animation-delay-400">.</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Node.js documentation..."
            className="min-h-[60px] resize-none"
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading || input.trim() === ''} 
            className="bg-nodejs-green hover:bg-nodejs-lightGreen h-auto"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeJsChat;
