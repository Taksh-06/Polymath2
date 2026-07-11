import { getOrb } from "@/lib/content/api";
import { notFound } from "next/navigation";
import { ReadingClient } from "./ReadingClient";

export default async function OrbReadingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orb = getOrb(id);

  if (!orb) {
    notFound();
  }

  return <ReadingClient orb={orb} />;
}
