export default function CenterTextBlock({ value }: any) {
  return (
    <div className="flex flex-col items-center justify-center md:max-w-[70vw] mx-auto">
      <p
        className={`text-[4.5vw] md:text-[1.3vw] leading-[170%] md:mb-[1vw] mb-[4vw] text-center ${value.isItalic ? "italic" : ""}`}
      >
        {value.text}
      </p>
    </div>
  );
}
