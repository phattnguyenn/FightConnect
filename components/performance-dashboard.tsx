"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Clock,
  MemoryStickIcon as Memory,
  Cpu,
  Eye,
  EyeOff,
} from "lucide-react"
import { performanceMonitor, type PerformanceMetrics, type PerformanceReport } from "@/lib/performance-monitor"

interface PerformanceDashboardProps {
  isVisible: boolean
  onToggle: () => void
}

export function PerformanceDashboard({ isVisible, onToggle }: PerformanceDashboardProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({})
  const [reports, setReports] = useState<PerformanceReport[]>([])
  const [currentReport, setCurrentReport] = useState<PerformanceReport | null>(null)
  const [isMonitoring, setIsMonitoring] = useState(true)

  useEffect(() => {
    if (!isVisible) return

    const updateMetrics = () => {
      const currentMetrics = performanceMonitor.getMetrics()
      setMetrics(currentMetrics)

      const report = performanceMonitor.generateReport()
      setCurrentReport(report)
    }

    // Load stored reports
    try {
      const storedReports = JSON.parse(localStorage.getItem("fightconnect_perf_reports") || "[]")
      setReports(storedReports)
    } catch (e) {
      // Handle error
    }

    // Update metrics immediately
    updateMetrics()

    // Set up interval for real-time updates
    const interval = setInterval(updateMetrics, 5000)

    return () => clearInterval(interval)
  }, [isVisible])

  const getScoreColor = (score: number) => {
    if (score < 30) return "text-green-500"
    if (score < 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score < 30) return "default"
    if (score < 60) return "secondary"
    return "destructive"
  }

  const formatTime = (time?: number) => {
    if (!time) return "N/A"
    return `${time.toFixed(2)}ms`
  }

  const formatMemory = (bytes?: number) => {
    if (!bytes) return "N/A"
    return `${(bytes / 1024 / 1024).toFixed(1)}MB`
  }

  if (!isVisible) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-4 left-4 z-50 bg-[#1E90FF] hover:bg-[#1873CC] text-white"
        size="sm"
      >
        <Activity size={16} className="mr-2" />
        Performance
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="bg-[#181818] border-[#333333] w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-xl flex items-center gap-2">
            <Activity size={24} className="text-[#1E90FF]" />
            Performance Monitor
            {isMonitoring && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsMonitoring(!isMonitoring)}
              variant="outline"
              size="sm"
              className="border-[#333333] text-white"
            >
              {isMonitoring ? <Eye size={16} /> : <EyeOff size={16} />}
              {isMonitoring ? "Monitoring" : "Paused"}
            </Button>
            <Button onClick={onToggle} variant="ghost" size="sm" className="text-white">
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Impact Score Overview */}
          {currentReport && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-[#202020] border-[#333333]">
                <CardContent className="p-4 text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(currentReport.impactScore)}`}>
                    {currentReport.impactScore.toFixed(0)}
                  </div>
                  <div className="text-[#CCCCCC] text-sm">Impact Score</div>
                  <Badge className={`mt-2 ${getScoreBadgeVariant(currentReport.impactScore)}`}>
                    {currentReport.impactScore < 30
                      ? "Optimal"
                      : currentReport.impactScore < 60
                        ? "Moderate"
                        : "High Impact"}
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-[#202020] border-[#333333]">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-[#E31837]">
                    {(metrics.suppressedErrors || 0) +
                      (metrics.suppressedWarnings || 0) +
                      (metrics.suppressedLogs || 0)}
                  </div>
                  <div className="text-[#CCCCCC] text-sm">Suppressed Messages</div>
                  <div className="flex items-center justify-center mt-2 text-xs text-[#CCCCCC]">
                    <Shield size={12} className="mr-1" />
                    Active
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#202020] border-[#333333]">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-[#1E90FF]">{formatTime(metrics.consoleOverrideTime)}</div>
                  <div className="text-[#CCCCCC] text-sm">Suppression Overhead</div>
                  <div className="flex items-center justify-center mt-2 text-xs text-[#CCCCCC]">
                    <Clock size={12} className="mr-1" />
                    Total Time
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#202020] border-[#333333]">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-green-500">
                    {metrics.memoryUsage
                      ? `${((1 - metrics.memoryUsage.used / metrics.memoryUsage.limit) * 100).toFixed(0)}%`
                      : "N/A"}
                  </div>
                  <div className="text-[#CCCCCC] text-sm">Memory Available</div>
                  <div className="flex items-center justify-center mt-2 text-xs text-[#CCCCCC]">
                    <Memory size={12} className="mr-1" />
                    Heap Space
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="grid grid-cols-4 max-w-md mx-auto bg-[#202020]">
              <TabsTrigger value="metrics" className="text-white data-[state=active]:bg-[#E31837]">
                Metrics
              </TabsTrigger>
              <TabsTrigger value="suppression" className="text-white data-[state=active]:bg-[#E31837]">
                Suppression
              </TabsTrigger>
              <TabsTrigger value="vitals" className="text-white data-[state=active]:bg-[#E31837]">
                Web Vitals
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="text-white data-[state=active]:bg-[#E31837]">
                Insights
              </TabsTrigger>
            </TabsList>

            {/* Performance Metrics Tab */}
            <TabsContent value="metrics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#202020] border-[#333333]">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Cpu size={20} className="text-[#1E90FF]" />
                      Performance Timing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#CCCCCC]">DOM Content Loaded:</span>
                      <span className="text-white">{formatTime(metrics.domContentLoaded)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#CCCCCC]">Window Load:</span>
                      <span className="text-white">{formatTime(metrics.windowLoad)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#CCCCCC]">TTFB:</span>
                      <span className="text-white">{formatTime(metrics.ttfb)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#CCCCCC]">Frame Drops:</span>
                      <span className="text-white">{metrics.frameDrops || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#CCCCCC]">Long Tasks:</span>
                      <span className="text-white">{metrics.longTasks || 0}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#202020] border-[#333333]">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Memory size={20} className="text-[#E31837]" />
                      Memory Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {metrics.memoryUsage ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-[#CCCCCC]">Used:</span>
                          <span className="text-white">{formatMemory(metrics.memoryUsage.used)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#CCCCCC]">Total:</span>
                          <span className="text-white">{formatMemory(metrics.memoryUsage.total)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#CCCCCC]">Limit:</span>
                          <span className="text-white">{formatMemory(metrics.memoryUsage.limit)}</span>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-[#CCCCCC]">Usage</span>
                            <span className="text-white">
                              {((metrics.memoryUsage.used / metrics.memoryUsage.limit) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-2 bg-[#333333] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#E31837] transition-all duration-300"
                              style={{
                                width: `${(metrics.memoryUsage.used / metrics.memoryUsage.limit) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-[#CCCCCC] text-center py-4">Memory API not available</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Error Suppression Tab */}
            <TabsContent value="suppression" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#202020] border-[#333333]">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Shield size={20} className="text-[#1E90FF]" />
                      Suppression Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#CCCCCC]">Errors Suppressed:</span>
                      <span className="text-red-400">{metrics.suppressedErrors || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#CCCCCC]">Warnings Suppressed:</span>
                      <span className="text-yellow-400">{metrics.suppressedWarnings || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#CCCCCC]">Logs Suppressed:</span>
                      <span className="text-blue-400">{metrics.suppressedLogs || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#CCCCCC]">Requests Blocked:</span>
                      <span className="text-orange-400">{metrics.blockedRequests || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#CCCCCC]">Scripts Removed:</span>
                      <span className="text-purple-400">{metrics.removedScripts || 0}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#202020] border-[#333333]">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Zap size={20} className="text-[#E31837]" />
                      Suppression Overhead
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#CCCCCC]">Console Override:</span>
                      <span className="text-white">{formatTime(metrics.consoleOverrideTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#CCCCCC]">Mutation Observer:</span>
                      <span className="text-white">{formatTime(metrics.mutationObserverTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#CCCCCC]">Total Overhead:</span>
                      <span className="text-white">{formatTime(metrics.errorSuppressionOverhead)}</span>
                    </div>

                    <div className="mt-4 p-3 bg-[#101010] rounded-lg">
                      <div className="text-[#CCCCCC] text-sm mb-2">Overhead Impact</div>
                      <div className="flex items-center gap-2">
                        {(metrics.consoleOverrideTime || 0) < 10 ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <AlertTriangle size={16} className="text-yellow-500" />
                        )}
                        <span className="text-white text-sm">
                          {(metrics.consoleOverrideTime || 0) < 10 ? "Minimal Impact" : "Moderate Impact"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Web Vitals Tab */}
            <TabsContent value="vitals" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-[#202020] border-[#333333]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-[#1E90FF] mb-2">{formatTime(metrics.fcp)}</div>
                    <div className="text-[#CCCCCC] text-sm">First Contentful Paint</div>
                    <div className="mt-2">
                      {(metrics.fcp || 0) < 1800 ? (
                        <Badge className="bg-green-600">Good</Badge>
                      ) : (metrics.fcp || 0) < 3000 ? (
                        <Badge className="bg-yellow-600">Needs Improvement</Badge>
                      ) : (
                        <Badge className="bg-red-600">Poor</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#202020] border-[#333333]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-[#E31837] mb-2">{formatTime(metrics.lcp)}</div>
                    <div className="text-[#CCCCCC] text-sm">Largest Contentful Paint</div>
                    <div className="mt-2">
                      {(metrics.lcp || 0) < 2500 ? (
                        <Badge className="bg-green-600">Good</Badge>
                      ) : (metrics.lcp || 0) < 4000 ? (
                        <Badge className="bg-yellow-600">Needs Improvement</Badge>
                      ) : (
                        <Badge className="bg-red-600">Poor</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#202020] border-[#333333]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-[#1E90FF] mb-2">{formatTime(metrics.fid)}</div>
                    <div className="text-[#CCCCCC] text-sm">First Input Delay</div>
                    <div className="mt-2">
                      {(metrics.fid || 0) < 100 ? (
                        <Badge className="bg-green-600">Good</Badge>
                      ) : (metrics.fid || 0) < 300 ? (
                        <Badge className="bg-yellow-600">Needs Improvement</Badge>
                      ) : (
                        <Badge className="bg-red-600">Poor</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#202020] border-[#333333]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-[#E31837] mb-2">
                      {metrics.cls ? metrics.cls.toFixed(3) : "N/A"}
                    </div>
                    <div className="text-[#CCCCCC] text-sm">Cumulative Layout Shift</div>
                    <div className="mt-2">
                      {(metrics.cls || 0) < 0.1 ? (
                        <Badge className="bg-green-600">Good</Badge>
                      ) : (metrics.cls || 0) < 0.25 ? (
                        <Badge className="bg-yellow-600">Needs Improvement</Badge>
                      ) : (
                        <Badge className="bg-red-600">Poor</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="mt-6">
              <Card className="bg-[#202020] border-[#333333]">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <BarChart3 size={20} className="text-[#1E90FF]" />
                    Performance Insights & Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentReport?.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-[#101010] rounded-lg">
                      {recommendation.includes("optimal") ? (
                        <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      ) : recommendation.includes("High") || recommendation.includes("significant") ? (
                        <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <TrendingUp size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                      )}
                      <span className="text-white text-sm">{recommendation}</span>
                    </div>
                  ))}

                  {currentReport && currentReport.recommendations.length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                      <div className="text-white text-lg mb-2">All Systems Optimal</div>
                      <div className="text-[#CCCCCC] text-sm">
                        Error suppression is running efficiently with minimal performance impact.
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
