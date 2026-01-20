import React from 'react';

const Consultation = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-10 border-l-4 border-yellow-600 pl-6">
          Consultation Services
        </h1>
        
        <div className="bg-white p-8 md:p-12 shadow-sm rounded-xl border border-gray-100">
          <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg text-justify">
            <p>
              Corazon Homes covers an extensive range of the most attractive real estate sectors where we provide strategic advice to our clients at all stages of the acquisition process from sourcing and identification, valuation through to negotiation, and due diligence. 
            </p>
            <p>
              We’ve been developing a network of professionals that meet only the highest of standards. With their expertise and experience, you can depend on getting the best advice and support to feel completely confident that you are buying the best property at the best price under the best circumstances. Our goal is to help you find the property that perfectly suits your needs, goals, and desires.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 my-8">
              <p className="font-medium text-gray-800">
                At Corazon Homes, you will be with a dedicated professional at each stage who will be your single source-of-contact for all your needs.
              </p>
            </div>
            <p>
               Get all information about the project & property, its neighbourhood, amenities, and legalities under one roof.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Consultation;