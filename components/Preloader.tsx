"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Simulate loading progress
    const duration = 2000; // 2 seconds
    const interval = 20; // update every 20ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          document.body.style.overflow = "";
          onComplete();
        }, 400); // Wait a bit after reaching 100% before exiting
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020205] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] right-[30%] w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full" />
      </div>

      {/* Subtle Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Main Branding */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl text-white tracking-[0.2em] text-center ${spaceGrotesk.className}`}
            style={{ textShadow: "0 0 40px rgba(139, 92, 246, 0.4)" }}
          >
            USMAN FAROOQI
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-xs sm:text-sm text-slate-400 uppercase tracking-[0.3em] font-medium"
        >
          Building Digital Experiences
        </motion.p>

        {/* Progress Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 w-48 sm:w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative"
        >
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-violet-600 via-blue-500 to-sky-400"
            style={{ width: `${progress}%` }}
            initial={{ width: "0%" }}
          />
          {/* Progress Glow */}
          <motion.div
            className="absolute top-0 bottom-0 bg-blue-400/50 blur-[4px]"
            style={{ width: `${progress}%`, left: 0 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
