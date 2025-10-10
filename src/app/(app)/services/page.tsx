import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const servicePackages = [
  {
    name: 'Basic',
    price: '$29',
    description: 'For individuals and small teams just getting started.',
    features: ['10 Forms', '1,000 Submissions/mo', 'Basic Templates', 'Email Support'],
    isPopular: false,
  },
  {
    name: 'Premium',
    price: '$79',
    description: 'For growing businesses that need more power and customization.',
    features: ['Unlimited Forms', '10,000 Submissions/mo', 'Advanced Templates', 'Conditional Logic', 'Priority Support'],
    isPopular: true,
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'Perfect for professionals and freelancers.',
    features: ['50 Forms', '5,000 Submissions/mo', 'Premium Templates', 'Zapier Integration', 'Chat Support'],
    isPopular: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with advanced security and support needs.',
    features: ['Everything in Premium', 'AI-Powered Insights', 'Dedicated Account Manager', 'SAML SSO', '24/7 Phone Support'],
    isPopular: false,
  },
];

// Reordering for ideal visual layout
const orderedPackages = [
    servicePackages[0],
    servicePackages[1],
    servicePackages[2],
    servicePackages[3]
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Our Services</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Choose the perfect plan to fit your needs. All plans are backed by our commitment to excellence.
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
        {orderedPackages.map((pkg) => (
          <Card key={pkg.name} className={`flex flex-col rounded-xl transition-all duration-300 ${pkg.isPopular ? 'border-2 border-primary shadow-2xl scale-105' : 'hover:shadow-xl hover:-translate-y-2'}`}>
             {pkg.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold rounded-full shadow-lg">
                Popular
              </div>
            )}
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
              <CardDescription className="px-2">{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-center mb-6">
                <span className="text-5xl font-bold font-headline">{pkg.price}</span>
                <span className="text-muted-foreground">{pkg.name !== 'Enterprise' && '/mo'}</span>
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
                {pkg.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
