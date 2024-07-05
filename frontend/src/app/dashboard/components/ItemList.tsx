// components/ItemList.tsx
import React from 'react';

interface Item {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
}

// Fetches the live class according to the teacher name 

const items: Item[] = [
  { id: 1, title: 'Item 1', description: 'Description for Item 1', date: '2024-07-03', time: '10:00 AM' },
  { id: 2, title: 'Item 2', description: 'Description for Item 2', date: '2024-07-04', time: '11:00 AM' },
  { id: 3, title: 'Item 3', description: 'Description for Item 3', date: '2024-07-05', time: '12:00 PM' },
  { id: 4, title: 'Item 3', description: 'Description for Item 3', date: '2024-07-05', time: '12:00 PM' },
  { id: 5, title: 'Item 3', description: 'Description for Item 3', date: '2024-07-05', time: '12:00 PM' },
  { id: 6, title: 'Item 3', description: 'Description for Item 3', date: '2024-07-05', time: '12:00 PM' },
  { id: 7, title: 'Item 3', description: 'Description for Item 3', date: '2024-07-05', time: '12:00 PM' },
  { id: 8, title: 'Item 3', description: 'Description for Item 3', date: '2024-07-05', time: '12:00 PM' },
  { id: 9, title: 'Item 3', description: 'Description for Item 3', date: '2024-07-05', time: '12:00 PM' },
  // Add more items as needed
];

const ItemList: React.FC = () => {
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
          {items.map((item, index) => (
            <tr
              key={item.id}
              className={`hover:text-blue-500 ${index % 2 === 0 ? 'bg-black-50' : 'bg-gray-900'}`}
            >
              <td className="px-4 py-2 text-sm text-white-700">{item.id}</td>
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
