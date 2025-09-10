"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function VideoAnimation() {
  const [isPlaying, setIsPlaying] = useState(false); // Start as false - video won't autoplay
  const [isMuted, setIsMuted] = useState(true); // Must start muted for autoplay
  const [isControlsHovered, setIsControlsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false); // Track if user has clicked video
  const [isMouseInVideo, setIsMouseInVideo] = useState(false); // Track if mouse is inside video area

  // Add refs to track timeouts and prevent race conditions
  const nearBottomTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Store timeout references outside of effects
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if autoplay is supported (but don't autoplay)
  useEffect(() => {
    const checkAutoplaySupport = async () => {
      if (!videoRef.current) return;

      // Just check if autoplay is supported without actually playing
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

    // Setup cursor animation - independent of cursor visibility
    if (cursorRef.current && containerRef.current) {
      const cursor = cursorRef.current;
      const container = containerRef.current;

      // Position cursor at the center initially
      const centerX = container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;

      gsap.set(cursor, {
        x: centerX,
        y: centerY,
        scale: 1,
        opacity: 0, // Hide cursor by default
      });

      // Only add mouse tracking on large screens
      if (isLargeScreen) {
        const onMouseEnter = () => {
          // Show cursor when mouse enters video area
          setIsMouseInVideo(true);
        };

        const onMouseMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Calculate if cursor is near bottom (5vw from bottom)
          const vwInPixels = window.innerWidth / 100;
          const bottomThreshold = rect.height - 5 * vwInPixels; // 5vw from bottom
          const currentIsAtBottom = y >= bottomThreshold;

          // Update isNearBottom state whenever cursor position changes
          setIsNearBottom(currentIsAtBottom);

          // Clear any pending timeout
          if (nearBottomTimeoutRef.current) {
            clearTimeout(nearBottomTimeoutRef.current);
            nearBottomTimeoutRef.current = null;
          }

          // Handle controls visibility based on cursor position
          if (currentIsAtBottom) {
            // Show controls immediately when entering bottom area
            setIsControlsHovered(true);
            // Clear any existing hide timeout
            if (hideControlsTimeoutRef.current) {
              clearTimeout(hideControlsTimeoutRef.current);
              hideControlsTimeoutRef.current = null;
            }
          } else {
            // When leaving bottom area, use normal controls behavior
            setIsControlsHovered(false);
          }

          // Always update cursor position
          gsap.to(cursor, {
            x: x,
            y: y,
            duration: 0.5,
            ease: "power2.out",
          });
        };

        const onMouseLeave = () => {
          // Return to center when mouse leaves
          gsap.to(cursor, {
            x: centerX,
            y: centerY,
            duration: 1.2,
            ease: "power2.out",
          });

          // Reset states when leaving container
          setIsNearBottom(false);
          setIsControlsHovered(false);
        };

        container.addEventListener("mouseenter", onMouseEnter);
        container.addEventListener("mousemove", onMouseMove);
        container.addEventListener("mouseleave", onMouseLeave);

        return () => {
          container.removeEventListener("mouseenter", onMouseEnter);
          container.removeEventListener("mousemove", onMouseMove);
          container.removeEventListener("mouseleave", onMouseLeave);
        };
      } else {
        // For small screens, show cursor at center and make it visible
        setIsMouseInVideo(true);
        gsap.to(cursor, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  }, []); // No dependencies to avoid re-running on hover state changes

  // Separate effect for cursor visibility - depends on mouse position and controls state
  useEffect(() => {
    if (cursorRef.current) {
      const shouldShowCursor =
        isMouseInVideo && !isControlsHovered && !isNearBottom;
      gsap.to(cursorRef.current, {
        opacity: shouldShowCursor ? 1 : 0,
        duration: 0.15,
        overwrite: true, // Important: prevent animation conflicts
        ease: "power2.out",
      });
    }
  }, [isMouseInVideo, isControlsHovered, isNearBottom]);

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
    // Prevent default behavior to avoid conflicts with native controls
    e.preventDefault();
    e.stopPropagation();

    // Prevent click handling if clicked on controls area (bottom of video)
    if (isNearBottom) {
      return;
    }

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

        // Animate cursor scale on play/pause
        if (cursorRef.current) {
          gsap.to(cursorRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      } catch (error) {
        console.error("Play/pause error:", error);
      }
    }
  };

  return (
    <section className="pb-40 pt-6">
      <div
        ref={containerRef}
        className="relative max-w-5xl mx-auto h-fit  md:cursor-none cursor-pointer group overflow-hidden"
        id="video-container"
        style={{
          cursor: isNearBottom ? "default" : undefined,
        }}
      >
        {/* Custom cursor */}
        <div
          ref={cursorRef}
          className="pointer-events-none absolute top-0 left-0 z-[20]"
        >
          <div
            className="flex items-center justify-center"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
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

        {/* Video element */}
        <video
          ref={videoRef}
          className="w-full h-fit max-w-5xl mx-auto object-cover aspect-video rounded-2xl"
          onClick={handleVideoClick}
          loop
          muted={true} // Always start muted
          playsInline
          controls={
            videoLoaded && window.innerWidth >= 768 && hasUserInteracted
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
      {/* <div className="pt-20 max-w-[1600px] mx-auto px-6 lg:px-16 w-full space-y-[6vw]">
        <h3 className=" font-medium text-center lg:font-bold text-2xl md:text-3xl lg:text-[40px] lg:tracking-tight lg:leading-[150%] leading-[160%] ">
          We work across core sectors where we bring{" "}
          <span className="text-primary">deep commercial insight</span> and{" "}
          <span className="text-primary">strong investor networks.</span> The
          PhaseOne model is built to turn that expertise into real outcomes by
          helping the{" "}
          <span className="text-primary">
            right companies and capital connect
          </span>{" "}
          with clarity and confidence. The Time and again, we’ve helped partners
          achieve better results through meticulous preparation and strategic
          positioning.
        </h3>
      </div> */}
    </section>
  );
}
