"use client";

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
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Manual Processes",
    description: "Time-consuming repetitive tasks slowing down operations",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Scalability Issues",
    description: "Systems struggling to handle growing demands",
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Security Vulnerabilities",
    description: "Outdated security measures exposing critical data",
    color: "bg-orange-500",
  },
  {
    id: 5,
    title: "Integration Complexity",
    description: "Difficult to connect and synchronize different platforms",
    color: "bg-pink-500",
  },
];

const solutions: Solution[] = [
  {
    id: 1,
    title: "Unified Data Platform",
    description: "Centralized data management with real-time synchronization",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Automated Workflows",
    description: "AI-powered automation reducing manual effort by 80%",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Cloud-Native Architecture",
    description: "Elastic scaling that grows with your business needs",
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Advanced Security Suite",
    description: "Multi-layered protection with continuous monitoring",
    color: "bg-orange-500",
  },
  {
    id: 5,
    title: "Seamless Integration Hub",
    description: "One-click connections between all your business tools",
    color: "bg-pink-500",
  },
];

export default function HowWeSolve() {
  return (
    <section id="how-we-solve" className="py-20 bg-foreground/[0.02]">
      <div className="container mx-auto px-4">
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

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Left Column - Pain Points */}
          <div className="space-y-4 min-w-72">
            <h3 className="text-2xl font-bold text-primary mb-6">
              Pain Points
            </h3>
            {painPoints.map((pain, index) => (
              <div
                key={pain.id}
                className={`p-4 rounded-xl border border-border bg-gradient-to-br from-primary/10 to-background transition-all duration-500 `}
              >
                <div className="space-y-1">
                    <h4 className={`font-semibold text-foreground`}>{pain.title}</h4>
                    <p className={`text-sm text-muted-foreground`}>{pain.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Box - Video */}
          <div className="relative">
            <div className="relative bg-muted rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-video">
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

          </div>

          {/* Right Column - Solutions */}
          <div className="space-y-4 min-w-72">
            <h3 className="text-2xl font-bold text-primary mb-6">Solutions</h3>
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                className={`p-4 rounded-xl border border-border bg-gradient-to-br from-primary/10 to-background transition-all duration-500 `}
              >
                <div className="space-y-1">
                    <h4 className={`font-semibold text-foreground`}>{solution.title}</h4>
                    <p className={`text-sm text-muted-foreground`}>{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Active Pair Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 bg-muted rounded-full px-6 py-3">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <span className="text-foreground font-medium">
              {painPoints[0].title} → {solutions[0].title}
            </span>
            <div className="w-4 h-4 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
