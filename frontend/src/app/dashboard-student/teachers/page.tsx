import TeachersCard from '@/components/student/TeachersCard'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function ProjectsPage() {
  return (
    <main className="flex flex-col gap-2 lg:gap-2 min-h-[90vh] w-full">
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have not enrolled to any teacher yet!
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Courses will show when you start using Learn Skill
          </p>
          <TeachersCard teacherName="John Doe" />
          <Button>Button</Button>
        </div>
      </div>
    </main>)
}
