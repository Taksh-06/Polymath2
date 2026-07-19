"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import { createClient } from "@/utils/supabase/client";

export type OrbStatus = "locked" | "unlocked" | "in-progress" | "mastered";

export interface UserState {
  xp: number;
  level: number;
  coins: number;
  streak: number;
  lastActiveDate: string | null;
  hasReviewed?: boolean;
}

export interface ProgressState {
  [orbId: string]: {
    status: OrbStatus;
    score: number;
  };
}

export interface RetentionState {
  [orbId: string]: {
    lastReviewed: number;
    reviewStrength: number;
    nextReviewDate: number;
  };
}

export interface SettingsState {
  theme: "light" | "dark" | "system" | "theme-deep-focus" | "theme-nordic-scholar";
  speechRate: number;
  reminders: boolean;
}

export interface OrbitState {
  user: UserState;
  progress: ProgressState;
  retention: RetentionState;
  settings: SettingsState;
  achievements: string[];
}

const defaultState: OrbitState = {
  user: {
    xp: 0,
    level: 1,
    coins: 0,
    streak: 0,
    lastActiveDate: null,
    hasReviewed: false,
  },
  progress: {},
  retention: {},
  settings: {
    theme: "system",
    speechRate: 1,
    reminders: true,
  },
  achievements: [],
};

interface OrbitContextType {
  state: OrbitState;
  updateUser: (updates: Partial<UserState>) => void;
  updateProgress: (orbId: string, status: OrbStatus, score?: number) => void;
  updateRetention: (orbId: string, updates: Partial<RetentionState[string]>) => void;
  updateSettings: (updates: Partial<SettingsState>) => void;
  addAchievement: (achievementId: string) => void;
}

const OrbitContext = createContext<OrbitContextType | undefined>(undefined);

export function OrbitProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OrbitState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user, isAuthenticated, isLoaded: authLoaded } = useAuth();
  const [supabaseSynced, setSupabaseSynced] = useState(false);
  const [supabase] = useState(() => createClient());

  const prevUserIdRef = useRef(user?.id);

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("orbit_state");
    if (stored) {
      try {
        setState(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse orbit_state", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Handle Logout Reset
  useEffect(() => {
    if (prevUserIdRef.current && !user?.id) {
      // User just logged out
      setState(defaultState);
      setSupabaseSynced(false);
      localStorage.removeItem("orbit_state");
    }
    prevUserIdRef.current = user?.id;
  }, [user?.id]);

  // Sync from Supabase on Login
  useEffect(() => {
    const fetchRemoteState = async () => {
      if (user?.id && authLoaded && !supabaseSynced) {
        const { data, error } = await supabase
          .from('profiles')
          .select('app_state')
          .eq('id', user.id)
          .single();
        
        if (!error && data?.app_state && Object.keys(data.app_state).length > 0) {
          // Overwrite local state with cloud state
          setState(data.app_state as OrbitState);
          localStorage.setItem("orbit_state", JSON.stringify(data.app_state));
        }
        setSupabaseSynced(true);
      }
    };
    fetchRemoteState();
  }, [user?.id, authLoaded, supabaseSynced]);

  // Save state to localStorage and Supabase whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("orbit_state", JSON.stringify(state));
      
      // Save to Supabase if authenticated and initial sync is complete
      if (isAuthenticated && user?.id && supabaseSynced) {
        const saveToSupabase = async () => {
          const { error } = await supabase
            .from('profiles')
            .update({ app_state: state })
            .eq('id', user.id);
            
          if (error) {
            console.error("Error saving state to Supabase:", error);
          }
        };
        // Quick debounce approach: wait a tiny bit to avoid rapid writes
        const timeout = setTimeout(saveToSupabase, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [state, isLoaded, isAuthenticated, user?.id, supabaseSynced]);

  // Apply theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark", "theme-deep-focus", "theme-nordic-scholar");
    if (state.settings.theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(state.settings.theme);
      if (state.settings.theme === "theme-deep-focus" || state.settings.theme === "dark") {
        root.classList.add("dark");
      }
    }
  }, [state.settings.theme]);

  const updateUser = (updates: Partial<UserState>) => {
    setState((prev) => ({ ...prev, user: { ...prev.user, ...updates } }));
  };

  const updateProgress = (orbId: string, status: OrbStatus, score: number = 0) => {
    setState((prev) => ({
      ...prev,
      progress: {
        ...prev.progress,
        [orbId]: { status, score },
      },
    }));
  };

  const updateRetention = (orbId: string, updates: Partial<RetentionState[string]>) => {
    setState((prev) => {
      const existing = prev.retention[orbId] || { lastReviewed: 0, reviewStrength: 0, nextReviewDate: 0 };
      return {
        ...prev,
        retention: {
          ...prev.retention,
          [orbId]: { ...existing, ...updates },
        },
      };
    });
  };

  const updateSettings = (updates: Partial<SettingsState>) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, ...updates } }));
  };

  const addAchievement = (achievementId: string) => {
    setState((prev) => {
      if (prev.achievements.includes(achievementId)) return prev;
      return { ...prev, achievements: [...prev.achievements, achievementId] };
    });
  };

  if (!isLoaded) return null; // Avoid hydration mismatch by not rendering until loaded

  return (
    <OrbitContext.Provider
      value={{
        state,
        updateUser,
        updateProgress,
        updateRetention,
        updateSettings,
        addAchievement,
      }}
    >
      {children}
    </OrbitContext.Provider>
  );
}

export function useOrbit() {
  const context = useContext(OrbitContext);
  if (context === undefined) {
    throw new Error("useOrbit must be used within an OrbitProvider");
  }
  return context;
}
