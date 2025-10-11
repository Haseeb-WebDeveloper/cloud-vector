import { StatData } from "../animated";
import Image from "next/image";

export default function Stats({ stats }: { stats: StatData[] }) {
  return (
    <section className="z-[-1] relative pb-32 pt-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent  mb-6">
            Results That Speak Volumes
          </h2>
          <p className="text-xl text-gray-300">
            Numbers don't lie — here's the impact we've delivered
          </p>
        </div>
        {/* Stats arranged around center */}
        <div className="relative h-[500px] flex items-center justify-center">
          <div className="flex gap-10 justify-center items-center">
            {/* 2nd half stats */}
            <div className="flex flex-col gap-4">
              {stats.slice(0, 3).map((stat, index) => {
                return (
                  <div
                    key={index}
                    data-stat-id={index}
                    className={`opacity-100 shadow px-4 py-6 rounded-xl border-bl`}
                  >
                    <div className="flex gap-4 items-center">
                      <div className="mb-2 flex-shrink-0">{stat.icon}</div>
                      <div>
                        <p className="text-4xl md:text-5xl font-bold">
                          {stat.value}
                        </p>
                        <p className="text-lg font-medium">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-[400px] h-[400px] ">
              <Image
                src="/home-page/circle.png"
                alt="circle"
                width={320}
                height={320}
                className="object-contain w-full h-full"
                quality={100}
              />
            </div>

            {/* Last half stats */}
            <div className="flex flex-col gap-4">
              {stats.slice(3, 6).map((stat, index) => {
                return (
                  <div
                    key={index}
                    data-stat-id={index}
                    className={`opacity-100 shadow px-4 py-6 rounded-xl`}
                  >
                    <div className="flex gap-4 items-center">
                      <div className="mb-2 flex-shrink-0">{stat.icon}</div>
                      <div>
                        <p className="text-4xl md:text-5xl font-bold">
                          {stat.value}
                        </p>
                        <p className="text-lg font-medium">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Invisible target position marker at center */}
        </div>
      </div>
    </section>
  );
}
