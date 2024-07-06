"use client";

import { firestore } from '@/firebase/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

interface Item {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

const ItemList: React.FC = () => {
  const scheduledClasses = useGetScheduledClasses();

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-white-600">S.No</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-white-600">Title</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-white-600">Description</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-white-600">Date</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-white-600">Time</th>
          </tr>
        </thead>
        <tbody>
          {scheduledClasses.map((item, index) => (
            <tr
              key={item.id}
              className={`hover:text-blue-500 ${index % 2 === 0 ? 'bg-black-50' : 'bg-gray-900'}`}
            >
              <td className="px-4 py-2 text-sm text-white-700">{index + 1}</td>
              <td className="px-4 py-2 text-sm text-white-700">{item.title}</td>
              <td className="px-4 py-2 text-sm text-white-700">{item.description}</td>
              <td className="px-4 py-2 text-sm text-white-700">{item.date}</td>
              <td className="px-4 py-2 text-sm text-white-700">{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;

function useGetScheduledClasses(): Item[] {
  const [classes, setClasses] = useState<Item[]>([]);

  useEffect(() => {
    const getClasses = async () => {
      const q = query(collection(firestore, "schedule-live"), orderBy("order", "asc"));
      const querySnapshot = await getDocs(q);
      const fetchedClasses: Item[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          description: data.description,
          date: data.date,
          time: data.time,
        };
      });

      setClasses(fetchedClasses);
    };

    getClasses();
  }, []);

  return classes;
}
