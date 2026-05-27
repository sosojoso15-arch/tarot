'use client';

import HeroNew from '@/components/landing/HeroNew';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TarotistsGrid from '@/components/landing/TarotistsGrid';
import FinalCTASection from '@/components/landing/FinalCTASection';
import FooterNew from '@/components/shared/FooterNew';

export default function Home() {
  return (
    <main className="bg-slate-950">
      <HeroNew />
      <TarotistsGrid />
      <HowItWorksSection />
      <FinalCTASection />
      <FooterNew />
    </main>
  );
}
