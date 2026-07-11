"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight } from "lucide-react";
import { getCategories } from "@/lib/content/api";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    setSearch("");
    router.push(href);
  };

  const categories = getCategories();
  
  // Create search index
  const results: { title: string; type: string; href: string }[] = [];
  if (search.length > 1) {
    const query = search.toLowerCase();
    categories.forEach(cat => {
      if (cat.title.toLowerCase().includes(query)) {
        results.push({ title: cat.title, type: "Category", href: `/category/${cat.id}` });
      }
      cat.pathways.forEach(p => {
        if (p.title.toLowerCase().includes(query)) {
          results.push({ title: p.title, type: "Pathway", href: `/category/${cat.id}` });
        }
        p.orbs.forEach(o => {
          if (o.title.toLowerCase().includes(query)) {
            results.push({ title: o.title, type: "Lesson", href: `/orb/${o.id}` });
          }
        });
      });
    });
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-popover border border-border rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-border flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search lessons, categories, pathways..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none text-lg text-foreground placeholder:text-muted-foreground"
              />
              <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs font-medium text-muted-foreground shrink-0">
                <Command className="w-3 h-3" /> K
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {search.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  Start typing to search across the entire Orbit universe.
                </div>
              )}
              
              {search.length > 0 && results.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No results found for "{search}".
                </div>
              )}

              {results.map((result, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(result.href)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted rounded-2xl transition-colors text-left group"
                >
                  <div>
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{result.title}</h4>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{result.type}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
