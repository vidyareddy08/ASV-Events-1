import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[calc(100vh-4rem)] flex items-center justify-center text-center text-white overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-4 flex flex-col items-center animate-in fade-in-50 slide-in-from-bottom-10 duration-500">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline mb-4 drop-shadow-lg">
            Effortless Forms, Seamless Flow
          </h1>
          <p className="max-w-3xl text-lg md:text-xl mb-8 drop-shadow-md text-slate-200">
            FlowForm is your ultimate solution for creating intuitive, powerful, and beautiful forms that drive your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/services">
                Explore Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/careers">
                Join Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">Our Mission</h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            To empower businesses with the tools to capture data effortlessly and elegantly, transforming complex processes into simple, streamlined workflows. We believe in the power of good design and user-centric functionality to make data collection a seamless part of any operation.
          </p>
        </div>
      </section>
    </div>
  );
}
