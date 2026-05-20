import { useState } from "react";
import BuildCard from "../components/BuildCard";
import BuildDetail from "../components/BuildDetail";
import SectionHeader from "../components/SectionHeader";
import type { FeaturedBuild } from "../../../types/home";

interface FeaturedBuildsSectionProps {
  featuredBuilds: FeaturedBuild[];
}

function FeaturedBuildsSection({ featuredBuilds }: FeaturedBuildsSectionProps) {
  const [selectedBuild, setSelectedBuild] = useState(featuredBuilds[0]);

  return (
    <section id="builds" className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeader
        eyebrow="Featured Builds"
        title="Real product thinking, presented interactively."
        body="Each project can become a case study with UX decisions, architecture notes, technical challenges, and shipped outcomes."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {featuredBuilds.map((build) => (
          <BuildCard
            key={build.title}
            build={build}
            isSelected={selectedBuild.title === build.title}
            onClick={() => setSelectedBuild(build)}
          />
        ))}
      </div>

      <BuildDetail build={selectedBuild} />
    </section>
  );
}

export default FeaturedBuildsSection;