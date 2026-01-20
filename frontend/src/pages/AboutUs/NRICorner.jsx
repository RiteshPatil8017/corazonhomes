import React from 'react';
import { Globe, Mail } from 'lucide-react';

const NRICorner = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
           <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 border-l-4 border-yellow-600 pl-6">
             NRI Corner
           </h1>
           <p className="pl-7 text-gray-500 flex items-center gap-2">
             <Globe size={18} className="text-yellow-600" /> Connecting Global Indians to Home.
           </p>
        </div>
        
        <div className="space-y-8 text-gray-600 leading-relaxed text-base md:text-lg text-justify">
          <p>
            Corazon Homes is a real estate advisor that functions on the Pillars of trust, transparency, and expertise. Shortlist your favorite homes and allow us to arrange site visits. Our work does not end here. We assist you with home loans and property registrations. Buying a home is an important investment – turn it into your safest, best deal at Corazon Homes.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <p className="font-semibold text-gray-900 text-center">
              We are associated with RERA Registered & 'A' Category developers only.
            </p>
          </div>

          <p>
            <strong className="text-gray-800">India is a Land of Opportunities.</strong> The developing situation across the world has highlighted India as one of the preferred destinations for commerce and industry. A weaker Indian rupee makes Real Estate an enticing buy, thus transforming India into a land of opportunities for NRIs.
          </p>
          
          <p>
            An NRI or a Non-Resident Indian can buy property in India with complete ease. Thanks to the implementation of the <strong className="text-gray-800">RERA Act, 2016</strong>, the process has become much simpler, transparent, with committed timelines.
          </p>
          
          <p>
            Automation & Standardization in agriculture, Adaption of Information & Technology, and Demand in the Automobile Industry are a few factors enlarging economic growth. Hence, it increases the demand for affordable and luxury housing in India.
          </p>

          {/* Contact Box */}
          <div className="mt-12 p-8 bg-[#0f172a] rounded-xl text-center text-white shadow-lg">
            <h3 className="text-xl font-serif mb-2 text-yellow-500">Need Assistance?</h3>
            <p className="text-gray-300 mb-6">
              For more information about NRI Investment in India or NRI Home loan assistance.
            </p>
            <a 
              href="mailto:info@corazohomes.com" 
              className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
            >
              <Mail size={18} />
              info@corazohomes.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NRICorner;