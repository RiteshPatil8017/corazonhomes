import React, { useState } from 'react';
import { Search, ChevronDown, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Replace this URL with your desired background image
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

// Predefined List of Pune Locations
const PUNE_LOCATIONS = [
  "Aundh", "Balewadi", "Baner", "Bavdhan", "Bhosari", "Boat Club Road", 
  "Camp", "Chakan", "Charholi", "Dhanori", "Hadapsar", "Hinjewadi", 
  "Kalyani Nagar", "Kharadi", "Koregaon Park", "Kothrud", "Lohegaon", 
  "Magarpatta", "Model Colony", "Moshi", "NIBM Road", "Pashan", 
  "Pimple Gurav", "Pimple Nilakh", "Pimple Saudagar", "Pisoli", 
  "Pradhikaran", "Punawale", "Ravet", "Shivajinagar", "Sinhagad Road", 
  "Tathawade", "Undri", "Viman Nagar", "Wagholi", "Wakad", "Wanowrie", "Warje"
];

const Hero = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('residential');
  
  // Search States
  const [unitType, setUnitType] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  
  // Autocomplete States
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Dropdown Data
  const residentialTypes = ["1 BHK", "2 BHK", "3 BHK", "Villa"];
  const commercialTypes = ["Office", "Showroom", "Shop", "Warehouse"];
  const budgetOptions = ["Up to 50L", "50L - 1Cr", "1Cr - 2Cr", "2Cr+"];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setUnitType(''); 
  };

  // Handle Location Typing
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length > 0) {
      const filtered = PUNE_LOCATIONS.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle Selection via MouseDown to prevent Blur conflict
  const selectSuggestion = (loc) => {
    setLocation(loc);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (unitType) params.append('type', unitType);
    if (budget) params.append('budget', budget);

    navigate(`/${activeTab}?${params.toString()}`);
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex flex-col justify-center items-center text-white overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-slow-zoom"
          style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
        />
        <div className="absolute inset-0 bg-black/40 md:bg-black/50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center h-full pb-20 md:pb-0">
        
        <p className="text-base sm:text-lg md:text-xl mb-4 font-light tracking-wider text-center drop-shadow-md">
          It's great to be home!
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-10 text-center leading-tight drop-shadow-lg">
          Find Your Perfect Home
        </h1>

        {/* Search Container */}
        <div className="w-full max-w-[95%] sm:max-w-2xl lg:max-w-5xl bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-2xl border border-white/20">
          
          {/* Tabs */}
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

          {/* Search Bar - Note the Z-Index stacking here */}
          <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-visible divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            
            {/* Unit Type - z-10 */}
            <div className="relative w-full lg:w-1/4 border-b lg:border-b-0 lg:border-r border-gray-200 group z-10">
              <select 
                value={unitType}
                onChange={(e) => setUnitType(e.target.value)}
                className="w-full h-14 px-4 bg-white text-gray-700 font-medium focus:outline-none cursor-pointer appearance-none text-sm sm:text-base rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none"
              >
                <option value="">Unit Type</option>
                {activeTab === 'residential' 
                  ? residentialTypes.map(t => <option key={t} value={t}>{t}</option>)
                  : commercialTypes.map(t => <option key={t} value={t}>{t}</option>)
                }
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
            </div>

            {/* City Search - z-50 (HIGHEST) to float over elements below */}
            <div className="relative w-full lg:flex-grow border-b lg:border-b-0 lg:border-r border-gray-200 group z-50">
              <input 
                type="text" 
                value={location}
                onChange={handleLocationChange}
                onFocus={() => location.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search city, locality..." 
                className="w-full h-14 px-4 text-gray-700 font-medium focus:outline-none placeholder-gray-400 text-sm sm:text-base"
              />
              <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 hidden sm:block pointer-events-none group-hover:text-yellow-600 transition" />

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-b-lg shadow-2xl mt-1 max-h-60 overflow-y-auto z-50">
                  {suggestions.map((loc, index) => (
                    <li 
                      key={index}
                      // Use onMouseDown to ensure click registers before blur
                      onMouseDown={() => selectSuggestion(loc)}
                      className="px-6 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm border-b border-gray-50 last:border-none flex items-center gap-2"
                    >
                      <MapPin size={14} className="text-gray-400 shrink-0" />
                      {loc}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Budget - z-10 */}
            <div className="relative w-full lg:w-1/4 border-b lg:border-b-0 border-gray-200 group z-10">
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

            {/* Search Button - z-10 */}
            <button 
              onClick={handleSearch}
              className="w-full lg:w-auto px-8 h-14 bg-[#ff385c] text-white font-bold hover:bg-[#e03050] transition-colors flex items-center justify-center gap-2 lg:rounded-r-lg lg:rounded-bl-none rounded-b-lg group z-10"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="tracking-wider">SEARCH</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Stats Section */}
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