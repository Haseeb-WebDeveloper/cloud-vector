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
    fact: "Organizations waste up to 30% of their cloud spend due to underutilized resources and poor governance.",
    source: "Gartner",
    report: "How to Identify and Reduce Public Cloud Waste 2024",
    image: "/test.avif",
  },
  {
    id: 2,
    fact: "Approximately 35% of cloud spend is wasted due to overprovisioning, unused resources, and inefficient architecture.",
    source: "McKinsey & Company",
    report: "Cloud's trillion-dollar prize is up for grabs. Report",
    image: "/test.avif",
  },
  {
    id: 3,
    fact: "82% of global organizations struggle with more than 10% of their cloud spend being wasted, and 38% experience more than 30% wastage.",
    source: "Everest Group",
    report: "Cloud Waste Survey 2024",
    image: "/test.avif",
  },
  {
    id: 4,
    fact: "More than three-quarters (78%) of enterprises estimate that 21–50% of their cloud spend is wasted, with preventable mistakes costing some organizations over $50,000 per month.",
    source: "Omdia",
    report: "State of Cloud Usage Optimization 2024",
    image: "/test.avif",
  },
  {
    id: 5,
    fact: "Integrating cloud cost management practices (FinOps) into engineering processes could unlock nearly $120 billion in value.",
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
    align: "start", // Add this to ensure proper alignment
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
    <div className="pt-32 pb-36">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center pb-16">
          <h2 className="text-4xl lg:text-6xl font-light text-foreground mb-8">
            Cloud Spending & Waste is Escalating Fast
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Industry Facts quantifying the problem.
          </p>
        </div>

        {/* Embla Carousel */}
        <div
          className="relative cursor-grab"
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {industryFacts.map((fact, index) => (
                <div key={fact.id} className="flex-[0_0_100%] min-w-0 px-4">
                  <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
                    {/* Left Side - Text Content */}
                    <div className="flex flex-col justify-center">
                      <p className="text-xl lg:text-3xl text-foreground leading-relaxed mb-8 font-light">
                        {" "}
                        "{fact.fact}"
                      </p>

                      <div className="space-y-3">
                        <p className="font-semibold text-foreground text-lg">
                          {fact.source}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {fact.report}
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="flex justify-center items-center">
                      <div className="relative w-full h-96 lg:h-[300px] overflow-hidden">
                        <Image
                          src={fact.image}
                          alt={`Cloud Cost Optimization - ${fact.source}`}
                          fill
                          className="object-cover"
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

          {/* Progress Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer relative overflow-hidden",
                  index === selectedIndex
                    ? "bg-slate-200 dark:bg-slate-600 w-16"
                    : "w-4 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
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
