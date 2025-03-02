
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Define the structure of a profile
interface Profile {
  id: string;
  email: string;
  is_admin: boolean;
  user_type: 'admin' | 'establishment_owner';
  created_at: string;
  updated_at: string;
}

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  userType: string | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data as Profile;
    } catch (err) {
      console.error('Error fetching profile:', err);
      return null;
    }
  };

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }

      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        
        if (profile) {
          setProfile(profile);
          setIsAdmin(profile.is_admin || false);
          setUserType(profile.user_type || null);
        } else {
          setIsAdmin(false);
          setUserType(null);
        }
      }
      
      setIsLoading(false);
    };

    setData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        
        if (profile) {
          setProfile(profile);
          setIsAdmin(profile.is_admin || false);
          setUserType(profile.user_type || null);
        } else {
          setIsAdmin(false);
          setUserType(null);
        }
      } else {
        setIsAdmin(false);
        setUserType(null);
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      // Check user profile after successful login
      const { data: userInfo } = await supabase.auth.getUser();
      
      if (userInfo?.user) {
        const profile = await fetchUserProfile(userInfo.user.id);
        
        if (profile) {
          if (profile.is_admin) {
            toast.success('Successfully signed in as admin');
            navigate('/admin/dashboard');
          } else {
            toast.success('Successfully signed in as establishment owner');
            navigate('/owner/dashboard');
          }
        } else {
          toast.info('Signed in successfully');
        }
      } else {
        toast.info('Signed in successfully');
      }
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast.error('An error occurred during sign in');
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success('Registration successful! Please check your email for verification.');
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast.error('An error occurred during registration');
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
        return;
      }
      
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('An error occurred during sign out');
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isAdmin,
    userType,
    profile,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
