import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { FeaturedBuild } from "../../../types/home";

interface BuildDetailProps {
    build: FeaturedBuild;
}

function BuildDetail({ build }: BuildDetailProps) {
  const details = [
    {
      label: "Product Goal",
      body: "Create an experience that feels useful immediately, reduces friction, and gives users a clear reason to keep interacting.",
    },
    {
      label: "Technical Story",
      body: "Structure the interface around reusable React components, typed data, clear state boundaries, and future-ready service layers.",
    },
    {
      label: "UX Decision",
      body: "Prioritize fast comprehension, mobile-friendly flows, and small interaction details that make the product feel polished.",
    },
  ];

  return (
    <motion.div
      key={build.title}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 grid gap-5 rounded-[2rem] border border-white/10 bg-white/[.055] p-6 shadow-2xl backdrop-blur lg:grid-cols-[.8fr_1.2fr]"
    >
      <div>
        <p className="text-sm font-bold uppercase tracking-[.2em] text-emerald-300">
          Project Breakdown
        </p>

        <h3 className="mt-3 text-3xl font-black text-white">{build.title}</h3>

        <p className="mt-4 leading-8 text-slate-300">{build.summary}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"
          >
            <CheckCircle2 className="mb-4 h-5 w-5 text-emerald-300" />

            <h4 className="font-bold text-white">{detail.label}</h4>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {detail.body}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default BuildDetail;