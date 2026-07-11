"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Compass } from "lucide-react";
import { getCategories } from "@/lib/content/api";
import { useOrbit } from "@/context/OrbitContext";
import { ProgressRing } from "@/components/gamification/ProgressRing";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = getCategories();
  const { state } = useOrbit();

  // Helper to calculate progress for a category
  const getCategoryProgress = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return 0;
    
    let totalOrbs = 0;
    let completedOrbs = 0;
    
    category.pathways.forEach(p => {
      p.orbs.forEach(o => {
        totalOrbs++;
        if (state.progress[o.id]?.status === "mastered" || state.progress[o.id]?.status === "unlocked") {
          // If we consider mastered as 100%. Actually we'll just check if it's in progress/completed.
          if (state.progress[o.id]?.status === "mastered") completedOrbs++;
        }
      });
    });
    
    if (totalOrbs === 0) return 0;
    return (completedOrbs / totalOrbs) * 100;
  };

  const filteredCategories = categories.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto space-y-12 pt-24 md:pt-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-4">
          <Compass className="w-10 h-10 text-primary" />
          Explore
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Discover new pathways, challenge your understanding, and grow your knowledge universe.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search categories or pathways..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg transition-all"
        />
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCategories.map((cat, i) => {
          const progress = getCategoryProgress(cat.id);
          
          return (
            <Link key={cat.id} href={`/category/${cat.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-[2rem] bg-card border border-border shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                <div 
                  className="absolute top-0 left-0 w-full h-1.5 opacity-80"
                  style={{ backgroundColor: cat.accentColor }}
                />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold">{cat.title}</h2>
                      <p className="text-muted-foreground text-sm line-clamp-2">{cat.description}</p>
                    </div>
                    <ProgressRing 
                      progress={progress} 
                      size={50} 
                      strokeWidth={4} 
                      color={cat.accentColor} 
                    />
                  </div>
                  
                  <div className="pt-4 flex flex-wrap gap-2">
                    {cat.pathways.slice(0, 2).map(p => (
                      <span key={p.id} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                        {p.title}
                      </span>
                    ))}
                    {cat.pathways.length > 2 && (
                      <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                        +{cat.pathways.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-xl text-muted-foreground">No categories found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
