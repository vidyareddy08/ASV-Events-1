
'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Wind, Globe, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
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
import { cn } from '@/lib/utils';

// Schemas
const passwordValidation = z.string()
  .min(8, 'Password must be at least 8 characters.')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
  .regex(/[0-9]/, 'Password must contain at least one number.')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character.');

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

// LoginForm Component
function LoginForm({ onSwitchToSignup, initialEmail }: { onSwitchToSignup: () => void; initialEmail?: string; }) {
  const { login } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: initialEmail || '', password: '' },
  });

  useEffect(() => {
    if (initialEmail) {
      form.setValue('email', initialEmail);
    } else {
      form.reset({ email: '', password: '' });
    }
  }, [initialEmail, form]);

  function onSubmit(data: LoginFormValues) {
    const success = login(data.email, data.password);
    if (!success) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email or password. Please try again.',
      });
    }
  }

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline">Hyderabad Venues</CardTitle>
        <CardDescription>Welcome back! Please sign in to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input placeholder="user@domain.com" {...field} type="email" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      placeholder="••••••••" 
                      {...field} 
                      type={showPassword ? 'text' : 'password'} 
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <Button variant="link" onClick={onSwitchToSignup} className="text-sm">
            New user? Click here to sign up
          </Button>
        </div>
      </CardContent>
    </>
  );
}

// SignupForm Component
function SignupForm({ onSwitchToLogin }: { onSwitchToLogin: (email: string) => void; }) {
  const { signup } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: ''},
    mode: 'onTouched',
  });

  const password = useWatch({ control: form.control, name: 'password' });

  function onSubmit(data: SignupFormValues) {
    const success = signup(data.email, data.password);
    if(success) {
      toast({
        title: 'Signup Successful',
        description: 'You can now log in with your new account.',
      });
      onSwitchToLogin(data.email);
    } else {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: 'An account with this email already exists.',
      });
    }
  }

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline">Hyderabad Venues</CardTitle>
        <CardDescription>Create your account to book a venue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input placeholder="user@domain.com" {...field} type="email" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      placeholder="Create a password" 
                      {...field} 
                      type={showPassword ? 'text' : 'password'}
                    />
                  </FormControl>
                   <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )} />
            
            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      placeholder="Re-enter password" 
                      {...field} 
                      type={showConfirmPassword ? 'text' : 'password'}
                    />
                  </FormControl>
                   <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <Button variant="link" onClick={() => onSwitchToLogin('')} className="text-sm">
            Already have an account? Sign in
          </Button>
        </div>
      </CardContent>
    </>
  );
}


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
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [initialEmail, setInitialEmail] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/venues');
    }
  }, [isAuthenticated, router]);
  
  const switchToSignup = () => {
      setInitialEmail('');
      setAuthMode('signup');
  };
  
  const switchToLogin = (email: string) => {
      setInitialEmail(email);
      setAuthMode('login');
  };

  if (isAuthenticated) {
      return null;
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
             {authMode === 'login' ? (
                <LoginForm onSwitchToSignup={switchToSignup} initialEmail={initialEmail} />
              ) : (
                <SignupForm onSwitchToLogin={switchToLogin} />
              )}
        </Card>
      </div>
    </div>
  );
}
