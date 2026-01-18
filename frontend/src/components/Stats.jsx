import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "stats"));
      setStats(snapshot.docs.map(doc => doc.data()));
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="border-r border-gray-800 last:border-0">
            <div className="text-4xl font-serif text-yellow-500 mb-2">{stat.value}</div>
            <div className="text-gray-400 uppercase text-xs tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Stats;