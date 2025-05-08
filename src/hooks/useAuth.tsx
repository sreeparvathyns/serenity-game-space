
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface User {
  email: string;
  password: string; // We'll store this for demo purposes, in real app would be hashed
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Get the list of registered users from localStorage
      const registeredUsersJSON = localStorage.getItem('registeredUsers');
      const registeredUsers: User[] = registeredUsersJSON ? JSON.parse(registeredUsersJSON) : [];
      
      // Find the user with the provided email
      const foundUser = registeredUsers.find(u => u.email === email);
      
      if (!foundUser) {
        throw new Error('User not found. Please register first.');
      }
      
      if (foundUser.password !== password) {
        throw new Error('Invalid password.');
      }
      
      // If we get here, login is successful
      localStorage.setItem('user', JSON.stringify({ email }));
      setUser({ email, password });
      
      toast({
        title: "Login successful",
        description: "Welcome back to Serenity!",
      });
      
      navigate('/');
    } catch (error) {
      let errorMessage = "Please check your credentials and try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Get current registered users from localStorage
      const registeredUsersJSON = localStorage.getItem('registeredUsers');
      const registeredUsers: User[] = registeredUsersJSON ? JSON.parse(registeredUsersJSON) : [];
      
      // Check if email already exists
      if (registeredUsers.some(user => user.email === email)) {
        throw new Error('Email already registered. Please login instead.');
      }
      
      // Add the new user to the list
      const updatedUsers = [...registeredUsers, { email, password }];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });
      
      navigate('/login');
    } catch (error) {
      let errorMessage = "There was an error creating your account. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
