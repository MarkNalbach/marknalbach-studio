interface ProjectShowcaseProps {
    image: string;
    title?: string;
    description?: string;
    appStoreUrl?: string;
    googlePlayUrl?: string;
    appStoreBadge?: string;
    googlePlayBadge?: string;
  }
  
  function ProjectShowcase({
    image,
    title,
    description,
    appStoreUrl,
    googlePlayUrl,
    appStoreBadge,
    googlePlayBadge,
  }: ProjectShowcaseProps) {
    return (
      <div className="mt-8 grid gap-8 rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6 md:grid-cols-[260px_1fr] md:items-center">
        <div className="mx-auto max-w-[220px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-2xl shadow-cyan-950/30">
          <img
            src={image}
            alt={title || "Project screenshot"}
            className="w-full object-cover"
          />
        </div>
  
        <div>
          {title && (
            <p className="text-sm font-bold uppercase tracking-[.2em] text-cyan-300">
              {title}
            </p>
          )}
  
          {description && (
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              {description}
            </p>
          )}
  
          {(appStoreUrl || googlePlayUrl) && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {appStoreUrl && appStoreBadge && (
                <a href={appStoreUrl} target="_blank" rel="noreferrer">
                  <img
                    src={appStoreBadge}
                    alt="Download on the App Store"
                    className="h-11 w-auto transition hover:scale-[1.02]"
                  />
                </a>
              )}
  
              {googlePlayUrl && googlePlayBadge && (
                <a href={googlePlayUrl} target="_blank" rel="noreferrer">
                  <img
                    src={googlePlayBadge}
                    alt="Get it on Google Play"
                    className="h-11 w-auto transition hover:scale-[1.02]"
                  />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default ProjectShowcase;