"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";

export function WobbleCardDemo() {
  return (
    <div className=" w-full ">
      <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Why choose us 
        </h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-7xl mx-auto w-full h-[700px] mb-4">
      <WobbleCard
        containerClassName="col-span-2 lg:col-span-2 bg-pink-800 max-h-200px lg:max-h-200px"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Dive into Live Classes
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Interact with industry experts in real-time. Ask questions,
            participate in discussions, and get personalized feedback to
            solidify your understanding.
          </p>
        </div>
        <Image
          src="/images/live.png"
          width={400}
          height={400}
          alt="linear demo image"
          className="absolute -right-1 lg:-right-[2%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[240px]">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Solidify Your Learning with Course Notes
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          Enhance your learning experience with downloadable course notes. These
          comprehensive resources provide a valuable reference guide for future
          use.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[400px] lg:min-h-[480px] xl:min-h-[240px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Master at Your Pace with Recorded Classes
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Learn on your schedule with a vast library of pre-recorded courses.
            Pause, rewind, and revisit key concepts as needed.
          </p>
        </div>
        <Image
          src="/images/recorded.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[-10%] -bottom-16 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
    </div>
  );
}
