import React from 'react';
import { Home, RefreshCw, CheckCircle } from 'lucide-react';

const AfterSales = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="font-serif text-4xl text-gray-900 mb-6 border-l-4 border-premium-gold pl-6">After Sales</h1>
        <p className="text-xl text-gray-500 mb-12 italic">
          "You’re not just a customer, you’re a member of our family..."
        </p>

        <div className="grid gap-12">
          {/* Home Loans Section */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-premium-100 p-4 rounded-full h-fit w-fit"><Home size={32} className="text-gray-800"/></div>
            <div>
              <h3 className="text-2xl font-serif text-gray-900 mb-3">Home Loans</h3>
              <p className="text-gray-600 leading-relaxed">
                Since most real estate projects are sanctioned by banks, getting a home loan or commercial loan is usually not a major task. But, sometimes developers insist the customers to take a loan from a particular bank only. Since, you are associated with Corazon Homes, we always make sure that decision of choosing a bank is constantly given to our customers for their home loan needs with proper due diligence.
              </p>
            </div>
          </div>

          {/* Updates Section */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-premium-100 p-4 rounded-full h-fit w-fit"><RefreshCw size={32} className="text-gray-800"/></div>
            <div>
              <h3 className="text-2xl font-serif text-gray-900 mb-3">Updates</h3>
              <p className="text-gray-600 leading-relaxed">
                Our after sales team will continuously keep you updated regularly with market analysis, project analysis with progress reports and photos. You will be able to contact us at any time for any issue related to your property that you bought through us and we ensure that each of your queries or doubts get resolved within 72 hours. We always keep finding ways to measure customer satisfaction and open for your valuable feedbacks to improve services time to time.
              </p>
            </div>
          </div>

          {/* Property Management Section */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-premium-100 p-4 rounded-full h-fit w-fit"><CheckCircle size={32} className="text-gray-800"/></div>
            <div>
              <h3 className="text-2xl font-serif text-gray-900 mb-3">Property Management</h3>
              <p className="text-gray-600 leading-relaxed">
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