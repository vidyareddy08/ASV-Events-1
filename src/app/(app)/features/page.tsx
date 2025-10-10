import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Layers, Palette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Palette,
    title: 'Intuitive Drag & Drop Builder',
    description: 'Design beautiful, complex forms without writing a single line of code. Our visual editor makes form creation a breeze.',
  },
  {
    icon: Layers,
    title: 'Conditional Logic & Workflows',
    description: 'Create dynamic forms that react to user input. Show or hide fields, send emails, and trigger workflows based on responses.',
  },
  {
    icon: Bot,
    title: 'AI-Powered Insights',
    description: 'Go beyond data collection. Our AI analyzes submission patterns and provides actionable insights to optimize your forms and processes.',
  },
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Powerful Features</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Everything you need to build forms that convert, engage, and inform.
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  );
}
