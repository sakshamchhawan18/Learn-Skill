"use client"
import TeachersCard from '@/components/student/TeachersCard';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

export default function ProjectsPage() {
  const [enrolledTeachers, setEnrolledTeachers] = useState([]);

  return (
    <main className="flex flex-col gap-2 lg:gap-2 min-h-[90vh] w-full">
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center text-center">
          
          <TeachersCard />
        </div>
      </div>
    </main>
  );
}
