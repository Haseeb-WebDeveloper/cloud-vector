"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  image: string;
  savings?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "CloudVictor team broke down our expenses and helped us cut about 49% off our monthly AWS bill. Their detailed, data-backed report made it easy to verify and quickly act on their recommendations after a brief call. We now have more cash flow to invest in growth activities.",
    name: "Harsh Vardhan Sharma",
    title: "Chief Technical Officer",
    company: "Katha Infocom Pvt Ltd",
    image: "/testimonials/Harsh-Vardhan-Sharma.png",
    savings: "49%",
  },
  {
    id: 2,
    quote:
      "CloudVictor team delivered outstanding results for BoloSign. We achieved a 51% reduction in our AWS bill and brought our infra in compliance with AWS Well-Architected Security pillar, AWS FTR, and SOC 2. Our security incident response time dropped from over 3 hours to just 30 minutes.",
    name: "Chirag Gupta",
    title: "Chief Technical Officer",
    company: "Bolosign",
    image: "/testimonials/Chirag-Gupta.png",
    savings: "51%",
  },
  {
    id: 3,
    quote:
      "Cygnius team enabled us to optimize our AWS costs and provided clear, actionable insights to our tech team. Their support gave us confidence in our cloud security and unlocked cash flow for growth activities.",
    name: "Ishan Mohammed",
    title: "Founder & CEO",
    company: "Katha Infocom Pvt. Ltd.",
    image: "/testimonials/Ishan-Mohammed.png",
    savings: "35%",
  },
  {
    id: 4,
    quote:
      "With Cygnius team on our side, I feel confident about our cloud security. They also unlocked a lot of cash flow for us to invest in growth activities.",
    name: "Paresh Deshmukh",
    title: "Founder & CEO",
    company: "Bolosign",
    image: "/testimonials/Paresh-Deshmukh.png",
    savings: "42%",
  },
  {
    id: 5,
    quote:
      "We asked them to optimize just our OpenSearch costs. CloudVictor team analyzed and delivered a 69.45% reduction in our monthly bill. They worked with our DevOps team to implement changes phase-by-phase, ensuring smooth operations and system stability.",
    name: "Sreepad Krishnan Mavila",
    title: "Cofounder",
    company: "BotGauge",
    image: "/testimonials/Sreepad-Krishnan-Mavila.png",
    savings: "69%",
  },
  {
    id: 6,
    quote:
      "CloudVictor team enabled us to optimize our AWS costs and guided our DevOps team with clear, actionable insights. Their support helped us improve our cloud security and unlock more resources for business growth.",
    name: "Pramin Pradeep",
    title: "Co-founder & CEO",
    company: "BotGauge",
    image: "/testimonials/Pramin-Pradeep.png",
    savings: "38%",
  },
];

export default function TestimonialsSection() {
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

    const interval = setInterval(play, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [emblaApi, isPlaying]);

  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  return (
    <div className="bg-gradient-to-br from-background via-background to-muted pb-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center pb-8 pt-10">
          <h2 className="text-4xl lg:text-5xl font-semibold max-w-3xl mx-auto leading-[1.2] bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent ">
            Results Our Customers Count On, Month After Month
          </h2>
        </div>

        {/* Embla Carousel */}
        <div className="relative cursor-grab w-full">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 h-fit px-8"
                >
                  <div className="bg-card rounded-3xl shadow-2xl p-8 lg:p-12 border border-border">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 ">
                      {/* Left Side - Content */}
                      <div className="space-y-8">
                        {/* Quote */}
                        <div className="relative">
                          <p className="text-xl text-foreground leading-relaxed font-light relative z-10">
                            {testimonial.quote}
                          </p>
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center space-x-4">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                              priority={index === 0}
                              sizes="64px"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-lg">
                              {testimonial.name}
                            </p>
                            <p className="text-muted-foreground">
                              {testimonial.title}
                            </p>
                            <p className="text-muted-foreground/80 text-sm">
                              {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Savings Card */}
                      <div className="flex flex-col items-center justify-center space-y-6">
                        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-center text-primary-foreground shadow-xl">
                          <div className="text-6xl lg:text-7xl font-bold mb-2">
                            {testimonial.savings}
                          </div>
                          <div className="text-xl font-medium opacity-90 text-nowrap">
                            Cost Reduction
                          </div>
                          <div className="text-sm opacity-75 mt-2">
                            Monthly AWS Bill
                          </div>
                        </div>

                        {/* Progress Indicators */}
                        <div className="flex justify-center space-x-2">
                          {scrollSnaps.map((_, idx) => (
                            <button
                              key={idx}
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                              onClick={() => scrollTo(idx)}
                              className={cn(
                                "h-2 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer relative overflow-hidden",
                                idx === selectedIndex
                                  ? "w-12 bg-primary/20"
                                  : "w-6 bg-muted-foreground/30"
                              )}
                            >
                              {idx === selectedIndex && (
                                <div
                                  className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-75 ease-linear"
                                  style={{ width: `${progress}%` }}
                                />
                              )}
                            </button>
                          ))}
                        </div>

                        {/* Slide Counter */}
                        <div className="text-center">
                          <span className="text-sm text-muted-foreground">
                            {selectedIndex + 1} of {testimonials.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
