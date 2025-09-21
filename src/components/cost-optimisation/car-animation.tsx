"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CarAnimation() {
  const carRef = useRef<HTMLDivElement>(null);
  const carImgRef = useRef<HTMLImageElement>(null);
  const backWheelRef = useRef<HTMLImageElement>(null);
  const frontWheelRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set car completely off-screen to the left initially (use viewport units)
      gsap.set(carRef.current, { x: "-25vw" });

      // Set initial heights for car and wheels
      gsap.set(carImgRef.current, { height: "8.5rem" });
      gsap.set(backWheelRef.current, { height: "4rem", width: "4rem" });
      gsap.set(frontWheelRef.current, { height: "4rem", width: "4rem" });

      // Create a timeline for coordinated animations
      const tl = gsap.timeline({ repeat: -1 });

      // Car movement animation with acceleration and height reduction (perspective effect)
      tl.to(
        carRef.current,
        {
          x: "110vw", // Move to completely off-screen right
          duration: 10,
          ease: "power1.in",
        },
        0
      ).to(
        carImgRef.current,
        {
          height: "2.5rem", // Reduce car image height
          duration: 10,
          ease: "power1.in",
        },
        0
      ).to(
        [backWheelRef.current, frontWheelRef.current],
        {
          height: "1.2rem", // Reduce wheel height
          width: "1.2rem",
          duration: 10,
          ease: "power1.in",
        },
        0
      );

      // Wheel spinning animation - starts slow, speeds up
      gsap.to([backWheelRef.current, frontWheelRef.current], {
        rotation: 360,
        duration: 1.5, // Start with slower rotation
        ease: "none",
        repeat: -1,
      });

      // Accelerating wheel spin to match car acceleration
      gsap.to([backWheelRef.current, frontWheelRef.current], {
        rotation: "+=2160", // Additional rotations for acceleration effect
        duration: 10,
        ease: "power1.in", // Same acceleration as car movement
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full h-36 ">
      {/* Car with wheels - positioned together */}
      <div ref={carRef} className="absolute bottom-4 h-fit z-10">
        {/* Car body */}
        <div className="relative">
          <img
            ref={carImgRef}
            src="/car/car.png"
            alt="Car"
            className="w-full object-contain"
            style={{ height: "8.5rem" }}
          />

          {/* Wheels positioned relative to car */}
          <img
            ref={backWheelRef}
            src="/car/wheel.png"
            alt="Back wheel"
            className="absolute -bottom-4 left-[9.3%] object-contain"
            style={{ width: "4rem", height: "4rem" }}
          />
          <img
            ref={frontWheelRef}
            src="/car/wheel.png"
            alt="Front wheel"
            className="absolute -bottom-4 right-[12.5%] object-contain"
            style={{ width: "4rem", height: "4rem" }}
          />
        </div>
      </div>
    </div>
  );
}