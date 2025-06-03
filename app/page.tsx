"use client"

import { useState, useEffect, useCallback } from "react"
import { SplashScreen } from "@/components/splash-screen"
import { AuthScreen } from "@/components/auth-screen"
import { MainApp } from "@/components/main-app"
import { LandingPage } from "@/components/landing-page"
import { PerformanceDashboard } from "@/components/performance-dashboard"
import { performanceMonitor } from "@/lib/performance-monitor"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"splash" | "landing" | "auth" | "main">("splash")
  const [userRole, setUserRole] = useState<"fighter" | "coach" | "fan" | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showPerformanceDashboard, setShowPerformanceDashboard] = useState(false)

  // Memoize the error suppression setup to prevent re-initialization
  const setupErrorSuppression = useCallback(() => {
    // Store original console methods to avoid circular calls
    const originalConsole = {
      error: console.error,
      warn: console.warn,
      log: console.log,
    }

    // Comprehensive extension-related keywords
    const extensionKeywords = [
      "metamask",
      "chrometransport",
      "extension not found",
      "connectchrome",
      "wallet",
      "web3",
      "ethereum",
      "injected provider",
      "browser extension",
      "chrome extension",
      "firefox extension",
      "extension error",
      "wallet_",
      "coinbase wallet",
      "trust wallet",
      "phantom",
      "solflare",
      "keplr",
      "leap wallet",
      "station wallet",
      "terra station",
      "binance wallet",
      "okx wallet",
      "rabby",
      "frame",
      "talisman",
      "subwallet",
      "polkadot",
      "kusama",
      "avalanche wallet",
      "core wallet",
      "xdefi",
      "leap cosmos",
      "cosmostation",
      "keplr extension",
      "metamask extension",
      "wallet extension",
      "crypto wallet",
      "defi wallet",
      "nft wallet",
      "blockchain wallet",
      "web3 provider",
      "ethereum provider",
      "wallet provider",
      "dapp",
      "decentralized",
      "blockchain",
      "crypto",
      "token",
      "nft",
      "defi",
    ]

    function isExtensionRelated(message: string): boolean {
      const msg = String(message).toLowerCase()
      return extensionKeywords.some((keyword) => msg.includes(keyword))
    }

    // Override console methods with performance tracking
    console.error = (...args) => {
      const message = args.join(" ")
      if (isExtensionRelated(message)) {
        performanceMonitor.updateSuppressionStats("error")
        return
      }
      originalConsole.error.apply(console, args)
    }

    console.warn = (...args) => {
      const message = args.join(" ")
      if (isExtensionRelated(message)) {
        performanceMonitor.updateSuppressionStats("warning")
        return
      }
      originalConsole.warn.apply(console, args)
    }

    console.log = (...args) => {
      const message = args.join(" ")
      if (isExtensionRelated(message)) {
        performanceMonitor.updateSuppressionStats("log")
        return
      }
      originalConsole.log.apply(console, args)
    }

    // Enhanced promise rejection handling
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = String(event.reason)
      if (isExtensionRelated(reason)) {
        performanceMonitor.updateSuppressionStats("error")
        event.preventDefault()
        event.stopImmediatePropagation()
        return false
      }
    }

    // Enhanced error event handling
    const handleError = (event: ErrorEvent) => {
      const message = event.message || event.error?.message || ""
      if (isExtensionRelated(message)) {
        performanceMonitor.updateSuppressionStats("error")
        event.preventDefault()
        event.stopImmediatePropagation()
        return false
      }
    }

    // Add event listeners
    window.addEventListener("unhandledrejection", handleUnhandledRejection, true)
    window.addEventListener("error", handleError, true)
    window.addEventListener("rejectionhandled", handleUnhandledRejection, true)

    // Block extension detection at the document level
    let observer: MutationObserver | null = null
    if (typeof document !== "undefined" && document.body) {
      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              if (element.tagName === "SCRIPT") {
                const src = element.getAttribute("src") || ""
                const content = element.textContent || ""
                if (isExtensionRelated(src) || isExtensionRelated(content)) {
                  element.remove()
                  performanceMonitor.updateSuppressionStats("script")
                }
              }
            }
          })
        })
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
    }

    // Return cleanup function
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection, true)
      window.removeEventListener("error", handleError, true)
      window.removeEventListener("rejectionhandled", handleUnhandledRejection, true)

      if (observer) {
        observer.disconnect()
      }

      console.error = originalConsole.error
      console.warn = originalConsole.warn
      console.log = originalConsole.log
    }
  }, []) // Empty dependency array since this should only run once

  useEffect(() => {
    // Set up error suppression only once
    const cleanup = setupErrorSuppression()

    // Auto-transition from splash to landing after 2 seconds
    let timer: NodeJS.Timeout | undefined
    if (currentScreen === "splash") {
      timer = setTimeout(() => {
        setCurrentScreen("landing")
      }, 2000)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
      cleanup()
    }
  }, [setupErrorSuppression]) // Only depend on the memoized setup function

  // Separate effect for screen transitions to avoid re-running error suppression
  useEffect(() => {
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        setCurrentScreen("landing")
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentScreen])

  // Additional React-level error boundary
  useEffect(() => {
    const handleComponentError = (error: Error, errorInfo: any) => {
      const errorMessage = String(error).toLowerCase()
      const extensionKeywords = ["metamask", "chrometransport", "extension", "wallet", "web3"]

      if (extensionKeywords.some((keyword) => errorMessage.includes(keyword))) {
        performanceMonitor.updateSuppressionStats("error")
        return
      }

      // Only show non-extension errors
      setError("An unexpected error occurred. Please refresh the page.")
    }

    // Store the error handler globally for error boundaries
    ;(window as any).__handleComponentError = handleComponentError

    return () => {
      delete (window as any).__handleComponentError
    }
  }, [])

  // Keyboard shortcuts for performance dashboard
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + P to toggle performance dashboard
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "P") {
        event.preventDefault()
        setShowPerformanceDashboard((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleAuth = useCallback((role: "fighter" | "coach" | "fan") => {
    try {
      setUserRole(role)
      setCurrentScreen("main")
    } catch (err) {
      const errorMessage = String(err).toLowerCase()
      const extensionKeywords = ["metamask", "chrometransport", "extension", "wallet", "web3"]

      if (!extensionKeywords.some((keyword) => errorMessage.includes(keyword))) {
        setError("Authentication failed. Please try again.")
      }
    }
  }, [])

  const handleGetStarted = useCallback(() => {
    setCurrentScreen("auth")
  }, [])

  const handleTogglePerformanceDashboard = useCallback(() => {
    setShowPerformanceDashboard((prev) => !prev)
  }, [])

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

  return (
    <>
      {currentScreen === "splash" && <SplashScreen />}
      {currentScreen === "landing" && <LandingPage onGetStarted={handleGetStarted} />}
      {currentScreen === "auth" && <AuthScreen onAuth={handleAuth} />}
      {currentScreen === "main" && <MainApp userRole={userRole} />}

      {/* Performance Dashboard Overlay */}
      <PerformanceDashboard isVisible={showPerformanceDashboard} onToggle={handleTogglePerformanceDashboard} />
    </>
  )
}
