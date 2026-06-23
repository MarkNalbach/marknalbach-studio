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
  const [openBuildTitles, setOpenBuildTitles] = useState<string[]>([]);

  function handleBuildClick(build: FeaturedBuild) {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    if (isDesktop) {
      setSelectedBuild(build);
      return;
    }

    setOpenBuildTitles((current) =>
      current.includes(build.title)
        ? current.filter((title) => title !== build.title)
        : [...current, build.title]
    );
  }

  return (
    <section id="builds" className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeader
        eyebrow="Featured Builds"
        title="Projects I've actually built and shipped."
        body="Each one started as an idea, a problem worth solving, or something I wanted to see if I could build."
      />

      <p className="mt-6 text-sm font-medium text-cyan-200">
        Select a project card to expand or close the details.
      </p>

      <div className="mt-10 grid items-start gap-5 lg:grid-cols-3">
        {featuredBuilds.map((build) => (
          <BuildCard
            key={build.title}
            build={build}
            isSelected={
              selectedBuild.title === build.title || openBuildTitles.includes(build.title)
            }
            isMobileOpen={openBuildTitles.includes(build.title)}
            onClick={() => handleBuildClick(build)}
          />
        ))}
      </div>

      <div className="hidden lg:block">
        <BuildDetail build={selectedBuild} />
      </div>
    </section>
  );
}

export default FeaturedBuildsSection;
