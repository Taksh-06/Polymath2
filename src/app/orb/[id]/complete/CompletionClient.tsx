"use client";

import { useEffect, useState } from "react";
import { Orb } from "@/lib/content/types";
import { useOrbit } from "@/context/OrbitContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Flame, Award } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { ReviewModal } from "@/components/global/ReviewModal";

export function CompletionClient({ orb, nextOrbId }: { orb: Orb, nextOrbId?: string }) {
  const { updateProgress, updateUser, updateRetention, state } = useOrbit();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hasUpdated, setHasUpdated] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  const score = parseInt(searchParams.get("score") || "0", 10);
  const total = parseInt(searchParams.get("total") || "1", 10);
  const masteryStatus = score === total ? "mastered" : "unlocked";

  const [rewards] = useState(() => {
    const alreadyMastered = state.progress[orb.id]?.status === 'mastered';
    return {
      xp: alreadyMastered ? 0 : orb.xpReward,
      coins: alreadyMastered ? 0 : (score === total ? 5 : 1),
      streak: alreadyMastered ? 0 : 1,
      alreadyMastered
    };
  });

  useEffect(() => {
    // Fire Confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Update Progress State
    if (!hasUpdated) {
      updateProgress(orb.id, masteryStatus, score);
      
      updateUser({
        xp: state.user.xp + rewards.xp,
        coins: state.user.coins + rewards.coins,
        streak: state.user.streak + rewards.streak,
        lastActiveDate: new Date().toISOString()
      });

      // Spaced Repetition simple setup
      updateRetention(orb.id, {
        lastReviewed: Date.now(),
        reviewStrength: score === total ? 1 : 0.5,
        nextReviewDate: Date.now() + (orb.estimatedReviewInterval * 60 * 60 * 1000)
      });
      
      setHasUpdated(true);
    }

    return () => clearInterval(interval);
  }, [orb, score, total, masteryStatus, hasUpdated, updateProgress, updateUser, updateRetention, state, rewards]);

  const handleNextAction = () => {
    const destination = nextOrbId ? `/orb/${nextOrbId}/read` : "/explore";
    
    if (state.user.hasReviewed) {
      router.push(destination);
    } else {
      setPendingNavigation(destination);
      setShowReviewModal(true);
    }
  };

  const handleReviewSuccess = () => {
    updateUser({ hasReviewed: true });
    setShowReviewModal(false);
    if (pendingNavigation) {
      router.push(pendingNavigation);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="max-w-md w-full bg-card p-10 rounded-[3rem] shadow-xl border border-border text-center space-y-8"
      >
        <div className="w-24 h-24 bg-warning/20 rounded-full mx-auto flex items-center justify-center">
          <Award className="w-12 h-12 text-warning" />
        </div>

        <div>
          <h1 className="text-4xl font-bold font-heading mb-2 text-warning">Lesson Complete!</h1>
          <p className="text-muted-foreground">
            {rewards.alreadyMastered 
              ? `You reviewed ${orb.title}. Great job keeping your knowledge fresh!`
              : `You mastered the fundamentals of ${orb.title}.`}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted rounded-3xl p-6 flex flex-col items-center gap-2">
            <Star className="w-8 h-8 text-primary" fill="currentColor" />
            <span className="text-2xl font-bold">+{rewards.xp}</span>
            <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Total XP</span>
          </div>
          <div className="bg-muted rounded-3xl p-6 flex flex-col items-center gap-2">
            <Flame className="w-8 h-8 text-danger" fill="currentColor" />
            <span className="text-2xl font-bold">+{rewards.streak}</span>
            <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Day Streak</span>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <Button size="lg" onClick={handleNextAction} className="w-full h-14 rounded-full text-lg shadow-lg">
            {nextOrbId ? "Next Level" : "Explore More"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>

      {showReviewModal && (
        <ReviewModal 
          onSuccess={handleReviewSuccess} 
        />
      )}
    </div>
  );
}
