
'use client';
import React from 'react';
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
import { Badge } from '@/components/ui/badge';
import { format, isBefore, addMonths } from 'date-fns';
import { CheckCircle, XCircle, PartyPopper, Tag, CreditCard, Landmark, Star, CalendarCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function VenueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const venueId = params.id as string;
  const venue = venues.find((v) => v.id === venueId);

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [selectedPayment, setSelectedPayment] = React.useState<string | null>(null);

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
  const bookingHorizonEnd = new Date('2026-12-31');

  const isDateBooked = (date: Date) => {
    return venue.bookedDates.includes(format(date, 'yyyy-MM-dd'));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && !isDateBooked(date) && !isBefore(date, today)) {
      setSelectedDate(date);
    }
  };

  const baseCost = venue.baseCost;
  const tax = baseCost * 0.18;
  const totalBeforeDiscount = baseCost + tax;
  
  let discountPercentage = 0.15;
  let discountName = 'First Booking Offer';
  let discountIcon = Tag;

  if (selectedDate) {
    const twoMonthsFromNow = addMonths(today, 2);
    const oneMonthFromNow = addMonths(today, 1);
    const oneYearFromNow = addMonths(today, 12);

    if (selectedDate >= twoMonthsFromNow && selectedDate <= oneYearFromNow) {
      discountPercentage = 0.30; // 20% early bird + extra 10%
      discountName = 'Super Early Bird';
      discountIcon = CalendarCheck;
    } else if (selectedDate >= oneMonthFromNow) {
      discountPercentage = 0.20;
      discountName = 'Early Bird Offer';
      discountIcon = Star;
    }
  }

  const discountAmount = totalBeforeDiscount * discountPercentage;
  const finalCost = selectedDate ? totalBeforeDiscount - discountAmount : baseCost;
    
  const handleBooking = () => {
    if (!selectedDate) {
       toast({
        title: 'Select a Date',
        description: `Please select an available date to book.`,
        variant: 'destructive'
      });
      return;
    }
    if (!selectedPayment) {
        toast({
         title: 'Select Payment Method',
         description: `Please choose a payment method to proceed.`,
         variant: 'destructive'
       });
       return;
     }

    const invoiceNumber = Math.floor(Math.random() * 9000) + 1000;
    toast({
      title: 'Success! Your booking is confirmed.',
      description: `Check email for Invoice #${invoiceNumber}. Booking for ${venue.name} on ${format(selectedDate, 'PPP')}.`,
      variant: 'default'
    });
    setSelectedDate(undefined); // Reset date
    setSelectedPayment(null);
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-2">
            {venue.name}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">{venue.location}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><PartyPopper className="h-5 w-5 text-accent"/> Suitable for</h3>
            <div className="flex flex-wrap gap-2">
              {venue.supportedEvents.map(event => (
                <Badge key={event} variant="secondary" className="font-normal">{event}</Badge>
              ))}
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2">Glimpses of Past Events</h3>
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
                    isBefore(date, today) || date > bookingHorizonEnd || isDateBooked(date)
                  }
                  fromDate={today}
                  toDate={bookingHorizonEnd}
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
                  <div className="p-4 bg-secondary/50 rounded-lg h-full flex flex-col justify-center space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Hall Type</p>
                    <p className="text-lg font-semibold">{venue.hallType}</p>
                    
                    <p className="text-sm font-medium text-muted-foreground">Base Cost</p>
                    <p className="text-lg font-semibold">₹{venue.baseCost.toLocaleString('en-IN')}</p>
                    
                    {selectedDate && <>
                      <p className="text-sm font-medium text-muted-foreground">18% GST/Tax</p>
                      <p className="text-lg font-semibold">₹{tax.toLocaleString('en-IN')}</p>
                      
                       <div className="border-t border-border my-1"></div>

                       <div className="p-3 bg-accent/20 rounded-md text-accent-foreground">
                        <p className="text-sm font-bold flex items-center gap-1">{React.createElement(discountIcon, {className:"h-4 w-4"})} {discountName}</p>
                        <p className="text-lg font-bold text-accent">- ₹{discountAmount.toLocaleString('en-IN')} ({(discountPercentage * 100).toFixed(0)}%)</p>
                       </div>
                    </>}

                    <div className="border-t border-border my-1"></div>
                    
                    <p className="text-sm font-bold text-primary">Total Estimated Cost</p>
                    <p className="text-2xl font-bold text-primary">₹{finalCost.toLocaleString('en-IN')}</p>
                  </div>
              </div>
            </CardContent>
            {selectedDate && (
                <CardContent className="space-y-4">
                  <div>
                     <h4 className="text-md font-semibold mb-3 text-center">Choose a Payment Method</h4>
                     <div className="grid grid-cols-3 gap-2">
                        <Button variant={selectedPayment === 'card' ? 'default' : 'outline'} onClick={() => setSelectedPayment('card')}><CreditCard /> Card</Button>
                        <Button variant={selectedPayment === 'upi' ? 'default' : 'outline'} onClick={() => setSelectedPayment('upi')}>₹ UPI</Button>
                        <Button variant={selectedPayment === 'netbanking' ? 'default' : 'outline'} onClick={() => setSelectedPayment('netbanking')}><Landmark/> Net Banking</Button>
                     </div>
                  </div>
                </CardContent>
            )}
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
