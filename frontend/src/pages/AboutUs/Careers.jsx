import React, { useState } from 'react';
import { db } from '../../firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { Briefcase, User, Upload } from 'lucide-react';

const Careers = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', city: '',
    gender: '', age: '', category: 'Real Estate',
    experience: '', education: '', about: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "job_applications"), {
        ...formData,
        submittedAt: new Date()
      });
      alert("Application Submitted Successfully!");
      setFormData({ 
        name: '', mobile: '', email: '', city: '', gender: '', 
        age: '', category: 'Real Estate', experience: '', education: '', about: ''
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting application.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-24 px-4 sm:px-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side: Info */}
        <div className="w-full lg:w-4/12 bg-[#0f172a] text-white p-10 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-500 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
          <Briefcase size={48} className="text-yellow-500 mb-6" />
          <h2 className="text-4xl font-serif font-bold mb-4">Join Our Team</h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Build your career with Corazon Homes. We are looking for passionate individuals ready to redefine the real estate experience.
          </p>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> Growth Opportunities</li>
            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> Dynamic Work Culture</li>
            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> Competitive Pay</li>
          </ul>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-8/12 bg-white p-10 lg:p-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 font-serif">Application Form</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Full Name" required className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none transition placeholder-gray-400" />
              <input name="mobile" value={formData.mobile} onChange={handleChange} type="tel" placeholder="Mobile Number" required className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none transition placeholder-gray-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email Address" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none transition placeholder-gray-400" />
              <input name="city" value={formData.city} onChange={handleChange} type="text" placeholder="Current City" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none transition placeholder-gray-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <select name="gender" onChange={handleChange} value={formData.gender} className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none text-gray-600 bg-transparent">
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input name="age" value={formData.age} onChange={handleChange} type="number" placeholder="Age" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none transition placeholder-gray-400" />
              <select name="category" onChange={handleChange} value={formData.category} className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none text-gray-600 bg-transparent">
                <option value="Real Estate">Real Estate</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="experience" value={formData.experience} onChange={handleChange} type="text" placeholder="Years of Experience" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none transition placeholder-gray-400" />
              <input name="education" value={formData.education} onChange={handleChange} type="text" placeholder="Education / Degree" className="w-full h-12 border-b-2 border-gray-300 focus:border-yellow-600 focus:outline-none transition placeholder-gray-400" />
            </div>

            <div className="relative group cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
              <div className="flex items-center justify-center gap-3 text-gray-500">
                <Upload size={20} />
                <span>Upload Resume (PDF/Doc) - Optional</span>
              </div>
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>

            <textarea name="about" value={formData.about} onChange={handleChange} placeholder="Tell us a bit about yourself..." rows="3" className="w-full border-2 border-gray-100 rounded-lg p-4 focus:outline-none focus:border-yellow-600 resize-none bg-gray-50"></textarea>

            <button type="submit" disabled={loading} className={`w-full bg-[#0f172a] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 uppercase tracking-widest text-sm ${loading ? 'opacity-70' : ''}`}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Careers;