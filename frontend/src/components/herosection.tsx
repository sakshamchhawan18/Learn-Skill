"use client "
import React from 'react'
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import Image from 'next/image'
//import {Educate} from '@/utils/images/educate.jpg'


function herosection() {
    const words = [
        {
          text: "Learn",
          className: "text-blue-500 dark:text-orange-500",
        },
        {
          text: "Skill.",
          className: "text-blue-500 dark:text-orange-500",
        },
      ];
  
      
  return (
    <div className='flex'>
    <div className='h-[30rem] w-1/2 bg-gray-50 px-3 flex-1'>
       <div className="flex flex-col items-left justify-center h-[20rem]  ">
      <TypewriterEffectSmooth words={words} />
      <div className=" w-1/2 flex  md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 ">
        <div className='flex-1'>
      <h2>
            <p className=" text-black dark:text-black-200 text-xl sm:text-base  ">
            Welcome to Learn Skills, your one-stop platform for mastering in-demand skills and igniting your personal and professional growth! We offer a comprehensive learning experience with a variety of engaging formats to cater to your learning style.
            </p>
        </h2>
        </div>
        
      </div>
      <div className="flex flex-col mt-4  md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
      <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
      </div>
    </div>
        
        
    </div>
    <div className="flex-2 w-1/2 h-[30rem] bg-white">
        <Image src={"/images/educate.png"} height={500} width={700} alt='Fuck off' />
    </div>
    </div>
  )
}

export default herosection