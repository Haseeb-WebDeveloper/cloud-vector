"use client";
import { StatData } from "../animated";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Stats({ stats }: { stats: StatData[] }) {
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsContainerRef.current) return;

    const leftBoxes = statsContainerRef.current.querySelectorAll("[data-stat-left]");
    const rightBoxes = statsContainerRef.current.querySelectorAll("[data-stat-right]");
    
    // Set initial state
    gsap.set(leftBoxes, { x: -100, scale: 1.5, opacity: 0 });
    gsap.set(rightBoxes, { x: 100, scale: 1.5, opacity: 0 });

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: statsContainerRef.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
        // Add id to help identify this ScrollTrigger
        id: "stats-section-trigger",
      },
    });

    // Animate left boxes
    tl.to(leftBoxes, {
      x: 0,
      scale: 1,
      opacity: 1,
      stagger: 0.15,
      ease: "none",
    }, 0);

    // Animate right boxes
    tl.to(rightBoxes, {
      x: 0,
      scale: 1,
      opacity: 1,
      stagger: 0.15,
      ease: "none",
    }, 0);

    // Cleanup function
    return () => {
      const statsTrigger = ScrollTrigger.getById("stats-section-trigger");
      if (statsTrigger) {
        statsTrigger.kill();
      }
      tl.kill();
    };
  }, []);
  return (
    <section className="relative pb-32 pt-8 z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent  mb-6">
            Results That Speak Volumes
          </h2>
          <p className="text-xl text-gray-300">
            Numbers don't lie — here's the impact we've delivered
          </p>
        </div>
        {/* Stats arranged around center */}
        <div ref={statsContainerRef} className="relative h-[500px] flex items-center justify-center">
          <div className="flex gap-10 justify-center items-center">
            {/* Left side stats */}
            <div className="flex flex-col gap-8">
              {stats.slice(0, 3).map((stat, index) => {
                return (
                  <div
                    key={index}
                    data-stat-id={index}
                    data-stat-left
                    className={`opacity-0 px-4 py-5 rounded-xl bg-black border border-border shadow-[0_1px_5px_0_rgba(255,153,0,0.521)] hover:shadow-[0_1px_6px_0_rgba(255,153,0,0.900)]`}
                  >
                    <div className="flex gap-4 ">
                      <div className="flex-shrink-0">{stat.icon}</div>
                      <div>
                        <p className="text-3xl md:text-4xl font-bold leading-[100%]">
                          {stat.value}
                        </p>
                        <p className="text-lg font-medium">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-[400px] h-[400px] ">
              <Image
                src="/home-page/circle.png"
                alt="circle"
                width={320}
                height={320}
                className="object-contain w-full h-full drop-shadow-[0_0_60px_rgba(255,151,0,0.4)]"
                quality={100}
              />
            </div>

            {/* Right side stats */}
            <div className="flex flex-col gap-8">
              {stats.slice(3, 6).map((stat, index) => {
                return (
                  <div
                    key={index}
                    data-stat-id={index}
                    data-stat-right
                    className={`opacity-0 px-4 py-5 rounded-xl bg-black border border-border shadow-[0_1px_5px_0_rgba(255,153,0,0.521)] hover:shadow-[0_1px_6px_0_rgba(255,153,0,0.900)]`}
                  >
                    <div className="flex gap-4 ">
                      <div className="flex-shrink-0">{stat.icon}</div>
                      <div>
                        <p className="text-3xl md:text-4xl font-bold leading-[100%]">
                          {stat.value}
                        </p>
                        <p className="text-lg font-medium">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Invisible target position marker at center */}
        </div>
      </div>
    </section>
  );
}
