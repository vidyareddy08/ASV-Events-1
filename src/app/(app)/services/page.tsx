import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const servicePackages = [
  {
    name: 'Standard Listing',
    price: 'Free',
    description: 'List your venue on our platform and reach a wide audience in Hyderabad.',
    features: ['Standard Listing Page', 'Upto 5 Photos', 'Booking Management', 'Email Support'],
    isPopular: true,
  },
  {
    name: 'Featured Listing',
    price: '₹4,999',
    description: 'Get priority placement and more visibility for your venue.',
    features: ['Everything in Standard', 'Featured Placement', 'Upto 15 Photos', 'Social Media Promotion', 'Priority Support'],
    isPopular: false,
  },
  {
    name: 'Premium Partnership',
    price: 'Custom',
    description: 'A complete marketing and booking solution for your venue.',
    features: ['Everything in Featured', 'Dedicated Account Manager', 'Professional Photoshoot', 'Analytics & Insights', '24/7 Phone Support'],
    isPopular: false,
  },
];

const orderedPackages = [
    servicePackages[0],
    servicePackages[1],
    servicePackages[2],
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">List Your Venue</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Partner with us to showcase your venue to thousands of potential customers across Hyderabad.
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
        {orderedPackages.map((pkg) => (
          <Card key={pkg.name} className={`flex flex-col rounded-xl transition-all duration-300 ${pkg.isPopular ? 'border-2 border-primary shadow-2xl scale-105' : 'hover:shadow-xl hover:-translate-y-2'}`}>
             {pkg.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold rounded-full shadow-lg">
                Most Popular
              </div>
            )}
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
              <CardDescription className="px-2">{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-center mb-6">
                <span className="text-5xl font-bold font-headline">{pkg.price}</span>
                <span className="text-muted-foreground">{pkg.name === 'Featured Listing' && '/year'}</span>
              </div>
              <ul className="space-y-3 text-sm">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-6">
              <Button className="w-full" variant={pkg.isPopular ? 'default' : 'outline'}>
                {pkg.name === 'Premium Partnership' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
