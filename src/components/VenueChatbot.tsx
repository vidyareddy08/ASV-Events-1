
'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, MessageSquare, Send, X, Loader2, User } from 'lucide-react';
import { askVenueAssistant } from '@/ai/flows/venue-chat-flow';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

export default function VenueChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI venue assistant. How can I help you find the perfect event space today?",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askVenueAssistant({ query: input });
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error with AI assistant:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
          size="icon"
        >
          {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
          <span className="sr-only">Toggle Chat</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-[350px] md:w-[400px] p-0 rounded-xl overflow-hidden shadow-2xl border-2"
        sideOffset={16}
      >
        <div className="flex flex-col h-[500px]">
          <header className="flex items-center gap-3 p-4 bg-primary text-primary-foreground border-b">
            <Bot className="h-7 w-7" />
            <h3 className="font-bold text-lg">Venue Assistant</h3>
          </header>
          <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'justify-end' : ''
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="p-2 bg-primary rounded-full text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-xl p-3 text-sm ${
                      message.sender === 'user'
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-card'
                    }`}
                  >
                    {message.text}
                  </div>
                   {message.sender === 'user' && (
                    <div className="p-2 bg-secondary rounded-full text-secondary-foreground">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary rounded-full text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="max-w-[75%] rounded-xl p-3 text-sm bg-card flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin"/>
                    </div>
                 </div>
              )}
            </div>
          </ScrollArea>
          <footer className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about venues..."
                className="flex-grow"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}
