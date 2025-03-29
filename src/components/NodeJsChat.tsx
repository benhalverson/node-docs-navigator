
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { getAIChatResponse } from '@/utils/api';
import { toast } from '@/components/ui/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const NodeJsChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I can help answer your questions about Node.js documentation and provide code examples. What would you like to know or build today?'
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
    
    try {
      // Get response from our API utility
      const responseContent = await getAIChatResponse(input);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: responseContent
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble accessing the Node.js documentation right now. Please try again later."
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessageContent = (content: string) => {
    // Highlight code blocks for better readability
    return content.replace(
      /```(js|javascript)?([\s\S]*?)```/g, 
      (_, lang, code) => `<pre><code>${code}</code></pre>`
    );
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
                  <Bot className="h-5 w-5 text-nodejs-green mt-1 flex-shrink-0" />
                )}
                <div 
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
                />
                {message.role === 'user' && (
                  <User className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
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
            placeholder="Ask about Node.js or request a code example..."
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
        <div className="mt-2 text-xs text-muted-foreground">
          <p>Try: "make a script using fetch API" or "how to create an HTTP server"</p>
        </div>
      </div>
    </div>
  );
};

export default NodeJsChat;
