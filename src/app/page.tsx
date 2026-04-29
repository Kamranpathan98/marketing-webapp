import HeroSection from '@/components/sections/HeroSection';
import InlineDemoSection from '@/components/demo/InlineDemoSection';

export default function HomePage() {
  return (
    <main className="bg-surface min-h-screen">
      <HeroSection />
      <InlineDemoSection />
    </main>
  );
}
