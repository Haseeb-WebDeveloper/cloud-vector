import VideoAnimation from "../ui/video-animation";

export const RootCaseSection = () => {
  return (
    <section className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl text-center font-light text-foreground">
          Under The Hood of Every Bloated AWS Bill
        </h2>
      </div>
      <VideoAnimation />
    </section>
  );
};
