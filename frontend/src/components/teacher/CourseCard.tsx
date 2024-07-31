import React from 'react'
import { Button } from '@/components/ui/button'

export default function CourseCard({ course, onAddVideo }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{course.description}</p>
      <p className="text-sm mb-2">Videos: {course.videos.length}</p>
      <ul className="list-disc list-inside mb-4">
        {course.videos.map((video, index) => (
          <li key={index} className="text-sm">{video.title}</li>
        ))}
      </ul>
      <Button onClick={() => onAddVideo(course.id)}>Add Video</Button>
    </div>
  )
}