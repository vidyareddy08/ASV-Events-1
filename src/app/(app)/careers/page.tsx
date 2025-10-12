
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Briefcase, IndianRupee, MapPin } from 'lucide-react';

const applicationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid 10-digit phone number.' }).max(15),
  education: z.string().min(2, { message: 'Please enter your educational background.' }),
  hasExperience: z.enum(['yes', 'no']),
  previousExperience: z.string().optional(),
  resumeUrl: z.string().url({ message: 'Please enter a valid URL for your resume or portfolio.' }).optional().or(z.literal('')),
  coverLetter: z.string().min(20, { message: 'Please provide a cover letter of at least 20 characters.' }),
}).refine(data => {
  if (data.hasExperience === 'yes') {
    return data.previousExperience && data.previousExperience.length >= 10;
  }
  return true;
}, {
  message: 'Please describe your previous experience (min. 10 characters).',
  path: ['previousExperience'],
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const jobOpenings = [
  {
    id: 'job-01',
    title: 'Senior Frontend Engineer',
    location: 'Hyderabad, IN',
    package: '₹18-25 LPA',
    description: 'This is a critical role to shape the user experience of our platform. You will lead the development of new features, ensuring our interface is fast, intuitive, and accessible for thousands of users booking their dream events.',
  },
  {
    id: 'job-02',
    title: 'Business Development Manager',
    location: 'Hyderabad, IN',
    package: '₹15-22 LPA + Incentives',
    description: 'As a key driver of our growth, you will forge strategic partnerships with top-tier venues across Hyderabad. Your work directly expands our inventory and solidifies our position as the market leader.',
  },
  {
    id: 'job-03',
    title: 'Customer Support Specialist',
    location: 'Remote (Hyderabad-based)',
    package: '₹6-9 LPA',
    description: 'You are the voice of ASV Events. This role is vital for ensuring a seamless and positive booking experience, directly impacting customer satisfaction and retention.',
  },
];

function ApplicationForm({ jobTitle, onApply }: { jobTitle: string; onApply: (values: ApplicationFormValues) => void; }) {
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      education: '',
      hasExperience: 'no',
      previousExperience: '',
      resumeUrl: '',
      coverLetter: '',
    },
  });

  const hasExperience = form.watch('hasExperience');

  function onSubmit(data: ApplicationFormValues) {
    onApply(data);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DialogHeader>
          <DialogTitle>Apply for: {jobTitle}</DialogTitle>
          <DialogDescription>
            Please fill out the form below to submit your application. We will review it and get back to you shortly.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto px-1">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl><Input placeholder="your.email@example.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
           <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl><Input placeholder="Your Phone Number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="education" render={({ field }) => (
            <FormItem>
              <FormLabel>Highest Education Pursued</FormLabel>
              <FormControl><Input placeholder="e.g., B.Tech in Computer Science" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="hasExperience" render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you have previous work experience?</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                  <FormItem className="flex items-center space-x-2">
                    <FormControl><RadioGroupItem value="yes" /></FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl><RadioGroupItem value="no" /></FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          {hasExperience === 'yes' && (
            <FormField control={form.control} name="previousExperience" render={({ field }) => (
              <FormItem>
                <FormLabel>Describe Your Previous Experience</FormLabel>
                <FormControl><Textarea placeholder="Tell us about your previous roles and responsibilities..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          )}
          <FormField control={form.control} name="resumeUrl" render={({ field }) => (
            <FormItem>
              <FormLabel>Resume/Portfolio URL</FormLabel>
              <FormControl><Input placeholder="https://linkedin.com/in/your-profile" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="coverLetter" render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Letter</FormLabel>
              <FormControl><Textarea placeholder="Why are you a good fit for this role?" {...field} rows={5} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <DialogFooter>
          <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
          <Button type="submit">Submit Application</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}


export default function CareersPage() {
  const { toast } = useToast();
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const handleApply = (values: ApplicationFormValues, jobTitle: string) => {
    console.log('Application Data:', values);
    toast({
      title: 'Application Submitted!',
      description: `Thank you, ${values.name}. A confirmation email has been sent to ${values.email} for the "${jobTitle}" position.`,
      variant: 'default',
    });
    setOpenDialogId(null);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Join Our Team</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We're building the future of event booking in Hyderabad. Be a part of our journey to make finding the perfect venue easier for everyone.
        </p>
      </header>
      
      <div className="space-y-8 max-w-4xl mx-auto">
        {jobOpenings.map((job) => (
          <Dialog key={job.id} open={openDialogId === job.id} onOpenChange={(isOpen) => setOpenDialogId(isOpen ? job.id : null)}>
            <Card className="overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">{job.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" /> {job.package}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-primary mb-2 flex items-center gap-2"><Briefcase className="h-5 w-5"/>Role Importance</h3>
                <p className="text-muted-foreground">{job.description}</p>
              </CardContent>
              <CardFooter>
                 <DialogTrigger asChild>
                    <Button>Apply Now</Button>
                  </DialogTrigger>
              </CardFooter>
            </Card>
            <DialogContent className="sm:max-w-xl">
               <ApplicationForm jobTitle={job.title} onApply={(values) => handleApply(values, job.title)} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
