import React, { useState } from 'react';
import { submitFormToFirebase } from '../../utils/formSubmit';
import { Handshake } from 'lucide-react';

const Referral = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    applicantType: '', applicantName: '', mobile: '', email: '',
    dob: '', gender: '', address: '', workingInRealEstate: '',
    companyName: '', consent: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await submitFormToFirebase('referrals', formData);
    if (result.success) {
      alert("Application submitted!");
      setFormData({ applicantType: '', applicantName: '', mobile: '', email: '', dob: '', gender: '', address: '', workingInRealEstate: '', companyName: '', consent: false });
    } else {
      alert("Error submitting application.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-24 px-4 sm:px-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        <div className="w-full lg:w-4/12 bg-[#0f172a] text-white p-10 flex flex-col justify-center">
          <Handshake size={48} className="text-yellow-500 mb-6" />
          <h2 className="text-4xl font-serif font-bold mb-4">Refer & Earn</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Become a Corazon Connector. Refer your leads and earn attractive payouts up to ₹25,000 per booking.
          </p>
          <div className="bg-white/10 p-4 rounded-lg text-sm text-gray-300">
             <p className="mb-2"><strong>Benefits:</strong> Zero joining fee.</p>
             <p><strong>Payouts:</strong> Within 60 days of agreement.</p>
          </div>
        </div>

        <div className="w-full lg:w-8/12 bg-white p-10 lg:p-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 font-serif">Connector Application</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select name="applicantType" value={formData.applicantType} onChange={handleChange} className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none bg-transparent text-gray-600">
                <option value="">Applicant Type</option>
                <option value="Individual">Individual</option>
                <option value="Company">Company</option>
              </select>
               <input name="applicantName" value={formData.applicantName} onChange={handleChange} type="text" placeholder="Applicant Name" required className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <input name="mobile" value={formData.mobile} onChange={handleChange} type="tel" placeholder="Mobile" required className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
               <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <input name="dob" value={formData.dob} onChange={handleChange} type="text" placeholder="DOB (YYYY-MM-DD)" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
               <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none bg-transparent text-gray-600">
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
               </select>
               <select name="workingInRealEstate" value={formData.workingInRealEstate} onChange={handleChange} className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none bg-transparent text-gray-600">
                  <option value="">Working in Real Estate?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
               </select>
             </div>

             <input name="address" value={formData.address} onChange={handleChange} type="text" placeholder="Full Address" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
             <input name="companyName" value={formData.companyName} onChange={handleChange} type="text" placeholder="Company Name (If applicable)" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />

             <div className="flex items-center gap-2 mt-4">
              <input name="consent" checked={formData.consent} onChange={handleChange} type="checkbox" id="consent" className="w-4 h-4 text-yellow-600 rounded" />
              <label htmlFor="consent" className="text-gray-600 text-sm cursor-pointer">I consent to be contacted by Corazon Homes.</label>
            </div>

            <button type="submit" disabled={loading} className={`w-full bg-[#0f172a] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 uppercase tracking-widest text-sm ${loading ? 'opacity-70' : ''}`}>
              {loading ? 'Submitting...' : 'Register as Connector'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Referral;