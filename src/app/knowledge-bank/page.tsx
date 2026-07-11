"use client";

import { useState } from "react";
import { useOrbit } from "@/context/OrbitContext";
import { getOrb } from "@/lib/content/api";
import { Brain, Search, RefreshCw, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProgressRing } from "@/components/gamification/ProgressRing";
import { motion } from "framer-motion";

export default function KnowledgeBankPage() {
  const { state } = useOrbit();
  const [search, setSearch] = useState("");

  const reviewedOrbs = Object.keys(state.retention)
    .map(id => {
      const orb = getOrb(id);
      return { id, orb, retention: state.retention[id] };
    })
    .filter(item => item.orb); // Ensure orb exists

  const dueForReview = reviewedOrbs.filter(item => Date.now() >= item.retention.nextReviewDate);
  
  const averageRetention = reviewedOrbs.length > 0 
    ? reviewedOrbs.reduce((acc, curr) => acc + curr.retention.reviewStrength, 0) / reviewedOrbs.length 
    : 0;

  const filteredOrbs = reviewedOrbs.filter(item => 
    item.orb!.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-5xl mx-auto space-y-12 pt-24 md:pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-4">
            <Brain className="w-10 h-10 text-primary" />
            Knowledge Bank
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl">
            Your long-term memory vault. Smart spaced repetition ensures you never forget what you've learned.
          </p>
        </div>
        
        <div className="bg-card p-6 rounded-[2rem] border border-border flex items-center gap-6 shadow-sm">
          <div>
             <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Retention Score</p>
             <p className="text-3xl font-bold font-heading">{Math.round(averageRetention * 100)}%</p>
          </div>
          <ProgressRing progress={averageRetention * 100} size={70} strokeWidth={6} color="var(--success)" />
        </div>
      </div>

      {dueForReview.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="space-y-2">
             <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
               <RefreshCw className="w-6 h-6" /> Smart Session Ready
             </h3>
             <p className="text-primary/80">You have {dueForReview.length} concepts due for review to maintain your mastery.</p>
           </div>
           <Link href={`/orb/${dueForReview[0].id}/read`}>
             <Button size="lg" className="rounded-full px-8 text-lg shadow-lg">Start Review</Button>
           </Link>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search your mastered concepts..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-card border border-border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button variant="outline" className="h-14 px-6 rounded-2xl hidden md:flex items-center gap-2">
            <BarChart2 className="w-5 h-5" /> Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOrbs.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card p-6 rounded-3xl border border-border flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg mb-1">{item.orb!.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-1">{item.orb!.preview}</p>
                </div>
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-muted font-bold text-sm">
                  {Math.round(item.retention.reviewStrength * 100)}%
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-border mt-auto">
                <span className="text-xs font-medium text-muted-foreground">
                  {Date.now() >= item.retention.nextReviewDate ? (
                    <span className="text-danger">Review due now</span>
                  ) : (
                    <span>Next review in {Math.round((item.retention.nextReviewDate - Date.now()) / (1000 * 60 * 60))} hours</span>
                  )}
                </span>
                <Link href={`/orb/${item.id}/read`}>
                  <Button variant="ghost" size="sm" className="rounded-full text-primary hover:bg-primary/10">
                    Review
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
          
          {reviewedOrbs.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                <Brain className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold">Your vault is empty</h3>
              <p className="text-muted-foreground">Complete lessons in the Explore tab to start building your long-term memory.</p>
              <Link href="/explore">
                 <Button className="rounded-full mt-4">Explore Lessons</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
