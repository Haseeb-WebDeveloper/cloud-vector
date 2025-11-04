import Image from "next/image";
import React from "react";

interface InfoBoxItem {
  icon?: {
    asset?: {
      url: string;
    };
  };
  text?: string;
}

interface InfoBoxesBlockProps {
  value: {
    items?: InfoBoxItem[];
  };
}

export default function InfoBoxesBlock({ value }: InfoBoxesBlockProps) {
  const items: InfoBoxItem[] = Array.isArray(value?.items) ? value.items : [];

  if (!items.length) return null;

  return (
    <div className="editor-content grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-[1.2vw] w-full my-6 md:my-[2vw]">
      {items.map((item, index) => (
        <div
          key={index}
          className="w-full h-full rounded-2xl border border-foreground/15 bg-secondary/10 p-5 md:p-[1.2vw] flex flex-col items-center text-center gap-3 md:gap-[0.6vw]"
        >
          {item.icon?.asset?.url && (
            <div className="w-12 h-12 md:w-[3vw] md:h-[3vw] rounded-lg overflow-hidden bg-background/60 flex items-center justify-center">
              <Image
                src={item.icon.asset.url}
                alt="Icon"
                width={64}
                height={64}
                className="w-8 h-8 md:w-[2vw] md:h-[2vw] object-contain"
              />
            </div>
          )}
          {item.text && (
            <p className="text-[5vw] md:text-[1.2vw] leading-[160%] font-light text-foreground/90">
              {item.text}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}


