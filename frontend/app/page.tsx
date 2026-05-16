'use client';

import HeroNew from '@/components/landing/HeroNew';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TarotistsGrid from '@/components/landing/TarotistsGrid';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import FooterNew from '@/components/shared/FooterNew';

export default function Home() {
  return (
    <main className="bg-white">
      <HeroNew />
      <HowItWorksSection />
      <TarotistsGrid />
      <TestimonialsSection />
      <FinalCTASection />
      <FooterNew />
    </main>
  );
}
