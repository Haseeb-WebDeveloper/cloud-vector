"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer, LabelList } from "recharts";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface OfferData {
  id: number;
  headline: string;
  tagline: string;
  features: string[];
  title: string; // For pie chart segment
  value: number; // For pie chart data
}

interface StatData {
  value: string;
  label: string;
}

const AnimatedSections: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleImageRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const [activeOffer, setActiveOffer] = useState(0);

  const offers: OfferData[] = [
    {
      id: 1,
      title: "Cost Optimization",
      headline: "Reduce Spend. Maintain Performance.",
      tagline:
        "Unlock 40–70% savings with precision rightsizing, smarter purchase plans, and continuous optimization.",
      features: [
        "Exhaustive Audit → Every dollar tracked, every inefficiency exposed.",
        "Fast Fixes → Rightsizing, reconfiguring, and optimizations delivered in weeks.",
        "Guaranteed ROI → 100% return in 3 months, with savings that scale as you grow.",
      ],
      value: 1,
    },
    {
      id: 2,
      title: "LogGuardia Security",
      headline: "Security That Never Switches Off.",
      tagline:
        "Enterprise-grade protection and compliance, monitored 24/7 — so your team builds while we guard.",
      features: [
        "Continuous Monitoring → Real-time scans catch misconfigurations before they spread.",
        "Compliance-First → SOC2, HIPAA, PCI-DSS, GDPR, and CIS enforced by design.",
        "Intruder Defense → Instant alerts on suspicious activity, internal or external.",
      ],
      value: 1,
    },
    {
      id: 3,
      title: "Cloud Architecture",
      headline: "Built Right. Ready to Scale.",
      tagline:
        "Architectures tailored for your workloads — resilient, efficient, and engineered to scale like Amazon's own systems.",
      features: [
        "Tailored Blueprints → Cloud designs aligned with your performance, security, and compliance needs.",
        "Next-Gen Foundations → Serverless, containers, and AWS-native services built in.",
        "Proven Reliability → 80+ production launches across SaaS, FinTech, and enterprise workloads.",
      ],
      value: 1,
    },
    {
      id: 4,
      title: "Migration & Modernization",
      headline: "Transform Legacy. Embrace Cloud.",
      tagline:
        "Seamless migration strategies that modernize your infrastructure without disrupting operations.",
      features: [
        "Zero-Downtime Migrations → Phased approach ensures continuous operations during transition.",
        "Legacy Modernization → Transform monoliths into scalable, cloud-native architectures.",
        "Risk Mitigation → Comprehensive testing and rollback strategies protect your business.",
      ],
      value: 1,
    },
    {
      id: 5,
      title: "24/7 Support",
      headline: "Always On. Always Available.",
      tagline:
        "Round-the-clock expert support ensuring your cloud infrastructure runs smoothly at all times.",
      features: [
        "Instant Response → Critical issues addressed within minutes, not hours.",
        "Proactive Monitoring → Issues detected and resolved before they impact your business.",
        "Expert Team → AWS-certified professionals with 12+ years of cloud experience.",
      ],
      value: 1,
    },
  ];

  const stats: StatData[] = [
    { value: "$60M+", label: "Savings delivered" },
    { value: "68%", label: "Max cost reduction" },
    { value: "80+", label: "Production launches" },
    { value: "15+", label: "Compliance standards" },
    { value: "100%", label: "ROI in 3 months" },
    { value: "12+", label: "Years at Amazon/AWS" },
  ];

  // Using Tailwind chart colors
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))", 
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))"
  ];

  // Custom label renderer for pie chart
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }: any) => {
    const RADIAN = Math.PI / 180;
    // Position label in the middle of the donut segment
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const isActive = index === activeOffer;

    return (
      <text
        x={x}
        y={y}
        fill={isActive ? "white" : "#d1d5db"}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="600"
        style={{
          textShadow: isActive ? '0 0 8px rgba(255,255,255,0.8)' : '0 1px 2px rgba(0,0,0,0.5)',
          filter: isActive ? 'drop-shadow(0 0 4px rgba(255,255,255,0.5))' : 'none'
        }}
      >
        {offers[index].title.split(' ').map((word, wordIndex) => (
          <tspan key={wordIndex} x={x} dy={wordIndex === 0 ? 0 : "1.2em"}>
            {word}
          </tspan>
        ))}
      </text>
    );
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the left column (circle image) during section 1
      ScrollTrigger.create({
        trigger: section1Ref.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".left-column-pin",
        pinSpacing: false,
        onUpdate: (self) => {
          // Update active offer based on scroll progress
          const progress = self.progress;
          const newActiveOffer = Math.floor(progress * offers.length);
          if (
            newActiveOffer !== activeOffer &&
            newActiveOffer < offers.length
          ) {
            setActiveOffer(newActiveOffer);
          }
        },
      });

      // Animate circle transition to section 2
      ScrollTrigger.create({
        trigger: section2Ref.current,
        start: "top bottom",
        end: "center center",
        scrub: 1,
        onUpdate: (self) => {
          if (circleImageRef.current) {
            const progress = self.progress;
            const translateY = progress * -200;
            gsap.set(circleImageRef.current, {
              y: translateY,
              scale: 0.8 + progress * 0.2,
            });
          }
        },
      });

      // Animate individual offers
      offers.forEach((_, index) => {
        const offerElement = document.querySelector(
          `[data-offer-id="${index}"]`
        );
        if (offerElement) {
          ScrollTrigger.create({
            trigger: offerElement,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => setActiveOffer(index),
            onEnterBack: () => setActiveOffer(index),
          });
        }
      });

      // Stats counter animation
      stats.forEach((_, index) => {
        const statElement = document.querySelector(`[data-stat-id="${index}"]`);
        if (statElement) {
          ScrollTrigger.create({
            trigger: statElement,
            start: "top 80%",
            onEnter: () => {
              gsap.fromTo(
                statElement,
                { scale: 0, opacity: 0, rotation: -180 },
                {
                  scale: 1,
                  opacity: 1,
                  rotation: 0,
                  duration: 0.8,
                  ease: "back.out(1.7)",
                }
              );
            },
          });
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [activeOffer, offers.length, stats.length]);

  return (
    <div ref={containerRef} className="relative">
      {/* Section 1 - What We Offer */}
      <section
        ref={section1Ref}
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
              Optimize. Secure. Scale — AWS Done Right.
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Cost optimized. Security enforced. Architectures future-ready.
              Three pillars, one mission — make your cloud work smarter, safer,
              and stronger.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Circle Image with Pie Chart - PINNED */}
            <div className="left-column-pin relative flex justify-center lg:justify-start">
              <div
                ref={circleImageRef}
                className="sticky top-1/2 transform -translate-y-1/2"
              >
                {/* Recharts Pie Chart */}
                <div className="relative w-[500px] h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={offers}
                        cx="50%"
                        cy="50%"
                        innerRadius={170}
                        outerRadius={230}
                        paddingAngle={1}
                        dataKey="value"
                        startAngle={-90}
                        endAngle={270}
                        label={renderCustomLabel}
                        labelLine={false}
                      >
                        {offers.map((entry, index) => {
                          const isActive = index === activeOffer;
                          return (
                            <Cell
                              key={`cell-${index}`}
                              fill={colors[index]}
                              fillOpacity={isActive ? 1 : 0.4}
                              stroke={colors[index]}
                              strokeWidth={2}
                              className="transition-all duration-500 ease-in-out"
                            />
                          );
                        })}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>


                  {/* Circle Image - Perfectly Centered */}
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full  flex items-center justify-center"
                    style={{ zIndex: 50 }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/circle.png"
                        alt="circle"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Offers */}
            <div className="space-y-32 py-20">
              {offers.map((offer, index) => (
                <div
                  key={offer.id}
                  data-offer-id={index}
                  className={`min-h-screen flex items-center transition-all duration-500 ${
                    index === activeOffer
                      ? "opacity-100 scale-100"
                      : "opacity-50 scale-95"
                  }`}
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 w-full">
                    <div className="mb-6">
                      <h3 className="text-4xl font-bold text-white mb-4">
                        {offer.headline}
                      </h3>
                      <p className="text-xl text-gray-300 leading-relaxed">
                        {offer.tagline}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {offer.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300"
                        >
                          <div
                            className={`w-2 h-2 rounded-full mt-2 flex-shrink-0`}
                            style={{ 
                              backgroundColor: colors[index],
                              filter: `drop-shadow(0 0 4px ${colors[index]})`
                            }}
                          />
                          <p className="text-gray-200 leading-relaxed">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Stats */}
      <section
        ref={section2Ref}
        className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900 py-20 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6">
              Results That Speak Volumes
            </h2>
            <p className="text-xl text-gray-300">
              Numbers don't lie — here's the impact we've delivered
            </p>
          </div>

          {/* Stats arranged around center */}
          <div className="relative">
            {/* Central circle space */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 backdrop-blur-xl border border-white/10" />
            </div>

            {/* Stats cards */}
            <div className="relative grid grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {stats.map((stat, index) => {
                const positions = [
                  "col-span-1 md:col-start-1 md:row-start-1", // Top left
                  "col-span-1 md:col-start-3 md:row-start-1", // Top right
                  "col-span-1 md:col-start-1 md:row-start-2", // Middle left
                  "col-span-1 md:col-start-3 md:row-start-2", // Middle right
                  "col-span-1 md:col-start-1 md:row-start-3", // Bottom left
                  "col-span-1 md:col-start-3 md:row-start-3", // Bottom right
                ];

                return (
                  <div
                    key={index}
                    data-stat-id={index}
                    className={`${positions[index]} opacity-0`}
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/15">
                      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-gray-300 text-lg font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
};

export default AnimatedSections;
