"use client";

export default function AboutHeroSection() {
  return (
    <div className="relative min-h-[80vh] flex items-center bg-background justify-center overflow-hidden">
      {/* Dark Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-950 to-black" />
      
      {/* Wavy Lines Pattern Overlay */}
      <div className="absolute inset-0 opacity-40">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dense wavy lines pattern - more lines for richer effect */}
          {Array.from({ length: 25 }).map((_, i) => {
            const y = 50 + i * 30;
            const amplitude = 30 + Math.sin(i) * 20;
            const frequency = 200 + Math.cos(i) * 100;
            return (
              <path
                key={`wave-${i}`}
                d={`M0,${y} Q${frequency},${y - amplitude} ${frequency * 2},${y} T1200,${y}`}
                stroke="#60a5fa"
                strokeWidth="1.5"
                fill="none"
                opacity={0.4 + (Math.sin(i) * 0.2)}
              />
            );
          })}
          {/* Additional intersecting waves for more complexity */}
          {Array.from({ length: 15 }).map((_, i) => {
            const y = 100 + i * 40;
            const amplitude = 25 + Math.cos(i * 0.5) * 15;
            const frequency = 150 + Math.sin(i) * 80;
            return (
              <path
                key={`wave-alt-${i}`}
                d={`M0,${y} Q${frequency},${y + amplitude} ${frequency * 2},${y} T1200,${y}`}
                stroke="#93c5fd"
                strokeWidth="1"
                fill="none"
                opacity={0.3 + (Math.cos(i) * 0.15)}
              />
            );
          })}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Mission Section */}
          <div className="pt-10 space-y-6">
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8">
              Our Mission
            </h2>
            <p className="text-lg lg:text-xl text-white leading-relaxed max-w-3xl mx-auto">
              To empower teams with automated solutions for their most common cloud challenges - Cost, Security, Performance, Disaster Recovery, Operations, giving them the freedom & time to focus on their customer experience & growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

