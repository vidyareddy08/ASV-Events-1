import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Layers, Palette, Users, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Palette,
    title: 'Simple Search & Filter',
    description: 'Easily find the perfect venue with our intuitive search and location-based filters, designed specifically for Hyderabad.',
  },
  {
    icon: Layers,
    title: 'Instant Availability Check',
    description: 'View real-time availability for venues with our clear and simple booking calendar. No more back-and-forth calls.',
  },
  {
    icon: Bot,
    title: 'Transparent Pricing',
    description: 'Get instant cost estimates including all taxes. What you see is what you pay, with no hidden fees.',
  },
];

const eventManagers = [
  { name: 'Priya Sharma', phone: '987-654-3210' },
  { name: 'Rahul Verma', phone: '876-543-2109' },
  { name: 'Anjali Singh', phone: '765-432-1098' },
  { name: 'Rohan Mehta', phone: '654-321-0987' },
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Platform Features</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Everything you need to book the perfect venue for your event in Hyderabad.
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {features.map((feature, index) => (
          <Card key={index} className="flex flex-col text-center items-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-xl">
            <CardHeader className="items-center">
              <div className="mx-auto bg-primary/10 p-5 rounded-full mb-4">
                <feature.icon className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section>
        <header className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Our Dedicated Event Managers</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Get expert assistance from our professional event management team.
            </p>
        </header>
        <div className="max-w-4xl mx-auto">
            <Card className="rounded-xl shadow-lg">
                <CardContent className="p-6">
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                        {eventManagers.map((manager) => (
                            <div key={manager.name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{manager.name}</h3>
                                    <p className="flex items-center gap-2 text-muted-foreground">
                                        <Phone className="h-4 w-4" />
                                        {manager.phone}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
