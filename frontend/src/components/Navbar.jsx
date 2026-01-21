import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // State to track scroll position

  // Independent states for mobile dropdowns
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [benefitsDropdownOpen, setBenefitsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => {
    setIsOpen(false);
    setAboutDropdownOpen(false);
    setBenefitsDropdownOpen(false);
  };

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Updated nav class logic:
    // 1. Base: fixed w-full z-50 transition-all border-b
    // 2. Mobile (Default): 'bg-white' (Always white on mobile)
    // 3. Desktop (xl:): 'bg-transparent' (Transparent initially)
    // 4. Desktop Hover/Scroll: 'xl:hover:bg-white', 'xl:bg-white' (when scrolled)
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b 
      ${scrolled || isOpen 
        ? 'bg-white border-gray-100 shadow-sm' 
        : 'bg-white border-gray-100 xl:bg-transparent xl:border-transparent xl:hover:bg-white/95 xl:hover:backdrop-blur-md xl:hover:border-gray-100 xl:hover:shadow-sm'
      }`}
    >
      {/* Container - increased max-width for better spacing on large screens */}
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-serif font-bold tracking-wide text-gray-900 shrink-0" onClick={closeMenu}>
          CORAZON<span className="text-yellow-600">HOMES</span>
        </Link>
        
        {/* DESKTOP MENU */}
        <div className="hidden xl:flex items-center space-x-6 text-[13px] font-medium text-gray-700 uppercase tracking-wider">
          <Link to="/" className="hover:text-black transition">Home</Link>
          
          {/* About Us Dropdown */}
          <div className="relative group h-full">
            <button className="flex items-center gap-1 hover:text-black transition uppercase h-full py-2">
              About Us <ChevronDown size={14} />
            </button>
            <div className="absolute left-0 top-full w-56 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="flex flex-col py-2">
                <Link to="/about" className="px-6 py-3 hover:bg-gray-50 hover:text-yellow-600 transition text-xs" onClick={closeMenu}>About Company</Link>
                <Link to="/consultation" className="px-6 py-3 hover:bg-gray-50 hover:text-yellow-600 transition text-xs" onClick={closeMenu}>Consultation</Link>
                <Link to="/after-sales" className="px-6 py-3 hover:bg-gray-50 hover:text-yellow-600 transition text-xs" onClick={closeMenu}>After Sales</Link>
                <Link to="/nri-corner" className="px-6 py-3 hover:bg-gray-50 hover:text-yellow-600 transition text-xs" onClick={closeMenu}>NRI Corner</Link>
              </div>
            </div>
          </div>

          {/* Benefits Dropdown */}
          <div className="relative group h-full">
            <button className="flex items-center gap-1 hover:text-black transition uppercase h-full py-2">
              Benefits <ChevronDown size={14} />
            </button>
            <div className="absolute left-0 top-full w-56 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="flex flex-col py-2">
                <Link to="/free-consultation" className="px-6 py-3 hover:bg-gray-50 hover:text-yellow-600 transition text-xs" onClick={closeMenu}>Free Consultation</Link>
                <Link to="/home-loan" className="px-6 py-3 hover:bg-gray-50 hover:text-yellow-600 transition text-xs" onClick={closeMenu}>Home Loan</Link>
                <Link to="/group-booking" className="px-6 py-3 hover:bg-gray-50 hover:text-yellow-600 transition text-xs" onClick={closeMenu}>Group Booking Discount</Link>
                <Link to="/referral" className="px-6 py-3 hover:bg-gray-50 hover:text-yellow-600 transition text-xs" onClick={closeMenu}>Refferal</Link>
              </div>
            </div>
          </div>

          <Link to="/residential" className="hover:text-black transition">Residential</Link>
          <Link to="/commercial" className="hover:text-black transition">Commercial</Link>
          <Link to="/gallery" className="hover:text-black transition whitespace-nowrap">Achievement Gallery</Link>
          <a href="#" className="hover:text-black transition">Partners</a>
          <Link to="/careers" className="hover:text-black transition">Careers</Link>
          {/* Updated Contact Link */}
          <Link to="/contact" className="hover:text-black transition whitespace-nowrap">Contact Us</Link>
        </div>

        {/* RIGHT SIDE: Phone & Hamburger */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a href="tel:+917276004884" className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition text-xs sm:text-sm whitespace-nowrap">
            <Phone size={16} />
            <span>+91 72760 04884</span>
          </a>
          <button className="xl:hidden text-gray-900 focus:outline-none p-2" onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl py-6 px-6 flex flex-col space-y-4 max-h-[90vh] overflow-y-auto z-50">
          <Link to="/" className="text-lg font-medium text-gray-800 border-b border-gray-50 pb-2" onClick={closeMenu}>Home</Link>
          
          {/* About Mobile Dropdown */}
          <div>
            <button 
              onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
              className="flex items-center justify-between w-full text-lg font-medium text-gray-800 border-b border-gray-50 pb-2"
            >
              About Us <ChevronDown size={16} className={`transform transition-transform duration-300 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`pl-4 mt-2 flex flex-col space-y-3 text-gray-600 overflow-hidden transition-all duration-300 ${aboutDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <Link to="/about" onClick={closeMenu} className="py-1 block">About Company</Link>
              <Link to="/consultation" onClick={closeMenu} className="py-1 block">Consultation</Link>
              <Link to="/after-sales" onClick={closeMenu} className="py-1 block">After Sales</Link>
              <Link to="/nri-corner" onClick={closeMenu} className="py-1 block">NRI Corner</Link>
            </div>
          </div>

          {/* Benefits Mobile Dropdown */}
          <div>
            <button 
              onClick={() => setBenefitsDropdownOpen(!benefitsDropdownOpen)}
              className="flex items-center justify-between w-full text-lg font-medium text-gray-800 border-b border-gray-50 pb-2"
            >
              Benefits <ChevronDown size={16} className={`transform transition-transform duration-300 ${benefitsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`pl-4 mt-2 flex flex-col space-y-3 text-gray-600 overflow-hidden transition-all duration-300 ${benefitsDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <Link to="/free-consultation" onClick={closeMenu} className="py-1 block">Free Consultation</Link>
              <Link to="/home-loan" onClick={closeMenu} className="py-1 block">Home Loan</Link>
              <Link to="/group-booking" onClick={closeMenu} className="py-1 block">Group Booking Discount</Link>
              <Link to="/referral" onClick={closeMenu} className="py-1 block">Refferal</Link>
            </div>
          </div>

          <Link to="/residential" className="text-lg font-medium text-gray-800 border-b border-gray-50 pb-2" onClick={closeMenu}>Residential</Link>
          <Link to="/commercial" className="text-lg font-medium text-gray-800 border-b border-gray-50 pb-2" onClick={closeMenu}>Commercial</Link>
          <Link to="/gallery" className="text-lg font-medium text-gray-800 border-b border-gray-50 pb-2" onClick={closeMenu}>Achievement Gallery</Link>
          <a href="#" className="text-lg font-medium text-gray-800 border-b border-gray-50 pb-2" onClick={closeMenu}>Partners</a>
          <Link to="/careers" className="text-lg font-medium text-gray-800 border-b border-gray-50 pb-2" onClick={closeMenu}>Careers</Link>
          {/* Updated Contact Link for Mobile */}
          <Link to="/contact" className="text-lg font-medium text-gray-800 border-b border-gray-50 pb-2" onClick={closeMenu}>Contact Us</Link>
          
          <a href="tel:+917276004884" className="mt-4 flex justify-center items-center gap-2 px-4 py-3 bg-gray-900 text-white text-lg sm:hidden">
            <Phone size={20} />
            <span>Call Us Now</span>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;