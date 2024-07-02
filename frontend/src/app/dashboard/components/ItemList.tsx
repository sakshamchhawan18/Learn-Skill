// components/ItemList.tsx
import React from 'react';

interface Item {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
}

const items: Item[] = [
  { id: 1, title: 'Item 1', description: 'Description for Item 1', date: '2024-07-03', time: '10:00 AM' },
  { id: 2, title: 'Item 2', description: 'Description for Item 2', date: '2024-07-04', time: '11:00 AM' },
  { id: 3, title: 'Item 3', description: 'Description for Item 3', date: '2024-07-05', time: '12:00 PM' },
  // Add more items as needed
];

const ItemList: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`  mb-2 ${index % 2 === 0 ? 'bg-black-100' : 'bg-white-400'} hover:text-blue-500`}
        >
          <h3 className="text-lg font-semibold hover:text-blue-500">
            {item.title}
          </h3>
          <p>{item.description}</p>
          <div className="text-sm text-white-600 hover:text-blue-500">
            <p className='hover:text-blue-500'>Date: {item.date}</p>
            <p className='hover:text-blue-500'>Time: {item.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
