import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Residential = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams(); // Read URL params
  
  // Filter States (Initialize from URL if present)
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || 'All');
  const [budgetFilter, setBudgetFilter] = useState(searchParams.get('budget') || 'All');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'All');

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/residential`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching residential projects:", error);
      }
      setLoading(false);
    };
    fetchProjects();
  }, [API_URL]);

  // --- HELPER: Parse Price String to Number ---
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const cleanStr = priceStr.replace(/[₹,\s]/g, '').toLowerCase();
    const value = parseFloat(cleanStr); 

    if (cleanStr.includes('cr')) return value * 10000000;
    if (cleanStr.includes('lac') || cleanStr.includes('lakh')) return value * 100000;
    
    return value; 
  };

  // --- FILTER LOGIC ---
  const filteredProjects = projects.filter(project => {
    // 1. Location Filter
    const matchesLocation = locationFilter === 'All' || !locationFilter ||
      project.location.toLowerCase().includes(locationFilter.toLowerCase());

    // 2. Unit Type Filter
    const matchesType = typeFilter === 'All' || !typeFilter ||
      project.type.toLowerCase().includes(typeFilter.toLowerCase());

    // 3. Budget Filter
    let matchesBudget = true;
    if (budgetFilter !== 'All' && budgetFilter) {
      const priceVal = parsePrice(project.price);
      
      if (budgetFilter === 'Up to 50L') matchesBudget = priceVal <= 5000000;
      else if (budgetFilter === '50L - 1Cr') matchesBudget = priceVal > 5000000 && priceVal <= 10000000;
      else if (budgetFilter === '1Cr - 2Cr') matchesBudget = priceVal > 10000000 && priceVal <= 20000000;
      else if (budgetFilter === '2Cr+') matchesBudget = priceVal > 20000000;
    }

    return matchesLocation && matchesBudget && matchesType;
  });

  const uniqueLocations = [...new Set(projects.map(p => p.location.split(',')[0].trim()))];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 tracking-wide uppercase">
            Residential Projects
          </h1>
          <div className="h-1 w-20 md:w-24 bg-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Discover a life of luxury and comfort with our handpicked collection of residential properties.
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-12">
          
          <select 
            className="w-full sm:w-auto p-3 border border-gray-200 bg-white text-gray-600 rounded-sm outline-none focus:border-yellow-600 cursor-pointer shadow-sm min-w-[200px]"
            value={locationFilter === 'All' || !locationFilter ? 'All' : locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="All">All Locations</option>
            {uniqueLocations.map((loc, index) => <option key={index} value={loc}>{loc}</option>)}
          </select>
          
          <select 
            className="w-full sm:w-auto p-3 border border-gray-200 bg-white text-gray-600 rounded-sm outline-none focus:border-yellow-600 cursor-pointer shadow-sm min-w-[200px]"
            value={typeFilter === 'All' || !typeFilter ? 'All' : typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="Villa">Villa</option>
          </select>

          <select 
            className="w-full sm:w-auto p-3 border border-gray-200 bg-white text-gray-600 rounded-sm outline-none focus:border-yellow-600 cursor-pointer shadow-sm min-w-[200px]"
            value={budgetFilter === 'All' || !budgetFilter ? 'All' : budgetFilter}
            onChange={(e) => setBudgetFilter(e.target.value)}
          >
            <option value="All">All Budgets</option>
            <option value="Up to 50L">Up to 50L</option>
            <option value="50L - 1Cr">50L - 1Cr</option>
            <option value="1Cr - 2Cr">1Cr - 2Cr</option>
            <option value="2Cr+">2Cr+</option>
          </select>
          
          <button 
            onClick={() => { setLocationFilter('All'); setBudgetFilter('All'); setTypeFilter('All'); }}
            className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 uppercase text-sm font-medium tracking-wider hover:bg-black transition shadow-md active:scale-95"
          >
            Reset Filters
          </button>
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20 text-gray-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mr-2"></div>
            Loading Projects...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProjects.map((project) => (
              <div key={project._id} className="bg-white shadow-lg hover:shadow-2xl transition duration-300 group cursor-pointer rounded-lg overflow-hidden flex flex-col h-full animate-fade-in-up">
                
                <div className="relative overflow-hidden h-56 sm:h-64 shrink-0">
                  <img 
                    src={project.imageData} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-yellow-600 text-white text-[10px] sm:text-xs font-bold px-3 py-1 uppercase tracking-wider shadow-md">
                    Featured
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-serif text-gray-900 mb-2 font-medium">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-500 text-xs sm:text-sm mb-4 flex items-center gap-1.5">
                    <span>📍</span> {project.location}
                  </p>
                  
                  <div className="flex-grow border-t border-gray-100 mt-2"></div>

                  <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                    <span className="text-gray-700 text-sm font-medium">{project.type}</span>
                    <span className="text-yellow-600 font-bold text-sm sm:text-base whitespace-nowrap">
                      {project.price}
                    </span>
                  </div>
                  
                  <button className="w-full border border-gray-900 text-gray-900 py-3 uppercase text-xs font-bold tracking-widest hover:bg-gray-900 hover:text-white transition active:scale-95">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 mb-2 font-serif text-lg">No projects match your filters.</p>
            <button 
              onClick={() => { setLocationFilter('All'); setBudgetFilter('All'); setTypeFilter('All'); }}
              className="text-yellow-600 hover:underline text-sm font-bold"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Residential;