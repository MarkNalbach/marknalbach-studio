import type { LucideIcon } from "lucide-react";

export interface FeaturedBuild {
  title: string;
  type: string;
  summary: string;
  highlights: string[];
  icon: LucideIcon;
}

export interface MindsetCardData {
  icon: LucideIcon;
  title: string;
  body: string;
}