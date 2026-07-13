"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/global/Navigation";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Navigation isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`flex-1 overflow-y-auto pb-16 md:pb-0 relative flex flex-col transition-all duration-300 ${isCollapsed ? "md:ml-20" : "md:ml-64"}`}>
        {children}
      </main>
    </div>
  );
}
