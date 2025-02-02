import { useState, useEffect } from "react"

export const useCountdown = (initialCount: number, onComplete: () => void) => {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      onComplete()
    }
  }, [count, onComplete])

  return count
}

