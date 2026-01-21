import React from 'react';
import AchievementGallery from '../components/AchievementGallery';

const AchievementGalleryPage = () => {
  return (
    // Reduced from pt-36 to pt-24 for less space below navbar
    <div className="pt-16">
      {/* Reusing the component without a limit to show ALL images */}
      <AchievementGallery />
    </div>
  );
};

export default AchievementGalleryPage;