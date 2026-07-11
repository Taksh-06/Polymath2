"use client";

import { useOrbit } from "@/context/OrbitContext";
import { User, Settings, Flame, Star, Award, Moon, Sun, Monitor, Coffee, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { state, updateSettings } = useOrbit();

  const themes = [
    { id: "light", icon: Sun, label: "Light" },
    { id: "dark", icon: Moon, label: "Dark" },
    { id: "system", icon: Monitor, label: "System" },
    { id: "theme-deep-focus", icon: Coffee, label: "Deep Focus" },
    { id: "theme-nordic-scholar", icon: BookOpen, label: "Nordic Scholar" },
  ];

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto space-y-12 pt-24 md:pt-12">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-4xl shadow-lg">
          <User className="w-12 h-12" />
        </div>
        <div>
          <h1 className="text-4xl font-bold">Explorer</h1>
          <p className="text-muted-foreground text-lg">Level {state.user.level} Astronaut</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-6 rounded-3xl border border-border flex flex-col items-center gap-2">
          <Star className="w-8 h-8 text-warning" />
          <span className="text-2xl font-bold">{state.user.xp}</span>
          <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Total XP</span>
        </div>
        <div className="bg-card p-6 rounded-3xl border border-border flex flex-col items-center gap-2">
          <Flame className="w-8 h-8 text-danger" />
          <span className="text-2xl font-bold">{state.user.streak}</span>
          <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Day Streak</span>
        </div>
        <div className="bg-card p-6 rounded-3xl border border-border flex flex-col items-center gap-2">
          <Award className="w-8 h-8 text-success" />
          <span className="text-2xl font-bold">{Object.keys(state.progress).filter(k => state.progress[k].status === "mastered").length}</span>
          <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Mastered</span>
        </div>
        <div className="bg-card p-6 rounded-3xl border border-border flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-warning flex items-center justify-center">
             <span className="text-sm font-bold text-warning-foreground">C</span>
          </div>
          <span className="text-2xl font-bold">{state.user.coins}</span>
          <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Coins</span>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-card rounded-[2rem] border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <Settings className="w-6 h-6 text-muted-foreground" />
          <h2 className="text-xl font-bold">Settings</h2>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Theme */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Theme</h3>
            <div className="flex flex-wrap gap-4">
              {themes.map((t) => {
                const isActive = state.settings.theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => updateSettings({ theme: t.id as any })}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl border-2 transition-all ${
                      isActive ? "border-primary bg-primary/10 text-primary font-bold" : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <t.icon className="w-5 h-5" />
                    {t.label}
                  </button>
                )
              })}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Preferences</h3>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl">
              <div>
                <p className="font-medium">Daily Reminders</p>
                <p className="text-sm text-muted-foreground">Get a notification to keep your streak alive.</p>
              </div>
              <Button
                variant={state.settings.reminders ? "default" : "outline"}
                onClick={() => updateSettings({ reminders: !state.settings.reminders })}
              >
                {state.settings.reminders ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
