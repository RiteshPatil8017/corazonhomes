import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Replace this URL with your desired background image
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

const Hero = () => {
  const [activeTab, setActiveTab] = useState('residential');

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-white">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <p className="text-lg md:text-xl mb-4 font-light tracking-wider">It's great to be home!</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-12">Find Your Perfect Home</h1>

        {/* Tabs and Search Bar Container */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-2xl">
          {/* Residential / Commercial Tabs */}
          <div className="flex justify-center mb-6 space-x-8">
            <button 
              className={`text-lg font-semibold pb-2 border-b-2 transition-colors ${
                activeTab === 'residential' ? 'border-white text-white' : 'border-transparent text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('residential')}
            >
              Residential
            </button>
            <button 
              className={`text-lg font-semibold pb-2 border-b-2 transition-colors ${
                activeTab === 'commercial' ? 'border-white text-white' : 'border-transparent text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('commercial')}
            >
              Commercial
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-sm">
            <select className="px-4 py-4 bg-white text-gray-700 border-b md:border-b-0 md:border-r border-gray-200 focus:outline-none rounded-t-lg md:rounded-l-lg md:rounded-tr-none cursor-pointer">
              <option>Unit Type</option>
              <option>1 BHK</option>
              <option>2 BHK</option>
              <option>3 BHK</option>
              <option>Villa</option>
            </select>
            <input 
              type="text" 
              placeholder="Search city" 
              className="flex-grow px-4 py-4 text-gray-700 border-b md:border-b-0 md:border-r border-gray-200 focus:outline-none"
            />
            <select className="px-4 py-4 bg-white text-gray-700 focus:outline-none border-b md:border-b-0 border-gray-200 cursor-pointer">
              <option>Budget</option>
              <option>Is 50L</option>
              <option>50L - 1Cr</option>
              <option>1Cr - 2Cr</option>
              <option>2Cr+</option>
            </select>
            <button className="bg-[#ff385c] text-white px-8 py-4 font-bold hover:bg-[#e03050] transition-colors flex items-center justify-center rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
              <Search className="mr-2" size={20} />
              SEARCH
            </button>
          </div>
        </div>
      </div>
      
      {/* Integrated Stats Section at the Bottom */}
      <div className="absolute bottom-0 w-full z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white divide-x divide-gray-500/30">
          <div className="px-4">
            <h3 className="text-xl font-semibold mb-1">Presence</h3>
            <p className="text-sm opacity-80 font-light">Asia Pacific-India & UAE</p>
          </div>
          <div className="px-4">
            <h3 className="text-3xl font-bold mb-1">100+</h3>
            <p className="text-sm opacity-80 font-light">Developers</p>
          </div>
          <div className="px-4">
            <h3 className="text-3xl font-bold mb-1">500+</h3>
            <p className="text-sm opacity-80 font-light">Projects</p>
          </div>
          <div className="px-4">
            <h3 className="text-3xl font-bold mb-1">5000+</h3>
            <p className="text-sm opacity-80 font-light">Customers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;