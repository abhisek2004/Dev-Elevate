import React from "react";
import { useGlobalState } from "../../contexts/GlobalContext";

interface SplashScreenProps {
  fullPage?: boolean;
  title?: string;
  subtitle?: string;
  logoSrcLight?: string;
  logoSrcDark?: string;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  fullPage = false,
  title = "DevElevate",
  subtitle = "Loading your experience...",
  logoSrcLight = "/favicon.png",
  logoSrcDark = "/favicon.png",
}) => {
  const { state } = useGlobalState();
  const isDarkMode = state.darkMode;

  return (
    <div
      className={
        fullPage
          ? "flex relative justify-center items-center w-screen min-h-screen"
          : "flex fixed inset-0 justify-center items-center z-[9999]"
      }
      style={{ backgroundColor: "#000" }}
    >
      {/* Match LandingPage animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br via-black from-purple-900/20 to-blue-900/20" />
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `spin ${(0.5 + Math.random() * 1.5).toFixed(
                  2
                )}s cubic-bezier(0.4, 0.2, 0.2, 1) ${(
                  Math.random() * 1
                ).toFixed(2)}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="relative z-10 p-10 rounded-3xl"
        style={{
          background: "rgba(20,20,28,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          minWidth: 320,
          maxWidth: 480,
          height: 320,
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.5), 0 16px 48px rgba(0,0,0,0.4), inset 0 0 40px rgba(99,102,241,0.08)",
          border: "1px solid rgba(99,102,241,0.25)",
          overflow: "hidden",
        }}
      >
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative" style={{ width: 160, height: 160 }}>
            <div
              className="rounded-full animate-spin"
              style={{
                position: "absolute",
                inset: 0,
                borderWidth: 5,
                borderStyle: "solid",
                borderColor: "rgba(99,102,241,0.25)",
                borderTopColor: "#6366f1",
                borderBottomColor: "#60a5fa",
                boxShadow:
                  "0 0 48px 0 rgba(99,102,241,0.25), 0 0 80px 0 rgba(59,130,246,0.15)",
              }}
            />
            <img
              src={isDarkMode ? logoSrcDark : logoSrcLight}
              alt="Logo"
              style={{
                width: 112,
                height: 112,
                borderRadius: 28,
                background: "#0b0b12",
                boxShadow:
                  "0 12px 48px rgba(99,102,241,0.18), 0 6px 24px rgba(0,0,0,0.35)",
                objectFit: "contain",
                padding: 16,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
          <div className="text-center">
            <div
              className="font-bold"
              style={{
                fontSize: "2.2rem",
                letterSpacing: -0.6,
                color: "#ffffff",
                textShadow: "0 2px 12px rgba(99,102,241,0.25)",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: "1.1rem",
                color: "#c7c7c7",
                opacity: 0.9,
              }}
            >
              {subtitle}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
