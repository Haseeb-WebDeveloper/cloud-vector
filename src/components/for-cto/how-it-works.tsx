"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import CheckIcon from "@/components/check";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { tabsData, TabData, FeatureStep } from "@/data/constant";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MovingBorder } from "@/components/ui/moving-border";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("cost");
  const [isSticky, setIsSticky] = useState(false);
  const tabContainerRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Handle sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const tabsElement = document.getElementById("sticky-tabs");
      if (tabsElement) {
        const rect = tabsElement.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Store ScrollTrigger instances for proper cleanup
  const scrollTriggerRefs = useRef<gsap.core.Tween[]>([]);

  // Helper function to initialize animations for a specific container
  const initializeAnimations = (container: HTMLDivElement) => {
    // Only query images within this specific container
    const leftImages = container.querySelectorAll("[data-image-left]");
    const rightImages = container.querySelectorAll("[data-image-right]");

    // Animate each image individually with its own ScrollTrigger (bidirectional)
    leftImages.forEach((image) => {
      // Reset to initial state first
      gsap.set(image, { x: -100, opacity: 0 });

      const tween = gsap.to(image, {
        x: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: image,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });
      
      scrollTriggerRefs.current.push(tween);
    });

    rightImages.forEach((image) => {
      // Reset to initial state first
      gsap.set(image, { x: 100, opacity: 0 });

      const tween = gsap.to(image, {
        x: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: image,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });
      
      scrollTriggerRefs.current.push(tween);
    });

    // Refresh ScrollTrigger to recalculate positions after a brief delay
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  };

  // Animate feature step images - re-initialize when tab changes
  useEffect(() => {
    // Clean up previous ScrollTriggers created by this component only
    scrollTriggerRefs.current.forEach((tween) => {
      const scrollTrigger = (tween as any).scrollTrigger;
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      tween.kill();
    });
    scrollTriggerRefs.current = [];

    // Wait for active tab content to be visible
    const activeTabContainer = tabContainerRefs.current.get(activeTab);
    if (!activeTabContainer) {
      // Container not yet registered, wait a bit
      const timeout = setTimeout(() => {
        const container = tabContainerRefs.current.get(activeTab);
        if (container) {
          // Check if element is actually visible
          const rect = container.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            initializeAnimations(container);
          }
        }
      }, 100);
      return () => clearTimeout(timeout);
    }

    // Small delay to ensure Radix UI has finished showing the tab content
    const timeout = setTimeout(() => {
      // Verify container is visible before animating
      const rect = activeTabContainer.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        initializeAnimations(activeTabContainer);
      }
    }, 50);

    return () => {
      clearTimeout(timeout);
    };
  }, [activeTab]);

  const currentTabData =
    tabsData.find((tab) => tab.id === activeTab) || tabsData[0];

  return (
    <div className="py-32">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center sm:mb-8 max-w-4xl mx-auto leading-tight bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent ">
        From Architecture to Automation - One Partner, Total Control
      </h2>
      <h3 className="text-xl sm:text-4xl font-semibold text-center text-white mb-2">
        I want to:
      </h3>

      {/* Sticky Tabs Navigation */}
      <div
        id="sticky-tabs"
        className={cn(
          `sticky top-[73px] py-8 border-y-[1px] border-foreground/10 z-20 w-full bg-clip-padding backdrop-blur-xl bg-background/70 transition-all duration-300`,

        )}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className=" w-fit mx-auto flex flex-wrap h-auto bg-transparent gap-4 justify-center items-center">
            {tabsData.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  `cursor-pointer  w-fit mx-auto flex items-center gap-2 px-5 py-3 text-sm sm:text-base font-medium rounded-full transition-all duration-200`,
                  
                )}
              >
                {tab.icon}
                <span className="text-sm text-center leading-tight hidden sm:block sm:text-base">
                  {tab.label}
                </span>
                <span className="text-sm text-center leading-tight sm:hidden">
                  {tab.label.split(" ")[0]}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto   px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {tabsData.map((tab) => (
            <TabsContent
              key={tab.id}
              value={tab.id}
              className="mt-0 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:duration-500"
            >
              <div className="space-y-8 sm:space-y-12 lg:space-y-16 animate-in fade-in-0 duration-500">
                {/* Section Header */}
                <div className="text-center space-y-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                    {tab.heading}
                  </h3>
                  <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                    {tab.oneLiner}
                  </p>
                </div>

                {/* Benefits Section */}
                <div className="max-w-6xl mx-auto px-4 lg:px-24 py-8 bg-[#0B1220] rounded-2xl" style={{ boxShadow: "0 4px 32px 0 #3C213A" }}
                >
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8 lg:mb-12">
                    Use less of cloud & pay less for it
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {tab.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 sm:p-4 bg-foreground/5 rounded-lg"
                      >
                        <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0 text-primary" />
                        <span className="text-xs sm:text-sm leading-relaxed">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feature Steps */}
                <div
                  className="relative"
                  ref={(el) => {
                    if (el) {
                      tabContainerRefs.current.set(tab.id, el);
                    } else {
                      tabContainerRefs.current.delete(tab.id);
                    }
                  }}
                >
                  <div className="space-y-12 sm:space-y-16 lg:space-y-[230px]">
                    {tab.features.map((step, index) => (
                      <div
                        key={step.id}
                        className={cn(
                          "flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16",
                          step.isReversed && "lg:flex-row-reverse"
                        )}
                      >
                        {/* Content Container */}
                        <div className="relative flex-1 w-full">
                          {/* Connecting Line - only show between steps */}
                          {index < tab.features.length - 1 && (
                            <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 z-10 hidden lg:block">
                              {step.isReversed ? (
                                <Image
                                  src="/connect-from-left-right.svg"
                                  alt=""
                                  width={600}
                                  height={233}
                                />
                              ) : (
                                <Image
                                  src="/connect-from-right-left.svg"
                                  alt=""
                                  width={617}
                                  height={233}
                                />
                              )}
                            </div>
                          )}

                          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-center">
                            {/* Text Content */}
                            <div
                              className={cn(
                                "flex-1 space-y-4 sm:space-y-6",
                                step.isReversed ? "lg:order-2" : "lg:order-1"
                              )}
                            >
                              <div className="space-y-3 sm:space-y-4 pl-4 sm:pl-8">
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl text-foreground font-semibold">
                                  {step.heading}
                                </h3>
                                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                                  {step.oneLiner}
                                </p>
                              </div>

                              <ul className="space-y-2 sm:space-y-3">
                                {step.details.map((detail, detailIndex) => (
                                  <li
                                    key={detailIndex}
                                    className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg"
                                  >
                                    <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mt-1 flex-shrink-0 text-primary" />
                                    <span className="leading-relaxed">
                                      {detail}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Image */}
                            <div
                              className={cn(
                                "flex-1 w-full z-10 h-64 sm:h-80 lg:h-96",
                                step.isReversed ? "lg:order-1" : "lg:order-2"
                              )}
                              {...(step.isReversed
                                ? { "data-image-left": true }
                                : { "data-image-right": true })}
                            >
                              <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden">
                                <div className="absolute inset-0">
                                  <MovingBorder duration={6000} rx="30%" ry="30%">
                                    <div
                                      className="h-20 w-20 opacity-[0.8]"
                                      style={{
                                        background: `radial-gradient(circle, var(--primary) 40%, transparent 60%)`
                                      }}
                                    />
                                  </MovingBorder>
                                </div>
                                <div className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px] rounded-2xl sm:rounded-3xl w-full h-full z-0">
                                  <Image
                                    src={step.image}
                                    alt={step.heading || "Step Image"}
                                    width={500}
                                    height={500}
                                    className="rounded-2xl sm:rounded-3xl object-cover w-full h-full pr-[2px] pb-[2px]"
                                    priority={true}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
