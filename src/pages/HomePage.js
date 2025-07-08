import Header from '../components/Header';
import HeroSection from '../sections/HeroSection';
import TeamsSection from '../sections/TeamsSection';
import FeaturesSection from '../sections/FeaturesSection';
import SetupGuideSection from '../sections/SetupGuideSection';
import CommunitySection from '../sections/CommunitySection';
import CommunityConnectSection from '../sections/CommunityConnectSection';
import FaqSection from '../sections/FaqSection';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <>
      <Header />
        <HeroSection />
        <TeamsSection />
        <FeaturesSection />
        <SetupGuideSection />
        <CommunitySection/>
        <CommunityConnectSection />
        <FaqSection />
      <Footer />
    </>
  );
}

export default HomePage;