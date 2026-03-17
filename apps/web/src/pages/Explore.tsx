import { Navbar } from '@/components/Navbar';

export function Explore() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-tea mb-6">社区探索</h1>
        <p className="text-tea/60">浏览社区中的精彩作品...</p>
      </main>
    </div>
  );
}
