import { HeroSection } from '@/components/client/home/HeroSection';
import { StatsBar } from '@/components/client/home/StatsBar';
import { FeaturedBooks } from '@/components/client/home/FeaturedBooks';
import { HowItWorks } from '@/components/client/home/HowItWorks';
import { Footer } from '@/components/client/home/Footer';

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <FeaturedBooks />
      <HowItWorks />
      <Footer />
    </main>
  );
}
