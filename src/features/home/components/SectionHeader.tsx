interface SectionHeaderProps {
    eyebrow: string;
    title: string;
    body: string;
  }
  
  function SectionHeader({ eyebrow, title, body }: SectionHeaderProps) {
    return (
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[.25em] text-cyan-300">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>
        <p className="mt-4 text-lg leading-8 text-slate-300">{body}</p>
      </div>
    );
  }
  
  export default SectionHeader;