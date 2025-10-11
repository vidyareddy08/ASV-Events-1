
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { workshops, type Workshop } from '@/lib/workshop-data';
import { Calendar, Edit, User } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';

const registrationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

function RegistrationForm({ workshop, onRegister }: { workshop: Workshop; onRegister: (values: RegistrationFormValues) => void; }) {
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { name: '', email: '' },
  });

  function onSubmit(data: RegistrationFormValues) {
    onRegister(data);
    form.reset();
  }

  return (
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DialogHeader>
          <DialogTitle>Register for: {workshop.title}</DialogTitle>
          <DialogDescription>
            Fill in your details below to secure your spot. A confirmation will be sent to your email.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl><Input placeholder="your.email@example.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
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
    console.log('Registration Data:', values);
    toast({
      title: 'Registration Confirmed!',
      description: `An email has been sent to ${values.email} for the "${workshopTitle}" workshop.`,
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
             <DialogContent className="sm:max-w-[425px]">
               <RegistrationForm workshop={workshop} onRegister={(values) => handleRegistration(values, workshop.title)} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
