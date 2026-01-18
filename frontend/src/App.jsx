import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Hero from './components/Hero';
import AchievementGallery from './components/AchievementGallery'; // Widget for Home
import Contact from './components/Contact';

// About Us Pages
import AboutUs from './pages/AboutUs/AboutUs';
import Consultation from './pages/AboutUs/Consultation';
import AfterSales from './pages/AboutUs/AfterSales';
import NRICorner from './pages/AboutUs/NRICorner';
import Careers from './pages/AboutUs/Careers';

// Benefits Pages
import FreeConsultation from './pages/Benefits/FreeConsultation';
import HomeLoan from './pages/Benefits/HomeLoan';
import GroupBooking from './pages/Benefits/GroupBooking';
import Referral from './pages/Benefits/Referral';

// NEW Pages
import Residential from './pages/Residential';
import Commercial from './pages/Commercial';
import UploadGallery from './pages/UploadGallery';
// IMPORT THE PAGE HERE
import AchievementGalleryPage from './pages/AchievementGalleryPage'; 

const Home = () => (
  <>
    <Hero />
    <section className="py-20 px-6 max-w-7xl mx-auto text-center bg-gray-50">
      <h2 className="font-serif text-3xl mb-4">Our Premium Projects</h2>
      <p className="text-gray-500 mb-8">Residential & Commercial Opportunities coming soon.</p>
    </section>
    
    {/* Small widget for Home Page */}
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
          
          {/* USE THE PAGE COMPONENT HERE */}
          <Route path="/gallery" element={<AchievementGalleryPage />} />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/after-sales" element={<AfterSales />} />
          <Route path="/nri-corner" element={<NRICorner />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/free-consultation" element={<FreeConsultation />} />
          <Route path="/home-loan" element={<HomeLoan />} />
          <Route path="/group-booking" element={<GroupBooking />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/secret-upload" element={<UploadGallery />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;