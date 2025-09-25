"use client";

import Image from "next/image";
import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
  MarqueeFade,
} from "@/components/ui/marquee";

const partnerLogos = [
  { name: "Mayo Clinic", src: "/clients/1.png", alt: "Mayo Clinic" },
  { name: "Cisco", src: "/clients/2.png", alt: "Cisco" },
  { name: "TIME", src: "/clients/3.png", alt: "TIME" },
  { name: "DLA Piper", src: "/clients/4.png", alt: "DLA Piper" },
  {
    name: "Global Atlantic",
    src: "/clients/5.png",
    alt: "Global Atlantic",
  },
  { name: "Howard Hughes", src: "/clients/6.png", alt: "Howard Hughes" },
  { name: "Cengage", src: "/clients/7.png", alt: "Cengage" },
];

export default function ClientSectionV2() {
  return (
    <div className="py-20 mb-32 ">
      <div className=" bg-[#252f3e] rounded-2xl container mx-auto px-4 py-24 ">
        {/* Main Text */}
        <div className="text-center pb-12">
          <h2 className="text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Proven Savings. Real Impact
          </h2>
        </div>

        {/* Micro-Metrics */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-4 justify-center items-center">
          <p className="text-lg font-medium border-b-2 border-primary">
            <span className="font-bold text-3xl text-primary">12+</span> Years in Amazon/AWS
          </p>
          <p className="text-lg font-medium border-b-2 border-primary">
            <span className="font-bold text-3xl text-primary">$60M+</span> Annual Savings
          </p>
          <p className="text-lg font-medium border-b-2 border-primary">
            Up to <span className="font-bold text-3xl text-primary">68%</span> Annual Savings
          </p>
        </div>

        {/* Partner Logos Marquee */}
        <div className="relative">
          <Marquee className="pt-8">
            <MarqueeContent
              speed={60}
              pauseOnHover={true}
              loop={0}
              autoFill={true}
            >
              {partnerLogos.map((logo, index) => (
                <MarqueeItem key={index} className="mx-8">
                  <div className="flex items-center justify-center w-32 h-16 lg:w-40 lg:h-20">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={300}
                      height={150}
                      className="w-full h-full object-contain transition-opacity duration-300"
                    />
                  </div>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>

          {/* Fade edges */}
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
        </div>
      </div>
    </div>
  );
}
