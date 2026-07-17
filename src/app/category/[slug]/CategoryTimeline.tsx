"use client";

import { motion } from "framer-motion";
import { Category, Pathway, Orb } from "@/lib/content/types";
import { useOrbit, OrbStatus } from "@/context/OrbitContext";
import { Check, Lock, Play, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryTimelineProps {
  category: Category;
}

export function CategoryTimeline({ category }: CategoryTimelineProps) {
  const { state } = useOrbit();

  const getOrbStatus = (orbId: string, index: number, isFirstInPathway: boolean, previousOrbId?: string): OrbStatus => {
    const s = state.progress[orbId]?.status;
    if (s) return s;

    // The first orb of the first pathway is always unlocked.
    if (isFirstInPathway && index === 0) return "unlocked";

    // Others are unlocked if the previous orb is completed (has any progress entry)
    if (previousOrbId && state.progress[previousOrbId]) {
      return "unlocked";
    }

    return "locked";
  };

  let globalOrbIndex = 0;
  let previousOrbId: string | undefined = undefined;

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Central Curved Line (Simplified with a straight line for SVG rendering, or we can use offset nodes) */}
      <div className="absolute top-0 bottom-0 w-1 bg-border left-1/2 -translate-x-1/2 z-0 rounded-full" />

      {category.pathways.map((pathway, pIndex) => {
        return (
          <div key={pathway.id} className="w-full relative z-10 mb-20">
            <div className="text-center mb-12 bg-card p-6 rounded-3xl shadow-sm border border-border max-w-md mx-auto relative">
              <h2 className="text-2xl font-bold mb-2">{pathway.title}</h2>
              <p className="text-muted-foreground">{pathway.description}</p>
              
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-border" />
            </div>

            <div className="flex flex-col items-center space-y-16">
              {pathway.orbs.map((orb, oIndex) => {
                const isFirst = pIndex === 0 && oIndex === 0;
                const status = getOrbStatus(orb.id, globalOrbIndex, oIndex === 0, previousOrbId);
                previousOrbId = orb.id;
                globalOrbIndex++;

                // Offset x to create a curved snake-like path
                const xOffset = oIndex % 2 !== 0 ? 60 : -60;
                const isCenter = oIndex % 2 === 0 && oIndex % 4 === 0;

                return (
                  <OrbNode
                    key={orb.id}
                    orb={orb}
                    status={status}
                    color={category.accentColor}
                    xOffset={isCenter ? 0 : xOffset}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OrbNode({ orb, status, color, xOffset }: { orb: Orb; status: OrbStatus; color: string; xOffset: number }) {
  const isLocked = status === "locked";
  const isMastered = status === "mastered";
  const isUnlocked = status === "unlocked" || status === "in-progress";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={!isLocked ? { scale: 1.15 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ x: xOffset }}
      className={cn(
        "relative z-10 group",
        isLocked ? "opacity-50 grayscale" : ""
      )}
    >
      <Link href={isLocked ? "#" : `/orb/${orb.id}`} className={cn("block", isLocked && "cursor-not-allowed pointer-events-none")}>
        <div 
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-[4px]",
            isMastered ? "bg-white" : "bg-card",
            isLocked ? "border-muted bg-muted" : ""
          )}
          style={!isLocked ? { borderColor: color, boxShadow: isUnlocked ? `0 0 20px ${color}40` : 'none' } : {}}
        >
          {isMastered && <Star className="w-8 h-8" style={{ color }} fill={color} />}
          {isUnlocked && <Play className="w-8 h-8" style={{ color }} fill={color} />}
          {isLocked && <Lock className="w-8 h-8 text-muted-foreground" />}
        </div>
      </Link>

      {/* Tooltip */}
      <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-48 bg-popover text-popover-foreground p-3 rounded-2xl shadow-xl border border-border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
        <h4 className="font-bold text-sm mb-1">{orb.title}</h4>
        <p className="text-xs text-muted-foreground">{orb.preview}</p>
      </div>
    </motion.div>
  );
}
