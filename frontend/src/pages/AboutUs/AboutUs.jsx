import React from 'react';

const AboutUs = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 border-l-4 border-yellow-600 pl-6 leading-tight">
            About Us
          </h1>
        </div>
        
        {/* Content Card */}
        <div className="bg-white p-8 md:p-12 shadow-sm rounded-xl border border-gray-100">
          <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg text-justify">
            <p>
              Corazon Homes is a real estate advisor that functions on the Pillars of <strong className="text-gray-800">trust, transparency, and expertise</strong>. As a digital marketplace with an exhaustive range of property listings, we know it is easy to get lost. So we at Corazon Homes guide home buyers right from the start of their home search to the very end. 
            </p>
            <p>
              Shortlist your favorite homes and allow us to arrange site visits. Our work does not end here. We assist you with home loans and property registrations. Buying a home is an important investment—turn it into your safest, best deal at Corazon Homes.
            </p>
            <hr className="border-gray-100 my-6" />
            <p>
              We are a technology-enabled transaction and aggregator platform for Global real estate. Founded in 2013 and growing at a scorching pace. By consolidating supply and demand, Corazon Homes is creating significant barriers of entry through scale, sourcing capabilities, demand aggregation, and the use of technology.
            </p>
            <p>
              We enable a multi-modal distribution platform which will help consolidate its positioning as one of the most innovative, largest, and scalable O2O real estate platforms in India. Accomplished professionals, ex-bankers, and Ivy school alumni are here to make sure that your search for the dream property ends here at Corazon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;