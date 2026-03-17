import { Navbar } from '@/components/Navbar';

export function Tools() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-tea mb-6">实用工具</h1>
        <p className="text-tea/60">编织实用工具箱...</p>
      </main>
    </div>
  );
}
