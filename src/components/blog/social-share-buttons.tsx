"use client";

import React, { useState } from "react";
import { Link as LinkIcon, Check, Facebook, X } from "lucide-react";
/**
 * @component
 * @name Linkedin
 * @description Lucide SVG icon component, renders SVG Element with children
 */
import { Linkedin } from "lucide-react";
import Image from "next/image";

interface SocialShareButtonsProps {
  onCopySuccess: () => void;
  copySuccess: boolean;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  onCopySuccess,
  copySuccess,
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const openSecureWindow = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) {
      newWindow.opener = null; // Additional security
    }
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    openSecureWindow(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`
    );
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    openSecureWindow(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`
    );
  };

  const shareToTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    openSecureWindow(
      `https://x.com/intent/tweet?url=${url}&text=${text}`
    );
  };

  const copyLink = async () => {
    try {
      const currentUrl = window.location.href;
      
      // Modern clipboard API (preferred)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl);
        onCopySuccess();
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = currentUrl;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          onCopySuccess();
        } catch (fallbackErr) {
          console.error("Fallback copy failed:", fallbackErr);
        }
        
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Failed to copy link:", err);
      // You could add a toast notification here for user feedback
    }
  };

  return (
    <div className="flex flex-col lg:items-center gap-4 md:gap-[1.5vw]">
      <h4 className="hidden lg:block text-sm sm:text-base md:text-[1vw] font-light text-foreground uppercase">
        Share
      </h4>
      <h4 className="lg:hidden text-xl">
        Share this article:
      </h4>
      <div className="flex flex-row lg:flex-col gap-2 md:gap-[1vw]">
        {/* LinkedIn Button */}
        <div className="relative overflow-hidden">
          <button
            onClick={shareToLinkedIn}
            onMouseEnter={() => setHoveredButton("linkedin")}
            onMouseLeave={() => setHoveredButton(null)}
            className="relative cursor-pointer p-3 md:p-[1vw] rounded-full border-[1px] border-foreground/20 transition-all duration-300 ease-out"
            aria-label="Share on LinkedIn"
          >
            <div
              className={`absolute inset-0 bg-[#3626C1] rounded-full transition-all duration-300 ease-out ${
                hoveredButton === "linkedin" ? "scale-100" : "scale-0"
              }`}
            ></div>
            <div className="relative flex items-center justify-center">
              <Linkedin
                size={16}
                className={`w-6 h-6 md:w-[1.5vw] md:h-[1.5vw] text-foreground transition-all duration-300 ease-out ${
                  hoveredButton === "linkedin"
                    ? "translate-x-[200%] opacity-0 scale-0"
                    : "translate-x-0 opacity-100 scale-100"
                }`}
              />
              <Linkedin
                size={16}
                className={`absolute w-6 h-6 md:w-[1.5vw] md:h-[1.5vw] text-white transition-all duration-300 ease-out ${
                  hoveredButton === "linkedin"
                    ? "translate-x-0 opacity-100 scale-100"
                    : "-translate-x-[200%] opacity-0 scale-0"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Facebook Button */}
        <div className="relative overflow-hidden">
          <button
            onClick={shareToFacebook}
            onMouseEnter={() => setHoveredButton("facebook")}
            onMouseLeave={() => setHoveredButton(null)}
            className="relative cursor-pointer p-3 md:p-[1vw] rounded-full border-[1px] border-foreground/20 transition-all duration-300 ease-out"
            aria-label="Share on Facebook"
          >
            <div
              className={`absolute inset-0 bg-[#3626C1] rounded-full transition-all duration-300 ease-out ${
                hoveredButton === "facebook" ? "scale-100" : "scale-0"
              }`}
            ></div>
            <div className="relative flex items-center justify-center">
              <Facebook
                size={16}
                className={`w-6 h-6 md:w-[1.5vw] md:h-[1.5vw] text-foreground transition-all duration-300 ease-out ${
                  hoveredButton === "facebook"
                    ? "translate-x-[200%] opacity-0 scale-0"
                    : "translate-x-0 opacity-100 scale-100"
                }`}
              />
              <Facebook
                size={16}
                className={`absolute w-6 h-6 md:w-[2vw] md:h-[2vw] text-white transition-all duration-300 ease-out ${
                  hoveredButton === "facebook"
                    ? "translate-x-0 opacity-100 scale-100"
                    : "-translate-x-[200%] opacity-0 scale-0"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Twitter/X Button */}
        <div className="relative overflow-hidden">
          <button
            onClick={shareToTwitter}
            onMouseEnter={() => setHoveredButton("twitter")}
            onMouseLeave={() => setHoveredButton(null)}
            className="relative cursor-pointer p-3 md:p-[1vw] rounded-full border-[1px] border-foreground/20 transition-all duration-300 ease-out"
            aria-label="Share on X (formerly Twitter)"
          >
            <div
              className={`absolute inset-0 bg-[#3626C1] rounded-full transition-all duration-300 ease-out ${
                hoveredButton === "twitter" ? "scale-100" : "scale-0"
              }`}
            ></div>
            <div className="relative flex items-center justify-center">
              <Image
                src="/icons/x.svg"
                alt="X Logo"
                width={16}
                height={16}
                className={`w-6 h-6 md:w-[1.5vw] md:h-[1.5vw] text-foreground transition-all duration-300 ease-out ${
                  hoveredButton === "twitter"
                    ? "translate-x-[200%] opacity-0 scale-0"
                    : "translate-x-0 opacity-100 scale-100"
                }`}
              />
              <Image
                src="/icons/x.svg"
                alt="X Logo"
                width={16}
                height={16}
                className={`absolute w-6 h-6 md:w-[2vw] md:h-[2vw] text-white transition-all duration-300 ease-out ${
                  hoveredButton === "twitter"
                    ? "translate-x-0 opacity-100 scale-100"
                    : "-translate-x-[200%] opacity-0 scale-0"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Copy Link Button */}
        <div className="relative overflow-hidden">
          <button
            onClick={copyLink}
            onMouseEnter={() => setHoveredButton("copy")}
            onMouseLeave={() => setHoveredButton(null)}
            className="relative cursor-pointer p-3 md:p-[1vw] rounded-full border-[1px] border-foreground/20 transition-all duration-300 ease-out"
            aria-label="Copy link to clipboard"
          >
            <div
              className={`absolute inset-0 bg-[#3626C1] rounded-full transition-all duration-300 ease-out ${
                hoveredButton === "copy" ? "scale-100" : "scale-0"
              }`}
            ></div>
            <div className="relative flex items-center justify-center">
              {copySuccess ? (
                <Check
                  size={16}
                  className="w-6 h-6 md:w-[1.5vw] md:h-[1.5vw] text-foreground transition-all duration-300 ease-out scale-110"
                />
              ) : (
                <>
                  <LinkIcon
                    size={16}
                    className={`w-6 h-6 md:w-[1.5vw] md:h-[1.5vw] text-foreground transition-all duration-300 ease-out ${
                      hoveredButton === "copy"
                        ? "translate-x-[200%] opacity-0 scale-0"
                        : "translate-x-0 opacity-100 scale-100"
                    }`}
                  />
                  <LinkIcon
                    size={16}
                    className={`absolute w-6 h-6 md:w-[2vw] md:h-[2vw] transition-all duration-300 ease-out ${
                      hoveredButton === "copy"
                        ? "translate-x-0 opacity-100 scale-100"
                        : "-translate-x-[200%] opacity-0 scale-0"
                    }`}
                  />
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialShareButtons;