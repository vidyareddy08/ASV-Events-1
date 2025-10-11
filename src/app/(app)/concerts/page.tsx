'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { concerts } from '@/lib/concert-data';
import { Calendar, MapPin, Music, Ticket } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';

export default function ConcertsPage() {
  const { toast } = useToast();

  const handleBooking = (concertName: string) => {
    toast({
      title: 'Tickets Booked!',
      description: `You're all set for ${concertName}. Check your email for the tickets.`,
      variant: 'default',
    });
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Upcoming Concerts
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Experience the best live music events happening across Hyderabad. Book your tickets now!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {concerts.map((concert) => (
          <Card
            key={concert.id}
            className="overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
          >
            <div className="relative aspect-video">
              <Image
                src={concert.imageUrl}
                alt={concert.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold font-headline text-primary">
                {concert.name}
              </CardTitle>
              <div className="flex items-center text-sm text-muted-foreground pt-2">
                <Music className="h-4 w-4 mr-1.5" />
                {concert.artist}
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1.5" />
                {format(new Date(concert.date), 'PPP')}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1.5" />
                {concert.venue}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-lg font-bold">
                ₹{concert.price.toLocaleString('en-IN')}
                <span className="text-sm font-normal text-muted-foreground">
                  / ticket
                </span>
              </div>
              <Button onClick={() => handleBooking(concert.name)}>
                <Ticket className="mr-2" />
                Book Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
