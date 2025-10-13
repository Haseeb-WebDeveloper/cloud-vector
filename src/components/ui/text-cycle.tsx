"use client";

import * as React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
  showProgressBar?: boolean;
}

export default function AnimatedTextCycle({
  words,
  interval = 5000,
  className = "",
  showProgressBar = false,
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [progress, setProgress] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get the width of the current word - use useLayoutEffect to measure before paint
  useLayoutEffect(() => {
    if (measureRef.current) {
      const elements = measureRef.current.children;
      if (elements.length > currentIndex) {
        const element = elements[currentIndex] as HTMLElement;
        const newWidth = element.offsetWidth;
        setWidth(newWidth);
      }
    }
  }, [currentIndex, words]);

  // Progress bar animation
  useEffect(() => {
    if (!showProgressBar) return;

    setProgress(0);

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    const progressStep = 100 / (interval / 50); // Update every 50ms
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + progressStep;
      });
    }, 50);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentIndex, interval, showProgressBar]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  // Animation variants
  const containerVariants = {
    hidden: { 
      y: -20,
      opacity: 0,
      filter: "blur(8px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
      transition: { 
        duration: 0.3, 
        ease: "easeIn"
      }
    },
  };

  // THE KEY CHANGE: Wrap all top-level containers in overflow-x-visible and NO width setting on page
  // Also, fix the width handling logic to never set an explicit (potentially huge) width on parent containers

  return (
    <div className="inline-block align-middle" style={{ verticalAlign: "middle", maxWidth: "100%" }}>
      {/* Hidden measurement div with all words rendered */}
      <div 
        ref={measureRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          left: 0,
          top: 0,
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        {words.map((word, i) => (
          <span key={i} className={className} style={{ display: "inline-block", maxWidth: "100%" }}>
            {word}
          </span>
        ))}
      </div>

      {/* Visible animated word container */}
      <div className="relative inline-block align-middle" style={{ verticalAlign: "middle", maxWidth: "100%", overflowX: "visible" }}>
        <motion.div
          className="relative overflow-hidden"
          style={{ maxWidth: "100%" }}
          animate={{
            width: width > 0 ? Math.min(width, window?.innerWidth || 1600) : "auto",
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 1,
            }
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={currentIndex}
              className={`inline-block ${className}`}
              variants={containerVariants as Variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                whiteSpace: "nowrap",
                position: "absolute",
                left: 0,
                top: 4,
                maxWidth: "100%",
                overflowX: "visible",
              }}
            >
              {words[currentIndex]}
            </motion.span>
          </AnimatePresence>

          {/* Invisible spacer to maintain height and linebox, but not cause overflow */}
          <span
            className={`inline-block ${className} invisible`}
            style={{
              whiteSpace: "nowrap",
              maxWidth: "100%",
              overflowX: "visible",
              display: "inline-block",
            }}
          >
            {words[currentIndex]}
          </span>
        </motion.div>

        {/* Progress Bar - Outside the width-animated container */}
        {showProgressBar && (
          <motion.div
            className="h-[1px] bg-gray-200/30 rounded-full overflow-hidden mt-0.5"
            style={{ maxWidth: "100%" }}
            animate={{
              width: width > 0 ? Math.min(width, window?.innerWidth || 1600) : "auto",
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                mass: 1,
              }
            }}
          >
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}