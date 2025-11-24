import VideoAnimation from "../ui/video-animation";

interface RootCaseSectionProps {
  title?: string;
  videoUrl?: string;
}

export const RootCaseSection = ({
  title = "Under The Hood of Every Bloated AWS Bill",
  videoUrl,
}: RootCaseSectionProps) => {
  return (
    <section className="">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl text-center font-semibold bg-gradient-to-r from-primary via-primary/90 via-60% to-white bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      <VideoAnimation videoUrl={videoUrl} />
    </section>
  );
};
