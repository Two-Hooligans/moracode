import Header from '../components/Header';
import HeroSection from '../sections/HeroSection';
import TeamsSection from '../sections/TeamsSection';
import FeaturesSection from '../sections/FeaturesSection';
import SetupGuideSection from '../sections/SetupGuideSection';
import CommunitySection from '../sections/CommunitySection';

function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <TeamsSection />
      <FeaturesSection />
      <SetupGuideSection />
      <CommunitySection/>
    </>
  );
}

export default HomePage;