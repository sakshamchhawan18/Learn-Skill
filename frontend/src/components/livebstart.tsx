"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/moving-border";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Livebstart() {
        const router = useRouter();
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          console.log("Form submitted");
          router.push('/inddex.js');
        };
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Live Classes <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Have a look
              </span><br />
              <span className="text-2xl md:text-[2rem] font-bold mt-1 leading-none">
                Scroll down to Join or Start a meeting
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/images/ui.jpg`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
      <div className="flex w-full items-center align-middle h-[6\rem] md:h-[8rem]  justify-center relative p-2 md:p-20">
      <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 flex-1"
      >
        Start a meeting
      </Button>
      <form className="my-8" onSubmit={handleSubmit}>
      <LabelInputContainer className="">
            <Input id="firstname" placeholder="Enter meeting id" type="text" />
          </LabelInputContainer>

      <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 flex-2"
      > Join
      </Button>
      </form>
      </div>
    </div>
  );
}
const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-[10rem]", className)}>
        {children}
      </div>
    );
  };
  
