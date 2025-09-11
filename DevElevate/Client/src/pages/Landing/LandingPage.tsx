/* eslint-disable react/react-in-jsx-scope */
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Stats from "./components/Stats";
import TechStack from "./components/TechStack";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function LandingPage() {
  return (
    <div className="overflow-x-hidden relative min-h-screen text-white bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br via-black from-purple-900/20 to-blue-900/20" />
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-pulse bg-white/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <Features />
        <Stats />
        <TechStack />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
