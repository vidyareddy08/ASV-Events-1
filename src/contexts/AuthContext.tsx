
'use client';

import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // This effect runs only on the client
    try {
      const storedAuth = localStorage.getItem('isAuthenticated');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Could not access localStorage', error);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string) => {
    // In a real app, you'd verify credentials here.
    // For this simulation, any valid email logs in.
    try {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      router.push('/venues');
    } catch (error) {
       console.error('Could not access localStorage', error);
    }
  }, [router]);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('isAuthenticated');
      setIsAuthenticated(false);
      router.push('/login');
    } catch (error) {
      console.error('Could not access localStorage', error);
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
