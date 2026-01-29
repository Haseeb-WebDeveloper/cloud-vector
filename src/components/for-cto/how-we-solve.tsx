"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PainPoint {
  id: number;
  title: string;
  description: string;
  color: string;
}

interface Solution {
  id: number;
  title: string;
  description: string;
  color: string;
}

const defaultPainPoints: PainPoint[] = [
  {
    id: 1,
    title: "Ever-Increasing AWS Monthly Bills",
    description: "Rising cloud costs eating into your budget",
    color: "bg-[#00171F]",
  },
  {
    id: 2,
    title: "Data Breaches & Compliance Issues",
    description: "Security risks and regulatory compliance challenges",
    color: "bg-[#0C1713]",
  },
  {
    id: 3,
    title: "Time-Consuming, Once-a-month, brittle Releases",
    description: "Infrequent deployments causing delays and instability",
    color: "bg-[#2E0E02]",
  },
  {
    id: 4,
    title: "Revenue Loss due to availability issues",
    description: "Downtime impacting customer experience and revenue",
    color: "bg-[#0A2342]",
  },
  {
    id: 5,
    title: "Slow Performance / Downtime during peak traffic",
    description: "System struggles during high-demand periods",
    color: "bg-[#2E2836]",
  },
];

const defaultSolutions: Solution[] = [
  {
    id: 1,
    title: "One-Time Reconfiguring + Purchase Optimization",
    description: "Centralized data management with real-time synchronization",
    color: "bg-[#00171F]",
  },
  {
    id: 2,
    title: "Always On Infosec team as a Service",
    description: "AI-powered automation reducing manual effort by 80%",
    color: "bg-[#0C1713]",
  },
  {
    id: 3,
    title: "Deploy Daily with a 100% automated CI/CD pipeline with IaC",
    description: "Elastic scaling that grows with your business needs",
    color: "bg-[#2E0E02]",
  },
  {
    id: 4,
    title: "Disaster-Proof Infrastructure with data backups",
    description: "Multi-layered protection with continuous monitoring",
    color: "bg-[#0A2342]",
  },
  {
    id: 5,
    title: "Tuned & Battle-tested architectures for planet-scale peaks",
    description: "One-click connections between all your business tools",
    color: "bg-[#2E2836]",
  },
];

interface HowWeSolveProps {
  title?: string;
  subtitle?: string;
  painPoints?: Array<{
    title: string;
    description: string;
    color: string;
  }>;
  solutions?: Array<{
    title: string;
    description: string;
    color: string;
  }>;
  videoUrl?: string;
}

// Function to calculate position on quadratic Bézier curve
const getQuadraticBezierPoint = (t: number, startX: number, startY: number, controlX: number, controlY: number, endX: number, endY: number) => {
  const x = Math.pow(1 - t, 2) * startX + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * endX;
  const y = Math.pow(1 - t, 2) * startY + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * endY;
  return { x, y };
};

export default function HowWeSolve({
  title = "How We Solve Your Challenges",
  subtitle = "Watch how we transform your pain points into powerful solutions through our innovative approach",
  painPoints = defaultPainPoints,
  solutions = defaultSolutions,
  videoUrl = "/videos/root-case.mp4",
}: HowWeSolveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const painPointRefs = useRef<(HTMLDivElement | null)[]>([]);
  const solutionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoLeftRef = useRef<HTMLDivElement>(null);
  const videoRightRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRefs = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const updateLines = () => {
      if (!containerRef.current || !svgRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const svg = svgRef.current;
      
      // Clear existing paths and circles
      const existingPaths = svg.querySelectorAll('.dynamic-line');
      const existingCircles = svg.querySelectorAll('.animated-circle');
      existingPaths.forEach(path => path.remove());
      existingCircles.forEach(circle => circle.remove());
      
      // Kill existing animations
      animationRefs.current.forEach(anim => anim.kill());
      animationRefs.current = [];

      // Create new paths for pain points
      painPointRefs.current.forEach((painPoint, index) => {
        if (!painPoint || !videoLeftRef.current) return;

        const painRect = painPoint.getBoundingClientRect();
        const videoLeftRect = videoLeftRef.current.getBoundingClientRect();
        
        const startX = ((painRect.right - containerRect.left) / containerRect.width) * 1000;
        const startY = ((painRect.top + painRect.height / 2 - containerRect.top) / containerRect.height) * 400;
        const endX = ((videoLeftRect.left - containerRect.left) / containerRect.width) * 1000;
        const endY = ((videoLeftRect.top + videoLeftRect.height / 2 - containerRect.top) / containerRect.height) * 400;

        // Create the path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${startX} ${startY} Q ${(startX + endX) / 2} ${startY} ${endX} ${endY}`);
        path.setAttribute('stroke', 'url(#painGradient)');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        path.setAttribute('class', 'dynamic-line');
        path.setAttribute('id', `pain-path-${index}`);
        svg.appendChild(path);

        // Create animated circle for pain points
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', startX.toString());
        circle.setAttribute('cy', startY.toString());
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', '#ff9900c4');
        circle.setAttribute('class', 'animated-circle');
        circle.setAttribute('id', `pain-circle-${index}`);
        svg.appendChild(circle);

        // Calculate control point for the curve
        const controlX = (startX + endX) / 2;
        const controlY = startY;

        // Calculate line length for consistent speed
        const lineLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const baseDuration = 4; // Base duration in seconds (increased from 2)
        const baseLength = 300; // Base line length for reference
        const duration = (lineLength / baseLength) * baseDuration;

        // Animate the circle along the curve using custom Bézier calculation
        const animation = gsap.to(circle, {
          duration: duration,
          ease: "power2.inOut",
          repeat: -1,
          delay: 0, // All circles start at the same time
          onUpdate: function() {
            const progress = this.progress();
            const point = getQuadraticBezierPoint(progress, startX, startY, controlX, controlY, endX, endY);
            circle.setAttribute('cx', point.x.toString());
            circle.setAttribute('cy', point.y.toString());
          }
        });
        
        animationRefs.current.push(animation);
      });

      // Create new paths for solutions
      solutionRefs.current.forEach((solution, index) => {
        if (!solution || !videoRightRef.current) return;

        const solutionRect = solution.getBoundingClientRect();
        const videoRightRect = videoRightRef.current.getBoundingClientRect();
        
        const startX = ((videoRightRect.right - containerRect.left) / containerRect.width) * 1000;
        const startY = ((videoRightRect.top + videoRightRect.height / 2 - containerRect.top) / containerRect.height) * 400;
        const endX = ((solutionRect.left - containerRect.left) / containerRect.width) * 1000;
        const endY = ((solutionRect.top + solutionRect.height / 2 - containerRect.top) / containerRect.height) * 400;

        // Create the path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${startX} ${startY} Q ${(startX + endX) / 2} ${startY} ${endX} ${endY}`);
        path.setAttribute('stroke', 'url(#solutionGradient)');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        path.setAttribute('class', 'dynamic-line');
        path.setAttribute('id', `solution-path-${index}`);
        svg.appendChild(path);

        // Create animated circle for solutions
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', startX.toString());
        circle.setAttribute('cy', startY.toString());
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', '#ff9900c4');
        circle.setAttribute('class', 'animated-circle');
        circle.setAttribute('id', `solution-circle-${index}`);
        svg.appendChild(circle);

        // Calculate control point for the curve
        const controlX = (startX + endX) / 2;
        const controlY = startY;

        // Calculate line length for consistent speed
        const lineLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const baseDuration = 4; // Base duration in seconds (increased from 2)
        const baseLength = 300; // Base line length for reference
        const duration = (lineLength / baseLength) * baseDuration;

        // Animate the circle along the curve using custom Bézier calculation
        const animation = gsap.to(circle, {
          duration: duration,
          ease: "power2.inOut",
          repeat: -1,
          delay: 0, // All circles start at the same time
          onUpdate: function() {
            const progress = this.progress();
            const point = getQuadraticBezierPoint(progress, startX, startY, controlX, controlY, endX, endY);
            circle.setAttribute('cx', point.x.toString());
            circle.setAttribute('cy', point.y.toString());
          }
        });
        
        animationRefs.current.push(animation);
      });
    };

    // Initial update
    updateLines();

    // Update on resize
    window.addEventListener('resize', updateLines);
    
    // Update when component mounts
    const timer = setTimeout(updateLines, 100);

    return () => {
      window.removeEventListener('resize', updateLines);
      clearTimeout(timer);
      // Kill all GSAP animations
      animationRefs.current.forEach(anim => anim.kill());
      animationRefs.current = [];
    };
  }, []);

  // Animate cards on scroll (bidirectional)
  useEffect(() => {
    if (!containerRef.current) return;

    const painCards = painPointRefs.current.filter(card => card !== null);
    const solutionCards = solutionRefs.current.filter(card => card !== null);

    // Set initial state for all cards
    gsap.set(painCards, { x: -100, opacity: 0 });
    gsap.set(solutionCards, { x: 100, opacity: 0 });

    // Create timeline with ScrollTrigger using scrub for bidirectional animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      },
    });

    // Add animations to timeline
    tl.to(painCards, {
      x: 0,
      opacity: 1,
      stagger: 0.12,
      ease: "none",
    }, 0)
    .to(solutionCards, {
      x: 0,
      opacity: 1,
      stagger: 0.12,
      ease: "none",
    }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="how-we-solve">
      <div className="container mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 pt-16">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div ref={containerRef} className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-center justify-center w-full mx-auto relative">
          {/* Left Column - Pain Points */}
          <div className="space-y-4 w-64 relative z-20">
            <h3 className="text-2xl font-bold text-primary mb-6">
              Pain Points
            </h3>
            {painPoints.map((pain, index) => {
              const painPoint: PainPoint =
                typeof pain === "object" && "id" in pain
                  ? (pain as PainPoint)
                  : { id: index + 1, ...(pain as Omit<PainPoint, "id">) };
              return (
              <div
                key={painPoint.id}
                ref={(el) => { painPointRefs.current[index] = el; }}
                className={`p-4 rounded-xl border border-border transition-all duration-500 relative group ${painPoint.color}`}
                id={`pain-point-${painPoint.id}`}
              >
                <div className="space-y-1">
                  <h4 className={`font-semibold text-foreground`}>
                    {painPoint.title}
                  </h4>
                </div>
                {/* Connection point indicator - Hidden */}
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3  rounded-full opacity-0"></div>
              </div>
            );
            })}
          </div>

          {/* Center Box - Video */}
          <div className="relative flex-shrink-0 w-lg">
            <div className="relative bg-muted rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-video z-20">
                <video
                  className="w-full h-full object-cover"
                  muted
                  autoPlay
                  loop
                  playsInline
                  controls
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            {/* Video connection points */}
            <div ref={videoLeftRef} className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3  rounded-full opacity-60"></div>
            <div ref={videoRightRef} className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3  rounded-full opacity-60"></div>
          </div>

          {/* Right Column - Solutions */}
          <div className="space-y-4 w-64 relative z-20">
            <h3 className="text-2xl font-bold text-primary mb-6 whitespace-nowrap">How Cloud Victor Solve It</h3>
            {solutions.map((solution, index) => {
              const solutionItem: Solution =
                typeof solution === "object" && "id" in solution
                  ? (solution as Solution)
                  : { id: index + 1, ...(solution as Omit<Solution, "id">) };
              return (
              <div
                key={solutionItem.id}
                ref={(el) => { solutionRefs.current[index] = el; }}
                className={`p-4 rounded-xl border border-border transition-all duration-500 relative group ${solutionItem.color}`}
                id={`solution-${solutionItem.id}`}
              >
                <div className="space-y-1">
                  <h4 className={`font-semibold text-foreground`}>
                    {solutionItem.title}
                  </h4>
                </div>
                {/* Connection point indicator - Hidden */}
                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3  rounded-full opacity-0"></div>
              </div>
            );
            })}
          </div>

          {/* Dynamic SVG Lines - Hidden on mobile, visible on desktop */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
            viewBox="0 0 1000 400"
            preserveAspectRatio="none"
          >
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="painGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff9900" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ff9900" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="solutionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff9900" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ff9900" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
