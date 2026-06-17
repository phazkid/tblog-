import React, { createContext, useContext, useEffect, useState } from "react";
import * as AuthService from "@/lib/auth";
import type { User } from "@/lib/auth";

interface AuthContextType {
  user: Omit<User, "password"> | null;
  isLoading: boolean;
  isSignedIn: boolean;
  register: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const currentUser = await AuthService.getCurrentUser();
      setUser(currentUser);
    } catch (e) {
      console.error("[v0] Bootstrap error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
    try {
      const result = await AuthService.registerUser(email, password, fullName);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return {
        success: result.success,
        error: result.error,
      };
    } catch (error) {
      return { success: false, error: "Registration failed" };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await AuthService.loginUser(email, password);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return {
        success: result.success,
        error: result.error,
      };
    } catch (error) {
      return { success: false, error: "Login failed" };
    }
  };

  const logout = async () => {
    try {
      await AuthService.logoutUser();
      setUser(null);
    } catch (error) {
      console.error("[v0] Logout error:", error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isSignedIn: user !== null,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
