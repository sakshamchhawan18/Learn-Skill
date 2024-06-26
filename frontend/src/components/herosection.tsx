"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';
import Image from 'next/image';

function Herosection() {
  const words = [
    {
      text: "Learn",
      className: "text-white-500 dark:text-white-100",
    },
    {
      text: "Skill.",
      className: "text-white-500 dark:text-white-500",
    },
  ];

  const router = useRouter();

  const handleClick = () => {
    router.push('/join-now');
  };

  return (
    <div className="flex mb-4">
      <div className="h-[30rem] w-1/2 bg-black-50 px-3 flex-1 rounded-tl-lg rounded-bl-lg p-4">
        <div className="flex flex-col items-left justify-center h-[20rem]">
          <TypewriterEffectSmooth words={words} />
          <div className="w-10/12 flex md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <div className="flex-1">
              <h2>
                <p className="text-white dark:text-black-200 text-xl sm:text-base">
                  Welcome to Learn Skills, your one-stop platform for mastering
                  in-demand skills and igniting your personal and professional
                  growth! We offer a comprehensive learning experience with a
                  variety of engaging formats to cater to your learning style.
                </p>
              </h2>
            </div>
          </div>
          <div className="flex flex-col mt-4 md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <button
              className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
              onClick={handleClick}
            >
              Join now
            </button>
            <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
              Newsletter
            </button>
          </div>
        </div>
      </div>
      <div className="flex-2 w-1/2 h-[30rem]  rounded-tr-lg rounded-br-lg">
        <Image
          src={"/images/educate.png"}
          height={300}
          width={500}
          alt="hero"
        />
      </div>
    </div>
  );
}

export default Herosection;
