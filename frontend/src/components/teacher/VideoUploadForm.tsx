import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { app } from "@/firebase/firebase";

const db = getFirestore(app);

interface Video {
  title: string;
  videoUrl: string;
}

interface VideoUploadFormProps {
  courseId: string;
  onCancel: () => void;
  onVideoAdded?: () => void;
}

export default function VideoUploadForm({ courseId, onCancel, onVideoAdded }: VideoUploadFormProps) {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Validate inputs
      if (!title.trim()) {
        throw new Error("Video title cannot be empty");
      }

      if (!videoUrl.trim()) {
        throw new Error("Video URL cannot be empty");
      }

      // Reference the document for the specific course
      const courseDocRef = doc(db, "courses", courseId);

      // Update the "videos" array in Firestore
      await updateDoc(courseDocRef, {
        videos: arrayUnion({ title: title.trim(), videoUrl: videoUrl.trim() }),
      });

      // Reset form fields and call callback
      setTitle("");
      setVideoUrl("");
      onVideoAdded?.();

      console.log("Video added successfully!");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
      console.error("Error adding video:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Add Video to Course</h3>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}
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
          className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
        <Button type="button" onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button type="submit">Add Video</Button>
      </div>
    </form>
  );
}
