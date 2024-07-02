import { ScheduleLive } from '@/components/teacher/ScheduleLive'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function ProjectsPage() {
  return (
    <main className="flex flex-col gap-2 lg:gap-2 min-h-[90vh] w-full">
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center text-center">
        <button  className="p-[3px] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Schedule Live Class
        </div>
        </button>
        </div>
      </div>
    </main>)
}


