"use client"

import { useEffect, useState } from "react"

export function SplashScreen() {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#101010] flex flex-col items-center justify-center relative">
      {/* Pulse animation behind logo */}
      <div
        className={`absolute w-32 h-32 bg-[#E31837] rounded-full transition-all duration-1000 ${
          pulse ? "scale-150 opacity-20" : "scale-100 opacity-40"
        }`}
      />

      {/* Logo */}
      <h1 className="text-4xl font-bold text-white z-10 mb-8">FightConnect</h1>

      {/* Loading text */}
      <p className="text-[#1E90FF] text-sm absolute bottom-20">Loading...</p>
    </div>
  )
}
