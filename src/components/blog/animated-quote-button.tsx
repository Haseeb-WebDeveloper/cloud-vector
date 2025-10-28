"use client";

import React, { useState } from "react";
import Image from "next/image";

interface AnimatedQuoteButtonProps {
  onClick?: () => void;
  className?: string;
}

const AnimatedQuoteButton: React.FC<AnimatedQuoteButtonProps> = ({
  onClick,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`cursor-pointer relative overflow-hidden bg-[#3626C1] px-[1.1vw] py-[1.1vw] rounded-full text-foreground font-medium transition-all duration-300 ease-out group ${className}`}
    >
      {/* Content container */}
      <div className=" flex items-center justify-between gap-3 w-full ">
        {/* Text that moves up on hover (like category button) */}
        <div className="relative overflow-hidden text-center w-full">
          <span
            className={`block transition-all duration-300 ease-out text-[1.1vw] ${
              isHovered
                ? "text-foreground -translate-y-full"
                : "text-foreground translate-y-0"
            }`}
          >
            Request a Quote
          </span>
          <span
            className={`text-[1.1vw] absolute top-0 left-1/2 -translate-x-1/2 block w-full text-center transition-all duration-300 ease-out ${
              isHovered
                ? "text-foreground translate-y-0"
                : "text-foreground translate-y-full"
            }`}
          >
            Request a Quote
          </span>
        </div>

        {/* Icon container with fixed rounded background */}
        <div className="absolute top-1/2 right-[0.5vw] -translate-y-1/2 w-fit h-fit rounded-full flex items-center justify-center overflow-hidden border border-foreground">
          <div className="relative bg-foreground aspect-square rounded-full flex items-center justify-center">
          <div
            className={`absolute inset-0 bg-[#3626C1] rounded-full transition-all duration-300 ease-out ${
              isHovered ? "scale-100" : "scale-0"
            }`}
          ></div>
            {/* First icon - goes right on hover  */}
            <Image
              src="/icons/send.svg"
              alt="send"
              width={50}
              height={50}
              className={`group-hover:invert w-[3vw] h-[3vw] p-2 transition-all duration-300 ease-out ${
                isHovered
                  ? "translate-x-[200%] opacity-0 scale-0"
                  : "translate-x-0 opacity-100 scale-100"
              }`}
            />
            {/*  Second icon - comes from left on hover  */}
            <Image
              src="/icons/send.svg"
              alt="send"
              width={50}
              height={50}
              className={`absolute group-hover:invert w-[3vw] h-[3vw] p-2 transition-all duration-300 ease-out ${
                isHovered
                  ? "translate-x-0 opacity-100 scale-100"
                  : "-translate-x-[200%] opacity-0 scale-0"
              }`}
            />
          </div>
        </div>
      </div>
    </button>
  );
};

export default AnimatedQuoteButton;
