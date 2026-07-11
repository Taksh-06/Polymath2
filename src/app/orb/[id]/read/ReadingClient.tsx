"use client";

import { useState, useEffect, useRef } from "react";
import { Orb } from "@/lib/content/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, Volume2, VolumeX, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function ReadingClient({ orb }: { orb: Orb }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTerm, setActiveTerm] = useState<{ term: string; def: string } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const windowHeight = scrollHeight - clientHeight;
      const progress = windowHeight > 0 ? (scrollTop / windowHeight) * 100 : 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Speech Synthesis
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleSpeech = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(orb.reading);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  // Process text to insert interactive key terms
  const renderTextWithTerms = () => {
    let text = orb.reading;
    
    // We replace terms with a special marker to avoid React node nesting issues during simple replace,
    // but the easiest way in React without a parser is to split by a regex if there are terms.
    
    // If no terms, just return text
    if (!orb.keyTerms || orb.keyTerms.length === 0) return <p className="leading-relaxed">{text}</p>;

    // We'll just highlight the first term we find for this MVP to avoid complex AST parsing
    // In a real app we'd use a regex tokenizer.
    const term = orb.keyTerms[0];
    const parts = text.split(new RegExp(`(${term.term})`, 'gi'));

    return (
      <p className="leading-relaxed whitespace-pre-wrap">
        {parts.map((part, i) => {
          if (part.toLowerCase() === term.term.toLowerCase()) {
            return (
              <span
                key={i}
                onClick={() => setActiveTerm({ term: term.term, def: term.definition })}
                className="text-primary font-bold cursor-pointer underline decoration-primary/30 decoration-2 underline-offset-4 hover:bg-primary/10 rounded px-1 transition-colors"
              >
                {part}
              </span>
            );
          }
          return part;
        })}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-background relative" ref={contentRef}>
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-muted z-50">
        <div 
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-2xl mx-auto pt-24 px-6 pb-40 space-y-12 relative z-10">
        
        {/* Header Controls */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{orb.difficulty}</span>
          <Button variant="outline" size="icon" onClick={toggleSpeech} className="rounded-full w-12 h-12 shadow-sm">
            {isPlaying ? <VolumeX className="w-5 h-5 text-danger" /> : <Volume2 className="w-5 h-5 text-primary" />}
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-8 prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-p:text-foreground prose-p:text-xl">
          <h1 className="text-4xl md:text-5xl">{orb.title}</h1>
          <div className="text-xl md:text-2xl text-foreground/90 font-medium leading-relaxed">
             {renderTextWithTerms()}
          </div>
        </div>

        {/* Recap Box */}
        <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/20 space-y-4">
          <h3 className="font-bold text-xl text-primary">Summary</h3>
          <p className="text-foreground/80">{orb.summary}</p>
        </div>

        {/* Next Action */}
        <div className="pt-8 flex justify-end">
          <Link href={`/orb/${orb.id}/quiz`}>
            <Button size="lg" className="rounded-full h-14 px-8 text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              Take the Quiz
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Popover for Key Term */}
      <AnimatePresence>
        {activeTerm && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-popover border border-border shadow-2xl rounded-3xl p-6 z-50"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-xl text-primary">{activeTerm.term}</h4>
              <button onClick={() => setActiveTerm(null)} className="p-1 rounded-full hover:bg-muted text-muted-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-popover-foreground">{activeTerm.def}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dimmed Overlay when Popover is active */}
      <AnimatePresence>
        {activeTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveTerm(null)}
            className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
