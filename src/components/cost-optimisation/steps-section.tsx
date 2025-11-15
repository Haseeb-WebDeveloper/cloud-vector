"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  Shield,
  Search,
  BarChart3,
  DollarSign,
  Settings,
  FileCheck,
} from "lucide-react";
import Image from "next/image";
import CheckIcon from "@/components/check";
import { MovingBorder } from "@/components/ui/moving-border";

interface Step {
  id: number;
  headline: string;
  duration: string;
  points: string[];
  icon: React.ReactNode;
  image: string;
}

const steps: Step[] = [
  {
    id: 1,
    headline: "Confidentiality First. Access in Minutes.",
    duration: "30 mins",
    points: [
      "E-sign a NDA to protect your company's confidentiality.",
      "Single-Click Deploy our CloudFormation stack.",
      "Grants Read-only access to your infrastructure metadata.",
      "No access to your actual data/instances/files.",
      "Zero disruption to production workloads.",
      "Small engagement fee, adjusted against final deliverables.",
    ],
    icon: <Shield className="w-4 h-4" />,
    image: "/How do we do it/Step 1 Confidentiality First. Access in Minutes..png",
  },
  {
    id: 2,
    headline: "Exhaustive Resource Audit",
    duration: "12-15 days",
    points: [
      "Every $ traced to actual resource and classified as idle/ misconfigured/ overprovisioned.",
      "For each workload, we analyze 1000+ config combination & workload' requirements to determine the most cost-effective configs + resource counts + purchase options.",
    ],
    icon: <Search className="w-4 h-4" />,
    image: "/How do we do it/Step 2 Exhaustive Resource Audit.png",
  },
  {
    id: 3,
    headline: "Your Costs & Savings, Clearly Mapped",
    duration: "2-3 days",
    points: [
      "Summary report shared: Service-wise spends & guaranteed saving % possible.",
      "One cost-saving area detailed with impact, metrics, root cause and step-by-step solution.",
      "Summary Report with in-depth research, data-backed insights, and transparent solutions for a key cost-saving area",
      "Implementation with your DevOps team, showing verified savings in AWS Cost Explorer within 2–3 days",
      "This acts as a trust builder exercise between CloudVictor & customer.",
    ],
    icon: <BarChart3 className="w-4 h-4" />,
    image: "/How do we do it/Step 3 Your Costs & Savings, Clearly Mapped.png",
  },
  {
    id: 4,
    headline: "No Savings, No Fee - Simple.",
    duration: "Immediate",
    points: [
      "Our model is 100% success-based: If you don't see savings in your bill, you don't pay.",
      "Total fee = 25% of annual savings visible in your bill (one-time, no recurring charges).",
      "Split into 2 installments: first 50% now, balance after final verification of delivered savings in your AWS bill.",
      "Every dollar you pay is recovered within 3 months of optimisation.",
      "Backed by a 100% money-back guarantee if verified savings don't match our promise.",
    ],
    icon: <DollarSign className="w-4 h-4" />,
    image: "/How do we do it/Step 4 No Savings, No Fee - Simple..jpg",
  },
  {
    id: 5,
    headline: "Implement Data-Backed Recommendations",
    duration: "Ongoing",
    points: [
      "Review all the cost saving areas between both the teams.",
      "Your Dev(Ops) team executes all approved right-configure/right-sizing recommendation.",
      "CloudVictor supports your Dev(Ops) team with POC code + hands-on guidance at every step.",
    ],
    icon: <Settings className="w-4 h-4" />,
    image: "/How do we do it/Step 5 Implement Data-Backed Recommendations.png",
  },
  {
    id: 6,
    headline: "Savings Verification with your AWS Bill.",
    duration: "Final",
    points: [
      "Final verification report with before/after data from AWS CUR, Cost Explorer & Bill.",
      "Guaranteed 100% ROI in 3 months — or your money back.",
      "Alarms set up to alert both teams of cost creeps.",
      "Savings achieved scale as your AWS usage expands since unit level efficiency is maximized.",
      "Successful delivery with remaining 50% payment, completing a results-driven partnership.",
    ],
    icon: <FileCheck className="w-4 h-4" />,
    image: "/How do we do it/Step 6 Savings Verification with your AWS Bill..png",
  },
];

export default function StepsSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringPanel, setIsHoveringPanel] = useState(false);
  const [isHoveringTabs, setIsHoveringTabs] = useState(false);

  // Get primary color from CSS variables (works with Tailwind default setup)
  function getPrimaryColor(alpha = 1) {
    // Try CSS var, fallback to a reasonable default if not set
    if (typeof window !== "undefined") {
      const root = window.getComputedStyle(document.documentElement);
      const color = root.getPropertyValue('--tw-prose-invert-links') ||
                    root.getPropertyValue('--color-primary') ||
                    root.getPropertyValue('--tw-color-primary') ||
                    "#6366f1";
      // Convert hex rgb to rgba, or use rgb functional if needed
      // Attempt to ensure fallback to known Tailwind "primary" value, which is indigo-500 (#6366f1)
      const hex = color.trim();
      // If already rgba or rgb, just add alpha
      if (hex.startsWith("rgba")) {
        return hex.replace(/rgba\(([^)]+),\s*[\d\.]+\)/, `rgba($1,${alpha})`);
      }
      if (hex.startsWith("rgb")) {
        // Add alpha if not present
        return hex
          .replace("rgb(", "rgba(")
          .replace(")", `,${alpha})`);
      }
      // Handle hex #RRGGBB
      if (hex.startsWith("#")) {
        let r = 0, g = 0, b = 0;
        if (hex.length === 7) {
          r = parseInt(hex.slice(1, 3), 16);
          g = parseInt(hex.slice(3, 5), 16);
          b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r},${g},${b},${alpha})`;
        }
        // Handle #RGB
        if (hex.length === 4) {
          r = parseInt(hex[1] + hex[1], 16);
          g = parseInt(hex[2] + hex[2], 16);
          b = parseInt(hex[3] + hex[3], 16);
          return `rgba(${r},${g},${b},${alpha})`;
        }
      }
      // fallback, just return the color
      return color;
    }
    // SSR fallback for indigo-500
    return `rgba(99,102,241,${alpha})`;
  }

  // Auto-advance timer (5 seconds per step)
  useEffect(() => {
    if (!isAutoPlaying || isHoveringTabs) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentStep((prev) => (prev === 6 ? 1 : prev + 1));
          return 0;
        }
        return prev + 2; // 2% every 100ms = 5 seconds total
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHoveringTabs]);

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
    setProgress(0);
    setIsAutoPlaying(false);

    // Resume auto-playing after 2 seconds
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 2000);
  };

  const currentStepData =
    steps.find((step) => step.id === currentStep) || steps[0];

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl pt-16 md:text-5xl font-bold mb-4">
            How do we do it?
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Six steps that transform hidden costs into sustained savings.
          </p>
        </div>

        {/* Step Navigation */}
        <div 
          className="flex flex-wrap justify-center gap-2"
          onMouseEnter={() => setIsHoveringTabs(true)}
          onMouseLeave={() => setIsHoveringTabs(false)}
        >
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              className={`cursor-pointer flex items-center gap-2 px-4 py-3 text-sm border rounded-t-lg hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] transition-all duration-300 ${
                currentStep === step.id
                  ? "bg-primary/20 border-primary/30"
                  : "border-border bg-foreground/5"
              }`}
            >
              {step.icon}
              <span>Step {step.id}</span>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-8 mt-2 flex justify-center">
          <div className="w-full max-w-2xl">
            {/* <div className="flex justify-between text-sm text-foreground/50 mb-2">
              <span>Step {currentStep} Progress</span>
              <span>{currentStepData.duration}</span>
            </div> */}
            <div className="w-full bg-foreground/5 h-1">
              <div
                className="bg-primary h-1 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content Panel */}
        <div
          className="relative overflow-hidden rounded-2xl p-8 md:p-12 bg-neutral-900"
          onMouseMove={(e) => {
            const target = e.currentTarget.getBoundingClientRect();
            setMousePosition({ x: e.clientX - target.left, y: e.clientY - target.top });
          }}
          onMouseEnter={() => setIsHoveringPanel(true)}
          onMouseLeave={() => setIsHoveringPanel(false)}
        >
          {/* Hover spotlight effect */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              background: isHoveringPanel
                ? `radial-gradient(220px 220px at ${mousePosition.x}px ${mousePosition.y}px, ${getPrimaryColor(0.10)}, rgba(0,0,0,0) 65%)`
                : "transparent",
              opacity: isHoveringPanel ? 1 : 0,
            }}
          />
          <div className="relative flex flex-col lg:flex-row gap-12">
            {/* Left Content */}
            <div className="space-y-6 flex-1">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6  pl-8">
                {currentStepData.headline}
              </h3>
              <ul className="space-y-4">
                {currentStepData.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckIcon className="min-w-5 min-h-5" />
                    <span className="text-foreground/95 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full max-w-full rounded-2xl p-[1px] overflow-hidden">
                <div className="absolute inset-0">
                  <MovingBorder
                    duration={2000}
                    rx="1rem"
                    ry="1rem"
                  >
                    <div className="h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]" />
                  </MovingBorder>
                </div>
                <div className="relative rounded-2xl overflow-hidden bg-background">
                  <Image
                    src={currentStepData.image}
                    alt={currentStepData.headline}
                    width={500}
                    height={500}
                    className="rounded-2xl object-contain w-full h-auto max-w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
