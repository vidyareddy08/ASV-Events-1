
'use client';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { workshops, type Workshop } from '@/lib/workshop-data';
import { Calendar, Edit, User, CreditCard, Landmark } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';

const participantSchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  email: z.string().email({ message: 'A valid email is required.' }),
});

const registrationSchema = z.object({
  participantCount: z.number().min(1, 'At least one participant is required.').max(10, 'You can register a maximum of 10 participants.'),
  participants: z.array(participantSchema).min(1),
  paymentMethod: z.string().nonempty({ message: 'Please select a payment method.' }),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

function RegistrationForm({ workshop, onRegister }: { workshop: Workshop; onRegister: (values: RegistrationFormValues) => void; }) {
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      participantCount: 1,
      participants: [{ name: '', email: '' }],
      paymentMethod: ''
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'participants',
  });

  const participantCount = form.watch('participantCount');

  useState(() => {
    const currentCount = fields.length;
    if (participantCount > currentCount) {
      for (let i = 0; i < participantCount - currentCount; i++) {
        append({ name: '', email: '' });
      }
    } else if (participantCount < currentCount) {
      for (let i = 0; i < currentCount - participantCount; i++) {
        remove(participantCount + i);
      }
    }
  });

  const totalAmount = workshop.price * participantCount;

  return (
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onRegister)} className="space-y-4">
        <DialogHeader>
          <DialogTitle>Register for: {workshop.title}</DialogTitle>
          <DialogDescription>
            Fill in your details below to secure your spot. A confirmation will be sent to your email.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto px-1">
          <FormField
            control={form.control}
            name="participantCount"
            render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Participants</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1" 
                  max="10" 
                  {...field}
                  onChange={e => {
                    const count = parseInt(e.target.value, 10);
                    field.onChange(count);
                    const currentParticipants = form.getValues('participants').length;
                    if(count > currentParticipants){
                      for(let i=currentParticipants; i< count; i++) append({name: '', email: ''});
                    } else if (count < currentParticipants) {
                      for(let i=currentParticipants-1; i>=count; i--) remove(i);
                    }
                  }}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

          {fields.map((item, index) => (
            <div key={item.id} className="p-3 border rounded-lg space-y-2">
              <h4 className="font-medium text-sm">Participant {index + 1}</h4>
              <FormField
                control={form.control}
                name={`participants.${index}.name`}
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
                name={`participants.${index}.email`}
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
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Confirm Registration</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}


export default function WorkshopsPage() {
  const { toast } = useToast();
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const handleRegistration = (values: RegistrationFormValues, workshopTitle: string) => {
    const { participantCount, participants } = values;
    toast({
      title: 'Registration Confirmed!',
      description: `Registered ${participantCount} person(s) for "${workshopTitle}". Emails sent to ${participants.map(p=>p.email).join(', ')}.`,
      variant: 'default',
    });
    setOpenDialogId(null);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Skill-Up Workshops
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Join our expert-led workshops to learn new skills, from arts and crafts to technology.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {workshops.map((workshop) => (
           <Dialog key={workshop.id} open={openDialogId === workshop.id} onOpenChange={(isOpen) => setOpenDialogId(isOpen ? workshop.id : null)}>
            <Card
              className="overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-video">
                <Image
                  src={workshop.imageUrl}
                  alt={workshop.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold font-headline text-primary">
                  {workshop.title}
                </CardTitle>
                 <div className="flex items-center text-sm text-muted-foreground pt-2">
                  <User className="h-4 w-4 mr-1.5" />
                  Instructor: {workshop.instructor}
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                 <CardDescription>{workshop.description}</CardDescription>
                <div className="flex items-center text-sm text-muted-foreground pt-2">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  {format(new Date(workshop.date), 'PPP')}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-lg font-bold">
                  ₹{workshop.price.toLocaleString('en-IN')}
                  <span className="text-sm font-normal text-muted-foreground">
                    / person
                  </span>
                </div>
                <DialogTrigger asChild>
                  <Button>
                    <Edit className="mr-2" />
                    Register
                  </Button>
                </DialogTrigger>
              </CardFooter>
            </Card>
             <DialogContent className="sm:max-w-xl">
               <RegistrationForm workshop={workshop} onRegister={(values) => handleRegistration(values, workshop.title)} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
