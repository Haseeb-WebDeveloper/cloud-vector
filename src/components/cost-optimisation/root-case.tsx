import VideoAnimation from "../ui/video-animation";

export const RootCaseSection = () => {
  return (
    <section className="">
      <div className="container mx-auto px-4 -pb-24">
        <h2 className="text-4xl lg:text-5xl text-center font-semibold bg-gradient-to-r from-primary via-primary/90 via-60% to-white bg-clip-text text-transparent">
          Under The Hood of Every Bloated AWS Bill
        </h2>
      </div>
      <VideoAnimation />
    </section>
  );
};
