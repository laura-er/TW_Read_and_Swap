import { HeroSection } from '@/components/client/home/HeroSection';
import { StatsBar } from '@/components/client/home/StatsBar';
import { FeaturedBooks } from '@/components/client/home/FeaturedBooks';
import { HowItWorks } from '@/components/client/home/HowItWorks';
import { Footer } from '@/components/client/home/Footer';

export function HomePage() {
    return (
        <div style={{ marginTop: '-32px', marginLeft: '0', marginRight: '0', overflowX: 'hidden' }}>
            <HeroSection />
            <StatsBar />
            <FeaturedBooks />
            <HowItWorks />
            <Footer />
        </div>
    );
}