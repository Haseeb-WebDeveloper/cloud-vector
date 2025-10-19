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

const painPoints: PainPoint[] = [
  {
    id: 1,
    title: "Data Silos",
    description: "Critical information trapped in isolated systems",
    color: "bg-[#00171F]",
  },
  {
    id: 2,
    title: "Manual Processes",
    description: "Time-consuming repetitive tasks slowing down operations",
    color: "bg-[#0C1713]",
  },
  {
    id: 3,
    title: "Scalability Issues",
    description: "Systems struggling to handle growing demands",
    color: "bg-[#2E0E02]",
  },
  {
    id: 4,
    title: "Security Vulnerabilities",
    description: "Outdated security measures exposing critical data",
    color: "bg-[#0A2342]",
  },
  {
    id: 5,
    title: "Integration Complexity",
    description: "Difficult to connect and synchronize different platforms",
    color: "bg-[#2E2836]",
  },
];

const solutions: Solution[] = [
  {
    id: 1,
    title: "Unified Data Platform",
    description: "Centralized data management with real-time synchronization",
    color: "bg-[#00171F]",
  },
  {
    id: 2,
    title: "Automated Workflows",
    description: "AI-powered automation reducing manual effort by 80%",
    color: "bg-[#0C1713]",
  },
  {
    id: 3,
    title: "Cloud-Native Architecture",
    description: "Elastic scaling that grows with your business needs",
    color: "bg-[#2E0E02]",
  },
  {
    id: 4,
    title: "Advanced Security Suite",
    description: "Multi-layered protection with continuous monitoring",
    color: "bg-[#0A2342]",
  },
  {
    id: 5,
    title: "Seamless Integration Hub",
    description: "One-click connections between all your business tools",
    color: "bg-[#2E2836]",
  },
];

// Function to calculate position on quadratic Bézier curve
const getQuadraticBezierPoint = (t: number, startX: number, startY: number, controlX: number, controlY: number, endX: number, endY: number) => {
  const x = Math.pow(1 - t, 2) * startX + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * endX;
  const y = Math.pow(1 - t, 2) * startY + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * endY;
  return { x, y };
};

export default function HowWeSolve() {
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

  // Animate cards on scroll
  useEffect(() => {
    if (!containerRef.current) return;

    const painCards = painPointRefs.current.filter(card => card !== null);
    const solutionCards = solutionRefs.current.filter(card => card !== null);

    // Set initial state for all cards
    gsap.set(painCards, { x: -100, opacity: 0 });
    gsap.set(solutionCards, { x: 100, opacity: 0 });

    // Create timeline with ScrollTrigger - animation plays independently once triggered
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out" }
    });

    // Add animations to timeline
    tl.to(painCards, {
      x: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.12,
    }, 0)
    .to(solutionCards, {
      x: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.12,
    }, 0);

    // Create ScrollTrigger that just plays the timeline once
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      onEnter: () => tl.play(),
      once: true,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="how-we-solve" className="pb-20">
      <div className="container mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How We Solve Your
            <span className="text-primary"> Challenges</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch how we transform your pain points into powerful solutions
            through our innovative approach
          </p>
        </div>

        <div ref={containerRef} className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-center justify-center w-full mx-auto relative">
          {/* Left Column - Pain Points */}
          <div className="space-y-4 w-64 relative z-20">
            <h3 className="text-2xl font-bold text-primary mb-6">
              Pain Points
            </h3>
            {painPoints.map((pain, index) => (
              <div
                key={pain.id}
                ref={(el) => { painPointRefs.current[index] = el; }}
                className={`p-4 rounded-xl border border-border transition-all duration-500 relative group ${pain.color}`}
                id={`pain-point-${pain.id}`}
              >
                <div className="space-y-1">
                  <h4 className={`font-semibold text-foreground`}>
                    {pain.title}
                  </h4>
                  <p className={`text-xs text-muted-foreground`}>
                    {pain.description}
                  </p>
                </div>
                {/* Connection point indicator - Hidden */}
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3  rounded-full opacity-0"></div>
              </div>
            ))}
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
                  <source src="/videos/root-case.mp4" type="video/mp4" />
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
            <h3 className="text-2xl font-bold text-primary mb-6">Solutions</h3>
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                ref={(el) => { solutionRefs.current[index] = el; }}
                className={`p-4 rounded-xl border border-border transition-all duration-500 relative group ${solution.color}`}
                id={`solution-${solution.id}`}
              >
                <div className="space-y-1">
                  <h4 className={`font-semibold text-foreground`}>
                    {solution.title}
                  </h4>
                  <p className={`text-xs text-muted-foreground`}>
                    {solution.description}
                  </p>
                </div>
                {/* Connection point indicator - Hidden */}
                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3  rounded-full opacity-0"></div>
              </div>
            ))}
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
