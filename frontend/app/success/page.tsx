import { Suspense } from 'react';
import { SuccessContent } from './success-content';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function SuccessPage() {
  return (
    <div>
      <Header />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </div>
  );
}
