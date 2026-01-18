import React from 'react';

const Commercial = () => {
  const projects = [
    {
      id: 1,
      title: "Tech Park One",
      location: "Hinjewadi Phase 1",
      type: "Premium Office Spaces",
      price: "₹ 1.2 Cr Onwards",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 2,
      title: "The Business Hub",
      location: "Baner Main Road",
      type: "Showrooms & Offices",
      price: "₹ 2.5 Cr Onwards",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 tracking-wide uppercase">
            Commercial Projects
          </h1>
          <div className="h-1 w-20 md:w-24 bg-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Strategic locations for your business growth. Explore premium office spaces and retail outlets.
          </p>
        </div>

        {/* Filters Section - Stacks on mobile, row on desktop */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-12">
          <select className="w-full sm:w-auto p-3 border border-gray-200 bg-white text-gray-600 rounded-sm outline-none focus:border-yellow-600 cursor-pointer shadow-sm">
            <option>All Locations</option>
            <option>Wakad</option>
            <option>Baner</option>
            <option>Viman Nagar</option>
          </select>
          
          <select className="w-full sm:w-auto p-3 border border-gray-200 bg-white text-gray-600 rounded-sm outline-none focus:border-yellow-600 cursor-pointer shadow-sm">
            <option>Property Type</option>
            <option>Office Space</option>
            <option>Showroom</option>
            <option>Co-working</option>
          </select>
          
          <button className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 uppercase text-sm font-medium tracking-wider hover:bg-black transition shadow-md active:scale-95">
            Apply Filters
          </button>
        </div>

        {/* Project Grid - 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project) => (
            <div key={project.id} className="bg-white shadow-lg hover:shadow-2xl transition duration-300 group cursor-pointer rounded-lg overflow-hidden flex flex-col h-full">
              
              {/* Image Container */}
              <div className="relative overflow-hidden h-56 sm:h-64 shrink-0">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-gray-900 text-white text-[10px] sm:text-xs font-bold px-3 py-1 uppercase tracking-wider shadow-md">
                  Commercial
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-serif text-gray-900 mb-2 font-medium">
                  {project.title}
                </h3>
                
                <p className="text-gray-500 text-xs sm:text-sm mb-4 flex items-center gap-1.5">
                  <span>📍</span> {project.location}
                </p>
                
                {/* Spacer to push bottom content down if titles vary in height */}
                <div className="flex-grow border-t border-gray-100 mt-2"></div>

                <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                  <span className="text-gray-700 text-sm font-medium">{project.type}</span>
                  <span className="text-yellow-600 font-bold text-sm sm:text-base whitespace-nowrap">
                    {project.price}
                  </span>
                </div>
                
                <button className="w-full border border-gray-900 text-gray-900 py-3 uppercase text-xs font-bold tracking-widest hover:bg-gray-900 hover:text-white transition active:scale-95">
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Commercial;