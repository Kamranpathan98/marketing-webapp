import HeroSection from '@/components/sections/HeroSection';
import SpeedComparisonSection from '@/components/sections/SpeedComparisonSection';
import InlineDemoSection from '@/components/demo/InlineDemoSection';

export default function HomePage() {
  return (
    <main className="bg-surface min-h-screen">
      <HeroSection />
      <SpeedComparisonSection />
      <InlineDemoSection />
    </main>
  );
}
