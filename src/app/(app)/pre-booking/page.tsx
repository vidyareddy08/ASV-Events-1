'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Percent } from 'lucide-react';
import Link from 'next/link';

export default function PreBookingPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Plan Ahead & Save Big</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Book your venue well in advance and get our best-ever discounts. Perfect for planning weddings, corporate events, and large parties.
        </p>
      </header>
      
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl text-center shadow-2xl border-2 border-primary rounded-2xl">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-5 rounded-full w-fit mb-4">
              <Percent className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline text-accent">Super Early Bird Offer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent py-2">
              EXTRA 10% OFF!
            </p>
            <p className="text-lg text-muted-foreground font-semibold">
              Enjoy a total discount of 30% when you book your venue between 2 to 12 months in advance.
            </p>
            <p className="text-muted-foreground px-4">
              This special offer is designed for those who plan ahead. Lock in your date early and get an incredible discount on your booking. This is our best deal, guaranteed.
            </p>
            <div className="pt-4">
              <Button asChild size="lg">
                <Link href="/venues">
                  <CalendarCheck className="mr-2" />
                  Explore Venues & Book Now
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
