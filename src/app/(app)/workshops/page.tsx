'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { workshops } from '@/lib/workshop-data';
import { Calendar, Edit, User } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';

export default function WorkshopsPage() {
  const { toast } = useToast();

  const handleRegistration = (workshopTitle: string) => {
    toast({
      title: 'Registration Confirmed!',
      description: `You have successfully registered for the "${workshopTitle}" workshop.`,
      variant: 'default',
    });
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
          <Card
            key={workshop.id}
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
              <Button onClick={() => handleRegistration(workshop.title)}>
                <Edit className="mr-2" />
                Register
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
