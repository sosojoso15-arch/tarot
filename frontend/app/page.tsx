'use client';

import HeroNew from '@/components/landing/HeroNew';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TarotistsGrid from '@/components/landing/TarotistsGrid';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import FooterNew from '@/components/shared/FooterNew';

export default function Home() {
  return (
    <main className="bg-white">
      <HeroNew />
      <HowItWorksSection />
      <TarotistsGrid />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <FooterNew />
    </main>
  );
}
