"use client";

import Image from "next/image";
import { Search } from "lucide-react";

const VideoIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="6"
      width="14"
      height="12"
      rx="2"
      stroke="black"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M16 10L20 7V17L16 14"
      stroke="black"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
      fill="black"
    />
  </svg>
);

interface CaseStudyHeroSectionProps {
  mainHeading?: string;
  subheading?: string;
  heroImage?: string;
  ctaButtons?: Array<{
    label: string;
    url: string;
    openInNewTab?: boolean;
  }>;
}

export default function CaseStudyHeroSection({
  mainHeading = '<span class="text-primary">CloudVictor</span> <br /> Knowledge Hub',
  subheading = "Guides, Playbooks and Real-world Outcomes for your team",
  heroImage = "/hero-images/case-study.png",
  ctaButtons = [
    {
      label: "Book a call",
      url: "https://s.cloudvictor.com/meeting-web-cto-1",
      openInNewTab: true,
    },
    {
      label: "WhatsApp us",
      url: "https://s.cloudvictor.com/whatsapp-web-cto-1",
      openInNewTab: true,
    },
    {
      label: "Signup",
      url: "http://app.cloudvictor.com/",
      openInNewTab: true,
    },
  ],
}: CaseStudyHeroSectionProps) {
  const getIcon = (label: string) => {
    if (label.toLowerCase().includes("call")) return <VideoIcon />;
    if (label.toLowerCase().includes("whatsapp")) return <WhatsAppIcon />;
    if (label.toLowerCase().includes("signup"))
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
            stroke="black"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="9"
            cy="7"
            r="4"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M22 21v-2a4 4 0 0 0-3-3.87"
            stroke="black"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 11.13a4 4 0 0 1 0 7.75"
            stroke="black"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    return null;
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden w-full pt-20">
      <Image
        src={heroImage}
        alt="Case Study Background"
        fill
        priority
        className="object-cover object-center -z-20"
      />
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60 -z-10" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full flex flex-col items-center justify-center">
        <div className="max-w-4xl flex flex-col items-center text-center space-y-10 w-full">
          <div className="space-y-6">
            <h1
              className="text-5xl lg:text-7xl font-bold text-white leading-tight"
              dangerouslySetInnerHTML={{ __html: mainHeading }}
            />
            <p className="text-2xl lg:text-3xl font-medium text-yellow-400">
              {subheading}
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-xl">
            <div className="flex items-center bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-6 py-4 w-full focus-within:ring-2 focus-within:ring-primary/50 transition-all">
              <Search size={24} className="mr-4 text-white/70" />
              <input
                type="text"
                placeholder="Search by anything"
                className="w-full bg-transparent text-white placeholder:font-light placeholder-white/50 outline-none text-lg font-light"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-2">
            {ctaButtons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.url}
                target={btn.openInNewTab ? "_blank" : "_self"}
                rel={btn.openInNewTab ? "noopener noreferrer" : undefined}
                className="group cursor-pointer flex items-center gap-3 px-8 py-4 rounded-full border-none shadow-none text-white bg-gradient-to-r from-[#FF9900] to-[#E85409] hover:from-[#FFB84D] hover:to-[#FF9900] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,153,0,0.5)] transform hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-inner">
                  {getIcon(btn.label)}
                </div>
                <span className="font-semibold text-lg">{btn.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
