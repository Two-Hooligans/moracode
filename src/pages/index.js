import Head from "next/head";
import Header from "../components/Header";
import HeroSection from "../sections/HeroSection";
import TeamsSection from "../sections/TeamsSection";
import FeaturesSection from "../sections/FeaturesSection";
import SetupGuideSection from "../sections/SetupGuideSection";
import CommunitySection from "../sections/CommunitySection";
import CommunityConnectSection from "../sections/CommunityConnectSection";
import FaqSection from "../sections/FaqSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Moracode | Secure AI Coding Assistant</title>
        <meta
          name="description"
          content="Your code, your AI, your rules—Moracode offers secure, intelligent and private coding assistance with no external data flow."
        />
        <meta
          property="og:title"
          content="Moracode | Secure AI Coding Assistant"
        />
        <meta
          property="og:description"
          content="Your code, your AI, your rules—Moracode offers secure, intelligent and private coding assistance with no external data flow."
        />
        <meta property="og:url" content="https://moracode.io" />
        <meta property="og:type" content="website" />
      </Head>
      <Header />

      <main>
        <HeroSection />
        <TeamsSection />
        <FeaturesSection />
        <SetupGuideSection />
        <CommunitySection />
        <CommunityConnectSection />
        <FaqSection />
        <Footer />
      </main>
    </>
  );
}
