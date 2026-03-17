import { Navbar } from '@/components/Navbar';

export function Stash() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-tea mb-6">线材库</h1>
        <p className="text-tea/60">管理你的线材库存...</p>
      </main>
    </div>
  );
}
