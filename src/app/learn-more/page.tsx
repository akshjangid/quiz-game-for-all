/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

const LearnMorePage = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Floating emoji background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none">
        {["🌍", "🧭", "📍", "✈️", "🗺️"].map((emoji, i) => (
          <motion.div
            key={i}
            className="text-5xl absolute"
            initial={{ y: -100, x: Math.random() * 100 + "%" }}
            animate={{ y: "120vh" }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-center mb-6 drop-shadow-glow"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Ready to Explore More? 🌟
      </motion.h1>

      <motion.p
        className="text-xl max-w-2xl text-center mb-10 text-gray-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Dive into a world of trivia, daily geography challenges, and exclusive leaderboards. Whether you're a casual explorer or a competitive globe master — there's something here for everyone.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.7 }}
      >
        <Button
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg text-lg shadow-xl animate-pulse"
          onClick={() => router.push("/")}
        >
          🚀 Start Playing Now
        </Button>
      </motion.div>
    </main>
  );
};

export default LearnMorePage;
