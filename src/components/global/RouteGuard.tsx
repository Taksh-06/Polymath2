"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Lock, ArrowRight } from "lucide-react";

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoaded } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const isPublicRoute = pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/profile");
    
    if (!isPublicRoute && !isAuthenticated) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [pathname, isAuthenticated, isLoaded]);

  if (!isLoaded) {
    return <div className="flex-1" />; // Placeholder while loading auth state
  }

  return (
    <>
      <div className={showModal ? "blur-sm pointer-events-none select-none transition-all duration-300 flex-1" : "flex-1"}>
        {children}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-card border border-border p-8 rounded-3xl shadow-2xl max-w-md w-full text-center relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-heading mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-8">
              You need to be logged in to access our premium lessons and explore content.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                router.push("/login");
              }}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-2xl transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
            >
              Go to Login
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
