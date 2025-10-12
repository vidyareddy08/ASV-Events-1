
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { concerts, type Concert } from '@/lib/concert-data';
import { Calendar, MapPin, Music, Ticket, Star, Crown, CreditCard, Landmark, Users } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const attendeeSchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  email: z.string().email({ message: 'A valid email is required.' }),
});

const bookingSchema = z.object({
  seatType: z.enum(['general', 'vip']),
  ticketCount: z.number().min(1, 'At least one ticket is required.').max(10, 'You can book a maximum of 10 tickets.'),
  attendees: z.array(attendeeSchema).min(1),
  paymentMethod: z.string().nonempty({ message: 'Please select a payment method.' }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

function BookingForm({ concert, onBook }: { concert: Concert, onBook: (values: BookingFormValues) => void }) {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      seatType: 'general',
      ticketCount: 1,
      attendees: [{ name: '', email: '' }],
      paymentMethod: '',
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'attendees',
  });

  const ticketCount = form.watch('ticketCount');
  const seatType = form.watch('seatType');

  useState(() => {
    const currentCount = fields.length;
    if (ticketCount > currentCount) {
      for (let i = 0; i < ticketCount - currentCount; i++) {
        append({ name: '', email: '' });
      }
    } else if (ticketCount < currentCount) {
      for (let i = 0; i < currentCount - ticketCount; i++) {
        remove(ticketCount + i);
      }
    }
  });
  
  const getPrice = (basePrice: number, currentSeatType: 'general' | 'vip') => {
    return currentSeatType === 'vip' ? basePrice * 1.5 : basePrice;
  };

  const totalAmount = getPrice(concert.price, seatType) * ticketCount;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onBook)}>
        <DialogHeader>
          <DialogTitle>Book Tickets for: {concert.name}</DialogTitle>
          <DialogDescription>Select details and provide attendee information to complete your booking.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto px-1">
          <FormField
            control={form.control}
            name="seatType"
            render={({ field }) => (
            <FormItem>
              <FormLabel>Seat Selection</FormLabel>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-2 gap-4">
                   <Label className={`border rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${field.value === 'general' ? 'border-primary bg-primary/10' : 'hover:bg-muted'}`}>
                    <RadioGroupItem value="general" id="general" className="sr-only" />
                    <Star className="h-6 w-6" />
                    <span className="font-semibold">General</span>
                     <span className="text-sm text-muted-foreground">₹{getPrice(concert.price, 'general').toLocaleString('en-IN')}</span>
                  </Label>
                   <Label className={`border rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${field.value === 'vip' ? 'border-primary bg-primary/10' : 'hover:bg-muted'}`}>
                    <RadioGroupItem value="vip" id="vip" className="sr-only" />
                    <Crown className="h-6 w-6 text-yellow-500" />
                    <span className="font-semibold">VIP Access</span>
                    <span className="text-sm text-muted-foreground">₹{getPrice(concert.price, 'vip').toLocaleString('en-IN')}</span>
                  </Label>
                </RadioGroup>
              <FormMessage/>
            </FormItem>
          )} />

          <FormField
            control={form.control}
            name="ticketCount"
            render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Tickets</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1" 
                  max="10" 
                  {...field}
                  onChange={e => {
                    const count = parseInt(e.target.value, 10);
                    field.onChange(count);
                    const currentAttendees = form.getValues('attendees').length;
                    if(count > currentAttendees){
                      for(let i=currentAttendees; i< count; i++) append({name: '', email: ''});
                    } else if (count < currentAttendees) {
                      for(let i=currentAttendees-1; i>=count; i--) remove(i);
                    }
                  }}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

          {fields.map((item, index) => (
            <div key={item.id} className="p-3 border rounded-lg space-y-2">
              <h4 className="font-medium text-sm">Attendee {index + 1}</h4>
              <FormField
                control={form.control}
                name={`attendees.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Name</FormLabel>
                    <FormControl><Input placeholder="Full Name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`attendees.${index}.email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl><Input type="email" placeholder="Email Address" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
            <FormItem>
               <FormLabel>Payment Method</FormLabel>
                 <div className="grid grid-cols-3 gap-2">
                      <Button type="button" variant={field.value === 'card' ? 'default' : 'outline'} onClick={() => field.onChange('card')}><CreditCard /> Card</Button>
                      <Button type="button" variant={field.value === 'upi' ? 'default' : 'outline'} onClick={() => field.onChange('upi')}>₹ UPI</Button>
                      <Button type="button" variant={field.value === 'netbanking' ? 'default' : 'outline'} onClick={() => field.onChange('netbanking')}><Landmark/> Net Banking</Button>
                 </div>
              <FormMessage />
            </FormItem>
          )} />

          <div className="border-t pt-4 text-right">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold">₹{totalAmount.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
          <Button type="submit">Confirm Booking</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default function ConcertsPage() {
  const { toast } = useToast();
  const [openDialogConcert, setOpenDialogConcert] = useState<Concert | null>(null);

  const handleBooking = (values: BookingFormValues) => {
    const { ticketCount, attendees } = values;
    const concert = openDialogConcert!;

    toast({
      title: 'Tickets Booked!',
      description: `Booked ${ticketCount} ticket(s) for ${concert.name}. Confirmation emails sent to ${attendees.map(a => a.email).join(', ')}.`,
      variant: 'default',
    });
    setOpenDialogConcert(null);
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
          <DialogContent className="sm:max-w-xl">
            <BookingForm concert={openDialogConcert} onBook={handleBooking} />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
