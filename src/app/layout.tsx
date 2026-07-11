import type { Metadata } from "next";
import { Inter, Fredoka, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orbit | Five minutes a day. Knowledge that sticks.",
  description: "A modern gamified microlearning platform that helps you learn science, history, psychology, and more in small daily lessons.",
};

import { OrbitProvider } from "@/context/OrbitContext";
import { Navigation } from "@/components/global/Navigation";
import { CommandPalette } from "@/components/global/CommandPalette";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${fredoka.variable} antialiased bg-background text-foreground`}
      >
        <OrbitProvider>
          <div className="flex h-screen overflow-hidden">
            <Navigation />
            <CommandPalette />
            <main className="flex-1 overflow-y-auto pb-16 md:pb-0 md:ml-64 relative">
              {children}
            </main>
          </div>
        </OrbitProvider>
      </body>
    </html>
  );
}
