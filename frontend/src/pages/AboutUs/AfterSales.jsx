import React from 'react';
import { Home, RefreshCw, CheckCircle } from 'lucide-react';

const AfterSales = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 border-l-4 border-yellow-600 pl-6">
            After Sales Service
          </h1>
          <p className="text-xl text-gray-500 italic pl-7">
            "You’re not just a customer, you’re a member of our family..."
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-12">
          
          {/* Home Loans */}
          <div className="flex flex-col md:flex-row gap-6 p-6 hover:bg-gray-50 rounded-xl transition duration-300">
            <div className="shrink-0">
              <div className="bg-gray-100 p-4 rounded-full text-yellow-600">
                <Home size={32} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-serif text-gray-900 mb-3">Home Loans</h3>
              <p className="text-gray-600 leading-relaxed text-justify">
                Since most real estate projects are sanctioned by banks, getting a home loan or commercial loan is usually not a major task. But, sometimes developers insist customers take a loan from a particular bank only. Since you are associated with Corazon Homes, we always make sure that the decision of choosing a bank is constantly given to our customers for their home loan needs with proper due diligence.
              </p>
            </div>
          </div>

          {/* Updates */}
          <div className="flex flex-col md:flex-row gap-6 p-6 hover:bg-gray-50 rounded-xl transition duration-300">
            <div className="shrink-0">
              <div className="bg-gray-100 p-4 rounded-full text-yellow-600">
                <RefreshCw size={32} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-serif text-gray-900 mb-3">Updates</h3>
              <p className="text-gray-600 leading-relaxed text-justify">
                Our after-sales team will continuously keep you updated regularly with market analysis, project analysis with progress reports and photos. You will be able to contact us at any time for any issue related to your property that you bought through us and we ensure that each of your queries or doubts get resolved within 72 hours. We always keep finding ways to measure customer satisfaction and open for your valuable feedbacks to improve services time to time.
              </p>
            </div>
          </div>

          {/* Property Management */}
          <div className="flex flex-col md:flex-row gap-6 p-6 hover:bg-gray-50 rounded-xl transition duration-300">
            <div className="shrink-0">
              <div className="bg-gray-100 p-4 rounded-full text-yellow-600">
                <CheckCircle size={32} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-serif text-gray-900 mb-3">Property Management</h3>
              <p className="text-gray-600 leading-relaxed text-justify">
                We assist our customers from start to finish, including getting finance, through the legitimate procedure, beautification and interiors, to leasing and reselling. Whilst we coordinate deliveries and installations all you’ll have to worry about is enjoying the final result.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AfterSales;