"use client";
import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl  h-16 w-40 p-[1px] overflow-hidden ",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const progress = useMotionValue<number>(0);
  const [pathData, setPathData] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  // Create rounded rectangle path that traces the exact border edge
  // The path should match where the container's border-radius is visually applied
  const createRoundedRectPath = (width: number, height: number, radius: number) => {
    const rx = Math.min(radius, width / 2);
    const ry = Math.min(radius, height / 2);
    
    // Path traces the outer edge where border-radius is applied (0px offset from SVG edges)
    return `M ${rx} 0 L ${width - rx} 0 Q ${width} 0 ${width} ${ry} L ${width} ${height - ry} Q ${width} ${height} ${width - rx} ${height} L ${rx} ${height} Q 0 ${height} 0 ${height - ry} L 0 ${ry} Q 0 0 ${rx} 0 Z`;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const updatePath = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // Get the actual computed border radius from the parent container
        if (!containerRef.current && svgRef.current.parentElement) {
          containerRef.current = svgRef.current.parentElement as HTMLElement;
        }
        
        let radius = 16; // default to rounded-2xl
        if (containerRef.current) {
          const computedStyle = window.getComputedStyle(containerRef.current);
          const borderRadius = computedStyle.borderRadius;
          // Extract the first value (all corners should be the same)
          const match = borderRadius.match(/(\d+(?:\.\d+)?)px/);
          if (match) {
            radius = parseFloat(match[1]);
          }
        }
        
        // Path traces the exact outer border edge (0px offset)
        // The glow center will be on this path, and since glow is 48px, it extends 24px in each direction
        const rx = Math.min(radius, width / 2);
        const ry = Math.min(radius, height / 2);
        
        // Path at the exact outer edge where border-radius is applied
        const path = `M ${rx} 0 L ${width - rx} 0 Q ${width} 0 ${width} ${ry} L ${width} ${height - ry} Q ${width} ${height} ${width - rx} ${height} L ${rx} ${height} Q 0 ${height} 0 ${height - ry} L 0 ${ry} Q 0 0 ${rx} 0 Z`;
        setPathData(path);
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(updatePath, 0);
    window.addEventListener("resize", updatePath);
    
    // Use ResizeObserver for more accurate updates
    const resizeObserver = new ResizeObserver(updatePath);
    if (svgRef.current) {
      resizeObserver.observe(svgRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updatePath);
      resizeObserver.disconnect();
    };
  }, [isMounted]);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.x ?? 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.y ?? 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  // Don't render path until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="absolute inset-0" {...otherProps}>
        {children}
      </div>
    );
  }

  return (
    <>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        {pathData && (
          <path
            ref={pathRef}
            fill="none"
            d={pathData}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
