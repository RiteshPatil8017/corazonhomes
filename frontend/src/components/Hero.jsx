import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Replace this URL with your desired background image
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

const Hero = () => {
  const [activeTab, setActiveTab] = useState('residential');

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center items-center text-white pb-32 md:pb-0">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center mt-16 md:mt-0">
        <p className="text-base sm:text-lg md:text-xl mb-2 md:mb-4 font-light tracking-wider text-center animate-fade-in-up">
          It's great to be home!
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-8 md:mb-12 text-center leading-tight drop-shadow-lg">
          Find Your Perfect Home
        </h1>

        {/* Tabs and Search Bar Container */}
        <div className="w-full max-w-xs sm:max-w-2xl md:max-w-4xl bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-2xl border border-white/20">
          
          {/* Residential / Commercial Tabs */}
          <div className="flex justify-center mb-6 space-x-4 sm:space-x-8">
            <button 
              className={`text-base sm:text-lg font-semibold pb-2 border-b-2 transition-all duration-300 ${
                activeTab === 'residential' ? 'border-white text-white' : 'border-transparent text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('residential')}
            >
              Residential
            </button>
            <button 
              className={`text-base sm:text-lg font-semibold pb-2 border-b-2 transition-all duration-300 ${
                activeTab === 'commercial' ? 'border-white text-white' : 'border-transparent text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('commercial')}
            >
              Commercial
            </button>
          </div>

          {/* Search Bar - Responsive Flex Direction */}
          <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-lg">
            
            {/* Unit Type Dropdown */}
            <div className="relative w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200">
              <select className="w-full h-full px-4 py-4 bg-white text-gray-700 font-medium focus:outline-none cursor-pointer appearance-none">
                <option>Unit Type</option>
                <option>1 BHK</option>
                <option>2 BHK</option>
                <option>3 BHK</option>
                <option>Villa</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>

            {/* City Search Input */}
            <input 
              type="text" 
              placeholder="Search city..." 
              className="w-full md:flex-grow px-4 py-4 text-gray-700 font-medium border-b md:border-b-0 md:border-r border-gray-200 focus:outline-none placeholder-gray-400"
            />

            {/* Budget Dropdown */}
            <div className="relative w-full md:w-1/4 border-b md:border-b-0 border-gray-200">
              <select className="w-full h-full px-4 py-4 bg-white text-gray-700 font-medium focus:outline-none cursor-pointer appearance-none">
                <option>Budget</option>
                <option>Up to 50L</option>
                <option>50L - 1Cr</option>
                <option>1Cr - 2Cr</option>
                <option>2Cr+</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-[#ff385c] text-white px-8 py-4 font-bold hover:bg-[#e03050] transition-colors flex items-center justify-center gap-2 md:w-auto w-full">
              <Search size={20} />
              <span>SEARCH</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Integrated Stats Section at the Bottom */}
      <div className="absolute bottom-0 w-full z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 pb-6 md:pt-20 md:pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 text-center text-white divide-x-0 md:divide-x divide-gray-500/30">
            
            <div className="px-2">
              <h3 className="text-lg md:text-xl font-semibold mb-1">Presence</h3>
              <p className="text-xs md:text-sm opacity-80 font-light">India & UAE</p>
            </div>
            
            <div className="px-2 border-l md:border-l-0 border-gray-500/30">
              <h3 className="text-2xl md:text-3xl font-bold mb-1">100+</h3>
              <p className="text-xs md:text-sm opacity-80 font-light">Developers</p>
            </div>
            
            <div className="px-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-1">500+</h3>
              <p className="text-xs md:text-sm opacity-80 font-light">Projects</p>
            </div>
            
            <div className="px-2 border-l md:border-l-0 border-gray-500/30">
              <h3 className="text-2xl md:text-3xl font-bold mb-1">5000+</h3>
              <p className="text-xs md:text-sm opacity-80 font-light">Customers</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;