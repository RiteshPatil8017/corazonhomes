import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Hero from './components/Hero';
import AchievementGallery from './components/AchievementGallery'; 
import Contact from './components/Contact';

// Pages
import AboutUs from './pages/AboutUs/AboutUs';
import Consultation from './pages/AboutUs/Consultation';
import AfterSales from './pages/AboutUs/AfterSales';
import NRICorner from './pages/AboutUs/NRICorner';
import Careers from './pages/AboutUs/Careers';
import FreeConsultation from './pages/Benefits/FreeConsultation';
import HomeLoan from './pages/Benefits/HomeLoan';
import GroupBooking from './pages/Benefits/GroupBooking';
import Referral from './pages/Benefits/Referral';
import Residential from './pages/Residential';
import Commercial from './pages/Commercial';
import AchievementGalleryPage from './pages/AchievementGalleryPage'; 
import EMICalculator from './pages/EMICalculator';

// Unified Admin Page
import Admin from './pages/Admin'; 

const Home = () => (
  <>
    <Hero />
    <section className="py-20 px-6 max-w-7xl mx-auto text-center bg-gray-50">
      <h2 className="font-serif text-3xl mb-4">Our Premium Projects</h2>
      <p className="text-gray-500 mb-8">Residential & Commercial Opportunities coming soon.</p>
    </section>
    <AchievementGallery limit={3} />
  </>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/residential" element={<Residential />} />
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/gallery" element={<AchievementGalleryPage />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* About & Benefits */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/after-sales" element={<AfterSales />} />
          <Route path="/nri-corner" element={<NRICorner />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/free-consultation" element={<FreeConsultation />} />
          <Route path="/home-loan" element={<HomeLoan />} />
          <Route path="/group-booking" element={<GroupBooking />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/emi-calculator" element={<EMICalculator />} />

          {/* SINGLE ADMIN ROUTE */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;