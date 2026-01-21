import React, { useEffect, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AchievementGallery = ({ limit }) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // State to track the opened image
  
  // Use the environment variable for the API URL
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gallery`);
        const data = await response.json();
        
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
  }, [limit, API_URL]);

  return (
    // Changed py-15 to pt-8 pb-16 to reduce top space
    <section id="gallery" className="pt-8 pb-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section: Added 'relative' to position the button absolutely */}
        <div className="relative text-center mb-12">
          <h2 className="font-serif text-4xl text-gray-900 mb-4 uppercase tracking-wide">Achievement Gallery</h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-500 font-light">Celebrating our milestones and success stories</p>

          {/* See All Link - Positioned Absolute Right */}
          {limit && (
            <Link 
              to="/gallery" 
              className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-yellow-600 transition-colors uppercase tracking-wider"
            >
              See All <ArrowRight size={16} />
            </Link>
          )}
        </div>

        {/* Mobile See All Button (Visible only on small screens) */}
        {limit && (
          <div className="md:hidden flex justify-end mb-6">
            <Link 
              to="/gallery" 
              className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-yellow-600 transition-colors uppercase tracking-wider"
            >
              See All <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-400">Loading Gallery...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((item, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedImage(item.imageData)} // Open Image on Click
                className="group relative overflow-hidden cursor-pointer shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="h-80 overflow-hidden">
                   {/* Displays Base64 image */}
                   <img 
                    src={item.imageData} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                  />
                  {/* Overlay icon to indicate clickability */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                    <span className="text-white border border-white px-4 py-2 text-sm uppercase tracking-widest">View Full</span>
                  </div>
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

      {/* --- LIGHTBOX MODAL --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 transition-opacity duration-300"
          onClick={() => setSelectedImage(null)} // Close when clicking background
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-yellow-500 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>

          {/* Full Image */}
          <img 
            src={selectedImage} 
            alt="Full Screen Achievement" 
            className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          />
        </div>
      )}
    </section>
  );
};

export default AchievementGallery;