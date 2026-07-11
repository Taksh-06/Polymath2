export interface KeyTerm {
  term: string;
  definition: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Orb {
  id: string;
  title: string;
  preview: string;
  reading: string;
  keyTerms: KeyTerm[];
  summary: string;
  quiz: QuizQuestion[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readingTimeMinutes: number;
  xpReward: number;
  estimatedReviewInterval: number; // in hours
}

export interface Pathway {
  id: string;
  title: string;
  description: string;
  orbs: Orb[];
}

export interface Category {
  id: string;
  title: string;
  description: string;
  accentColor: string;
  iconName: string;
  pathways: Pathway[];
}
