"use client";

import Image from "next/image";

export default function AwsPartnerSection() {
  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto lg:px-8">
        {/* Logos at the Top */}
        <div className="flex justify-center items-center mb-10">
          <div className="relative h-20 w-64 md:h-32 md:w-80">
            <Image
              src="/partner-images-about-hero/Aws-Partner-Logo-Vector.svg-.png"
              alt="AWS Partner Logo"
              fill
              className="object-contain"
            />
          </div>
          {/* Remove all gaps, big negative margin to make logos touch, on mobile too */}
          <div className="relative h-20 w-64 md:h-32 md:w-80 -ml-8 md:-ml-16">
            <Image
              src="/partner-images-about-hero/CloudVictor Logo-03 (4).png"
              alt="CloudVictor Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
        {/* Centered Heading + Subheading Below Logos */}
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
            <span className="text-primary">Built on AWS, </span>
            <span className="text-neutral-400">Exclusively </span>
            <span className="text-primary">for AWS</span>
          </h2>
          <p className="text-base lg:text-lg text-foreground/90 leading-relaxed max-w-xl mx-auto">
            CloudVictor is a recognized AWS Partner, built to help businesses get more
            from their AWS investments. With deep roots inside AWS, we specialize in
            cost optimization, achieving &amp; maintaining compliance, and cloud
            efficiency, delivering results through AWS-native best practices and tools.
          </p>
        </div>
      </div>
    </section>
  );
}
