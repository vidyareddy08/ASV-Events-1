'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { venues } from '@/lib/venue-data';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { addDays, format, isBefore } from 'date-fns';
import { CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function VenueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const venueId = params.id as string;
  const venue = venues.find((v) => v.id === venueId);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  if (!venue) {
    return (
      <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">Venue not found</h1>
          <p className="text-muted-foreground">
            The venue you are looking for does not exist.
          </p>
          <Button onClick={() => router.push('/venues')} className="mt-4">
            Back to Venues
          </Button>
        </div>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sixtyDaysFromNow = addDays(today, 60);

  const isDateBooked = (date: Date) => {
    return venue.bookedDates.includes(format(date, 'yyyy-MM-dd'));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && !isDateBooked(date) && !isBefore(date, today)) {
      setSelectedDate(date);
    }
  };

  const finalCost = selectedDate
    ? Math.min(venue.baseCost * 1.18, 300000)
    : venue.baseCost;
    
  const handleBooking = () => {
    if (selectedDate) {
      toast({
        title: 'Booking Confirmed!',
        description: `Your booking for ${venue.name} on ${format(selectedDate, 'PPP')} is confirmed.`,
        variant: 'default'
      });
      setSelectedDate(undefined); // Reset date
    } else {
       toast({
        title: 'Select a Date',
        description: `Please select an available date to book.`,
        variant: 'destructive'
      });
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-2">
            {venue.name}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">{venue.location}</p>
          <Carousel className="w-full rounded-xl overflow-hidden shadow-xl">
            <CarouselContent>
              {venue.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video">
                    <Image
                      src={img}
                      alt={`${venue.name} - View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
        <div className="flex flex-col">
          <Card className="rounded-xl shadow-lg w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Booking Details</CardTitle>
              <CardDescription>Select a date to see the estimated cost.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) =>
                    isBefore(date, today) || date > sixtyDaysFromNow || isDateBooked(date)
                  }
                  fromDate={today}
                  toDate={sixtyDaysFromNow}
                  className="rounded-md border p-0"
                  components={{
                    DayContent: ({ date }) => {
                      const booked = isDateBooked(date);
                      const isPast = isBefore(date, today);
                      if (isPast) return <>{format(date, 'd')}</>;
                      return (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {format(date, 'd')}
                          {booked ? (
                            <XCircle className="absolute bottom-0.5 h-3 w-3 text-red-500" />
                          ) : (
                            <CheckCircle className="absolute bottom-0.5 h-3 w-3 text-green-500" />
                          )}
                        </div>
                      );
                    },
                  }}
                />
              </div>
              <div className="md:w-1/3">
                  <div className="p-4 bg-secondary/50 rounded-lg h-full flex flex-col justify-center">
                    <p className="text-sm font-medium text-muted-foreground">Hall Type</p>
                    <p className="text-lg font-semibold mb-3">{venue.hallType}</p>
                    
                    <p className="text-sm font-medium text-muted-foreground">Base Cost</p>
                    <p className="text-lg font-semibold mb-3">₹{venue.baseCost.toLocaleString('en-IN')}</p>
                    
                    {selectedDate && <>
                      <p className="text-sm font-medium text-muted-foreground">18% GST/Tax</p>
                      <p className="text-lg font-semibold mb-3">₹{(finalCost - venue.baseCost).toLocaleString('en-IN')}</p>
                    </>}

                    <div className="border-t border-border my-2"></div>
                    
                    <p className="text-sm font-bold text-primary">Total Estimated Cost</p>
                    <p className="text-2xl font-bold text-primary">₹{finalCost.toLocaleString('en-IN')}</p>
                  </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleBooking} className="w-full" size="lg" disabled={!selectedDate}>
                {selectedDate ? `Book for ${format(selectedDate, 'PPP')}` : 'Select a Date'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
