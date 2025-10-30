import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * GradientButton - A reusable button component with orange gradient background
 * Matches the design from the for-cto hero section
 */
export function GradientButton({ 
  children, 
  className, 
  ...props 
}: GradientButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        "group cursor-pointer flex justify-center items-center gap-2",
        // Gradient background
        "bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90",
        // Hover gradient
        "hover:from-[#FF9900] hover:to-[#E85409]",
        // Border
        "border border-primary/50 hover:border-primary/70",
        // Animation
        "hover:pr-6 transition-all duration-300",
        // Padding and rounding
        "px-5 lg:py-2.5 py-3 rounded-full",
        // Text
        "text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

