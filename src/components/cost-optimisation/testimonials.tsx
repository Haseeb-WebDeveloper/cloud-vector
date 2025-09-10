"use client";

import { useCallback, useEffect, useState } from "react";
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
  },
  {
    id: 2,
    quote:
      "CloudVictor team delivered outstanding results for BoloSign. We achieved a 51% reduction in our AWS bill and brought our infra in compliance with AWS Well-Architected Security pillar, AWS FTR, and SOC 2. Our security incident response time dropped from over 3 hours to just 30 minutes.",
    name: "Chirag Gupta",
    title: "Chief Technical Officer",
    company: "Bolosign",
    image: "/testimonials/Chirag-Gupta.png",
  },
  {
    id: 3,
    quote:
      "Cygnius team enabled us to optimize our AWS costs and provided clear, actionable insights to our tech team. Their support gave us confidence in our cloud security and unlocked cash flow for growth activities.",
    name: "Ishan Mohammed",
    title: "Founder & CEO",
    company: "Katha Infocom Pvt. Ltd.",
    image: "/testimonials/Ishan-Mohammed.png",
  },
  {
    id: 4,
    quote:
      "With Cygnius team on our side, I feel confident about our cloud security. They also unlocked a lot of cash flow for us to invest in growth activities.",
    name: "Paresh Deshmukh",
    title: "Founder & CEO",
    company: "Bolosign",
    image: "/testimonials/Paresh-Deshmukh.png",
  },
  {
    id: 5,
    quote:
      "We asked them to optimize just our OpenSearch costs. CloudVictor team analyzed and delivered a 69.45% reduction in our monthly bill. They worked with our DevOps team to implement changes phase-by-phase, ensuring smooth operations and system stability.",
    name: "Sreepad Krishnan Mavila",
    title: "Cofounder",
    company: "BotGauge",
    image: "/testimonials/Sreepad-Krishnan-Mavila.png",
  },
  {
    id: 6,
    quote:
      "CloudVictor team enabled us to optimize our AWS costs and guided our DevOps team with clear, actionable insights. Their support helped us improve our cloud security and unlock more resources for business growth.",
    name: "Pramin Pradeep",
    title: "Co-founder & CEO",
    company: "BotGauge",
    image: "/testimonials/BotGauge.png",
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

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi || !isPlaying) return;

    const play = () => {
      emblaApi.scrollNext();
    };

    const interval = setInterval(play, 4000);
    return () => clearInterval(interval);
  }, [emblaApi, isPlaying]);

  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  return (
    <div className="bg-gradient-to-tr from-background py-24 to-primary/80">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center pb-12">
          <h2 className="text-4xl lg:text-5xl font-light text-foreground mb-8">
            Results Our Customers Count On, Month After Month
          </h2>
        </div>

        {/* Embla Carousel */}
        <div
          className="relative cursor-grab w-full"
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="flex-[0_0_100%] min-w-0 px-4">
                  <div className="flex flex-col lg:flex-row gap-12 items-center h-full">
                    {/* Left Side - Image */}
                    <div className="flex lg:w-fit justify-center items-center">
                      <div className="relative w-40 h-40 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-lg bg-muted">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          priority={index === 0}
                          sizes="(max-width: 768px) 40vw, (max-width: 1200px) 25vw, 16vw"
                        />
                      </div>
                    </div>
                    {/* Right Side - Text Content */}
                    <div className="w-full flex flex-col justify-center">
                      <p className="text-xl lg:text-3xl text-foreground leading-relaxed mb-8 font-light">
                        “{testimonial.quote}”
                      </p>
                      <div className="space-y-1">
                        <p className="font-semibold text-foreground text-lg">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.company}
                        </p>
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
