"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Lock, Mail, Orbit } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    login();
    router.push("/explore");
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Left side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10 relative">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-full overflow-hidden relative shadow-lg shadow-primary/30 border-2 border-primary/20">
              <Image src="/icon.jpeg" alt="PolyMath Logo" fill className="object-cover" />
            </div>
            <span className="text-3xl font-heading font-bold text-foreground tracking-tight">PolyMath</span>
          </div>

          <div className="bg-card/50 backdrop-blur-xl border border-border/50 p-8 rounded-3xl shadow-2xl">
            <h1 className="text-2xl font-bold font-heading text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground mb-8 text-sm">
              Enter your credentials to continue your daily microlearning journey.
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-background/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm text-foreground"
                    placeholder="explorer@polymath.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-background/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm text-foreground"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-2xl transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group mt-4"
              >
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-border/50 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account? <a href="#" className="text-primary font-medium hover:underline">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Abstract Image Panel */}
      <div className="hidden lg:block lg:w-1/2 relative p-4">
        <div className="w-full h-full relative rounded-3xl overflow-hidden border border-border/10 shadow-2xl">
          <Image
            src="/login-bg.png"
            alt="Abstract space learning background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          <div className="absolute bottom-12 left-12 right-12 z-10 backdrop-blur-md bg-background/30 p-8 rounded-3xl border border-white/10">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Five minutes a day.</h2>
            <p className="text-white/80 text-lg">
              Knowledge that sticks. Join thousands of explorers making daily discoveries in science, history, and psychology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
