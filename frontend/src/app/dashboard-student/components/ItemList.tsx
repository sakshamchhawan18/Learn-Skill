"use client";

import { getFirestore, collection, doc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '@/firebase/firebase';

interface Item {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  teacherName: string; // Added teacher name
}

const ItemList: React.FC = () => {
  const { scheduledClasses, loading, error } = useGetScheduledClasses();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-white-600">S.No</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-white-600">Teacher</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-white-600">Title</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-white-600">Description</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-white-600">Date</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-white-600">Time</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="px-4 py-2 text-sm text-white-700 text-center">Loading...</td>
            </tr>
          ) : scheduledClasses.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-2 text-sm text-white-700 text-center">No upcoming classes</td>
            </tr>
          ) : (
            scheduledClasses.map((item, index) => (
              <tr
                key={item.id}
                className={`hover:text-blue-500 ${index % 2 === 0 ? 'bg-black-50' : 'bg-gray-900'}`}
              >
                <td className="px-4 py-2 text-sm text-white-700">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-white-700">{item.teacherName}</td>
                <td className="px-4 py-2 text-sm text-white-700">{item.title}</td>
                <td className="px-4 py-2 text-sm text-white-700">{item.description}</td>
                <td className="px-4 py-2 text-sm text-white-700">{item.date}</td>
                <td className="px-4 py-2 text-sm text-white-700">{item.time}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

function useGetScheduledClasses(): { scheduledClasses: Item[], loading: boolean, error?: string } {
  const [classes, setClasses] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getClasses = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore();
        const studentDocRef = doc(db, 'users', user.uid);
        const studentDoc = await getDoc(studentDocRef);

        if (!studentDoc.exists()) {
          throw new Error('Student document does not exist');
        }

        const studentData = studentDoc.data();
        const enrolledUnder = studentData?.enrolledUnder;

        if (!enrolledUnder || enrolledUnder.length === 0) {
          throw new Error('No teachers enrolled');
        }

        // Fetch teacher names and classes
        let allClasses: Item[] = [];
        for (let teacherUid of enrolledUnder) {
          // Fetch teacher name
          const teacherDocRef = doc(db, 'users', teacherUid);
          const teacherDoc = await getDoc(teacherDocRef);
          const teacherData = teacherDoc.exists() ? teacherDoc.data() : { firstname: 'Unknown', lastname: 'Unknown' };

          const teacherName = `${teacherData.firstname || 'Unknown'} ${teacherData.lastname || 'Unknown'}`;

          // Fetch classes for this teacher
          const classesQuery = query(
            collection(db, 'schedule-live'),
            where('uid', '==', teacherUid),
            orderBy('order', 'asc')
          );

          const querySnapshot = await getDocs(classesQuery);
          console.log(`Fetched class documents for teacher ${teacherUid}:`, querySnapshot.docs.map(doc => doc.data()));

          const fetchedClasses: Item[] = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              description: data.description,
              date: data.date,
              time: data.time,
              teacherName: teacherName, // Add teacher name
            };
          });

          allClasses = [...allClasses, ...fetchedClasses];
        }

        setClasses(allClasses);
      } catch (err) {
        console.error('Error fetching scheduled classes:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getClasses();
  }, [user]);

  return { scheduledClasses: classes, loading, error };
}

export default ItemList;
