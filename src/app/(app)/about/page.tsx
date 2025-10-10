import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle, History, Target } from 'lucide-react';
import Image from 'next/image';

const teamMembers = [
  { name: 'Alice Johnson', role: 'CEO & Founder', imageId: 'team1' },
  { name: 'Bob Williams', role: 'CTO', imageId: 'team2' },
  { name: 'Charlie Brown', role: 'Lead Designer', imageId: 'team3' },
  { name: 'Diana Miller', role: 'Head of Marketing', imageId: 'team4' },
];

export default function AboutPage() {
  const teamImages = PlaceHolderImages.filter(img => img.id.startsWith('team'));
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">About FlowForm</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Learn about our journey, our values, and the passionate team behind our innovative solutions.
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20">
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-8">
            <History className="h-10 w-10 text-primary mb-4" />
            <h2 className="text-3xl font-bold font-headline mb-3">Our History</h2>
            <p className="text-muted-foreground">
              Founded in 2020, FlowForm started as a small project to simplify internal data collection. We quickly realized the universal need for better forms and expanded our vision to create a platform that is both powerful for developers and easy for anyone to use.
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-8">
            <Target className="h-10 w-10 text-primary mb-4" />
            <h2 className="text-3xl font-bold font-headline mb-3">Our Vision</h2>
            <p className="text-muted-foreground">
              Our vision is a world where data collection is no longer a chore. We aim to be the leading platform for creating forms that are not just functional, but a pleasure to interact with, ultimately improving response rates and data quality for everyone.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary text-center mb-10">Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Simplicity', 'Innovation', 'Customer-Centricity', 'Integrity', 'Collaboration', 'Excellence'].map((value) => (
            <div key={value} className="flex items-start gap-4 p-4 rounded-lg hover:bg-card">
              <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">{value}</h3>
                <p className="text-muted-foreground text-sm">We uphold this value by constantly striving to improve and deliver the best possible experience.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary text-center mb-10">Meet the Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member) => {
            const memberImage = teamImages.find(img => img.id === member.imageId);
            return (
              <div key={member.name} className="text-center group">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 rounded-full overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                  {memberImage ? (
                    <Image
                      src={memberImage.imageUrl}
                      alt={`Portrait of ${member.name}`}
                      fill
                      className="object-cover"
                      data-ai-hint={memberImage.imageHint}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : <div className="w-full h-full bg-muted"></div>}
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
