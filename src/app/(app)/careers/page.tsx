'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, MapPin } from 'lucide-react';

const jobOpenings = [
  {
    title: 'Senior Frontend Engineer',
    location: 'Remote',
    description: 'We are looking for an experienced Frontend Engineer to help build the next generation of our form builder. You will work with React, Next.js, and TypeScript to create a fast, intuitive, and accessible user experience.',
  },
  {
    title: 'Product Designer',
    location: 'New York, NY',
    description: 'Join our design team to shape the future of FlowForm. You will be responsible for user research, wireframing, prototyping, and creating high-fidelity designs for new features and improvements.',
  },
  {
    title: 'DevOps Specialist',
    location: 'Remote',
    description: 'We need a DevOps Specialist to manage our cloud infrastructure, optimize our CI/CD pipelines, and ensure the reliability and security of our platform. Experience with AWS, Docker, and Kubernetes is a must.',
  },
];

export default function CareersPage() {
  const [appliedJob, setAppliedJob] = useState<string | null>(null);

  const handleApply = (title: string) => {
    setAppliedJob(title);
    setTimeout(() => setAppliedJob(null), 4000); // Message disappears after 4 seconds
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Join Our Team</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We're building the future of data collection. Be a part of our journey to make forms better for everyone.
        </p>
      </header>
      
      <div className="space-y-8 max-w-4xl mx-auto">
        {jobOpenings.map((job) => (
          <Card key={job.title} className="overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">{job.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 pt-2 text-muted-foreground">
                <MapPin className="h-4 w-4" /> {job.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{job.description}</p>
            </CardContent>
            <CardFooter>
              {appliedJob === job.title ? (
                 <div className="flex items-center gap-2 text-accent font-medium px-4 py-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Application Submitted! We'll be in touch.</span>
                </div>
              ) : (
                <Button onClick={() => handleApply(job.title)}>Apply Now</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
