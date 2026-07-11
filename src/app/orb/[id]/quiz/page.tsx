import { getOrb } from "@/lib/content/api";
import { notFound } from "next/navigation";
import { QuizClient } from "./QuizClient";

export default async function OrbQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orb = getOrb(id);

  if (!orb) {
    notFound();
  }

  return <QuizClient orb={orb} />;
}
