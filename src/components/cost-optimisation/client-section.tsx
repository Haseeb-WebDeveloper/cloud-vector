"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

interface Logo {
  name: string;
  src: string;
  alt: string;
}

interface Category {
  word: string;
  logos: Logo[];
  duration: number;
}

const categories: Category[] = [
  {
    word: "Generative AI Companies",
    logos: [
      { name: "OpenAI", src: "/logo/client-1.webp", alt: "OpenAI" },
      { name: "Anthropic", src: "/logo/client-1.webp", alt: "Anthropic" },
      { name: "Hugging Face", src: "/logo/client-1.webp", alt: "Hugging Face" },
      { name: "Stability AI", src: "/logo/client-1.webp", alt: "Stability AI" },
    ],
    duration: 3000,
  },
  {
    word: "U.S. Government Agencies",
    logos: [
      {
        name: "Department of Defense",
        src: "/logo/client-1.webp",
        alt: "Department of Defense",
      },
      { name: "NASA", src: "/logo/client-1.webp", alt: "NASA" },
      { name: "FBI", src: "/logo/client-1.webp", alt: "FBI" },
      { name: "CIA", src: "/logo/client-1.webp", alt: "CIA" },
    ],
    duration: 3000,
  },
  {
    word: "Enterprises",
    logos: [
      { name: "Mayo Clinic", src: "/logo/client-1.webp", alt: "Mayo Clinic" },
      { name: "Cisco", src: "/logo/client-1.webp", alt: "Cisco" },
      { name: "TIME", src: "/logo/client-1.webp", alt: "TIME" },
      { name: "DLA Piper", src: "/logo/client-1.webp", alt: "DLA Piper" },
      {
        name: "Global Atlantic",
        src: "/logo/client-1.webp",
        alt: "Global Atlantic",
      },
      {
        name: "Howard Hughes",
        src: "/logo/client-1.webp",
        alt: "Howard Hughes",
      },
      { name: "Cengage", src: "/logo/client-1.webp", alt: "Cengage" },
    ],
    duration: 4000,
  },
];

export default function ClientSection() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentCategory = categories[currentCategoryIndex];

  useEffect(() => {
    // Reset progress when category changes
    setProgress(0);
    setIsAnimating(true);

    // Start progress animation
    const progressInterval = setInterval(
      () => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      },
      (currentCategory.duration || 3000) / 50
    );

    // Switch to next category after current duration
    const categoryTimeout = setTimeout(() => {
      setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
    }, currentCategory.duration || 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(categoryTimeout);
    };
  }, [currentCategoryIndex, currentCategory.duration]);

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Main Text */}
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-light text-foreground">
            Scale works with{" "}
            <span
              className={`relative inline-block ${currentCategoryIndex === 0 ? "" : "opacity-100"}`}
            >
              Generative AI Companies
              {currentCategoryIndex === 0 && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  style={{ width: `${progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              )}
            </span>
            ,{" "}
            <span
              className={`relative inline-block ${currentCategoryIndex === 1 ? "" : "opacity-100"}`}
            >
              U.S. Government Agencies
              {currentCategoryIndex === 1 && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  style={{ width: `${progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              )}
            </span>{" "}
            &{" "}
            <span
              className={`relative inline-block ${currentCategoryIndex === 2 ? "" : "opacity-100"}`}
            >
              Enterprises
              {currentCategoryIndex === 2 && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  style={{ width: `${progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              )}
            </span>
          </h2>
        </div>

        {/* Logos */}
        <div className="flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex w-full  justify-between items-center gap-8 lg:gap-12"
            >
              {currentCategory.logos.map((logo, index) => (
                <motion.div
                  key={`${currentCategoryIndex}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                  className="flex items-center justify-center"
                >
                  <div className="w-24 h-12 lg:w-32 lg:h-16 flex items-center justify-center">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
