import { getOrb } from "@/lib/content/api";
import { notFound } from "next/navigation";
import { CompletionClient } from "./CompletionClient";

export default async function OrbCompletionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orb = getOrb(id);

  if (!orb) {
    notFound();
  }

  return <CompletionClient orb={orb} />;
}
