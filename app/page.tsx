"use client"

import { useState, useEffect } from "react"
import { SplashScreen } from "@/components/splash-screen"
import { AuthScreen } from "@/components/auth-screen"
import { MainApp } from "@/components/main-app"
import { LandingPage } from "@/components/landing-page"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"splash" | "landing" | "auth" | "main">("splash")
  const [userRole, setUserRole] = useState<"fighter" | "coach" | "fan" | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Comprehensive error suppression for browser extensions
    const originalError = console.error
    const originalWarn = console.warn
    const originalLog = console.log

    // Suppress MetaMask and other extension-related errors/warnings
    console.error = (...args) => {
      const message = args.join(" ").toLowerCase()
      if (
        message.includes("metamask") ||
        message.includes("chrometransport") ||
        message.includes("extension not found") ||
        message.includes("connectchrome") ||
        message.includes("wallet") ||
        message.includes("web3") ||
        message.includes("ethereum") ||
        message.includes("injected provider") ||
        message.includes("browser extension")
      ) {
        return // Suppress these specific errors
      }
      originalError.apply(console, args)
    }

    console.warn = (...args) => {
      const message = args.join(" ").toLowerCase()
      if (
        message.includes("metamask") ||
        message.includes("chrometransport") ||
        message.includes("extension") ||
        message.includes("wallet") ||
        message.includes("web3")
      ) {
        return // Suppress these specific warnings
      }
      originalWarn.apply(console, args)
    }

    console.log = (...args) => {
      const message = args.join(" ").toLowerCase()
      if (message.includes("metamask") || message.includes("chrometransport") || message.includes("extension")) {
        return // Suppress these specific logs
      }
      originalLog.apply(console, args)
    }

    // Suppress unhandled promise rejections related to extensions
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = String(event.reason).toLowerCase()
      if (
        reason.includes("metamask") ||
        reason.includes("chrometransport") ||
        reason.includes("extension not found") ||
        reason.includes("wallet") ||
        reason.includes("web3")
      ) {
        event.preventDefault()
        return
      }
    }

    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    // Auto-transition from splash to landing after 2 seconds
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        setCurrentScreen("landing")
      }, 2000)
      return () => {
        clearTimeout(timer)
        window.removeEventListener("unhandledrejection", handleUnhandledRejection)
      }
    }

    return () => {
      // Restore original console methods
      console.error = originalError
      console.warn = originalWarn
      console.log = originalLog
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [currentScreen])

  // Additional error boundary for extension-related errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const message = event.message?.toLowerCase() || ""
      if (
        message.includes("metamask") ||
        message.includes("chrometransport") ||
        message.includes("extension not found") ||
        message.includes("wallet") ||
        message.includes("web3")
      ) {
        event.preventDefault()
        return
      }
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  const handleAuth = (role: "fighter" | "coach" | "fan") => {
    try {
      setUserRole(role)
      setCurrentScreen("main")
    } catch (err) {
      // Only show error if it's not extension-related
      const errorMessage = String(err).toLowerCase()
      if (
        !errorMessage.includes("metamask") &&
        !errorMessage.includes("chrometransport") &&
        !errorMessage.includes("extension")
      ) {
        setError("Authentication failed. Please try again.")
      }
    }
  }

  const handleGetStarted = () => {
    setCurrentScreen("auth")
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-white text-xl mb-4">Something went wrong</h1>
          <p className="text-[#CCCCCC] mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null)
              setCurrentScreen("splash")
            }}
            className="bg-[#E31837] text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (currentScreen === "splash") {
    return <SplashScreen />
  }

  if (currentScreen === "landing") {
    return <LandingPage onGetStarted={handleGetStarted} />
  }

  if (currentScreen === "auth") {
    return <AuthScreen onAuth={handleAuth} />
  }

  return <MainApp userRole={userRole} />
}
