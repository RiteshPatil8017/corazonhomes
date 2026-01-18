import React from 'react';

const Residential = () => {
  // Placeholder data for demonstration
  const projects = [
    {
      id: 1,
      title: "The Grand Horizon",
      location: "Wakad, Pune",
      type: "2 & 3 BHK Premium Homes",
      price: "₹ 85 Lacs Onwards",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 2,
      title: "Serenity Greens",
      location: "Hinjewadi, Pune",
      type: "3 & 4 BHK Luxury Villas",
      price: "₹ 1.5 Cr Onwards",
      image: "https://images.unsplash.com/photo-1600596542815-e36cb06c2886?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 3,
      title: "Urban Heights",
      location: "Baner, Pune",
      type: "2 BHK Smart Homes",
      price: "₹ 75 Lacs Onwards",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl text-gray-900 mb-4 tracking-wide uppercase">Residential Projects</h1>
          <div className="h-1 w-24 bg-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Discover a life of luxury and comfort with our handpicked collection of residential properties designed for modern living.
          </p>
        </div>

        {/* Filters (Visual Only) */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <select className="p-3 border border-gray-200 bg-white text-gray-600 rounded-sm outline-none focus:border-yellow-600">
            <option>All Locations</option>
            <option>Wakad</option>
            <option>Baner</option>
            <option>Hinjewadi</option>
          </select>
          <select className="p-3 border border-gray-200 bg-white text-gray-600 rounded-sm outline-none focus:border-yellow-600">
            <option>Budget</option>
            <option>40-60 Lacs</option>
            <option>60-80 Lacs</option>
            <option>1 Cr+</option>
          </select>
          <button className="bg-gray-900 text-white px-6 py-3 uppercase text-sm tracking-wider hover:bg-black transition">
            Apply Filters
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div key={project.id} className="bg-white shadow-lg hover:shadow-2xl transition duration-300 group cursor-pointer">
              <div className="relative overflow-hidden h-64">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-yellow-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                  Featured
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-500 text-sm mb-4 flex items-center gap-2">
                  📍 {project.location}
                </p>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{project.type}</span>
                  <span className="text-yellow-600 font-bold">{project.price}</span>
                </div>
                <button className="w-full mt-6 border border-gray-900 text-gray-900 py-3 uppercase text-xs tracking-widest hover:bg-gray-900 hover:text-white transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Residential;