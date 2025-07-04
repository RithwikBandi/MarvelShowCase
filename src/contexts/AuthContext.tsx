import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
}

interface StoredCredentials {
  email: string;
  password: string;
  username: string;
  displayName: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticating: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('marvel_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsAuthenticating(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get stored credentials
      const storedCredentialsStr = localStorage.getItem('marvel_credentials');
      if (!storedCredentialsStr) {
        throw new Error('This email may not be registered on the site.');
      }

      const storedCredentials: StoredCredentials = JSON.parse(storedCredentialsStr);
      
      // Check email first
      if (storedCredentials.email !== email) {
        throw new Error('This email may not be registered on the site.');
      }

      // If email exists but password is wrong
      if (storedCredentials.password !== password) {
        throw new Error('Invalid password.');
      }
      
      const authenticatedUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: storedCredentials.email,
        username: storedCredentials.username,
        displayName: storedCredentials.displayName
      };
      
      // Add delay for animation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUser(authenticatedUser);
      localStorage.setItem('marvel_user', JSON.stringify(authenticatedUser));
    } catch (error) {
      throw error instanceof Error ? error : new Error('An unexpected error occurred.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signup = async (email: string, username: string, password: string, displayName: string) => {
    try {
      // Validate all required fields
      if (!email || !username || !password || !displayName) {
        throw new Error('All fields are required.');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address.');
      }

      // Validate username (alphanumeric and underscores only)
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(username)) {
        throw new Error('Username can only contain letters, numbers, and underscores.');
      }

      // Prevent duplicate signup with same email
      const storedCredentialsStr = localStorage.getItem('marvel_credentials');
      if (storedCredentialsStr) {
        const storedCredentials = JSON.parse(storedCredentialsStr);
        if (storedCredentials.email === email) {
          throw new Error('Email ID is already registered.');
        }
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store credentials for login validation
      const credentials: StoredCredentials = {
        email,
        password,
        username,
        displayName
      };
      localStorage.setItem('marvel_credentials', JSON.stringify(credentials));
      
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        username,
        displayName
      };
      
      setUser(newUser);
      localStorage.setItem('marvel_user', JSON.stringify(newUser));
    } catch (error) {
      throw error instanceof Error ? error : new Error('Signup failed. Please try again.');
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('marvel_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticating, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 