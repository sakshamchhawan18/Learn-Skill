"use client"
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const fetchTeachers = async () => {
  const db = getFirestore();
  const teachersCol = collection(db, 'users'); // Assuming 'users' is the collection name
  const q = query(teachersCol, where('userType', '==', 'teacher'));
  const teacherSnapshot = await getDocs(q);
  const teacherList = teacherSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return teacherList;
};

const fetchTeacherSchedule = async (teacherId) => {
  const db = getFirestore();
  const scheduleCol = collection(db, 'schedule-live');
  const q = query(scheduleCol, where('uid', '==', teacherId));
  const scheduleSnapshot = await getDocs(q);
  const scheduleList = scheduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return scheduleList;
};

const TeachersCard = () => {
  const [teachers, setTeachers] = useState([]);
  const [enrolledTeacher, setEnrolledTeacher] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const getTeachers = async () => {
      const teacherList = await fetchTeachers();
      setTeachers(teacherList);
    };

    getTeachers();
  }, []);

  useEffect(() => {
    if (enrolledTeacher) {
      const getSchedule = async () => {
        const scheduleList = await fetchTeacherSchedule(enrolledTeacher);
        setSchedule(scheduleList);
      };

      getSchedule();
    }
  }, [enrolledTeacher]);

  const handleEnroll = async (teacherId) => {
    const db = getFirestore();
    
    if (user) {
      const studentRef = doc(db, 'users', user.uid);
      // Update the student's document with the teacher's uid
      await updateDoc(studentRef, {
        enrolledUnder: teacherId,
      });
      setEnrolledTeacher(teacherId);
      alert('Enrolled successfully!');
    } else {
      alert('You need to be logged in to enroll.');
    }
  };

  return (
    <div className="teachers-list">
      {teachers.length === 0 ? (
        <p>No teachers available.</p>
      ) : (
        teachers.map((teacher) => (
          <div key={teacher.id} className="teacher-card border p-4 m-2 rounded shadow">
            <h4 className="text-xl font-bold">{`${teacher.firstname} ${teacher.lastname}`}</h4>
            <p className="text-sm">{teacher.email}</p>
            <button 
              className={`mt-2 px-4 py-2 rounded text-white ${enrolledTeacher === teacher.id ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} transition`}
              onClick={() => handleEnroll(teacher.uid)} // Store the teacher's uid
              disabled={enrolledTeacher === teacher.uid}
            >
              {enrolledTeacher === teacher.uid ? 'Enrolled' : 'Enroll'}
            </button>
          </div>
        ))
      )}
      {enrolledTeacher && schedule.length > 0 && (
        <div className="schedule-list mt-4">
          <h3 className="text-lg font-bold">Scheduled Live Classes:</h3>
          {schedule.map((classItem) => (
            <div key={classItem.id} className="class-card border p-4 m-2 rounded shadow">
              <h4 className="text-xl font-bold">{classItem.title}</h4>
              <p>{classItem.description}</p>
              <p>Date: {classItem.date}</p>
              <p>Time: {classItem.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeachersCard;
