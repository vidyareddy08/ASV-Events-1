
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { venues } from '@/lib/venue-data';
import { ArrowRight, Globe, MapPin } from 'lucide-react';
import VenueChatbot from '@/components/VenueChatbot';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const locations = [
  'All',
  'Hyderabad (North)',
  'Hyderabad (South)',
  'Hyderabad (East)',
  'Hyderabad (West)',
  'Hyderabad (Central)',
];

const indianLanguages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'ur', name: 'اردو (Urdu)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'as', name: 'অসমীয়া (Assamese)' },
];

export default function VenuesPage() {
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const filteredVenues =
    selectedLocation === 'All'
      ? venues
      : venues.filter((venue) => venue.location === selectedLocation);

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Find Your Perfect Venue in Hyderabad
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our curated selection of exquisite halls and open spaces for your next birthday, party, or event.
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
      
      <div className="max-w-2xl mx-auto space-y-4 mb-4">
        <div className="flex justify-end items-center gap-2">
           <Globe className="h-5 w-5 text-muted-foreground" />
           <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {indianLanguages.map(lang => (
                 <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <VenueChatbot />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
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
