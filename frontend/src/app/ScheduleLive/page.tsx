"use client"
import RoleSelection from "@/components/role-selection";
import { ScheduleLive } from "@/components/teacher/ScheduleLive";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  
  return (
    <main className="flex flex-col items-center justify-between">
     <ScheduleLive />
    </main>
  );
}
