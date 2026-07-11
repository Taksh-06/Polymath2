import { getCategory } from "@/lib/content/api";
import { notFound } from "next/navigation";
import { CategoryTimeline } from "./CategoryTimeline";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 md:pt-12 px-6 max-w-4xl mx-auto space-y-12 pb-32">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-4" style={{ color: category.accentColor }}>
          {category.title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {category.description}
        </p>
      </div>

      <CategoryTimeline category={category} />
    </div>
  );
}
