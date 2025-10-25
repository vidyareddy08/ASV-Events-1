
'use client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu, Wind, LogIn, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
  { href: '/venues', label: 'Venues' },
  { href: '/concerts', label: 'Concerts' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/pre-booking', label: 'Pre-booking' },
  { href: '/about', label: 'About' },
  { href: '/features', label: 'Features' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const AuthButton = ({ isMobile = false }) => (
    isAuthenticated ? (
      <Button onClick={logout} variant={isMobile ? 'default' : 'outline'} size="sm" className={cn(isMobile && 'w-full')}>
        <LogOut className="mr-2" />
        Logout
      </Button>
    ) : (
      <Button onClick={() => router.push('/login')} variant={isMobile ? 'default' : 'outline'} size="sm" className={cn(isMobile && 'w-full')}>
        <LogIn className="mr-2" />
        Login / Sign Up
      </Button>
    )
  );

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav className={cn('flex items-center gap-1', isMobile ? 'flex-col items-start w-full' : 'hidden md:flex')}>
      {navLinks.map((link) => (
        <Button
          key={link.href}
          asChild
          variant="link"
          className={cn(
            'font-medium transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary' : 'text-muted-foreground',
            isMobile && 'text-lg w-full justify-start p-4'
          )}
        >
          <Link href={link.href} onClick={() => setSheetOpen(false)}>
            {link.label}
          </Link>
        </Button>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/venues" className="flex items-center gap-2 font-bold text-lg text-primary font-headline">
          <Wind className="h-6 w-6" />
          ASV Events
        </Link>
        <div className="hidden md:flex items-center gap-2">
          <NavLinks />
          <AuthButton />
        </div>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <Link href="/venues" onClick={() => setSheetOpen(false)} className="flex items-center gap-2 font-bold text-lg text-primary font-headline">
                    <Wind className="h-6 w-6" />
                    ASV Events
                  </Link>
                </div>
                <div className="flex-grow p-4">
                  <NavLinks isMobile />
                </div>
                <div className="p-6 border-t">
                  <AuthButton isMobile />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
