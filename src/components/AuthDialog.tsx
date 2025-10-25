
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Eye, EyeOff } from 'lucide-react';
import type { DialogProps } from '@radix-ui/react-dialog';

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

interface AuthDialogProps extends DialogProps {
    onLoginSuccess?: () => void;
}

export default function AuthDialog({ onLoginSuccess, ...props }: AuthDialogProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [initialEmail, setInitialEmail] = useState('');

  const switchToSignup = () => {
    setInitialEmail('');
    setAuthMode('signup');
  };

  const switchToLogin = (email: string) => {
    setInitialEmail(email);
    setAuthMode('login');
  };

  const handleSuccess = () => {
     if (props.onOpenChange) {
      props.onOpenChange(false);
    }
    onLoginSuccess?.();
  }

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-md">
        {authMode === 'login' ? (
          <LoginForm onSwitchToSignup={switchToSignup} initialEmail={initialEmail} onLoginSuccess={handleSuccess} />
        ) : (
          <SignupForm onSwitchToLogin={switchToLogin} />
        )}
      </DialogContent>
    </Dialog>
  );
}

function LoginForm({ onSwitchToSignup, initialEmail, onLoginSuccess }: { onSwitchToSignup: () => void; initialEmail?: string, onLoginSuccess: () => void; }) {
  const { login } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: initialEmail || '', password: '' },
  });

  function onSubmit(data: LoginFormValues) {
    const success = login(data.email, data.password, false);
    if (success) {
      toast({ title: 'Login Successful', description: 'You can now complete your booking.' });
      onLoginSuccess();
    } else {
      toast({ variant: 'destructive', title: 'Login Failed', description: 'Invalid email or password.' });
    }
  }

  return (
    <>
      <DialogHeader className="space-y-1 text-center">
        <DialogTitle className="text-2xl">Login to Book</DialogTitle>
        <DialogDescription>Please sign in to complete your booking.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
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
          <div className="flex flex-col gap-2 pt-2">
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
             <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
          </div>
        </form>
      </Form>
      <div className="text-center">
        <Button variant="link" onClick={onSwitchToSignup} className="text-sm">
          New user? Create an account
        </Button>
      </div>
    </>
  );
}


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

  function onSubmit(data: SignupFormValues) {
    const success = signup(data.email, data.password);
    if(success) {
      toast({ title: 'Signup Successful', description: 'You can now log in with your new account.' });
      onSwitchToLogin(data.email);
    } else {
      toast({ variant: 'destructive', title: 'Signup Failed', description: 'An account with this email already exists.' });
    }
  }

  return (
    <>
      <DialogHeader className="space-y-1 text-center">
        <DialogTitle className="text-2xl">Create an Account</DialogTitle>
        <DialogDescription>Sign up to book venues, concerts, and workshops.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
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
                    <Input placeholder="Create a password" {...field} type={showPassword ? 'text' : 'password'} />
                  </FormControl>
                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
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
                    <Input placeholder="Re-enter password" {...field} type={showConfirmPassword ? 'text' : 'password'} />
                  </FormControl>
                   <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )} />
            <div className="flex flex-col gap-2 pt-2">
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </Button>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
            </div>
        </form>
      </Form>
       <div className="text-center">
        <Button variant="link" onClick={() => onSwitchToLogin('')} className="text-sm">
          Already have an account? Sign in
        </Button>
      </div>
    </>
  );
}
