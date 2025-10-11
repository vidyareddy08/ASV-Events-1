
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { concerts, type Concert } from '@/lib/concert-data';
import { Calendar, MapPin, Music, Ticket, Star, Crown, CreditCard, Landmark } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function ConcertsPage() {
  const { toast } = useToast();
  const [openDialogConcert, setOpenDialogConcert] = useState<Concert | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<'general' | 'vip'>('general');
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handleBooking = (concert: Concert) => {
    if (!selectedSeat) {
      toast({ title: 'Select a Seat Type', description: 'Please choose a seat type to proceed.', variant: 'destructive' });
      return;
    }
    if (!selectedPayment) {
      toast({ title: 'Select Payment Method', description: 'Please choose a payment method.', variant: 'destructive' });
      return;
    }
    
    toast({
      title: 'Tickets Booked!',
      description: `You're all set for ${concert.name} (${selectedSeat.charAt(0).toUpperCase() + selectedSeat.slice(1)}). Check your email for the tickets.`,
      variant: 'default',
    });

    // Reset state and close dialog
    setOpenDialogConcert(null);
    setSelectedSeat('general');
    setSelectedPayment(null);
  };

  const getPrice = (basePrice: number, seatType: 'general' | 'vip') => {
    if (seatType === 'vip') {
      return basePrice * 1.5;
    }
    return basePrice;
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

      <Dialog open={!!openDialogConcert} onOpenChange={(isOpen) => !isOpen && setOpenDialogConcert(null)}>
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
                 <DialogTrigger asChild>
                  <Button onClick={() => setOpenDialogConcert(concert)}>
                    <Ticket className="mr-2" />
                    Book Now
                  </Button>
                </DialogTrigger>
              </CardFooter>
            </Card>
          ))}
        </div>
        {openDialogConcert && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book Tickets for: {openDialogConcert.name}</DialogTitle>
              <DialogDescription>Select your seat type and payment method to complete your booking.</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-6">
                <div>
                  <h4 className="text-md font-semibold mb-3">Seat Selection</h4>
                  <RadioGroup value={selectedSeat} onValueChange={(val: 'general' | 'vip') => setSelectedSeat(val)} className="grid grid-cols-2 gap-4">
                    <Label className={`border rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${selectedSeat === 'general' ? 'border-primary bg-primary/10' : 'hover:bg-muted'}`}>
                      <RadioGroupItem value="general" id="general" className="sr-only" />
                      <Star className="h-6 w-6" />
                      <span className="font-semibold">General</span>
                       <span className="text-sm text-muted-foreground">₹{getPrice(openDialogConcert.price, 'general').toLocaleString('en-IN')}</span>
                    </Label>
                     <Label className={`border rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${selectedSeat === 'vip' ? 'border-primary bg-primary/10' : 'hover:bg-muted'}`}>
                      <RadioGroupItem value="vip" id="vip" className="sr-only" />
                      <Crown className="h-6 w-6 text-yellow-500" />
                      <span className="font-semibold">VIP Access</span>
                      <span className="text-sm text-muted-foreground">₹{getPrice(openDialogConcert.price, 'vip').toLocaleString('en-IN')}</span>
                    </Label>
                  </RadioGroup>
                </div>
                <div>
                  <h4 className="text-md font-semibold mb-3">Payment Method</h4>
                   <div className="grid grid-cols-3 gap-2">
                        <Button variant={selectedPayment === 'card' ? 'default' : 'outline'} onClick={() => setSelectedPayment('card')}><CreditCard /> Card</Button>
                        <Button variant={selectedPayment === 'upi' ? 'default' : 'outline'} onClick={() => setSelectedPayment('upi')}>₹ UPI</Button>
                        <Button variant={selectedPayment === 'netbanking' ? 'default' : 'outline'} onClick={() => setSelectedPayment('netbanking')}><Landmark/> Net Banking</Button>
                     </div>
                </div>
                <div className="border-t pt-4 text-right">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold">₹{getPrice(openDialogConcert.price, selectedSeat).toLocaleString('en-IN')}</p>
                </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
              <Button onClick={() => handleBooking(openDialogConcert)}>Confirm Booking</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

    