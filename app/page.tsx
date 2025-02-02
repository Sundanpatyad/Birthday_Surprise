"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import Image from "next/image"
import { Heart, Stars, Sparkles, Gift } from "lucide-react"

const FloatingHearts = () => {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * dimensions.width,
            y: dimensions.height + 100
          }}
          animate={{
            y: -100,
            x: ["0%", "50%", "0%", "-50%", "0%"]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            x: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Heart 
            className="text-pink-400/30" 
            size={20 + Math.random() * 30} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default function BirthdayPage() {
  const [stage, setStage] = useState<"initial" | "countdown" | "birthday">("initial")
  const [showMessages, setShowMessages] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [shownImages, setShownImages] = useState<number[]>([])

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
        const colors = ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FFD700', '#FF1493']
        const end = Date.now() + (3 * 1000)

        const frame = () => {
          confetti({
            particleCount: 30,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          })
          confetti({
            particleCount: 30,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          })
        
          if (Date.now() < end) {
            requestAnimationFrame(frame)
          }
        }
        frame()
      }
    }
    return () => clearTimeout(timer)
  }, [countdown, stage])

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

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (stage === "birthday") {
      interval = setInterval(() => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FF69B4', '#FFB6C1', '#FFC0CB']
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FF69B4', '#FFB6C1', '#FFC0CB']
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
    "Wishing you a day filled with sparkles and joy! ✨",
    "May your day be as beautiful as your smile! 🌸",
    "Here's to another year of making magical memories! 💫",
    "You're not just a year older, you're a year more fabulous! 👑",
    "Happy Birthday to the most amazing girl in the world! 💝",
  ]

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-300 flex flex-col items-center justify-center text-white relative">
      <FloatingHearts />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {stage === "initial" && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
              className="text-center relative"
            >
              <motion.div
                className="absolute -top-20 left-1/2 transform -translate-x-1/2"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="text-yellow-300 w-16 h-16" />
              </motion.div>
              
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
                Ready Princess Chipkli?
              </motion.h1>
              <motion.button
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0px 0px 15px rgba(255,192,203,0.8)",
                  backgroundColor: "#FFE4E1"
                }}
                whileTap={{ scale: 0.9 }}
                className="bg-white text-pink-500 px-8 py-4 rounded-full font-semibold text-2xl shadow-lg transition-all duration-300 flex items-center gap-3"
                onClick={startCountdown}
              >
                <Gift className="w-6 h-6" />
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
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="text-6xl sm:text-8xl md:text-9xl font-bold text-white drop-shadow-lg"
              >
                {countdown}
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {shownImages.map((num) => (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.8,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    className="relative w-40 h-40 sm:w-48 sm:h-48 group"
                  >
                    <Image
                      src={`/countdown-${num}.jpeg`}
                      alt={`Countdown ${num}`}
                      fill
                      loading="lazy"
                      className="rounded-2xl shadow-xl object-cover transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                    />
                    <motion.div
                      className="absolute -top-2 -right-2 bg-pink-400 rounded-full p-2"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Stars className="w-6 h-6 text-white" />
                    </motion.div>
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
              className="text-center h-full flex flex-col items-center justify-center px-4 py-20"
            >
              <motion.h1
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 text-white drop-shadow-lg bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent"
              >
                Happy Birthday!
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, rotate: [0, -10, 10, -10, 0] }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-pink-200 drop-shadow-lg"
              >
                Princess Chipklu
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                <motion.div
                  className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/birthday.jpeg"
                    alt="Birthday Cake"
                    fill
                    loading="lazy"
                    className="rounded-full shadow-lg object-cover ring-4 ring-pink-300 ring-opacity-50"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
                <div className="flex flex-col justify-center gap-3">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.3 }}
                      className="relative"
                    >
                      <motion.p
                        className="text-lg sm:text-xl text-white drop-shadow-lg bg-pink-400/20 backdrop-blur-sm rounded-xl p-3"
                        whileHover={{ scale: 1.03, backgroundColor: "rgba(255,192,203,0.3)" }}
                      >
                        {message}
                      </motion.p>
                      <motion.div
                        className="absolute -right-2 -top-2"
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <Stars className="w-6 h-6 text-yellow-300" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.footer 
        className="absolute bottom-0 w-full bg-gradient-to-r from-pink-500/80 via-purple-500/80 to-pink-500/80 backdrop-blur-sm py-4 px-6"
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
            animate={{ color: ["#ffffff", "#FFB6C1", "#ffffff"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Made with <Heart className="text-pink-300 animate-pulse" /> by Masher
          </motion.span>
          <motion.div 
            className="flex items-center space-x-2"
            animate={{ rotate: [0, 360] }}
          >
            <span className="text-pink-200 text-sm sm:text-base">✨ Celebrating Your Special Day ✨</span>
          </motion.div>
        </motion.div>
      </motion.footer>
    </div>
  )
}