import React, { useEffect, useState } from 'react';

const AchievementGallery = ({ limit }) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Use the environment variable for the API URL
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the dynamic API_URL here
        const response = await fetch(`${API_URL}/api/gallery`);
        const data = await response.json();
        
        // If a limit is provided (like on Home page), slice the data.
        // Otherwise (like on Gallery page), show everything.
        if (limit) {
          setAchievements(data.slice(0, limit));
        } else {
          setAchievements(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [limit, API_URL]); // Added API_URL to dependency array

  return (
    <section id="gallery" className="py-15 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-gray-900 mb-4 uppercase tracking-wide">Achievement Gallery</h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-500 font-light">Celebrating our milestones and success stories</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-400">Loading Gallery...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((item, index) => (
              <div key={index} className="group relative overflow-hidden cursor-pointer shadow-lg border border-gray-100">
                <div className="h-80 overflow-hidden">
                   {/* This displays the Base64 image from MongoDB */}
                   <img 
                    src={item.imageData} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                  />
                </div>
                <div className="p-4 bg-white text-center">
                   <h3 className="text-lg font-serif text-gray-800">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && achievements.length === 0 && (
          <div className="text-center text-gray-400 italic">
            Gallery is empty.
          </div>
        )}
      </div>
    </section>
  );
};
export default AchievementGallery;