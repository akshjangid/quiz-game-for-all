"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import QuizGame from "./quiz-game"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-all duration-500 ease-in-out">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h1 className="text-2xl font-bold text-orange-500">Museflick</h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="transition-transform hover:scale-110"
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5 text-orange-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-orange-500" />
              )}
            </Button>
          </motion.div>
        </div>
      </header>

      <main>
        <section className="py-16 md:py-24 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-orange-500 hover:scale-105 transition-transform duration-300">
              Globetrotter Challenge
            </h2>
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
              Test your geography knowledge with our exciting quiz game. Explore the world through clues and guess
              cities, landmarks, and countries!
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white transition-transform hover:scale-105">Download App</Button>
              <Button
                className="border-orange-500 text-orange-500 hover:bg-orange-100 dark:hover:bg-gray-800 transition-transform hover:scale-105"
                onClick={() => router.push("/learn-more")}
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800"
          >
            <QuizGame />
          </motion.div>
        </section>

        <section className="bg-orange-100 dark:bg-gray-900 py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="container mx-auto px-4"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-orange-500">App Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {["🌍", "🏆", "🎮"].map((icon, i) => (
                <motion.div
                  key={i}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">{icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-orange-500">
                    {icon === "🌍" ? "Global Challenges" : icon === "🏆" ? "Leaderboards" : "Daily Challenges"}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {icon === "🌍"
                      ? "Thousands of geography questions from around the world to test your knowledge."
                      : icon === "🏆"
                      ? "Compete with friends and players worldwide to reach the top of our leaderboards."
                      : "New challenges every day to keep your geography skills sharp."}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Museflick. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}