import React, { useState } from 'react';
import { submitFormToFirebase } from '../../utils/formSubmit';
import { Users } from 'lucide-react';

const GroupBooking = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', mobile: '', requirement: '', unitType: '',
    location: '', groupSize: '', budgetPerPerson: '', buyingTime: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await submitFormToFirebase('group_bookings', formData);
    if (result.success) {
      alert("Inquiry submitted!");
      setFormData({ name: '', mobile: '', requirement: '', unitType: '', location: '', groupSize: '', budgetPerPerson: '', buyingTime: '' });
    } else {
      alert("Error submitting inquiry.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-24 px-4 sm:px-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        <div className="w-full lg:w-4/12 bg-yellow-500 text-white p-10 flex flex-col justify-center">
          <Users size={48} className="text-[#0f172a] mb-6" />
          <h2 className="text-4xl font-serif font-bold mb-4 text-[#0f172a]">Group Booking</h2>
          <p className="text-[#0f172a]/80 leading-relaxed font-medium">
            Book together and save more. Exclusive discounts available for corporate groups, families, and friends.
          </p>
        </div>

        <div className="w-full lg:w-8/12 bg-white p-10 lg:p-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 font-serif">Group Deal Inquiry</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Name" required className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
               <input name="mobile" value={formData.mobile} onChange={handleChange} type="tel" placeholder="Mobile" required className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <input name="requirement" value={formData.requirement} onChange={handleChange} type="text" placeholder="Requirement Details" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
               <select name="unitType" value={formData.unitType} onChange={handleChange} className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none bg-transparent text-gray-600">
                <option value="">Unit Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Plot">Plot</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <input name="location" value={formData.location} onChange={handleChange} type="text" placeholder="Preferred Location" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
               <input name="groupSize" value={formData.groupSize} onChange={handleChange} type="number" placeholder="Group Size (No. of People)" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <input name="budgetPerPerson" value={formData.budgetPerPerson} onChange={handleChange} type="text" placeholder="Budget Per Person" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
               <select name="buyingTime" value={formData.buyingTime} onChange={handleChange} className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none bg-transparent text-gray-600">
                <option value="">Buying Timeline</option>
                <option value="Immediate">Immediate</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months+">6 Months+</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className={`w-full bg-[#0f172a] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 uppercase tracking-widest text-sm ${loading ? 'opacity-70' : ''}`}>
              {loading ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default GroupBooking;