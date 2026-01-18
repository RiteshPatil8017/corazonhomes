import React, { useState } from 'react';
import { submitFormToFirebase } from '../../utils/formSubmit';
import { Landmark } from 'lucide-react';

const HomeLoan = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', finalizedProperty: '',
    loanAmount: '', profession: '', income: '', age: '',
    existingEMI: '', cibilScore: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await submitFormToFirebase('home_loan_inquiries', formData);
    if (result.success) {
      alert("Inquiry submitted!");
      setFormData({ name: '', mobile: '', email: '', finalizedProperty: '', loanAmount: '', profession: '', income: '', age: '', existingEMI: '', cibilScore: '' });
    } else {
      alert("Error submitting inquiry.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-24 px-4 sm:px-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        <div className="w-full lg:w-4/12 bg-[#0f172a] text-white p-10 flex flex-col justify-center">
          <Landmark size={48} className="text-yellow-500 mb-6" />
          <h2 className="text-4xl font-serif font-bold mb-4">Home Loans</h2>
          <p className="text-gray-400 leading-relaxed">
            Get the best interest rates and hassle-free processing. We partner with top banks to make your dream home a reality.
          </p>
        </div>

        <div className="w-full lg:w-8/12 bg-white p-10 lg:p-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 font-serif">Loan Assistance Form</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Name" required className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
               <input name="mobile" value={formData.mobile} onChange={handleChange} type="tel" placeholder="Mobile" required className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
              <select name="finalizedProperty" value={formData.finalizedProperty} onChange={handleChange} className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none bg-transparent text-gray-600">
                <option value="">Property Finalized?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <input name="loanAmount" value={formData.loanAmount} onChange={handleChange} type="text" placeholder="Required Loan Amount" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
               <select name="profession" value={formData.profession} onChange={handleChange} className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none bg-transparent text-gray-600">
                <option value="">Profession</option>
                <option value="Salaried">Salaried</option>
                <option value="Self Employed">Self Employed</option>
                <option value="Business">Business</option>
              </select>
              <input name="income" value={formData.income} onChange={handleChange} type="text" placeholder="Monthly Income" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <input name="age" value={formData.age} onChange={handleChange} type="number" placeholder="Age" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
               <input name="existingEMI" value={formData.existingEMI} onChange={handleChange} type="text" placeholder="Existing EMI" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
               <input name="cibilScore" value={formData.cibilScore} onChange={handleChange} type="text" placeholder="CIBIL Score" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none" />
            </div>

            <button type="submit" disabled={loading} className={`w-full bg-[#0f172a] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 uppercase tracking-widest text-sm ${loading ? 'opacity-70' : ''}`}>
              {loading ? 'Processing...' : 'Check Eligibility'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default HomeLoan;