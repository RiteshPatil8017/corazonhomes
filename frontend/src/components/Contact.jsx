import React, { useState } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { submitFormToFirebase } from '../utils/formSubmit';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    cityName: '',
    enquiryFor: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await submitFormToFirebase('contact_inquiries', formData);

    if (result.success) {
      alert("Message sent successfully! We will contact you soon.");
      setFormData({
        name: '', mobile: '', email: '', cityName: '', enquiryFor: '', message: ''
      });
    } else {
      alert("Failed to send message. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      
      {/* Centered Card Container */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* LEFT SIDE: Contact Information (Dark Premium Blue) */}
        <div className="w-full lg:w-5/12 bg-[#0f172a] text-white p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-2 text-yellow-500">Get in Touch</h2>
            <p className="text-gray-400 mb-10 text-sm">We'd love to hear from you. Visit us at any of our branches.</p>
            
            <div className="space-y-8 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {/* Head Office */}
              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0 group-hover:bg-yellow-500 transition duration-300">
                   <MapPin className="text-yellow-500 group-hover:text-[#0f172a]" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Head Office</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mt-1">
                    Echoing Greens, 301 & 302, Wakad Road, Shankar Kalat Nagar, Wakad, Pune - 411057
                  </p>
                  <p className="text-xs text-yellow-500 mt-2 font-medium">Head: Mr. Vishal Paithane (+91 9021900253)</p>
                </div>
              </div>

              {/* Pune Branch */}
              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0 group-hover:bg-yellow-500 transition duration-300">
                   <MapPin className="text-yellow-500 group-hover:text-[#0f172a]" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Kharadi Branch</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mt-1">
                    Office No 204, Arresa Avenue, Above HDFC Bank, Fountain Road, Pune – 411014
                  </p>
                  <p className="text-xs text-yellow-500 mt-2 font-medium">Head: Mr. Abhijeet Gawali (+91 8329956611)</p>
                </div>
              </div>

               {/* Mumbai Branch */}
               <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0 group-hover:bg-yellow-500 transition duration-300">
                   <MapPin className="text-yellow-500 group-hover:text-[#0f172a]" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Mumbai Branch</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mt-1">
                    Office no.46, 5th Floor, High Street Mall, Kapurbavdi, Thane (W) 400607
                  </p>
                  <p className="text-xs text-yellow-500 mt-2 font-medium">Head: Mr. Akash Sumaria (+91 9021900251)</p>
                </div>
              </div>

               {/* Dubai Branch */}
               <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0 group-hover:bg-yellow-500 transition duration-300">
                   <MapPin className="text-yellow-500 group-hover:text-[#0f172a]" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Dubai Office</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mt-1">
                    Office No 2505-042, 25th Floor, Iris Bay Tower, Business Bay, Dubai UAE
                  </p>
                  <p className="text-xs text-yellow-500 mt-2 font-medium">Head: Mr. Malay Harania (+971 52 6484455)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-800 flex items-center gap-3">
            <Mail className="text-yellow-500" size={20} />
            <a href="mailto:info@corazonhomes.com" className="text-gray-300 hover:text-white transition">info@corazonhomes.com</a>
          </div>
        </div>

        {/* RIGHT SIDE: The Form (Clean White) */}
        <div className="w-full lg:w-7/12 bg-white p-10 lg:p-14">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Send a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input 
                  name="name" value={formData.name} onChange={handleChange}
                  type="text" required
                  className="peer w-full h-12 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-yellow-600 placeholder-transparent"
                  placeholder="Name"
                />
                <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                  Your Name
                </label>
              </div>

              <div className="relative">
                <input 
                  name="mobile" value={formData.mobile} onChange={handleChange}
                  type="tel" required
                  className="peer w-full h-12 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-yellow-600 placeholder-transparent"
                  placeholder="Mobile"
                />
                <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                  Mobile Number
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input 
                  name="email" value={formData.email} onChange={handleChange}
                  type="email" required
                  className="peer w-full h-12 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-yellow-600 placeholder-transparent"
                  placeholder="Email"
                />
                <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                  Email Address
                </label>
              </div>

              <div className="relative">
                <input 
                  name="cityName" value={formData.cityName} onChange={handleChange}
                  type="text"
                  className="peer w-full h-12 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-yellow-600 placeholder-transparent"
                  placeholder="City"
                />
                <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                  City Name
                </label>
              </div>
            </div>

            <div className="relative">
              <input 
                name="enquiryFor" value={formData.enquiryFor} onChange={handleChange}
                type="text"
                className="peer w-full h-12 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-yellow-600 placeholder-transparent"
                placeholder="Enquiry"
              />
              <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                Enquiry For
              </label>
            </div>

            <div className="relative mt-4">
              <textarea 
                name="message" value={formData.message} onChange={handleChange}
                rows="4" required
                className="peer w-full border-2 border-gray-100 rounded-lg p-4 text-gray-900 focus:outline-none focus:border-yellow-600 focus:ring-0 resize-none bg-gray-50"
                placeholder="Write your message..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-[#0f172a] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-yellow-600 hover:shadow-xl transition duration-300 flex items-center justify-center gap-2 uppercase tracking-widest text-sm ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Sending...' : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;