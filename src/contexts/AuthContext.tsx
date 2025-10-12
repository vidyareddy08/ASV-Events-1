
'use client';

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password?: string) => boolean;
  logout: () => void;
  signup: (email: string, password?: string) => boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Could not access localStorage on initial load', error);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, password?: string) => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
      if (storedUsers[email] && storedUsers[email] === password) {
        const currentUser = { email };
        localStorage.setItem('user', JSON.stringify(currentUser));
        setUser(currentUser);
        setIsAuthenticated(true);
        router.push('/venues');
        return true;
      }
      return false;
    } catch (error) {
       console.error('Could not access localStorage during login', error);
       return false;
    }
  }, [router]);
  
  const signup = useCallback((email: string, password?: string) => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
      if (storedUsers[email]) {
        return false; // User already exists
      }
      if (!password) {
          return false; // Password is required
      }
      storedUsers[email] = password;
      localStorage.setItem('users', JSON.stringify(storedUsers));
      return true;
    } catch (error) {
      console.error('Could not access localStorage during signup', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      router.push('/login');
    } catch (error) {
      console.error('Could not access localStorage during logout', error);
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
