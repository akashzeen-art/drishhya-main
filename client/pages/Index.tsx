import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedSection } from '@/components/sections/FeaturedSection';
import { TopPicksSection } from '@/components/sections/TopPicksSection';
import { ActionSection } from '@/components/sections/ActionSection';
import { TrendingSection } from '@/components/sections/TrendingSection';
import { RomanceSection } from '@/components/sections/RomanceSection';
import { MostWatchedSection } from '@/components/sections/MostWatchedSection';
import { ThrillerSection } from '@/components/sections/ThrillerSection';
import { BestOfWeekSection } from '@/components/sections/BestOfWeekSection';
import { CriticsChoiceSection } from '@/components/sections/CriticsChoiceSection';
import { GridCollectionSection } from '@/components/sections/GridCollectionSection';
import { StaffPicksSection } from '@/components/sections/StaffPicksSection';

const Index = () => {
  return (
    <Layout>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Section - landscape thumbnails 1-4 */}
      <FeaturedSection />

      {/* 3. Top Picks Section - portrait thumbnails 5-16 */}
      <TopPicksSection />

      {/* 4. Action Section - landscape thumbnail 27 */}
      <ActionSection />

      {/* 5. Trending Section - portrait thumbnails 17-24 */}
      <TrendingSection />

      {/* 6. Romance Section - landscape thumbnail 24 */}
      <RomanceSection />

      {/* 7. Most Watched Section - portrait thumbnails 25-32 */}
      <MostWatchedSection />

      {/* 8. Thriller Section - landscape thumbnail 28 */}
      <ThrillerSection />

      {/* 9. Best of Week Section - portrait thumbnails 33-40 */}
      <BestOfWeekSection />

      {/* 10. Critics Choice Section - portrait thumbnails 41-48 */}
      <CriticsChoiceSection />

      {/* 11. Wellness Collection - portrait thumbnails 57-68 */}
      <GridCollectionSection
        title="WELLNESS COLLECTION"
        description="Content Universe"
        accentColor="emerald"
        startIndex={56}
      />

      {/* 12. Staff Picks Section - portrait thumbnails 49-56 */}
      <StaffPicksSection />

      {/* 13. Floating Universe - portrait thumbnails 69-80 */}
      <GridCollectionSection
        title="FLOATING UNIVERSE"
        description="Explore infinite possibilities"
        accentColor="purple"
        startIndex={68}
      />

      {/* 14. Desi Content Universe - portrait thumbnails 81-92 */}
      <GridCollectionSection
        title="DESI CONTENT UNIVERSE"
        description="Cooking & Entertainment"
        accentColor="orange"
        startIndex={80}
      />
    </Layout>
  );
};

export default Index;
