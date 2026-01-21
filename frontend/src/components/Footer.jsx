import React from 'react';
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/corazon-logo.png'; // Ensure your logo is saved here

const Footer = () => {
  return (
    <footer className="bg-[#0a1e36] text-white pt-12 md:pt-16 pb-8 border-t-4 border-yellow-600">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        
        {/* SECTION 1: ABOUT US */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-bold mb-4 md:mb-6 tracking-wider text-yellow-500">ABOUT US</h3>
          <Link to="/" className="inline-block mb-6">
            {/* Removed 'bg-white' class to respect PNG transparency */}
            <img src={logo} alt="Corazon Homes" className="h-12 md:h-14 p-2" />
          </Link>
          
          <div className="mb-6">
            <h4 className="font-bold mb-4 text-sm text-gray-300">FOLLOW US</h4>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-white text-[#0a1e36] rounded-full hover:bg-yellow-600 hover:text-white transition duration-300"><Facebook size={16} /></a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-white text-[#0a1e36] rounded-full hover:bg-yellow-600 hover:text-white transition duration-300"><Instagram size={16} /></a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-white text-[#0a1e36] rounded-full hover:bg-yellow-600 hover:text-white transition duration-300"><Linkedin size={16} /></a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-white text-[#0a1e36] rounded-full hover:bg-yellow-600 hover:text-white transition duration-300"><Twitter size={16} /></a>
            </div>
          </div>
          <p className="font-bold text-yellow-500 text-sm">RERA No: A52100028952</p>
        </div>

        {/* SECTION 2: QUICK ACCESS */}
        <div>
          <h3 className="text-lg font-bold mb-4 md:mb-6 tracking-wider text-yellow-500">QUICK ACCESS</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><Link to="/about" className="hover:text-yellow-500 transition flex items-center group"><span className="text-yellow-600 mr-2 group-hover:translate-x-1 transition">›</span> About Us</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-500 transition flex items-center group"><span className="text-yellow-600 mr-2 group-hover:translate-x-1 transition">›</span> Contact Us</Link></li>
            <li><a href="#" className="hover:text-yellow-500 transition flex items-center group"><span className="text-yellow-600 mr-2 group-hover:translate-x-1 transition">›</span> EMI Calculator</a></li>
            <li><Link to="/gallery" className="hover:text-yellow-500 transition flex items-center group"><span className="text-yellow-600 mr-2 group-hover:translate-x-1 transition">›</span> Achievement</Link></li>
            <li><a href="#" className="hover:text-yellow-500 transition flex items-center group"><span className="text-yellow-600 mr-2 group-hover:translate-x-1 transition">›</span> Our Partner</a></li>
          </ul>
        </div>

        {/* SECTION 3: TERMS */}
        <div>
          <h3 className="text-lg font-bold mb-4 md:mb-6 tracking-wider text-yellow-500">TERMS</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><a href="#" className="hover:text-yellow-500 transition flex items-center group"><span className="text-yellow-600 mr-2 group-hover:translate-x-1 transition">›</span> Terms of Services</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition flex items-center group"><span className="text-yellow-600 mr-2 group-hover:translate-x-1 transition">›</span> Privacy Policy</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition flex items-center group"><span className="text-yellow-600 mr-2 group-hover:translate-x-1 transition">›</span> Disclaimer</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition flex items-center group"><span className="text-yellow-600 mr-2 group-hover:translate-x-1 transition">›</span> FAQ</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition flex items-center group"><span className="text-yellow-600 mr-2 group-hover:translate-x-1 transition">›</span> Help</a></li>
          </ul>
        </div>

        {/* SECTION 4: CONTACT US */}
        <div>
          <h3 className="text-lg font-bold mb-4 md:mb-6 tracking-wider text-yellow-500">CONTACT US</h3>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start">
              <MapPin className="text-yellow-500 mr-3 shrink-0 mt-0.5" size={18} />
              <span className="leading-relaxed">Office No 404, City Avenue, Near Hotel Sayaji, Wakad Pune - 411057</span>
            </li>
            <li className="flex items-center">
              <Phone className="text-yellow-500 mr-3 shrink-0" size={18} />
              <a href="tel:+917276004884" className="hover:text-white transition">+91-7276004884</a>
            </li>
            <li className="flex items-center">
              <Mail className="text-yellow-500 mr-3 shrink-0" size={18} />
              <a href="mailto:sales@corazonhomes.com" className="hover:text-yellow-500 transition break-all">sales@corazonhomes.com</a>
            </li>
            <li className="flex items-center">
              <Globe className="text-yellow-500 mr-3 shrink-0" size={18} />
              <a href="http://www.corazonhomes.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition break-all">www.corazonhomes.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 flex justify-center items-center text-xs text-gray-500">
        <p>© 2026 Corazon Homes. All Right Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;