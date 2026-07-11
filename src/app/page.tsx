"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Brain, Compass, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 px-6 md:px-12 flex flex-col items-center justify-center text-center">
        {/* Animated Background Orbit */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="w-full h-full rounded-full border border-primary/30 relative"
          >
            <div className="absolute top-0 left-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_var(--primary)]" />
            <div className="absolute bottom-0 right-1/4 w-3 h-3 rounded-full bg-success shadow-[0_0_15px_var(--success)]" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] left-[10%] w-[80%] h-[80%] rounded-full border border-success/20"
          >
            <div className="absolute top-1/4 left-0 w-2 h-2 rounded-full bg-warning shadow-[0_0_10px_var(--warning)]" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-3xl mx-auto space-y-8 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm shadow-sm text-sm font-medium text-primary">
            <Sparkles className="w-4 h-4" />
            <span>The smarter way to learn</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
            Five minutes a day. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
              Knowledge that sticks.
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-xl">
            Orbit is a modern, gamified microlearning platform designed to build your knowledge in science, history, psychology, and more—one small lesson at a time.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <Link href="/explore">
              <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                Start Learning
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 px-6 md:px-12 bg-card rounded-[3rem] shadow-sm relative z-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Explore the Universe of Knowledge</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Dive into carefully curated pathways designed for busy minds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group p-6 rounded-3xl bg-background shadow-sm hover:shadow-md transition-all cursor-pointer border border-border/50"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                >
                  <cat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                <p className="text-muted-foreground text-sm">{cat.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center pt-8">
            <Link href="/explore">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 px-6 md:px-12 relative">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold leading-tight">Master complex topics in the time it takes to drink coffee.</h2>
            <ul className="space-y-6">
              {[
                { icon: Clock, title: "5-Minute Sessions", desc: "Short, punchy lessons designed for your busy life." },
                { icon: Brain, title: "Smart Review", desc: "Spaced repetition ensures you never forget what you learn." },
                { icon: Star, title: "Gamified Progress", desc: "Earn XP, maintain streaks, and collect badges." },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-card shadow-sm flex items-center justify-center text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-warning/20 rounded-[3rem] transform rotate-3 scale-105" />
             <div className="relative bg-card p-8 rounded-[3rem] shadow-xl space-y-6">
                {/* Mock UI for Visual */}
                <div className="flex justify-between items-center mb-8">
                  <div className="w-12 h-12 bg-muted rounded-full" />
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                    <div className="w-4 h-4 rounded-full bg-border" />
                    <div className="w-4 h-4 rounded-full bg-border" />
                  </div>
                </div>
                <div className="w-3/4 h-8 bg-muted rounded-lg" />
                <div className="space-y-3">
                  <div className="w-full h-4 bg-muted rounded-md" />
                  <div className="w-full h-4 bg-muted rounded-md" />
                  <div className="w-5/6 h-4 bg-muted rounded-md" />
                </div>
                <div className="w-full h-32 bg-primary/10 rounded-2xl mt-6 flex items-center justify-center">
                  <span className="text-primary font-bold">Interactive Element</span>
                </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}

const categories = [
  { title: "Science", description: "Physics, Biology, Astronomy", color: "#0D9488", icon: Sparkles },
  { title: "History", description: "Rome, WW2, Renaissance", color: "#D97706", icon: Compass },
  { title: "Psychology", description: "Biases, Memory, Emotion", color: "#DC2626", icon: Brain },
  { title: "Philosophy", description: "Stoicism, Ethics", color: "#7C3AED", icon: Star },
];
