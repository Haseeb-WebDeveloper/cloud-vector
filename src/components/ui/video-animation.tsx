"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function VideoAnimation() {
  const [isPlaying, setIsPlaying] = useState(false); // Start as false - video won't autoplay
  const [isMuted, setIsMuted] = useState(true); // Must start muted for autoplay
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false); // Track if user has clicked video

  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if autoplay is supported (but don't autoplay)
  useEffect(() => {
    const checkAutoplaySupport = async () => {
      if (!videoRef.current) return;
      try {
        setCanAutoplay(true);
      } catch (error) {
        console.log("Autoplay not supported:", error);
        setCanAutoplay(false);
      }
    };

    if (videoLoaded) {
      checkAutoplaySupport();
    }
  }, [videoLoaded]);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Check if we're on a large screen before applying scroll animation
    const isLargeScreen = window.innerWidth >= 768; // md breakpoint

    const handleResize = () => {
      const newIsLargeScreen = window.innerWidth >= 768;
      if (newIsLargeScreen !== isLargeScreen) {
        // Re-run the animation setup if screen size changes
        gsap.set("#video-container", {
          opacity: newIsLargeScreen ? 0 : 1,
          scale: newIsLargeScreen ? 0.3 : 1,
          borderRadius: newIsLargeScreen ? "16px" : "0px",
          paddingTop: newIsLargeScreen ? "0px" : "4vw",
        });
      }
    };

    window.addEventListener("resize", handleResize);

    if (isLargeScreen) {
      // Video container scale and rotation animation - only for large screens
      gsap.fromTo(
        "#video-container",
        {
          scale: 0.3,
          borderRadius: "16px",
          paddingTop: "0px",
        },
        {
          scale: 1,
          borderRadius: "0px",
          paddingTop: "4vw",
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#video-container",
            start: "top bottom+=10%",
            end: "center center",
            scrub: 1,
          },
        }
      );
    } else {
      // For small screens, just set the container to be visible without animation
      gsap.set("#video-container", {
        opacity: 1,
        scale: 1,
        borderRadius: "0px",
        paddingTop: "4vw",
      });
    }
  }, []);

  // Set up video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      console.error("Video error:", e);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("error", handleError);

    // Load the video
    video.load();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("error", handleError);
    };
  }, [canAutoplay]);

  const handleVideoClick = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLVideoElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (videoRef.current) {
      try {
        if (!hasUserInteracted) {
          // First user interaction - start video from beginning with sound
          videoRef.current.currentTime = 0; // Reset to start
          videoRef.current.muted = false; // Unmute
          setIsMuted(false);
          await videoRef.current.play();
          setHasUserInteracted(true); // Mark that user has interacted
        } else {
          // Normal play/pause behavior for subsequent clicks
          if (isPlaying) {
            await videoRef.current.pause();
          } else {
            await videoRef.current.play();
          }
        }
        // No cursor animation needed
      } catch (error) {
        console.error("Play/pause error:", error);
      }
    }
  };

  return (
    <section className="pb-24 pt-6">
      <div
        ref={containerRef}
        className="relative max-w-5xl mx-auto h-fit group overflow-hidden"
        id="video-container"
      >
        {/* Custom cursor - only show initially, hide after first click */}
        {!hasUserInteracted && (
          <div
            ref={cursorRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center z-[20]"
          >
            <div className="flex items-center justify-center">
              <Image
                src={
                  !isPlaying
                    ? "/icons/pause.svg"
                    : "/icons/play.svg"
                }
                alt={isPlaying ? "stop" : "play"}
                width={100}
                height={100}
                className="w-[15vw] h-[15vw] md:w-[7vw] md:h-[7vw]"
              />
            </div>
          </div>
        )}

        {/* Video element */}
        <video
          ref={videoRef}
          className=" cursor-pointer w-full h-fit max-w-5xl mx-auto object-cover aspect-video rounded-2xl"
          onClick={handleVideoClick}
          loop
          muted={true} // Always start muted
          playsInline
          controls={
            videoLoaded && typeof window !== "undefined" && window.innerWidth >= 768 && hasUserInteracted
          } // Only show controls on large screens and after user interaction
          preload="auto"
          poster="/test.avif" // Using poster attribute for thumbnail
          style={{
            objectFit: "contain",
            objectPosition: "center",
            aspectRatio: "16/9",
          }}
        >
          <source src="/videos/root-case.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
