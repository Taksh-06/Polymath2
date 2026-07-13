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
  title: "PolyMath | Knowledge that sticks.",
  description: "A modern gamified microlearning platform that helps you learn science, history, psychology, and more in small daily lessons.",
};

import { OrbitProvider } from "@/context/OrbitContext";
import { AuthProvider } from "@/context/AuthContext";
import { RouteGuard } from "@/components/global/RouteGuard";
import { AppLayout } from "@/components/global/AppLayout";
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
        <AuthProvider>
          <OrbitProvider>
            <AppLayout>
              <CommandPalette />
              <RouteGuard>
                {children}
              </RouteGuard>
            </AppLayout>
          </OrbitProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
