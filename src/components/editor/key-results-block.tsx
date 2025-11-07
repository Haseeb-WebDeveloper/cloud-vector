import React from "react";

interface KeyResultsProps {
  value: {
    items?: string[];
  };
}

export default function KeyResultsBlock({ value }: KeyResultsProps) {
  const items = Array.isArray(value?.items) ? value.items.filter(Boolean) : [];
  if (items.length === 0) return null;

  // Split into two columns by alternating index
  const left: string[] = [];
  const right: string[] = [];
  items.forEach((item, idx) => {
    (idx % 2 === 0 ? left : right).push(item);
  });

  return (
    <section className="editor-content w-full rounded-3xl border border-foreground/20 bg-secondary/10 p-6 md:p-[2vw]">
      <h3 className="text-center text-foreground font-semibold text-[6vw] md:text-[2vw] mb-6 md:mb-[1.6vw]">
        Key Results
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[2vw]">
        <ul className="list-disc pl-6 space-y-3 md:space-y-[0.8vw]">
          {left.map((point, i) => (
            <li key={`l-${i}`} className="text-[4.5vw] md:text-[1.3vw] leading-[170%]">
              {point}
            </li>
          ))}
        </ul>
        <ul className="list-disc pl-6 space-y-3 md:space-y-[0.8vw]">
          {right.map((point, i) => (
            <li key={`r-${i}`} className="text-[4.5vw] md:text-[1.3vw] leading-[170%]">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


