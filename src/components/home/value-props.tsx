"use client";

import React from "react";
import { SpotlightCard } from "@/components/ui/spolight-card";
import { Award, Rocket, DollarSign, Server } from "lucide-react";

const cards = [
  {
    icon: Award,
    // eyebrow: "Built by a 12-Year AWS/Amazon Veteran", // Removed
    title: "Built by a 12-Year AWS/Amazon Veteran",
    description:
      "Led by a former Amazon engineer who spent 12+ years building and optimizing large-scale AWS systems powering global products. The same expertise now powers your cloud.",
  },
  {
    icon: Rocket,
    // eyebrow: "Results in Days, Not Months", // Removed
    title: "Results in Days, Not Months",
    description:
      "Our automation-first approach delivers measurable ROI fast- whether it’s AWS savings, tighter security, or faster delivery. No endless audits. Just outcomes that show up quickly.",
  },
  {
    icon: DollarSign,
    // eyebrow: "100% Success-Based Billing", // Removed
    title: "100% Success-Based Billing",
    description:
      "You pay only for the savings or performance gains we deliver. No retainers. No hidden fees. Just aligned incentives and verified impact - dollar for dollar.",
  },
  {
    icon: Server,
    // eyebrow: "DevOps Enablement", // Removed
    title: "Tailored Launchpad. Proven Reliability.",
    description:
      "Every architecture is designed for cost-efficiency, security, performance, and compliance from Day 1. Built on next-gen foundations - serverless, containerized, and AWS-native - backed by 80+ launches across 300+ AWS accounts.",
  },
];

export default function ValueProps() {
  return (
    <section className="px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 pt-10 md:mb-16">
          We are Different!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <SpotlightCard
                key={idx}
                className="h-full rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-6 md:p-8"
              >
                <div className="flex flex-col items-center text-center gap-4 h-full">
                  {/* Removed the yellow line and the small eyebrow heading */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700">
                    <Icon className="w-8 h-8 text-[#FF9700]" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-foreground">
                    {card.title}
                  </h4>
                  <p className="text-foreground/90 leading-relaxed">
                    {card.description}
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

