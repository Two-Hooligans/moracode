import Header from '../components/Header';
import HeroSection from '../sections/HeroSection';
import TeamsSection from '../sections/TeamsSection';
import FeaturesSection from '../sections/FeaturesSection';
import SetupGuideSection from '../sections/SetupGuideSection';

function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <TeamsSection />
      <FeaturesSection />
      <SetupGuideSection />
    </>
  );
}

export default HomePage;