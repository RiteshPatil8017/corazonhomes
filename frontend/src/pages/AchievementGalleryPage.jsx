import React from 'react';
import AchievementGallery from '../components/AchievementGallery';

const AchievementGalleryPage = () => {
  return (
    <div className="pt-24">
      {/* Reusing the component without a limit to show ALL images */}
      <AchievementGallery />
    </div>
  );
};

export default AchievementGalleryPage;