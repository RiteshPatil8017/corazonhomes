import React, { useState } from 'react';
import { submitFormToFirebase } from '../../utils/formSubmit';
import { MessageSquare } from 'lucide-react';

const FreeConsultation = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', city: '',
    requirement: '', budget: '', location: '', possession: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await submitFormToFirebase('free_consultations', formData);
    if (result.success) {
      alert("Request submitted successfully!");
      setFormData({ name: '', mobile: '', email: '', city: '', requirement: '', budget: '', location: '', possession: '' });
    } else {
      alert("Error submitting request.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-24 px-4 sm:px-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        <div className="w-full lg:w-4/12 bg-yellow-500 text-white p-10 flex flex-col justify-center relative">
          <MessageSquare size={48} className="text-[#0f172a] mb-6" />
          <h2 className="text-4xl font-serif font-bold mb-4 text-[#0f172a]">Free Consultation</h2>
          <p className="text-[#0f172a]/80 leading-relaxed font-medium">
            Confused about where to invest? Our experts are here to guide you through property selection, legalities, and financing.
          </p>
        </div>

        <div className="w-full lg:w-8/12 bg-white p-10 lg:p-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 font-serif">Book Your Session</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Name" required className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
              <input name="mobile" value={formData.mobile} onChange={handleChange} type="tel" placeholder="Mobile" required className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
              <input name="city" value={formData.city} onChange={handleChange} type="text" placeholder="City" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select name="requirement" value={formData.requirement} onChange={handleChange} className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none bg-transparent text-gray-600">
                <option value="">Requirement</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="Commercial">Commercial</option>
              </select>
              <input name="budget" value={formData.budget} onChange={handleChange} type="text" placeholder="Budget" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <input name="location" value={formData.location} onChange={handleChange} type="text" placeholder="Preferred Location" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
               <input name="possession" value={formData.possession} onChange={handleChange} type="text" placeholder="Possession Timeline" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
            </div>
            
            <button type="submit" disabled={loading} className={`w-full bg-[#0f172a] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 uppercase tracking-widest text-sm ${loading ? 'opacity-70' : ''}`}>
              {loading ? 'Submitting...' : 'Request Consultation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default FreeConsultation;