import { useState } from "react";
import BuildCard from "../components/BuildCard";
import BuildDetail from "../components/BuildDetail";
import SectionHeader from "../components/SectionHeader";
import type { FeaturedBuild } from "../../../types/home";

interface FeaturedBuildsSectionProps {
  featuredBuilds: FeaturedBuild[];
}

function FeaturedBuildsSection({ featuredBuilds }: FeaturedBuildsSectionProps) {
  const [openBuildTitles, setOpenBuildTitles] = useState<string[]>([featuredBuilds[0].title]);
  const desktopBuild =
    featuredBuilds.find((build) => openBuildTitles.includes(build.title)) ?? featuredBuilds[0];

  function handleToggleBuild(build: FeaturedBuild) {
    const scrollY = window.scrollY;

    setOpenBuildTitles((current) =>
      current.includes(build.title)
        ? current.filter((title) => title !== build.title)
        : [...current, build.title]
    );

    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY });
    });
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
            isSelected={openBuildTitles.includes(build.title)}
            onClick={() => handleToggleBuild(build)}
          />
        ))}
      </div>

      <div className="hidden lg:block">
        <BuildDetail build={desktopBuild} />
      </div>
    </section>
  );
}

export default FeaturedBuildsSection;