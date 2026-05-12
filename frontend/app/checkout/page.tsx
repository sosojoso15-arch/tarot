import { Suspense } from 'react';
import { CheckoutContent } from './checkout-content';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center">Cargando...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
