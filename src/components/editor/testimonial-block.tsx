import Image from "next/image";
import React from "react";

interface TestimonialValue {
  text: string;
  personName: string;
  designation?: string;
  company?: string;
  photo?: { asset?: { url: string } };
}

interface TestimonialBlockProps {
  value: TestimonialValue;
}

export default function TestimonialBlock({ value }: TestimonialBlockProps) {
  if (!value) return null;

  const { text, personName, designation, company, photo } = value;

  return (
    <div className="editor-content w-full rounded-3xl border border-foreground/20 bg-secondary/10 p-6 md:p-[2vw] my-10" style={{marginTop: 40, marginBottom: 40}}>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-[2vw]">
        {/* Left: text */}
        <div className="flex-1">
          {text && (
            <p className="text-foreground/90 text-[4.5vw] md:text-[1.3vw] leading-[170%]">
              
              "{text}"
            </p>
          )}
          <div className="mt-6 md:mt-[1.2vw]">
            <p className="text-foreground font-medium text-[4.5vw] md:text-[1.3vw]">
              {personName}
            </p>
            {(designation || company) && (
              <p className="text-foreground/80 text-[4.5vw] md:text-[1.3vw]">
                {[designation, company].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
        </div>

        {/* Right: avatar */}
        {photo?.asset?.url && (
          <div className="shrink-0 w-28 h-28 md:w-[10vw] md:h-[10vw] rounded-full overflow-hidden border border-foreground/20 bg-background/40 self-center md:self-auto">
            <Image
              src={photo.asset.url}
              alt={personName || "Testimonial"}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}


