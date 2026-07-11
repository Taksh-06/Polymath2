import { getOrb } from "@/lib/content/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Star, Trophy, ArrowRight, Target } from "lucide-react";

export default async function OrbPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orb = getOrb(id);

  if (!orb) {
    notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-2xl w-full bg-card p-8 md:p-12 rounded-[3rem] shadow-sm border border-border space-y-10 relative overflow-hidden">
        {/* Top Gradient Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-warning" />
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold font-heading">{orb.title}</h1>
          <p className="text-lg text-muted-foreground">{orb.preview}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-3xl gap-2">
            <Clock className="w-6 h-6 text-primary" />
            <span className="font-bold">{orb.readingTimeMinutes} min</span>
            <span className="text-xs text-muted-foreground">Reading Time</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-3xl gap-2">
            <Target className="w-6 h-6 text-success" />
            <span className="font-bold">{orb.difficulty}</span>
            <span className="text-xs text-muted-foreground">Difficulty</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-3xl gap-2">
            <Star className="w-6 h-6 text-warning" />
            <span className="font-bold">+{orb.xpReward} XP</span>
            <span className="text-xs text-muted-foreground">Reward</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-3xl gap-2">
            <Trophy className="w-6 h-6 text-danger" />
            <span className="font-bold">1</span>
            <span className="text-xs text-muted-foreground">Quiz Question</span>
          </div>
        </div>

        <div className="pt-6 flex justify-center">
          <Link href={`/orb/${orb.id}/read`} className="w-full md:w-auto">
            <Button size="lg" className="w-full md:w-auto h-16 px-12 rounded-full text-xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              Begin Lesson
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
