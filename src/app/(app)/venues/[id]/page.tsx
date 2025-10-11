
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
import { CheckCircle, XCircle, PartyPopper, Tag, CreditCard, Landmark, Star, CalendarCheck, Users, Briefcase, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { eventManagers } from '@/lib/event-manager-data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function VenueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const venueId = params.id as string;
  const venue = venues.find((v) => v.id === venueId);

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [selectedPayment, setSelectedPayment] = React.useState<string | null>(null);
  const [eventType, setEventType] = React.useState<string>('');
  const [capacity, setCapacity] = React.useState<number | string>('');
  const [needsManager, setNeedsManager] = React.useState(false);
  const [selectedManager, setSelectedManager] = React.useState<string | null>(null);


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
       toast({ title: 'Select a Date', description: `Please select an available date to book.`, variant: 'destructive'});
       return;
    }
    if (!eventType) {
      toast({ title: 'Select Event Type', description: 'Please choose the type of event you are planning.', variant: 'destructive' });
      return;
    }
    if (!capacity) {
      toast({ title: 'Enter Capacity', description: 'Please enter the estimated number of guests.', variant: 'destructive' });
      return;
    }
    if (needsManager && !selectedManager) {
      toast({ title: 'Select Event Manager', description: 'Please choose an event manager from the list.', variant: 'destructive' });
      return;
    }
    if (!selectedPayment) {
        toast({ title: 'Select Payment Method', description: `Please choose a payment method to proceed.`, variant: 'destructive'});
        return;
     }

    const managerName = eventManagers.find(em => em.id === selectedManager)?.name;
    const invoiceNumber = Math.floor(Math.random() * 9000) + 1000;
    
    let description = `Check email for Invoice #${invoiceNumber}. Booking for ${venue.name} on ${format(selectedDate, 'PPP')} for a ${eventType}.`;
    if (managerName) {
      description += ` Event managed by ${managerName}.`;
    }

    toast({
      title: 'Success! Your booking is confirmed.',
      description: description,
      variant: 'default'
    });
    // Reset state
    setSelectedDate(undefined);
    setSelectedPayment(null);
    setEventType('');
    setCapacity('');
    setNeedsManager(false);
    setSelectedManager(null);
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
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
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
                
                <div className="p-4 bg-secondary/50 rounded-lg flex flex-col justify-center space-y-2">
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

               <div className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-type">Event Type</Label>
                    <Select value={eventType} onValueChange={setEventType}>
                      <SelectTrigger id="event-type">
                        <SelectValue placeholder="Select an event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {venue.supportedEvents.map(event => (
                          <SelectItem key={event} value={event}>{event}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="capacity">Event Capacity</Label>
                    <Input id="capacity" type="number" placeholder="e.g., 150" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Switch id="event-manager-switch" checked={needsManager} onCheckedChange={setNeedsManager} />
                  <Label htmlFor="event-manager-switch" className="text-base">Need an Event Manager?</Label>
                </div>

                {needsManager && (
                   <Card className="bg-secondary/30">
                    <CardHeader>
                      <CardTitle className="text-xl">Select an Event Manager</CardTitle>
                      <CardDescription>Our experts will ensure your event is a success.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={selectedManager || ''} onValueChange={setSelectedManager}>
                        <Accordion type="single" collapsible className="w-full">
                          {eventManagers.map((manager) => (
                            <AccordionItem value={manager.id} key={manager.id}>
                              <div className="flex items-center gap-4">
                                <RadioGroupItem value={manager.id} id={manager.id} />
                                <AccordionTrigger className="flex-1 text-left">
                                  <div>
                                    <p className="font-semibold">{manager.name}</p>
                                    <p className="text-sm text-muted-foreground">{manager.specializations.slice(0, 2).join(', ')}</p>
                                  </div>
                                </AccordionTrigger>
                              </div>
                              <AccordionContent className="pl-12">
                                <div className="space-y-2">
                                  <h4 className="font-semibold flex items-center gap-2"><Briefcase className="h-4 w-4"/> Portfolio Highlights</h4>
                                  <ul className="list-disc list-inside text-muted-foreground text-sm">
                                    {manager.portfolio.map((item, idx) => <li key={idx}>{item}</li>)}
                                  </ul>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </RadioGroup>
                    </CardContent>
                   </Card>
                )}

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
