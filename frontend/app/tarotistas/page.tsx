import { Suspense } from 'react';
import { TarotistasContent } from './tarotistas-content';

export default function TarotistasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center">Cargando...</div>}>
      <TarotistasContent />
    </Suspense>
  );
}
