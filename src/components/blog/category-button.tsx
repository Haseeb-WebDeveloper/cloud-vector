"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CategoryButtonProps {
  text: string;
  iconSrc: string;
  onClick?: () => void;
  className?: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ 
  text, 
  iconSrc, 
  onClick, 
  className = "" 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden px-4 py-2 rounded-full border border-foreground/20 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] transition-all duration-300 ease-out ${className}`}
    >
      {/* Background that expands on hover */}
      <div
        className={`absolute inset-0 bg-foreground rounded-full transition-all duration-300 ease-out ${
          isHovered ? "scale-100" : "scale-0"
        }`}
      />
      
      {/* Content container */}
      <div className="relative flex items-center justify-between gap-3">
        {/* Text that moves up on hover */}
        <div className="relative overflow-hidden">
          <span
            className={`block transition-all duration-300 ease-out ${
              isHovered
                ? "text-background -translate-y-full"
                : "text-foreground translate-y-0"
            }`}
          >
            {text}
          </span>
          <span
            className={`absolute top-0 left-0 block transition-all duration-300 ease-out ${
              isHovered
                ? "text-background translate-y-0"
                : "text-background translate-y-full"
            }`}
          >
            {text}
          </span>
        </div>
        
        {/* Icon that slides in from left on hover */}
        <div className="relative overflow-hidden">
          <Image
            src={iconSrc}
            alt={text}
            width={20}
            height={20}
            className={`w-5 h-5 transition-all duration-300 ease-out ${
              isHovered
                ? "translate-x-0 opacity-100 scale-100"
                : "translate-x-[200%] opacity-0 scale-0"
            }`}
          />
        </div>
      </div>
    </button>
  );
};

export default CategoryButton; 