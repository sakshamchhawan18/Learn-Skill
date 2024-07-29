"use client";
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const fetchTeachers = async () => {
  const db = getFirestore();
  const teachersCol = collection(db, "users"); //from the users collection
  const q = query(teachersCol, where("userType", "==", "teacher"));
  const teacherSnapshot = await getDocs(q);
  const teacherList = teacherSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return teacherList;
};

const fetchTeacherSchedule = async (teacherId) => {
  const db = getFirestore();
  const scheduleCol = collection(db, "schedule-live");
  const q = query(scheduleCol, where("uid", "==", teacherId));
  const scheduleSnapshot = await getDocs(q);
  const scheduleList = scheduleSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return scheduleList;
};

const TeachersCard = () => {
  const [teachers, setTeachers] = useState([]);
  const [enrolledTeachers, setEnrolledTeachers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  // Fetch all teachers
  useEffect(() => {
    const getTeachers = async () => {
      const teacherList = await fetchTeachers();
      setTeachers(teacherList);
    };

    getTeachers();
  }, []);

  // Fetch enrolled teachers for the current user
  useEffect(() => {
    const getEnrolledTeachers = async () => {
      if (user) {
        const db = getFirestore();
        const studentRef = doc(db, "users", user.uid);
        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {
          const enrolledUnder = studentSnap.data().enrolledUnder || [];
          setEnrolledTeachers(enrolledUnder);
        }
      }
    };

    getEnrolledTeachers();
  }, [user]);

  // Fetch schedules for enrolled teachers
  useEffect(() => {
    if (enrolledTeachers.length > 0) {
      const getSchedules = async () => {
        let allSchedules: Array<any> = [];
        for (let teacherId of enrolledTeachers) {
          const scheduleList = await fetchTeacherSchedule(teacherId);
          allSchedules = [...allSchedules, ...scheduleList];
        }
        setSchedules(allSchedules);
      };

      getSchedules();
    }
  }, [enrolledTeachers]);

  // Handle enrolling in a teacher
  const handleEnroll = async (teacherId) => {
    const db = getFirestore();

    if (user) {
      const studentRef = doc(db, "users", user.uid);
      const studentSnap = await getDoc(studentRef);
      const enrolledUnder = studentSnap.exists()
        ? studentSnap.data().enrolledUnder || []
        : [];

      if (!enrolledUnder.includes(teacherId)) {
        const updatedEnrolledUnder = [...enrolledUnder, teacherId];
        await updateDoc(studentRef, {
          enrolledUnder: updatedEnrolledUnder,
        });
        setEnrolledTeachers(updatedEnrolledUnder);
        alert("Enrolled successfully!");
      } else {
        alert("You are already enrolled under this teacher.");
      }
    } else {
      alert("You need to be logged in to enroll.");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {teachers.length === 0 ? (
        <div className="flex flex-col items-center justify-center col-span-full">
          <h3 className="text-2xl font-bold tracking-tight">
            You have not enrolled to any teacher yet!
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Courses will show when you start using Learn Skill
          </p>
        </div>
      ) : (
        teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="teacher-card border p-4 m-2 rounded shadow"
          >
            <h4 className="text-xl font-bold">{`${teacher.firstname} ${teacher.lastname}`}</h4>
            <p className="text-sm">{teacher.email}</p>
            <button
              className={`mt-2 px-4 py-2 rounded text-white ${
                enrolledTeachers.includes(teacher.id)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              } transition`}
              onClick={() => handleEnroll(teacher.id)} // Store the teacher's id
              disabled={enrolledTeachers.includes(teacher.id)}
            >
              {enrolledTeachers.includes(teacher.id) ? "Enrolled" : "Enroll"}
            </button>
          </div>
        ))
      )}
      
    </div>
  );
};

export default TeachersCard;
