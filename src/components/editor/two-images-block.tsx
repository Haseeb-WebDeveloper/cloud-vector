import Image from "next/image";
import React from "react";

interface TwoImagesBlockProps {
  value: {
    images?: Array<{
      asset?: {
        url: string;
      };
    }>;
  };
}

export default function TwoImagesBlock({ value }: TwoImagesBlockProps) {
  const images = Array.isArray(value?.images) ? value.images.filter(img => img?.asset?.url) : [];
  
  if (images.length === 0) return null;

  return (
    <div className="editor-content w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[1.5vw] my-6 md:my-[2vw]">
      {images.map((image, index) => (
        <div key={index} className="w-full">
          <Image
            src={image.asset!.url}
            alt={`Image ${index + 1}`}
            width={800}
            height={600}
            className="w-full aspect-video"
          />
        </div>
      ))}
    </div>
  );
}

