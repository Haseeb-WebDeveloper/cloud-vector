"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  arrowSrc?: string;
}

export default function AnimatedButton({ 
  children, 
  onClick, 
  className = "",
  arrowSrc = "/icons/arrow-right.svg"
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    const arrow = arrowRef.current;
    const container = containerRef.current;

    if (!button || !text || !arrow || !container) return;

    // Set initial states
    gsap.set(arrow, { 
      opacity: 0, 
      x: 20, 
      scale: 0.8 
    });

    const handleMouseEnter = () => {
      // Create timeline for smooth sequential animations
      const tl = gsap.timeline();

      // Animate button width increase
      tl.to(button, {
        width: "auto",
        duration: 0.4,
        ease: "power2.out"
      })
      // Animate text movement
      .to(text, {
        x: -8,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.2")
      // Animate arrow appearance and movement
      .to(arrow, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.2)"
      }, "-=0.1");
    };

    const handleMouseLeave = () => {
      // Create timeline for smooth exit animations
      const tl = gsap.timeline();

      // Animate arrow disappearance
      tl.to(arrow, {
        opacity: 0,
        x: -20,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in"
      })
      // Animate text back to original position
      .to(text, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.1")
      // Animate button width back to original
      .to(button, {
        width: "auto",
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2");
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="inline-block">
      <button
        ref={buttonRef}
        onClick={onClick}
        className={`group cursor-pointer flex items-center gap-3 bg-background text-foreground border py-2.5 px-4 rounded-full hover:bg-foreground/10 transition-colors duration-300 relative overflow-hidden ${className}`}
      >
        <span 
          ref={textRef}
          className="whitespace-nowrap font-medium"
        >
          {children}
        </span>
        <div 
          ref={arrowRef}
          className="flex items-center justify-center"
        >
          <Image
            src={arrowSrc}
            alt="Arrow right"
            width={50}
            height={50}
            className="w-fit h-6"
          />
        </div>
      </button>
    </div>
  );
}
