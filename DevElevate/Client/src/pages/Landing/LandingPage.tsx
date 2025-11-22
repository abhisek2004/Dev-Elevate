'use client';

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Stats from "./components/Stats";
import TechStack from "./components/TechStack";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import axios from "axios";

function ReportIssueButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-5 sm:left-5 z-[1000]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 bg-white border border-gray-300 rounded-full shadow-lg dark:bg-zinc-800 dark:text-white dark:border-gray-600 sm:py-3 sm:px-5 hover:shadow-2xl"
      >
        💬 Report an Issue
        <span className="text-xs">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="flex flex-col w-56 py-2 mt-2 bg-white border border-gray-300 shadow-lg dark:bg-zinc-800 dark:border-gray-600 rounded-xl">
          <a
            href="https://github.com/abhisek2004/Dev-Elevate/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-gray-900 transition-colors rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700"
          >
            🐙 Open GitHub Issues
          </a>
          <a
            href="https://forms.gle/978JqVENLK3K53ar8"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-gray-900 transition-colors rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700"
          >
            📄 Open Google Form
          </a>
        </div>
      )}
    </div>
  );
}

function LandingPage() {
  const [showBanner, setShowBanner] = useState(true);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState("");

  // Check sessionStorage on load
  useEffect(() => {
    const accepted = sessionStorage.getItem("privacyAccepted");
    if (accepted === "true") {
      setShowBanner(false);
      setShowNewsletter(false);
    } else {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setShowBanner(false);
    setShowNewsletter(true);
    sessionStorage.setItem("privacyAccepted", "true");
  };

  const handleReject = () => {
    setShowBanner(false);
    setShowNewsletter(true);
    sessionStorage.removeItem("privacyAccepted"); // will trigger again on refresh
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/subscribe`,
        { email }
      );
      console.log(res.data);
      console.log("Subscribed with email:", email);
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-gradient-to-b from-gray-900 to-black">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br via-black from-purple-900/20 to-blue-900/20" />
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-pulse bg-white/30"
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

      {/* Report Issue Button */}
      <ReportIssueButton />

      {/* Privacy Banner */}
      {showBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg p-8 mx-4 border shadow-2xl bg-white/10 border-white/20 rounded-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold text-white">
                🔒 We Value Your Privacy
              </h2>
              <button
                onClick={() => setShowBanner(false)}
                className="text-gray-300 transition hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              We use cookies to enhance your browsing experience, serve
              personalized content, and analyze traffic. By clicking{" "}
              <b className="text-red-400">Accept</b>, you agree to our policy.{" "}
              <a
                href="/cookie-policy"
                className="ml-1 text-blue-400 underline hover:text-blue-300"
              >
                Cookie Policy
              </a>
              .
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAccept}
                className="flex-1 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-pink-500 to-red-600 text-white shadow-lg hover:scale-105 transition"
              >
                Accept
              </button>
              <button
                onClick={handleReject}
                className="flex-1 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg hover:scale-105 transition"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Modal */}
      {showNewsletter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="flex flex-col w-full max-w-4xl mx-4 overflow-hidden border shadow-2xl md:flex-row bg-white/10 border-white/20 rounded-2xl backdrop-blur-xl">
            {/* Left Side Image */}
            <div className="hidden w-1/2 md:block">
              <img
                src="https://img.freepik.com/premium-vector/subscribe-newsletter_773186-1344.jpg"
                alt="Subscribe"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Right Side Content */}
            <div className="flex flex-col justify-center w-full p-8 md:w-1/2">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowNewsletter(false)}
                  className="text-gray-400 transition hover:text-white"
                >
                  ✕
                </button>
              </div>
              <h2 className="mb-3 text-3xl font-extrabold text-white">
                📩 Subscribe to{" "}
                <span className="text-transparent bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text">
                  Newsletter
                </span>
              </h2>
              <p className="mb-2 text-gray-300">
                Receive{" "}
                <span className="font-semibold text-pink-300">
                  Daily Coding Recommendations
                </span>
              </p>
              <p className="mb-5 text-sm text-gray-400">
                Join our{" "}
                <span className="font-semibold text-red-400">community</span>{" "}
                and unlock{" "}
                <span className="font-semibold text-blue-400">
                  special offers
                </span>
                .
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 mb-4 text-white placeholder-gray-400 border border-gray-600 rounded-lg bg-black/40 focus:ring-2 focus:ring-pink-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="w-full py-3 font-bold text-white transition rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105"
                onClick={handleSubscribe}
              >
                Subscribe
              </button>
              <button
                onClick={() => setShowNewsletter(false)}
                className="mt-3 text-sm text-gray-400 transition hover:text-gray-200"
              >
                No thanks
              </button>
              <p className="mt-5 text-xs text-gray-500">
                By subscribing, you agree to our{" "}
                <a href="/terms" className="underline hover:text-gray-300">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline hover:text-gray-300">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;