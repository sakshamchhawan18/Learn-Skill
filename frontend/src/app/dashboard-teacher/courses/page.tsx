"use client";
import CourseCard from '@/components/teacher/CourseCard';
import CourseForm from '@/components/teacher/CourseForm';
import VideoUploadForm from '@/components/teacher/VideoUploadForm';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebase';
import { User } from 'firebase/auth';

interface Video {
  title: string;
}
interface Course {
  id: string;
  title: string;
  description: string;
  userId: string;
  videos: string[];  // Assuming videos is an array of video IDs (or other relevant data)
}

export default function ProjectsPage() {
  const [courses, setCourses] = useState<Course[]>([]);  // Explicitly type courses as an array of Course objects
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);  // Course or null for selected course
  const [userId, setUserId] = useState<string | null>(null);  // Type the userId as string | null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        fetchCourses(user.uid);
      } else {
        setUserId(null);
        setCourses([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCourses = async (uid: string) => {
    try {
      const q = query(collection(db, "courses"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const fetchedCourses: Course[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "Untitled Course",  // Ensure title is present
          description: data.description || "No description available",  // Default if missing
          userId: data.userId || uid,  // Default to uid if missing
          videos: data.videos || [],  // Default to an empty array for videos
        };
      });
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (newCourse: Omit<Course, 'id'>) => {
    if (!userId) return;

    try {
      const docRef = await addDoc(collection(db, "courses"), {
        ...newCourse,
        userId: userId,
        videos: [],
      });
      const courseWithId = { id: docRef.id, ...newCourse, videos: [] };
      setCourses([...courses, courseWithId]);
      setShowCourseForm(false);
    } catch (error) {
      console.error("Error adding course: ", error);
    }
  };

  const handleAddVideo = async (courseId: string, newVideo: string) => {
    if (!userId) return;

    try {
      const courseRef = doc(db, "courses", courseId);
      const updatedCourse = courses.find((course) => course.id === courseId);
      if (updatedCourse) {
        const updatedVideos = [...updatedCourse.videos, newVideo];

        await updateDoc(courseRef, {
          videos: updatedVideos,
        });

        setCourses(
          courses.map((course) =>
            course.id === courseId
              ? { ...course, videos: updatedVideos }
              : course
          )
        );
      }
      setSelectedCourse(null);
    } catch (error) {
      console.error("Error adding video: ", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[90vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-4 p-6 min-h-[90vh] w-full">
      <h1 className="text-3xl font-bold">My Courses</h1>

      {courses.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no courses yet
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Create a course to get started
            </p>
            <Button onClick={() => setShowCourseForm(true)}>Create Course</Button>
          </div>
        </div>
      ) : (
        <>
          <Button onClick={() => setShowCourseForm(true)}>Add New Course</Button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onAddVideo={() => setSelectedCourse(course)}
              />
            ))}
          </div>
        </>
      )}

      {showCourseForm && (
        <CourseForm onSubmit={handleAddCourse} onCancel={() => setShowCourseForm(false)} />
      )}

      {selectedCourse && (
        <VideoUploadForm
          courseId={selectedCourse.id}
          onSubmit={handleAddVideo}
          onCancel={() => setSelectedCourse(null)}
        />
      )}
    </main>
  );
}
