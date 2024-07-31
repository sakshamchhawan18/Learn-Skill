import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function CourseForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ id: Date.now(), title, description })
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Create New Course</h3>
      <div className="mb-4">
        <label htmlFor="title" className="block  text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" onClick={onCancel} variant="outline">Cancel</Button>
        <Button type="submit">Create Course</Button>
      </div>
    </form>
  )
}