"use client";
import React, { useState, useEffect } from "react";
import { auth, db } from "@/firebase/firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

export default function ProjectsPage() {
  const [user, setUser] = useState<User | null>(null); // Add state for the current user
  const [enrolledTeachers, setEnrolledTeachers] = useState<string[]>([]);
  const [offlineCourses, setOfflineCourses] = useState<
    { id: string; title: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the state with the current user
      if (currentUser) {
        fetchEnrolledTeachers(currentUser.uid);
      } else {
        setLoading(false);
        setError("Please log in to view your courses.");
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchEnrolledTeachers = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.userType === "student" && userData.enrolledUnder) {
          setEnrolledTeachers(userData.enrolledUnder as string[]);
          await fetchOfflineCourses(userData.enrolledUnder);
        } else {
          setError("No enrolled courses found for this student.");
        }
      } else {
        setError("User data not found.");
      }
    } catch (error) {
      console.error("Error fetching enrolled teachers:", error);
      setError("Failed to fetch enrolled teachers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOfflineCourses = async (teacherIds: string[]) => {
    try {
      const q = query(collection(db, "courses"), where("userId", "in", teacherIds));
      const querySnapshot = await getDocs(q);
      const courses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        description: doc.data().description || "No description available",
      }));
      setOfflineCourses(courses as { id: string; title: string; description: string }[]);
    } catch (error) {
      console.error("Error fetching offline courses:", error);
      setError("Failed to fetch courses. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[90vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[90vh]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-4 min-h-[90vh] w-full p-4 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Available Offline Courses</h2>
      {offlineCourses.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-12">
          <p className="text-gray-500 text-lg">No offline courses available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offlineCourses.map((course) => (
            <div
              key={course.id}
              className="border rounded-lg p-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.description}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
