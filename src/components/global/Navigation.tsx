"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Compass, BookOpen, User, Flame, Menu } from "lucide-react";
import { useOrbit } from "@/context/OrbitContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils"; // Note: this will be added by shadcn

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/knowledge-bank", label: "Knowledge Bank", icon: BookOpen },
  { href: "/profile", label: "Profile", icon: User },
];

interface NavigationProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (value: boolean) => void;
}

export function Navigation({ isCollapsed = false, setIsCollapsed = () => {} }: NavigationProps) {
  const pathname = usePathname();
  const { state } = useOrbit();
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn("hidden md:flex flex-col h-screen fixed top-0 left-0 border-r border-border bg-card transition-all duration-300 z-40", isCollapsed ? "w-20" : "w-64")}>
        <div className="p-6 relative">
          <Link href="/" className={cn("flex items-center gap-2", isCollapsed ? "justify-center" : "")}>
            <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0">
              <Image src="/icon.jpeg" alt="PolyMath Logo" fill className="object-cover" />
            </div>
            {!isCollapsed && <span className="text-xl font-heading font-bold text-primary truncate">PolyMath</span>}
          </Link>
          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-7 bg-card border border-border rounded-full p-2 text-muted-foreground hover:text-foreground z-50 shadow-sm"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 py-3 rounded-2xl font-medium transition-all duration-200",
                  isCollapsed ? "px-0 justify-center" : "px-4",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={cn("p-6", isCollapsed ? "px-4" : "")}>
          {!isCollapsed ? (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-accent shrink-0" />
                <span className="font-bold">{state.user.streak}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-warning flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-warning-foreground">C</span>
                </div>
                <span className="font-bold">{state.user.coins}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 p-2 rounded-2xl bg-muted/50">
              <div className="flex flex-col items-center" title={`Streak: ${state.user.streak}`}>
                <Flame className="w-4 h-4 text-accent mb-1" />
                <span className="text-xs font-bold">{state.user.streak}</span>
              </div>
              <div className="flex flex-col items-center" title={`Coins: ${state.user.coins}`}>
                <div className="w-4 h-4 rounded-full bg-warning flex items-center justify-center mb-1">
                  <span className="text-[8px] font-bold text-warning-foreground">C</span>
                </div>
                <span className="text-xs font-bold">{state.user.coins}</span>
              </div>
            </div>
          )}
          <div className="mt-4">
            {!useAuth().isLoaded ? (
              <div className={cn("w-full h-9 rounded-xl bg-muted animate-pulse", isCollapsed ? "px-0" : "px-4")} />
            ) : isAuthenticated ? (
              <button
                onClick={logout}
                className={cn("w-full py-2 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors flex justify-center items-center", isCollapsed ? "px-0" : "px-4")}
                title={isCollapsed ? "Log Out" : undefined}
              >
                {isCollapsed ? <User className="w-5 h-5" /> : "Log Out"}
              </button>
            ) : (
              <Link
                href="/login"
                className={cn("w-full block text-center py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex justify-center items-center", isCollapsed ? "px-0" : "px-4")}
                title={isCollapsed ? "Log In" : undefined}
              >
                {isCollapsed ? <User className="w-5 h-5" /> : "Log In"}
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 border-t border-border bg-card flex items-center justify-around z-50">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
