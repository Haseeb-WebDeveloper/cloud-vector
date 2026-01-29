"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  designation: string;
  image: string;
  linkedin: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Prateek Gupta",
    designation: "Founder",
    image: "/team-pics/1 Prateek .png",
    linkedin: "https://s.cloudvictor.com/LI-web-as",
  },
  {
    name: "Aditi Shrivastava",
    designation: "VP of Customer Success",
    image: "/team-pics/2 Aditi.png",
    linkedin: "https://www.linkedin.com/in/aditi-shrivastava-b84296347/",
  },
  {
    name: "Raj Mishra",
    designation: "Solution Architect",
    image: "/team-pics/3 Raj.png",
    linkedin: "http://www.linkedin.com/in/rajcloudvictor",
  },
  {
    name: "Shubham Kumar",
    designation: "Lead Engineer",
    image: "/team-pics/4 Shubham.png",
    linkedin: "https://www.linkedin.com/in/shubhamkumar8032/",
  },
  {
    name: "Divyanshu Vashisht",
    designation: "Solution Architect / Software Engineer",
    image: "/team-pics/5 Divyanshu.png",
    linkedin: "https://www.linkedin.com/in/divyanshu-v-251b3b204/",
  },
  {
    name: "Amisha Singh",
    designation: "Customer Success Executive",
    image: "/team-pics/6 Amisha.png",
    linkedin: "https://www.linkedin.com/in/amisha-singh25",
  },
  {
    name: "Pratham Sinha",
    designation: "Data Analyst",
    image: "/team-pics/7 Pratham.png",
    linkedin: "https://www.linkedin.com/in/pratham-sinha-57b09b192/",
  },
  {
    name: "Ayush Kumar Rai",
    designation: "Software Development Engineer",
    image: "/team-pics/8 Ayush.png",
    linkedin: "https://www.linkedin.com/in/adeptly-ayush/",
  },
  {
    name: "Bhudev Prasad Dhal",
    designation: "Software Development Engineer",
    image: "/team-pics/9 Bhudev.png",
    linkedin: "https://www.linkedin.com/in/bhudev-prasad-dhal/",
  },
];

export default function TeamGridSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          The Team That Makes It Happen
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="text-sm md:text-base text-foreground/70 mb-4">
                {member.designation}
              </p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
                aria-label={`${member.name} LinkedIn profile`}
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

