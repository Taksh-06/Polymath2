"use client";

import { useState } from "react";
import { Orb } from "@/lib/content/types";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuizClient({ orb }: { orb: Orb }) {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shake, setShake] = useState(false);
  const [score, setScore] = useState(0);

  const question = orb.quiz[currentIdx];
  const isCorrect = selectedOpt === question.correctIndex;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === question.correctIndex) {
      setScore(s => s + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleNext = () => {
    if (currentIdx < orb.quiz.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      // Navigate to completion screen, passing the final score via query param (or calculate it there)
      const finalScore = score + (isCorrect ? 1 : 0) > score ? score + 1 : score;
      router.push(`/orb/${orb.id}/complete?score=${finalScore}&total=${orb.quiz.length}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-12 md:pt-24 px-6 max-w-3xl mx-auto">
      
      {/* Progress */}
      <div className="w-full mb-12 flex items-center gap-4">
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
           <motion.div 
             className="h-full bg-primary rounded-full"
             initial={{ width: 0 }}
             animate={{ width: `${((currentIdx) / orb.quiz.length) * 100}%` }}
             transition={{ duration: 0.5, ease: "easeInOut" }}
           />
        </div>
        <span className="font-bold text-muted-foreground whitespace-nowrap">
          {currentIdx + 1} / {orb.quiz.length}
        </span>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentIdx}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex-1 flex flex-col"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10 leading-tight">
          {question.question}
        </h2>

        <div className="space-y-4">
          {question.options.map((opt, i) => {
            const isSelected = selectedOpt === i;
            const isActuallyCorrect = i === question.correctIndex;
            
            let btnClass = "border-border hover:border-primary/50 hover:bg-primary/5";
            if (isAnswered) {
              if (isActuallyCorrect) {
                btnClass = "border-success bg-success/10 text-success-foreground dark:text-success";
              } else if (isSelected && !isActuallyCorrect) {
                btnClass = "border-danger bg-danger/10 text-danger-foreground dark:text-danger";
              } else {
                btnClass = "border-border opacity-50";
              }
            }

            return (
              <motion.button
                key={i}
                animate={shake && isSelected && !isActuallyCorrect ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                onClick={() => handleSelect(i)}
                disabled={isAnswered}
                className={cn(
                  "w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 text-lg font-medium",
                  btnClass
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{opt}</span>
                  {isAnswered && isActuallyCorrect && <CheckCircle2 className="w-6 h-6 text-success" />}
                  {isAnswered && isSelected && !isActuallyCorrect && <XCircle className="w-6 h-6 text-danger" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Feedback Panel */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className={cn(
              "fixed bottom-0 left-0 right-0 p-6 md:p-8 border-t-2 md:rounded-t-[3rem] z-50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]",
              isCorrect ? "bg-success/10 border-success/30" : "bg-danger/10 border-danger/30"
            )}
          >
            <div className="flex items-start gap-4 flex-1">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                isCorrect ? "bg-success text-white" : "bg-danger text-white"
              )}>
                {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>
              <div>
                <h3 className={cn("text-2xl font-bold font-heading mb-1", isCorrect ? "text-success" : "text-danger")}>
                  {isCorrect ? "Excellent!" : "Not quite."}
                </h3>
                <p className="text-foreground/80 font-medium">
                  {question.explanation}
                </p>
              </div>
            </div>

            <Button 
              size="lg" 
              onClick={handleNext}
              className={cn(
                "w-full md:w-auto h-14 px-10 rounded-full text-xl shadow-lg hover:shadow-xl transition-all",
                isCorrect ? "bg-success hover:bg-success/90" : "bg-danger hover:bg-danger/90"
              )}
            >
              Continue
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
