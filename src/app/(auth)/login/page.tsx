
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Wind, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

const passwordValidation = z.string()
  .min(8, { message: 'Password must be at least 8 characters.' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
  .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character.' });

const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: passwordValidation,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});


const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

type SignupFormValues = z.infer<typeof signupSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

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


export default function LoginPage() {
  const { login, signup, isAuthenticated } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: ''},
  });

  function onLoginSubmit(data: LoginFormValues) {
    const success = login(data.email, data.password);
    if (!success) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email or password. Please try again.',
      });
    }
  }
  
  function onSignupSubmit(data: SignupFormValues) {
    const success = signup(data.email, data.password);
    if(success) {
       toast({
        title: 'Signup Successful',
        description: 'You can now log in with your new account.',
      });
      setAuthMode('login');
      loginForm.setValue('email', data.email);
      signupForm.reset();
    } else {
       toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: 'An account with this email already exists.',
      });
    }
  }

  const toggleAuthMode = () => {
    loginForm.reset();
    signupForm.reset();
    setAuthMode(currentMode => currentMode === 'login' ? 'signup' : 'login');
  }


  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-2">
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
      </div>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
            <div className="p-3 bg-primary/10 rounded-full w-fit">
                <Wind className="h-8 w-8 text-primary" />
            </div>
        </div>
        <Card className="shadow-2xl rounded-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-headline">Hyderabad Venues</CardTitle>
              <CardDescription>
                {authMode === 'login' ? 'Welcome back! Please sign in to continue.' : 'Create your account to book a venue.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
             {authMode === 'login' ? (
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField control={loginForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input placeholder="user@domain.com" {...field} type="email" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={loginForm.control} name="password" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input placeholder="••••••••" {...field} type="password" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                      {loginForm.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </form>
                </Form>
              ) : (
                 <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                    <FormField control={signupForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input placeholder="user@domain.com" {...field} type="email" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={signupForm.control} name="password" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input placeholder="Create a password" {...field} type="password" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={signupForm.control} name="confirmPassword" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl><Input placeholder="Re-enter password" {...field} type="password" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" className="w-full" disabled={signupForm.formState.isSubmitting}>
                       {signupForm.formState.isSubmitting ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                  </form>
                </Form>
              )}
               <div className="text-center mt-4">
                <Button variant="link" onClick={toggleAuthMode} className="text-sm">
                  {authMode === 'login' ? "New user? Click here to sign up" : "Already have an account? Sign in"}
                </Button>
              </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
