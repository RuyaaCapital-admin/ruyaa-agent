"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { createClient } from "@supabase/supabase-js";
import type { User, AuthError } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<{ error?: AuthError }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: AuthError }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Validate Supabase configuration
  const isValidSupabaseConfig =
    supabaseUrl &&
    supabaseKey &&
    supabaseUrl.startsWith("https://") &&
    !supabaseUrl.includes("your_supabase_project_url_here") &&
    !supabaseKey.includes("your_supabase_anon_key_here");

  // Create client only if valid configuration is available
  const supabase = isValidSupabaseConfig
    ? createClient(supabaseUrl, supabaseKey)
    : null;

  useEffect(() => {
    if (!supabase) {
      // No Supabase config available
      setLoading(false);
      return;
    }

    // Get initial user
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      // Handle the session with cookies for SSR
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        // Set a cookie for SSR
        document.cookie = `supabase-auth-token=${session?.access_token || ""}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      } else if (event === "SIGNED_OUT") {
        // Remove the cookie
        document.cookie =
          "supabase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const signInWithGoogle = async () => {
    if (!supabase) {
      const message = "Supabase not configured. Please contact support.";
      console.warn(message);
      toast({
        title: "Configuration Error",
        description: message,
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}`,
        },
      });

      if (error) {
        console.error("Google sign-in error:", error);
        toast({
          title: "Sign In Failed",
          description:
            error.message || "Failed to sign in with Google. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast({
        title: "Sign In Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithMagicLink = async (email: string) => {
    if (!supabase) {
      const message = "Supabase not configured. Please contact support.";
      console.warn(message);
      toast({
        title: "Configuration Error",
        description: message,
        variant: "destructive",
      });
      return { error: new Error("Supabase not configured") as AuthError };
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}`,
        },
      });

      if (error) {
        console.error("Magic link error:", error);
        toast({
          title: "Failed to Send Magic Link",
          description:
            error.message ||
            "Failed to send magic link. Please check your email address.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Magic Link Sent",
          description: "Check your email for the magic link to sign in.",
          variant: "default",
        });
      }

      return { error };
    } catch (error) {
      console.error("Magic link error:", error);
      const errorMessage = "An unexpected error occurred. Please try again.";
      toast({
        title: "Failed to Send Magic Link",
        description: errorMessage,
        variant: "destructive",
      });
      return { error: error as AuthError };
    }
  };

  const resetPassword = async (email: string) => {
    if (!supabase) {
      const message = "Supabase not configured. Please contact support.";
      console.warn(message);
      toast({
        title: "Configuration Error",
        description: message,
        variant: "destructive",
      });
      return { error: new Error("Supabase not configured") as AuthError };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error("Reset password error:", error);
        toast({
          title: "Failed to Send Reset Link",
          description:
            error.message ||
            "Failed to send password reset link. Please check your email address.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Reset Link Sent",
          description: "Check your email for the password reset link.",
          variant: "default",
        });
      }

      return { error };
    } catch (error) {
      console.error("Reset password error:", error);
      const errorMessage = "An unexpected error occurred. Please try again.";
      toast({
        title: "Failed to Send Reset Link",
        description: errorMessage,
        variant: "destructive",
      });
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    if (!supabase) {
      const message = "Supabase not configured. Please contact support.";
      console.warn(message);
      toast({
        title: "Configuration Error",
        description: message,
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Sign out error:", error);
        toast({
          title: "Sign Out Failed",
          description: error.message || "Failed to sign out. Please try again.",
          variant: "destructive",
        });
        throw error;
      } else {
        toast({
          title: "Signed Out",
          description: "You have been successfully signed out.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign Out Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle,
    signInWithMagicLink,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
