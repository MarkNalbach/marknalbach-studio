function BackgroundGrid() {
    return (
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,.35),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,.25),transparent_22%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,.16),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] bg-[size:46px_46px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>
    );
  }
  
  export default BackgroundGrid;