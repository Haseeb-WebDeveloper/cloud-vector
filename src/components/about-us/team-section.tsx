"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  designation: string;
  image: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Harsh Vardhan Sharma",
    designation: "Chief Technical Officer",
    image: "/testimonials/Harsh-Vardhan-Sharma.png",
    linkedin: "https://www.linkedin.com/in/harshvardhansharma",
  },
  {
    name: "Chirag Gupta",
    designation: "Chief Technical Officer",
    image: "/testimonials/Chirag-Gupta.png",
    linkedin: "https://www.linkedin.com/in/chirag-gupta",
  },
  {
    name: "Ishan Mohammed",
    designation: "Founder & CEO",
    image: "/testimonials/Ishan-Mohammed.png",
    linkedin: "https://www.linkedin.com/in/ishan-mohammed",
  },
  {
    name: "Paresh Deshmukh",
    designation: "Founder & CEO",
    image: "/testimonials/Paresh-Deshmukh.png",
    linkedin: "https://www.linkedin.com/in/paresh-deshmukh",
  },
  {
    name: "Sreepad Krishnan Mavila",
    designation: "Cofounder",
    image: "/testimonials/Sreepad-Krishnan-Mavila.png",
    linkedin: "https://www.linkedin.com/in/sreepad-krishnan-mavila",
  },
  {
    name: "Pramin Pradeep",
    designation: "Co-founder & CEO",
    image: "/testimonials/Pramin-Pradeep.png",
    linkedin: "https://www.linkedin.com/in/pramin-pradeep",
  },
];

function TeamSection() {
  // Only show the first three team members for a single row.
  const displayedMembers = teamMembers.slice(0, 3);

  return ( 
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The amazing People Behind Cloud Victor
          </h2>
          <p className="text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Meet the talented team of Developers, Marketers and analyst that make acing your cloud possible
          </p>
        </div>

        {/* Team Members Grid: only 1 row, 3 people */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {displayedMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-2xl p-6 lg:p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative w-full aspect-square max-w-[280px] mx-auto mb-6 rounded-2xl overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Name */}
              <h3 className="text-xl lg:text-2xl font-bold text-foreground text-center mb-2">
                {member.name}
              </h3>

              {/* Designation */}
              <p className="text-base lg:text-lg text-foreground/70 text-center mb-4">
                {member.designation}
              </p>

              {/* LinkedIn Link */}
              {member.linkedin && (
                <div className="flex justify-center">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors duration-300"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default TeamSection;
