
'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, X, Loader2, User, Sparkles } from 'lucide-react';
import { askVenueAssistant } from '@/ai/flows/venue-chat-flow';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogTrigger } from './ui/dialog';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

const exampleQueries = [
    "Suggest a wedding venue for 500 guests",
    "What are the upcoming concerts?",
    "Tell me about your company",
    "Are there any job openings?",
]

export default function VenueChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
        });
    }
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent, query?: string) => {
    e.preventDefault();
    const currentInput = query || input;
    if (!currentInput.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: currentInput,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    if (!query) {
        setInput('');
    }
    setIsLoading(true);

    try {
      const response = await askVenueAssistant({ query: currentInput });
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
  
  const handleOpenChange = (open: boolean) => {
      if(open && messages.length === 0){
        // Add initial bot message only when opening for the first time
        setMessages([
          {
            id: 1,
            text: "Hello! I'm your AI venue assistant. How can I help you find the perfect event space today?",
            sender: 'bot',
          },
        ]);
      }
      setIsOpen(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 rounded-xl shadow-lg">
          <CardContent className="p-6 flex items-center justify-between">
              <div>
                  <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2"><Sparkles className="h-6 w-6"/> AI Venue Assistant</h3>
                  <p className="text-muted-foreground">Ask me anything about our venues, events, and services!</p>
              </div>
              <DialogTrigger asChild>
                  <Button>Ask AI</Button>
              </DialogTrigger>
          </CardContent>
      </Card>

      <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className='p-4 border-b'>
          <DialogTitle className='flex items-center gap-2 font-headline text-2xl text-primary'><Sparkles /> Your AI Venue Expert</DialogTitle>
          <DialogDescription>Your personal guide to finding the perfect venue in Hyderabad.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 text-base ${
                  message.sender === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="p-2 bg-primary/10 rounded-full text-primary flex-shrink-0">
                    <Sparkles className="h-6 w-6" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-card text-card-foreground rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
                 {message.sender === 'user' && (
                  <div className="p-2 bg-secondary rounded-full text-secondary-foreground flex-shrink-0">
                    <User className="h-6 w-6" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
               <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-full text-primary flex-shrink-0">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div className="max-w-[75%] rounded-2xl px-4 py-3 shadow-sm bg-card flex items-center">
                      <Loader2 className="h-5 w-5 animate-spin text-primary"/>
                  </div>
               </div>
            )}
             {messages.length <= 1 && !isLoading && (
                 <div className='pt-8 text-center'>
                     <p className='text-sm text-muted-foreground mb-4'>Try asking one of these:</p>
                     <div className='grid grid-cols-2 gap-2'>
                        {exampleQueries.map(q => (
                            <Button key={q} variant="outline" size="sm" onClick={(e) => handleSendMessage(e, q)}>{q}</Button>
                        ))}
                     </div>
                 </div>
            )}
          </div>
        </ScrollArea>
        <footer className="p-4 border-t bg-background/80">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 'I need a venue for a small birthday party...'"
              className="flex-grow h-11 text-base"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" className="h-11 w-11" disabled={isLoading || !input.trim()}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </footer>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
