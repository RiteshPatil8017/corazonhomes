import React, { useState } from 'react';
import { Search, ChevronDown, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Replace this URL with your desired background image
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

const Hero = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('residential');
  
  // Search States
  const [unitType, setUnitType] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');

  // Dropdown Data
  const residentialTypes = ["1 BHK", "2 BHK", "3 BHK", "Villa"];
  const commercialTypes = ["Office", "Showroom", "Shop", "Warehouse"];
  const budgetOptions = ["Up to 50L", "50L - 1Cr", "1Cr - 2Cr", "2Cr+"];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setUnitType(''); // Reset unit type on tab switch
  };

  const handleSearch = () => {
    // Build query params
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (unitType) params.append('type', unitType);
    if (budget) params.append('budget', budget);

    // Navigate to the correct page
    navigate(`/${activeTab}?${params.toString()}`);
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex flex-col justify-center items-center text-white overflow-hidden">
      
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-slow-zoom"
          style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
        />
        <div className="absolute inset-0 bg-black/40 md:bg-black/50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center pb-24 md:pb-0">
        
        {/* Text */}
        <p className="text-base sm:text-lg md:text-xl mb-4 font-light tracking-wider text-center drop-shadow-md">
          It's great to be home!
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-10 text-center leading-tight drop-shadow-lg">
          Find Your Perfect Home
        </h1>

        {/* Tabs and Search Bar Container */}
        <div className="w-full max-w-[95%] sm:max-w-2xl lg:max-w-5xl bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-2xl border border-white/20">
          
          {/* Residential / Commercial Tabs */}
          <div className="flex justify-center mb-6 space-x-6 sm:space-x-8">
            <button 
              className={`text-base sm:text-lg font-semibold pb-2 border-b-2 transition-all duration-300 capitalize tracking-wide ${
                activeTab === 'residential' ? 'border-yellow-500 text-white' : 'border-transparent text-gray-300 hover:text-white'
              }`}
              onClick={() => handleTabChange('residential')}
            >
              Residential
            </button>
            <button 
              className={`text-base sm:text-lg font-semibold pb-2 border-b-2 transition-all duration-300 capitalize tracking-wide ${
                activeTab === 'commercial' ? 'border-yellow-500 text-white' : 'border-transparent text-gray-300 hover:text-white'
              }`}
              onClick={() => handleTabChange('commercial')}
            >
              Commercial
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row bg-white rounded-lg overflow-hidden shadow-lg">
            
            {/* Unit Type Dropdown (Dynamic) */}
            <div className="relative w-full lg:w-1/4 border-b lg:border-b-0 lg:border-r border-gray-200 group">
              <select 
                value={unitType}
                onChange={(e) => setUnitType(e.target.value)}
                className="w-full h-14 px-4 bg-white text-gray-700 font-medium focus:outline-none cursor-pointer appearance-none text-sm sm:text-base"
              >
                <option value="">Unit Type</option>
                {activeTab === 'residential' 
                  ? residentialTypes.map(t => <option key={t} value={t}>{t}</option>)
                  : commercialTypes.map(t => <option key={t} value={t}>{t}</option>)
                }
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
            </div>

            {/* City Search Input */}
            <div className="relative w-full lg:flex-grow border-b lg:border-b-0 lg:border-r border-gray-200 group">
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search city..." 
                className="w-full h-14 px-4 text-gray-700 font-medium focus:outline-none placeholder-gray-400 text-sm sm:text-base"
              />
              <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 hidden sm:block pointer-events-none group-hover:text-yellow-600 transition" />
            </div>

            {/* Budget Dropdown */}
            <div className="relative w-full lg:w-1/4 border-b lg:border-b-0 border-gray-200 group">
              <select 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full h-14 px-4 bg-white text-gray-700 font-medium focus:outline-none cursor-pointer appearance-none text-sm sm:text-base"
              >
                <option value="">Budget</option>
                {budgetOptions.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
            </div>

            {/* Search Button */}
            <button 
              onClick={handleSearch}
              className="bg-[#ff385c] text-white px-8 h-14 font-bold hover:bg-[#e03050] transition-colors flex items-center justify-center gap-2 lg:w-auto w-full text-sm sm:text-base tracking-wider group"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>SEARCH</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Integrated Stats Section at the Bottom */}
      <div className="absolute bottom-0 w-full z-20 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 text-center text-white">
            
            <div className="flex flex-col items-center">
              <h3 className="text-lg md:text-xl font-semibold mb-1 text-yellow-400">Presence</h3>
              <p className="text-xs md:text-sm opacity-80 font-light">India & UAE</p>
            </div>
            
            <div className="flex flex-col items-center relative md:after:content-[''] md:after:absolute md:after:left-0 md:after:top-2 md:after:bottom-2 md:after:w-[1px] md:after:bg-gray-500/50">
              <h3 className="text-2xl md:text-3xl font-bold mb-1">100+</h3>
              <p className="text-xs md:text-sm opacity-80 font-light">Developers</p>
            </div>
            
            <div className="flex flex-col items-center relative md:after:content-[''] md:after:absolute md:after:left-0 md:after:top-2 md:after:bottom-2 md:after:w-[1px] md:after:bg-gray-500/50">
              <h3 className="text-2xl md:text-3xl font-bold mb-1">500+</h3>
              <p className="text-xs md:text-sm opacity-80 font-light">Projects</p>
            </div>
            
            <div className="flex flex-col items-center relative md:after:content-[''] md:after:absolute md:after:left-0 md:after:top-2 md:after:bottom-2 md:after:w-[1px] md:after:bg-gray-500/50">
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