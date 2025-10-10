'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { venues } from '@/lib/venue-data';
import { ArrowRight, MapPin } from 'lucide-react';

const locations = [
  'All',
  'Mumbai (South)',
  'Delhi (NCR)',
  'Bengaluru (Central)',
  'Chennai (North)',
  'Hyderabad (North)',
  'Hyderabad (South)',
  'Hyderabad (East)',
  'Hyderabad (West)',
  'Hyderabad (Central)',
];

export default function VenuesPage() {
  const [selectedLocation, setSelectedLocation] = useState('All');

  const filteredVenues =
    selectedLocation === 'All'
      ? venues
      : venues.filter((venue) => venue.location === selectedLocation);

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Find Your Perfect Venue
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our curated selection of exquisite halls for your next event.
        </p>
      </header>

      <div className="mb-10">
        <div className="flex justify-center flex-wrap gap-2">
          {locations.map((location) => (
            <Button
              key={location}
              variant={selectedLocation === location ? 'default' : 'outline'}
              onClick={() => setSelectedLocation(location)}
            >
              {location}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVenues.map((venue) => (
          <Card
            key={venue.id}
            className="overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <Link href={`/venues/${venue.id}`}>
              <div className="relative aspect-video">
                <Image
                  src={venue.images[0]}
                  alt={venue.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold font-headline mb-2 text-primary">
                  {venue.name}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1.5" />
                  {venue.location}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold bg-secondary text-secondary-foreground py-1 px-3 rounded-full">
                    {venue.hallType}
                  </span>
                  <div className="text-lg font-bold">
                    ₹{venue.baseCost.toLocaleString('en-IN')}
                    <span className="text-sm font-normal text-muted-foreground">
                      / day
                    </span>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
