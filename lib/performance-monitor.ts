"use client"

interface PerformanceMetrics {
  // Core Web Vitals
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  ttfb?: number // Time to First Byte

  // Custom Metrics
  errorSuppressionOverhead?: number
  consoleOverrideTime?: number
  eventListenerSetupTime?: number
  mutationObserverTime?: number

  // Memory Usage
  memoryUsage?: {
    used: number
    total: number
    limit: number
  }

  // Timing Metrics
  domContentLoaded?: number
  windowLoad?: number
  navigationStart?: number

  // Error Suppression Stats
  suppressedErrors?: number
  suppressedWarnings?: number
  suppressedLogs?: number
  blockedRequests?: number
  removedScripts?: number

  // Performance Impact
  frameDrops?: number
  longTasks?: number
  renderBlocking?: number
}

interface PerformanceReport {
  timestamp: number
  sessionId: string
  userAgent: string
  metrics: PerformanceMetrics
  suppressionActive: boolean
  impactScore: number // 0-100, higher = more impact
  recommendations: string[]
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {}
  private sessionId: string
  private startTime: number
  private observer?: PerformanceObserver
  private mutationObserver?: MutationObserver
  private suppressionStats = {
    errors: 0,
    warnings: 0,
    logs: 0,
    blockedRequests: 0,
    removedScripts: 0,
  }
  private reportingInterval?: NodeJS.Timeout
  private isDestroyed = false

  // Store original console methods to avoid circular calls
  private originalConsole = {
    error: console.error,
    warn: console.warn,
    log: console.log,
    info: console.info,
    debug: console.debug,
  }

  constructor() {
    this.sessionId = this.generateSessionId()
    this.startTime = performance.now()
    this.initializeMonitoring()
  }

  private generateSessionId(): string {
    return `perf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private initializeMonitoring() {
    if (this.isDestroyed) return

    try {
      // Monitor Core Web Vitals
      this.setupWebVitalsMonitoring()

      // Monitor memory usage
      this.setupMemoryMonitoring()

      // Monitor long tasks
      this.setupLongTaskMonitoring()

      // Monitor frame drops
      this.setupFrameMonitoring()

      // Setup periodic reporting
      this.setupPeriodicReporting()
    } catch (error) {
      // Use original console to avoid loops
      this.originalConsole.error("Performance monitor initialization failed:", error)
    }
  }

  private setupWebVitalsMonitoring() {
    if (this.isDestroyed) return

    try {
      // First Contentful Paint
      new PerformanceObserver((list) => {
        if (this.isDestroyed) return
        const entries = list.getEntries()
        const fcpEntry = entries.find((entry) => entry.name === "first-contentful-paint")
        if (fcpEntry) {
          this.metrics.fcp = fcpEntry.startTime
        }
      }).observe({ entryTypes: ["paint"] })

      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        if (this.isDestroyed) return
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          this.metrics.lcp = lastEntry.startTime
        }
      }).observe({ entryTypes: ["largest-contentful-paint"] })

      // First Input Delay
      new PerformanceObserver((list) => {
        if (this.isDestroyed) return
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            this.metrics.fid = entry.processingStart - entry.startTime
          }
        })
      }).observe({ entryTypes: ["first-input"] })

      // Cumulative Layout Shift
      let clsValue = 0
      new PerformanceObserver((list) => {
        if (this.isDestroyed) return
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        this.metrics.cls = clsValue
      }).observe({ entryTypes: ["layout-shift"] })

      // Navigation Timing
      if (document.readyState === "complete") {
        this.captureNavigationTiming()
      } else {
        window.addEventListener("load", () => this.captureNavigationTiming(), { once: true })
      }
    } catch (error) {
      this.originalConsole.error("Web vitals monitoring setup failed:", error)
    }
  }

  private captureNavigationTiming() {
    if (this.isDestroyed) return

    try {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      if (navigation) {
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart
        this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.navigationStart
        this.metrics.windowLoad = navigation.loadEventEnd - navigation.navigationStart
        this.metrics.navigationStart = navigation.navigationStart
      }
    } catch (error) {
      this.originalConsole.error("Navigation timing capture failed:", error)
    }
  }

  private setupMemoryMonitoring() {
    if (this.isDestroyed) return

    try {
      if ("memory" in performance) {
        const memory = (performance as any).memory
        this.metrics.memoryUsage = {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
        }
      }
    } catch (error) {
      this.originalConsole.error("Memory monitoring setup failed:", error)
    }
  }

  private setupLongTaskMonitoring() {
    if (this.isDestroyed) return

    try {
      if ("PerformanceObserver" in window) {
        const observer = new PerformanceObserver((list) => {
          if (this.isDestroyed) return
          const entries = list.getEntries()
          this.metrics.longTasks = (this.metrics.longTasks || 0) + entries.length
        })
        observer.observe({ entryTypes: ["longtask"] })
      }
    } catch (error) {
      // Long task API not supported - this is expected in some browsers
    }
  }

  private setupFrameMonitoring() {
    if (this.isDestroyed) return

    try {
      let lastFrameTime = performance.now()
      let frameDrops = 0
      let animationId: number

      const checkFrame = () => {
        if (this.isDestroyed) return

        const currentTime = performance.now()
        const frameDuration = currentTime - lastFrameTime

        // Detect dropped frames (assuming 60fps = 16.67ms per frame)
        if (frameDuration > 33.34) {
          // More than 2 frames
          frameDrops++
        }

        lastFrameTime = currentTime
        this.metrics.frameDrops = frameDrops

        animationId = requestAnimationFrame(checkFrame)
      }

      animationId = requestAnimationFrame(checkFrame)

      // Store animation ID for cleanup
      this.observer = { disconnect: () => cancelAnimationFrame(animationId) } as any
    } catch (error) {
      this.originalConsole.error("Frame monitoring setup failed:", error)
    }
  }

  private setupPeriodicReporting() {
    if (this.isDestroyed) return

    // Report every 60 seconds
    this.reportingInterval = setInterval(() => {
      if (this.isDestroyed) return
      this.generateAndStoreReport()
    }, 60000)

    // Report on page unload
    const handleUnload = () => {
      if (!this.isDestroyed) {
        this.generateAndStoreReport()
      }
    }

    window.addEventListener("beforeunload", handleUnload, { once: true })
    window.addEventListener("pagehide", handleUnload, { once: true })
  }

  private generateAndStoreReport() {
    if (this.isDestroyed) return

    try {
      const report = this.generateReport()
      this.storeReportSilently(report)
    } catch (error) {
      this.originalConsole.error("Report generation failed:", error)
    }
  }

  private storeReportSilently(report: PerformanceReport) {
    try {
      const reports = JSON.parse(localStorage.getItem("fightconnect_perf_reports") || "[]")
      reports.push(report)
      // Keep only last 10 reports
      if (reports.length > 10) {
        reports.splice(0, reports.length - 10)
      }
      localStorage.setItem("fightconnect_perf_reports", JSON.stringify(reports))
    } catch (e) {
      // localStorage not available - fail silently
    }
  }

  public updateSuppressionStats(type: "error" | "warning" | "log" | "request" | "script") {
    if (this.isDestroyed) return

    try {
      switch (type) {
        case "error":
          this.suppressionStats.errors++
          break
        case "warning":
          this.suppressionStats.warnings++
          break
        case "log":
          this.suppressionStats.logs++
          break
        case "request":
          this.suppressionStats.blockedRequests++
          break
        case "script":
          this.suppressionStats.removedScripts++
          break
      }
    } catch (error) {
      // Fail silently to avoid loops
    }
  }

  private calculateImpactScore(): number {
    let score = 0

    try {
      // Console override impact (0-20 points)
      const consoleTime = this.metrics.consoleOverrideTime || 0
      if (consoleTime > 10) score += Math.min(20, consoleTime / 2)

      // Mutation observer impact (0-15 points)
      const mutationTime = this.metrics.mutationObserverTime || 0
      if (mutationTime > 5) score += Math.min(15, mutationTime)

      // Memory impact (0-25 points)
      if (this.metrics.memoryUsage) {
        const memoryUsagePercent = (this.metrics.memoryUsage.used / this.metrics.memoryUsage.limit) * 100
        if (memoryUsagePercent > 80) score += 25
        else if (memoryUsagePercent > 60) score += 15
        else if (memoryUsagePercent > 40) score += 5
      }

      // Frame drops impact (0-20 points)
      const frameDrops = this.metrics.frameDrops || 0
      if (frameDrops > 100) score += 20
      else if (frameDrops > 50) score += 10
      else if (frameDrops > 20) score += 5

      // Long tasks impact (0-20 points)
      const longTasks = this.metrics.longTasks || 0
      if (longTasks > 10) score += 20
      else if (longTasks > 5) score += 10
      else if (longTasks > 2) score += 5
    } catch (error) {
      // Fail silently
    }

    return Math.min(100, score)
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = []

    try {
      const impactScore = this.calculateImpactScore()

      if (impactScore > 70) {
        recommendations.push("High performance impact detected. Consider reducing error suppression scope.")
      }

      if ((this.metrics.consoleOverrideTime || 0) > 20) {
        recommendations.push("Console override causing significant overhead. Optimize keyword matching.")
      }

      if ((this.metrics.mutationObserverTime || 0) > 10) {
        recommendations.push("Mutation observer overhead detected. Consider reducing observation scope.")
      }

      if (this.metrics.memoryUsage && this.metrics.memoryUsage.used / this.metrics.memoryUsage.limit > 0.8) {
        recommendations.push("High memory usage detected. Monitor for memory leaks in suppression code.")
      }

      if ((this.metrics.frameDrops || 0) > 50) {
        recommendations.push("Frame drops detected. Error suppression may be impacting rendering performance.")
      }

      if ((this.metrics.longTasks || 0) > 5) {
        recommendations.push("Long tasks detected. Consider async processing for error suppression.")
      }

      if (this.suppressionStats.errors + this.suppressionStats.warnings + this.suppressionStats.logs > 1000) {
        recommendations.push("High volume of suppressed messages. Consider more targeted filtering.")
      }

      if (recommendations.length === 0) {
        recommendations.push("Error suppression performing optimally with minimal impact.")
      }
    } catch (error) {
      recommendations.push("Unable to generate recommendations due to monitoring error.")
    }

    return recommendations
  }

  public generateReport(): PerformanceReport {
    // Update suppression stats in metrics
    this.metrics.suppressedErrors = this.suppressionStats.errors
    this.metrics.suppressedWarnings = this.suppressionStats.warnings
    this.metrics.suppressedLogs = this.suppressionStats.logs
    this.metrics.blockedRequests = this.suppressionStats.blockedRequests
    this.metrics.removedScripts = this.suppressionStats.removedScripts

    // Update memory usage
    try {
      if ("memory" in performance) {
        const memory = (performance as any).memory
        this.metrics.memoryUsage = {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
        }
      }
    } catch (error) {
      // Fail silently
    }

    const report: PerformanceReport = {
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      metrics: { ...this.metrics },
      suppressionActive: !!(window as any).__extensionSuppressionActive,
      impactScore: this.calculateImpactScore(),
      recommendations: this.generateRecommendations(),
    }

    return report
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  public getSuppressionStats() {
    return { ...this.suppressionStats }
  }

  public destroy() {
    this.isDestroyed = true

    if (this.reportingInterval) {
      clearInterval(this.reportingInterval)
      this.reportingInterval = undefined
    }

    if (this.observer) {
      this.observer.disconnect()
      this.observer = undefined
    }

    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
      this.mutationObserver = undefined
    }
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor()

// Export types
export type { PerformanceMetrics, PerformanceReport }
