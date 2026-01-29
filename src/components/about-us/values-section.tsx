"use client";

import React from "react";
import { SpotlightCard } from "@/components/ui/spolight-card";
import {
  Users,
  ShieldCheck,
  Lightbulb,
  Rocket,
} from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Customers First. Always.",
    description:
      "Client success is our true north star. We measure our work by outcomes, not activity. We operate as one team with our clients - open, proactive, and highly collaborative. We solve challenges together with clarity and ownership, without blame, and with full transparency.",
  },
  {
    icon: ShieldCheck,
    title: "Ownership",
    description:
      "We take full responsibility for our actions, decisions, and results. Accountability is non-negotiable - how we earn trust, improve fast, and consistently deliver outcomes with discipline & integrity.",
  },
  {
    icon: Lightbulb,
    title: "Invent Boldly. Simplify Relentlessly.",
    description:
      "Invention is in our DNA - we relentlessly experiment, learn, and improve, but with a purpose: every breakthrough must reduce complexity, remove friction for our customers.",
  },
  {
    icon: Rocket,
    title: "Ship Now. Refine Always",
    description:
      "We move fast so customers don’t wait. We take calculated risks on reversible decisions, ship value early, learn from real usage, and refine continuously.",
  },
];

export default function AboutValuesSection() {
  return (
    <section className="px-6 lg:px-8 pb-20 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 md:mb-16">
        Principles We Don’t Bend

        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <SpotlightCard
                key={idx}
                className="h-full rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-6 md:p-8"
              >
                <div className="flex flex-col items-center text-center gap-4 h-full">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700">
                    <Icon className="w-8 h-8 text-[#FF9700]" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-foreground/90 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

