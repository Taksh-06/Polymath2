"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

interface ReviewModalProps {
  userId?: string;
  onSuccess: () => void;
}

export function ReviewModal({ userId, onSuccess }: ReviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    age_group: "",
    usage_frequency: "",
    navigation_rating: 0,
    visual_rating: 0,
    lessons_rating: 0,
    enjoyment_rating: 0,
    use_again: "",
    recommend_rating: 0,
    liked_most: "",
    improvement_suggestions: "",
    bugs_encountered: "",
    additional_suggestions: "",
    public_interest: "",
    pay_for_premium: ""
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const StarRating = ({ value, onChange, label }: { value: number, onChange: (val: number) => void, label: string }) => (
    <div className="mb-6">
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`p-1 rounded-full transition-colors ${value >= star ? "text-warning" : "text-muted hover:text-warning/50"}`}
          >
            <Star className="w-8 h-8" fill={value >= star ? "currentColor" : "none"} />
          </button>
        ))}
      </div>
    </div>
  );

  const SelectGroup = ({ value, onChange, label, options }: { value: string, onChange: (val: string) => void, label: string, options: string[] }) => (
    <div className="mb-6">
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
              value === opt ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:bg-muted"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const TextAreaGroup = ({ value, onChange, label }: { value: string, onChange: (val: string) => void, label: string }) => (
    <div className="mb-6">
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[100px] p-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none resize-y"
        placeholder="Type your answer here..."
      />
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const payload = {
        user_id: userId,
        ...formData
      };

      const { error: submitError } = await supabase.from("reviews").insert([payload]);

      if (submitError) throw submitError;

      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to submit review.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-border bg-muted/30">
          <h2 className="text-2xl font-bold font-heading">Feedback & Review</h2>
          <p className="text-sm text-muted-foreground mt-1">Please fill out this form to continue learning.</p>
        </div>
        
        <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
          <form id="review-form" onSubmit={handleSubmit} className="space-y-2">
            
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">0. Email ID</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none"
                placeholder="your@email.com"
              />
            </div>

            <SelectGroup
              label="1. What is your age group?"
              value={formData.age_group}
              onChange={(v) => handleChange("age_group", v)}
              options={["Under 18", "18–24", "25–34", "35+"]}
            />

            <SelectGroup
              label="2. How often do you use learning apps?"
              value={formData.usage_frequency}
              onChange={(v) => handleChange("usage_frequency", v)}
              options={["Daily", "Weekly", "Occasionally", "Rarely"]}
            />

            <StarRating label="3. How easy was it to navigate the app?" value={formData.navigation_rating} onChange={(v) => handleChange("navigation_rating", v)} />
            <StarRating label="4. Was the interface visually appealing?" value={formData.visual_rating} onChange={(v) => handleChange("visual_rating", v)} />
            <StarRating label="7. Were the lessons easy to understand?" value={formData.lessons_rating} onChange={(v) => handleChange("lessons_rating", v)} />
            <StarRating label="15. How enjoyable was the app overall?" value={formData.enjoyment_rating} onChange={(v) => handleChange("enjoyment_rating", v)} />

            <SelectGroup
              label="16. Would you use this app again?"
              value={formData.use_again}
              onChange={(v) => handleChange("use_again", v)}
              options={["Definitely", "Probably", "Maybe", "No"]}
            />

            <StarRating label="17. Would you recommend this app to others?" value={formData.recommend_rating} onChange={(v) => handleChange("recommend_rating", v)} />

            <TextAreaGroup label="19. What did you like the most about the app?" value={formData.liked_most} onChange={(v) => handleChange("liked_most", v)} />
            <TextAreaGroup label="20. What can we improve?" value={formData.improvement_suggestions} onChange={(v) => handleChange("improvement_suggestions", v)} />
            <TextAreaGroup label="21. Did you encounter any bugs or issues?" value={formData.bugs_encountered} onChange={(v) => handleChange("bugs_encountered", v)} />
            <TextAreaGroup label="22. Any additional suggestions?" value={formData.additional_suggestions} onChange={(v) => handleChange("additional_suggestions", v)} />

            <SelectGroup
              label="23. Would you be interested in using this app if it were publicly available?"
              value={formData.public_interest}
              onChange={(v) => handleChange("public_interest", v)}
              options={["Yes", "Maybe", "No"]}
            />

            <SelectGroup
              label="24. Would you pay for premium features?"
              value={formData.pay_for_premium}
              onChange={(v) => handleChange("pay_for_premium", v)}
              options={["Yes", "Maybe", "No"]}
            />

            {error && (
              <div className="p-4 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm mb-4">
                {error}
              </div>
            )}
          </form>
        </div>

        <div className="p-6 border-t border-border bg-muted/30 flex justify-end">
          <Button type="submit" form="review-form" disabled={loading} size="lg" className="rounded-full px-8 shadow-lg">
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Submit Feedback & Continue
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
