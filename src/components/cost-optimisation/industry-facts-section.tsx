"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import Image from "next/image";


interface IndustryFact {
  id: number;
  fact: string;
  source: string;
  report: string;
  image: string;
}

const industryFacts: IndustryFact[] = [
  {
    id: 1,
    fact: "Organizations waste up to <span class=\"text-[#FF8703] font-semibold\">30%</span> of their cloud spend due to underutilized resources and poor governance.",
    source: "Gartner",
    report: "How to Identify and Reduce Public Cloud Waste 2024",
    image: "/test.avif",
  },
  {
    id: 2,
    fact: "Approximately <span class=\"text-[#FF8703] font-semibold\">35%</span> of cloud spend is wasted due to overprovisioning, unused resources, and inefficient architecture.",
    source: "McKinsey & Company",
    report: "Cloud's trillion-dollar prize is up for grabs. Report",
    image: "/test.avif",
  },
  {
    id: 3,
    fact: "82% of global organizations struggle with more than <span class=\"text-[#FF8703] font-semibold\">10%</span> of their cloud spend being wasted, and 38% experience more than <span class=\"text-[#FF8703] font-semibold\">30%</span> wastage.",
    source: "Everest Group",
    report: "Cloud Waste Survey 2024",
    image: "/test.avif",
  },
  {
    id: 4,
    fact: "More than three-quarters <span class=\"text-[#FF8703] font-semibold\">(78%)</span> of enterprises estimate that <span class=\"text-[#FF8703] font-semibold\">21–50%</span> of their cloud spend is wasted, with preventable mistakes costing some organizations over $50,000 per month.",
    source: "Omdia",
    report: "State of Cloud Usage Optimization 2024",
    image: "/test.avif",
  },
  {
    id: 5,
    fact: "Integrating cloud cost management practices (FinOps) into engineering processes could unlock nearly <span class=\"text-[#FF8703] font-semibold\">$120 billion</span> in value.",
    source: "McKinsey & Company",
    report:
      "Everything Is Better as Code: Using FinOps to Manage Cloud Costs 2025",
    image: "/test.avif",
  },
];

export default function IndustryFactsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 20,
    startIndex: 0,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  // Progress bar animation
  useEffect(() => {
    if (!isPlaying) {
      if (progressRef.current) {
        clearInterval(progressRef.current);
        progressRef.current = null;
      }
      return;
    }

    setProgress(0);

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1; // 1% every 50ms = 5 seconds total
      });
    }, 50);

    return () => {
      if (progressRef.current) {
        clearInterval(progressRef.current);
        progressRef.current = null;
      }
    };
  }, [isPlaying, selectedIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi || !isPlaying) return;

    const play = () => {
      emblaApi.scrollNext();
    };

    const interval = setInterval(play, 4000); // 4 seconds
    return () => clearInterval(interval);
  }, [emblaApi, isPlaying]);

  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  return (
    <div className="mb-32">
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center pb-16">
          <h2 className="text-4xl lg:text-6xl font-semibold text-foreground pt-18">
            {"Cloud Spending & "}
            <span className="bg-gradient-to-r from-[#FF8703] via-amber-300 to-[#deb2b2] bg-clip-text text-transparent">
              Waste is Escalating Fast
            </span>
          </h2>
          <p className="text-2xl text-foreground/90 max-w-3xl mx-auto pt-6">
            Industry Facts quantifying the problem.
          </p>
        </div>

        {/* Glows */}
        <div className="pointer-events-none absolute -top-8 -left-8 h-60 w-60 rounded-full  bg-[blue]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 -right-8 h-60 w-60 rounded-full bg-[#FF8703]/20 blur-3xl" />

        {/* Embla Carousel */}
        <div
          className="relative cursor-grab"
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {industryFacts.map((fact, index) => (
                <div key={fact.id} className="flex-[0_0_100%] min-w-0 px-4 h-fit">
                  <div className="flex flex-col md:flex-row gap-12 h-fit rounded-2xl border border-white/15 bg-background/20 p-6 md:p-8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  >
                    {/* Left Side - Text Content */}
                    <div className="flex flex-col ">
                      {/* 
                        Don't wrap a <div> inside a <p> (invalid HTML).
                        Instead, just use <p> with dangerouslySetInnerHTML.
                      */}
                      <p
                        className="text-xl lg:text-3xl text-foreground leading-relaxed mb-8 font-light"
                        dangerouslySetInnerHTML={{ __html: fact.fact }}
                      />

                      <div className="space-y-3">
                        <p className="font-semibold text-[#FF8703] text-2xl">
                          {fact.source}
                        </p>
                        <p className="text-lg text-foreground/90">
                          {fact.report}
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="flex flex-col justify-center items-center  min-w-1/2 w-full h-full">
                      <div className="relative w-full h-full overflow-hidden rounded-lg">
                        <Image
                          src={fact.image}
                          alt={`Cloud Cost Optimization - ${fact.source}`}
                          width={500}
                          height={500}
                          className="object-cover h-full w-full rounded-lg"
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Centered Progress Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer relative overflow-hidden",
                  index === selectedIndex ? "w-16 bg-[#c8c8c2]" : "w-8 bg-[#c8c8c2]/90"
                )}
              >
                {index === selectedIndex && (
                  <div
                    className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Slide Counter */}
          {/* <div className="text-center mt-4">
            <span className="text-sm text-muted-foreground">
              {selectedIndex + 1} of {industryFacts.length}
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
