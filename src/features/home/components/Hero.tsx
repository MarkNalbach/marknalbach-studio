import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface HeroProps {
  stack: string[];
}

function Hero({ stack }: HeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative z-10 flex flex-col justify-center"
    >
      <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 shadow-lg backdrop-blur">
        <Sparkles className="h-4 w-4" />
        Interactive frontend systems • React • AI • UX engineering
      </div>

      <h1 className="max-w-5xl text-5xl font-black tracking-tight text-white md:text-7xl">
        Frontend Engineer
        <span className="block bg-gradient-to-r from-cyan-200 via-indigo-200 to-emerald-200 bg-clip-text text-transparent">
          building interactive products with React, AI, and thoughtful UX.
        </span>
      </h1>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
        I create polished frontend experiences focused on interaction design, modern React
        architecture, mobile-first UX, AI-enhanced interfaces, and production-quality engineering
        systems.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/[.06] px-4 py-2 text-sm text-slate-200 shadow-sm backdrop-blur"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="#builds"
          className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:bg-cyan-200"
        >
          Explore projects
        </a>

        <a
          href="#quality"
          className="rounded-2xl border border-white/15 bg-white/[.06] px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
        >
          View quality system
        </a>
      </div>
    </motion.div>
  );
}

export default Hero;