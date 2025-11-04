"use client";

import React from "react";
import { SpotlightCard } from "@/components/ui/spolight-card";

const cards = [
  {
    eyebrow: "Built by a 12-Year AWS/Amazon Veteran",
    title: "Built by a 12-Year AWS/Amazon Veteran",
    description:
      "Led by a former Amazon engineer who spent 12+ years building and optimizing large-scale AWS systems powering global products. The same expertise now powers your cloud.",
  },
  {
    eyebrow: "Results in Days, Not Months",
    title: "Results in Days, Not Months",
    description:
      "Our automation-first approach delivers measurable ROI fast- whether it’s AWS savings, tighter security, or faster delivery. No endless audits. Just outcomes that show up quickly.",
  },
  {
    eyebrow: "100% Success-Based Billing",
    title: "100% Success-Based Billing",
    description:
      "You pay only for the savings or performance gains we deliver. No retainers. No hidden fees. Just aligned incentives and verified impact - dollar for dollar.",
  },
  {
    eyebrow: "DevOps Enablement",
    title: "Tailored Launchpad. Proven Reliability.",
    description:
      "Every architecture is designed for cost-efficiency, security, performance, and compliance from Day 1. Built on next-gen foundations - serverless, containerized, and AWS-native - backed by 80+ launches across 300+ AWS accounts.",
  },
];

export default function ValueProps() {
  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {cards.map((card, idx) => (
            <SpotlightCard
              key={idx}
              className="h-full rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-6 md:p-8"
            >
              <div className="flex flex-col gap-4 h-full">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#FF9700] to-[#E85409]" />
                <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">
                  {card.eyebrow}
                </h3>
                <h4 className="text-2xl font-bold text-foreground">
                  {card.title}
                </h4>
                <p className="text-foreground/90 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}


