"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import Image from "next/image"
import { Heart } from "lucide-react"

export default function BirthdayPage() {
  const [stage, setStage] = useState<"initial" | "countdown" | "birthday">("initial")
  const [showMessages, setShowMessages] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [shownImages, setShownImages] = useState<number[]>([])

  // Handle countdown logic
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (stage === "countdown" && countdown !== null) {
      if (countdown > 0) {
        timer = setTimeout(() => {
          setCountdown(prev => {
            if (prev !== null && prev > 0) {
              return prev - 1
            }
            return prev
          })
        }, 1000)
      } else {
        setStage("birthday")
        setShowMessages(true)
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
    }
    return () => clearTimeout(timer)
  }, [countdown, stage])

  // Update shown images whenever countdown changes
  useEffect(() => {
    if (countdown !== null && countdown > 0 && countdown <= 3) {
      setShownImages(prev => {
        if (!prev.includes(countdown)) {
          return [...prev, countdown]
        }
        return prev
      })
    }
  }, [countdown])

  // Confetti effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (stage === "birthday") {
      interval = setInterval(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        })
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        })
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [stage])

  const startCountdown = useCallback(() => {
    setStage("countdown")
    setShowMessages(false)
    setShownImages([])
    setCountdown(3)
  }, [])

  const messages = [
    "Wishing you a day filled with laughter and love!",
    "May all your dreams come true this year!",
    "Here's to another year of amazing friendship!",
    "You're not just a year older, you're a year more awesome!",
    "Happy Birthday to my favorite person in the world!",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-cyan-300 flex flex-col items-center justify-center text-white overflow-hidden p-4 relative">
      <AnimatePresence mode="wait">
        {stage === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 text-white drop-shadow-lg"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
              }}
            >
              Are you ready Chipkli?
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
              whileTap={{ scale: 0.9 }}
              className="bg-white text-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-xl sm:text-2xl shadow-lg hover:bg-blue-100 transition-colors duration-300"
              onClick={startCountdown}
            >
              Let's celebrate!
            </motion.button>
          </motion.div>
        )}

        {stage === "countdown" && countdown !== null && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-8"
          >
            <motion.div
              key={countdown}
              initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotateX: 90 }}
              transition={{ duration: 0.5 }}
              className="text-6xl sm:text-8xl md:text-9xl font-bold text-white drop-shadow-lg"
            >
              {countdown}
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {shownImages.map((num) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-48 h-48 sm:w-56 sm:h-56"
                >
                  <Image
                    src={`/countdown-${num}.jpeg`}
                    alt={`Countdown ${num}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-xl"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {stage === "birthday" && showMessages && (
          <motion.div
            key="birthday"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.h1
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 text-white drop-shadow-lg"
            >
              Happy Birthday!
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: [0, -10, 10, -10, 0] }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-yellow-300 drop-shadow-lg"
            >
              Chipklu
            </motion.h2>
            <motion.div className="space-y-6 mt-8">
              <motion.div
                className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-8"
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Image
                  src="/birthday.jpeg"
                  alt="Birthday Cake"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full shadow-lg"
                />
              </motion.div>
              {messages.map((message, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="text-xl sm:text-2xl md:text-3xl text-white drop-shadow-lg"
                  whileHover={{ scale: 1.05, color: "#FFD700" }}
                >
                  {message}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.footer 
        className="absolute bottom-0 w-full bg-gradient-to-r from-blue-900/80 via-blue-800/80 to-blue-900/80 backdrop-blur-sm py-4 px-6"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
      >
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4"
          whileHover={{ scale: 1.02 }}
        >
          <motion.span
            className="text-white text-lg sm:text-xl font-medium flex items-center gap-2"
            animate={{ color: ["#ffffff", "#ffd700", "#ffffff"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Made with <Heart className="text-red-500 animate-pulse" /> by Masher
          </motion.span>
          <motion.div 
            className="flex items-center space-x-2"
            animate={{ rotate: [0, 360] }}
          >
            <span className="text-yellow-300 text-sm sm:text-base">✨ Celebrating Special Moments ✨</span>
          </motion.div>
        </motion.div>
      </motion.footer>
    </div>
  )
}