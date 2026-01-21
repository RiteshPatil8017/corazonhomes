import React from 'react';
import AchievementGallery from '../components/AchievementGallery';

const AchievementGalleryPage = () => {
  return (
    // Increased top padding to pt-36 to create space after Hero section
    <div className="pt-36">
      {/* Reusing the component without a limit to show ALL images */}
      <AchievementGallery />
    </div>
  );
};

export default AchievementGalleryPage;