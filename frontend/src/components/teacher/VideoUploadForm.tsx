import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function VideoUploadForm({ courseId, onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(courseId, { title, videoUrl })
    setTitle('')
    setVideoUrl('')
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Add Video to Course</h3>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Video Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
          Video URL
        </label>
        <input
          type="url"
          id="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
          className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" onClick={onCancel} variant="outline">Cancel</Button>
        <Button type="submit">Add Video</Button>
      </div>
    </form>
  )
}