'use client';

import FeaturesSection from '@/components/landing/FeaturesSection';
import HeroSection from '@/components/landing/HeroSection';
import LandingPageFooter from '@/components/landing/LandingPageFooter';
import LandingPageHeader from '@/components/landing/LandingPageHeader';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <LandingPageHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
      <LandingPageFooter />
    </div>
  );
};

export default LandingPage;
