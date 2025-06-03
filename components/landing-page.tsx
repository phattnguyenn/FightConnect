"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronRight,
  Zap,
  Calendar,
  BarChart3,
  Users,
  Star,
  Shield,
  Award,
  Play,
  Heart,
  MessageCircle,
} from "lucide-react"
import { SignUpPrompt } from "@/components/sign-up-prompt"
import { mockData } from "@/lib/mock-data"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false)
  const [homeFeedIndex, setHomeFeedIndex] = useState(0)
  const [sparFiltersOpen, setSparFiltersOpen] = useState(false)
  const [analyticsMetrics, setAnalyticsMetrics] = useState({ power: 0, defense: 0, accuracy: 0 })
  const [likeCount, setLikeCount] = useState(248)
  const [isLiked, setIsLiked] = useState(false)

  // Home feed auto-scroll animation
  useEffect(() => {
    const interval = setInterval(() => {
      setHomeFeedIndex((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Analytics metrics animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalyticsMetrics({ power: 68, defense: 54, accuracy: 72 })
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Spar filters animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setSparFiltersOpen(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleRequestSpar = () => {
    setShowSignUpPrompt(true)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const homeFeedContent = [
    {
      image: "/images/boxer-mouthguard.webp",
      username: "@carlosthebull",
      description: "Perfect combo execution! 🥊",
      stats: { power: 82, defense: 61, accuracy: 78 },
      elo: "1420 | Silver",
    },
    {
      image: "/images/ufc-champion.jpeg",
      username: "@whitetiger",
      description: "Training hard for the championship! 💪",
      stats: { power: 75, defense: 88, accuracy: 82 },
      elo: "1580 | Gold",
    },
    {
      image: "/images/mma-fighter.jpeg",
      username: "@bigmike",
      description: "New technique breakdown 🔥",
      stats: { power: 68, defense: 72, accuracy: 75 },
      elo: "1250 | Bronze",
    },
  ]

  return (
    <div className="min-h-screen bg-[#101010] flex flex-col">
      {/* Hero Section with MMA Cage Background */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/images/mma-cage-background.webp')" }}
        ></div>

        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col">
          <header className="py-6 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#E31837] flex items-center justify-center mr-2">
                <Zap size={20} className="text-white" />
              </div>
              <h1 className="text-white text-2xl font-bold">FightConnect</h1>
            </div>
            <Button onClick={onGetStarted} className="bg-[#E31837] hover:bg-[#C7142F] text-white">
              Sign Up
            </Button>
          </header>

          <div className="flex-1 flex flex-col justify-center max-w-3xl">
            <Badge className="bg-[#1E90FF] text-white self-start mb-4">BETA ACCESS</Badge>
            <h1 className="text-5xl font-bold text-white mb-4">Connect. Spar. Improve.</h1>
            <p className="text-xl text-[#CCCCCC] mb-8">
              The ultimate platform for fighters to find sparring partners, track performance, and join local events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onGetStarted} size="lg" className="bg-[#E31837] hover:bg-[#C7142F] text-white">
                Get Started
                <ChevronRight size={16} className="ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#101010]"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Mobile Mockups Section */}
      <div className="py-20 bg-gradient-to-b from-[#101010] to-[#181818]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#1E90FF] text-white mb-4">MOBILE FIRST</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">Designed for Fighters on the Go</h2>
            <p className="text-[#CCCCCC] max-w-2xl mx-auto">
              Access all features from your mobile device. Find sparring partners, track progress, and join events
              wherever you are.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Animated Home Feed Mobile Mockup */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-64 h-[520px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-[#101010] rounded-[2rem] overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="h-6 bg-[#101010] flex items-center justify-between px-6 text-white text-xs">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 border border-white rounded-sm">
                          <div className="w-3 h-1 bg-white rounded-sm"></div>
                        </div>
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="h-12 bg-[#101010] border-b border-[#333333] flex items-center justify-center">
                      <h3 className="text-white font-semibold">Home</h3>
                    </div>

                    {/* Animated Video Feed Content */}
                    <div className="flex-1 relative overflow-hidden">
                      {homeFeedContent.map((content, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
                            index === homeFeedIndex
                              ? "translate-y-0"
                              : index < homeFeedIndex
                                ? "-translate-y-full"
                                : "translate-y-full"
                          }`}
                        >
                          <div className="w-full h-full bg-gradient-to-br from-[#333333] to-[#101010] relative">
                            <img
                              src={content.image || "/placeholder.svg"}
                              alt="Fighter video"
                              className="w-full h-full object-cover opacity-80"
                            />

                            {/* Video Overlay UI */}
                            <div className="absolute inset-0">
                              {/* Top-left: Fighter info */}
                              <div className="absolute top-4 left-4 flex items-center gap-2 animate-in slide-in-from-left-4 duration-500">
                                <div className="w-10 h-10 rounded-full bg-white border-2 border-white overflow-hidden">
                                  <img
                                    src={content.image || "/placeholder.svg"}
                                    alt="Fighter"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="bg-[#1E90FF] px-2 py-1 rounded-full">
                                  <span className="text-white text-xs font-semibold">{content.elo}</span>
                                </div>
                              </div>

                              {/* Right side: Animated Action buttons */}
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                                <button
                                  onClick={handleLike}
                                  className="flex flex-col items-center transform transition-all duration-300 hover:scale-110 active:scale-95"
                                >
                                  <Heart
                                    size={24}
                                    className={`mb-1 transition-colors duration-300 ${
                                      isLiked ? "text-red-500 fill-red-500" : "text-white"
                                    }`}
                                  />
                                  <span
                                    className={`text-xs transition-all duration-300 ${
                                      isLiked ? "text-red-500 font-bold" : "text-white"
                                    }`}
                                  >
                                    {likeCount}
                                  </span>
                                </button>
                                <button className="flex flex-col items-center transform transition-all duration-300 hover:scale-110 active:scale-95">
                                  <MessageCircle size={24} className="text-white mb-1" />
                                  <span className="text-white text-xs">16</span>
                                </button>
                                <button className="flex flex-col items-center transform transition-all duration-300 hover:scale-110 active:scale-95">
                                  <Play size={24} className="text-white animate-pulse" />
                                </button>
                              </div>

                              {/* Bottom: Animated Fighter details */}
                              <div className="absolute bottom-4 left-4 right-16 animate-in slide-in-from-bottom-4 duration-700">
                                <p className="text-white font-semibold mb-1">{content.username}</p>
                                <p className="text-white text-sm">{content.description}</p>
                                <div className="flex gap-3 mt-2 text-xs text-[#CCCCCC]">
                                  <span className="animate-in fade-in duration-1000 delay-300">
                                    Power: {content.stats.power}
                                  </span>
                                  <span className="animate-in fade-in duration-1000 delay-500">
                                    Defense: {content.stats.defense}
                                  </span>
                                  <span className="animate-in fade-in duration-1000 delay-700">
                                    Accuracy: {content.stats.accuracy}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Scroll indicator */}
                      <div className="absolute bottom-20 right-4 flex flex-col gap-1">
                        {homeFeedContent.map((_, index) => (
                          <div
                            key={index}
                            className={`w-1 h-6 rounded-full transition-all duration-300 ${
                              index === homeFeedIndex ? "bg-white" : "bg-white/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Bottom Tab Bar */}
                    <div className="h-16 bg-[#101010] border-t border-[#333333] flex items-center justify-around">
                      {[
                        { icon: "🏠", label: "Home", active: true },
                        { icon: "⚡", label: "Spar", active: false },
                        { icon: "📅", label: "Events", active: false },
                        { icon: "📊", label: "Analyze", active: false },
                        { icon: "👤", label: "Profile", active: false },
                      ].map((tab, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <span
                            className={`text-lg mb-1 transition-all duration-300 ${tab.active ? "opacity-100 scale-110" : "opacity-50"}`}
                          >
                            {tab.icon}
                          </span>
                          <span
                            className={`text-xs transition-colors duration-300 ${tab.active ? "text-[#E31837]" : "text-[#555555]"}`}
                          >
                            {tab.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-white font-semibold mb-2">Social Feed</h3>
                <p className="text-[#CCCCCC] text-sm">Watch fighter highlights and training videos</p>
              </div>
            </div>

            {/* Animated Find Spar Mobile Mockup */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-64 h-[520px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-[#101010] rounded-[2rem] overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="h-6 bg-[#101010] flex items-center justify-between px-6 text-white text-xs">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 border border-white rounded-sm">
                          <div className="w-3 h-1 bg-white rounded-sm"></div>
                        </div>
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="h-12 bg-[#101010] border-b border-[#333333] flex items-center justify-between px-4">
                      <span className="text-white">←</span>
                      <h3 className="text-white font-semibold">Find Spar</h3>
                      <span className="text-[#E31837] animate-spin">🔄</span>
                    </div>

                    {/* Animated Filter Bar */}
                    <div
                      className={`bg-[#181818] border-b border-[#333333] transition-all duration-1000 ${
                        sparFiltersOpen ? "p-3" : "p-1"
                      }`}
                    >
                      <div className="flex gap-2 mb-2">
                        <div
                          className={`flex-1 bg-[#101010] border border-[#333333] rounded px-2 py-1 transition-all duration-500 ${
                            sparFiltersOpen ? "border-[#1E90FF]" : ""
                          }`}
                        >
                          <span className="text-white text-xs">Boxing</span>
                        </div>
                        <div
                          className={`flex-1 bg-[#101010] border border-[#333333] rounded px-2 py-1 transition-all duration-500 delay-200 ${
                            sparFiltersOpen ? "border-[#1E90FF]" : ""
                          }`}
                        >
                          <span className="text-white text-xs">145 lbs</span>
                        </div>
                      </div>
                      <div
                        className={`bg-[#E31837] text-white text-xs py-2 px-3 rounded text-center transition-all duration-700 delay-500 ${
                          sparFiltersOpen ? "opacity-100 scale-100" : "opacity-70 scale-95"
                        }`}
                      >
                        Apply Filters
                      </div>
                    </div>

                    {/* Animated Fighter Cards */}
                    <div className="flex-1 overflow-hidden p-3 space-y-3">
                      {/* Fighter Card 1 */}
                      <div className="bg-[#181818] border border-[#333333] rounded-lg p-3 animate-in slide-in-from-right-4 duration-700">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img src="/images/ufc-champion.jpeg" alt="Fighter" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-semibold text-sm">Carlos Santos</span>
                              <span className="bg-[#1E90FF] text-white text-xs px-1 rounded animate-pulse">1420</span>
                            </div>
                            <div className="text-[#CCCCCC] text-xs">
                              <span>Muay Thai • 145 lbs • 3 km</span>
                            </div>
                          </div>
                          <button className="border border-[#E31837] text-[#E31837] text-xs px-2 py-1 rounded transition-all duration-300 hover:bg-[#E31837] hover:text-white transform hover:scale-105">
                            Request
                          </button>
                        </div>
                      </div>

                      {/* Fighter Card 2 */}
                      <div className="bg-[#181818] border border-[#333333] rounded-lg p-3 animate-in slide-in-from-right-4 duration-700 delay-300">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img src="/images/mma-fighter.jpeg" alt="Fighter" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-semibold text-sm">Linh Tran</span>
                              <span className="bg-[#1E90FF] text-white text-xs px-1 rounded animate-pulse delay-200">
                                1580
                              </span>
                            </div>
                            <div className="text-[#CCCCCC] text-xs">
                              <span>Boxing • 135 lbs • 5 km</span>
                            </div>
                          </div>
                          <button className="border border-[#E31837] text-[#E31837] text-xs px-2 py-1 rounded transition-all duration-300 hover:bg-[#E31837] hover:text-white transform hover:scale-105">
                            Request
                          </button>
                        </div>
                      </div>

                      {/* Loading indicator for more fighters */}
                      <div className="flex items-center justify-center py-4 animate-in fade-in duration-1000 delay-1000">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-[#E31837] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-[#E31837] rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-[#E31837] rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Tab Bar */}
                    <div className="h-16 bg-[#101010] border-t border-[#333333] flex items-center justify-around">
                      {[
                        { icon: "🏠", label: "Home", active: false },
                        { icon: "⚡", label: "Spar", active: true },
                        { icon: "📅", label: "Events", active: false },
                        { icon: "📊", label: "Analyze", active: false },
                        { icon: "👤", label: "Profile", active: false },
                      ].map((tab, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <span
                            className={`text-lg mb-1 transition-all duration-300 ${tab.active ? "opacity-100 scale-110" : "opacity-50"}`}
                          >
                            {tab.icon}
                          </span>
                          <span
                            className={`text-xs transition-colors duration-300 ${tab.active ? "text-[#E31837]" : "text-[#555555]"}`}
                          >
                            {tab.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-white font-semibold mb-2">Find Partners</h3>
                <p className="text-[#CCCCCC] text-sm">Discover fighters in your area and skill level</p>
              </div>
            </div>

            {/* Animated Analytics Mobile Mockup */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-64 h-[520px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-[#101010] rounded-[2rem] overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="h-6 bg-[#101010] flex items-center justify-between px-6 text-white text-xs">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 border border-white rounded-sm">
                          <div className="w-3 h-1 bg-white rounded-sm"></div>
                        </div>
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="h-12 bg-[#101010] border-b border-[#333333] flex items-center justify-center">
                      <h3 className="text-white font-semibold">Analyze</h3>
                    </div>

                    {/* Animated Analytics Content */}
                    <div className="flex-1 p-4 space-y-4">
                      {/* Animated Performance Metrics */}
                      <div className="bg-[#181818] border border-[#333333] rounded-lg p-4 animate-in slide-in-from-bottom-4 duration-700">
                        <h4 className="text-white font-semibold mb-3 text-sm">Current Session</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: "Power", value: analyticsMetrics.power, color: "#E31837" },
                            { label: "Defense", value: analyticsMetrics.defense, color: "#1E90FF" },
                            { label: "Accuracy", value: analyticsMetrics.accuracy, color: "#E31837" },
                          ].map((metric, i) => {
                            const circumference = 2 * Math.PI * 45
                            const strokeDashoffset = circumference - (metric.value / 100) * circumference

                            return (
                              <div key={i} className="flex flex-col items-center">
                                <div className="relative w-12 h-12">
                                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" stroke="#333333" strokeWidth="8" fill="none" />
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="45"
                                      stroke={metric.color}
                                      strokeWidth="8"
                                      fill="none"
                                      strokeDasharray={circumference}
                                      strokeDashoffset={strokeDashoffset}
                                      className="transition-all duration-2000 ease-out"
                                      style={{
                                        transitionDelay: `${i * 500}ms`,
                                      }}
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span
                                      className="text-white font-bold text-xs animate-in zoom-in duration-500"
                                      style={{
                                        animationDelay: `${i * 500 + 1000}ms`,
                                      }}
                                    >
                                      {metric.value}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-[#CCCCCC] text-xs mt-1">{metric.label}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Animated ELO Progress */}
                      <div className="bg-[#181818] border border-[#333333] rounded-lg p-4 animate-in slide-in-from-bottom-4 duration-700 delay-500">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold text-sm">ELO Progress</span>
                          <span className="bg-[#1E90FF] text-white text-xs px-2 py-1 rounded animate-pulse">
                            Silver
                          </span>
                        </div>
                        <div className="h-2 bg-[#333333] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#E31837] transition-all duration-2000 ease-out delay-1000"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-[#CCCCCC] text-xs animate-in fade-in duration-500 delay-1500">
                            1325
                          </span>
                          <span className="text-[#CCCCCC] text-xs animate-in fade-in duration-500 delay-1700">
                            1500 (Gold)
                          </span>
                        </div>
                      </div>

                      {/* Animated Recent Sessions */}
                      <div className="bg-[#181818] border border-[#333333] rounded-lg p-4 animate-in slide-in-from-bottom-4 duration-700 delay-1000">
                        <h4 className="text-white font-semibold mb-3 text-sm">Recent Sessions</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 animate-in slide-in-from-left-4 duration-500 delay-1500">
                            <div className="w-8 h-8 bg-[#333333] rounded flex items-center justify-center">
                              <Play size={12} className="text-white animate-pulse" />
                            </div>
                            <div className="flex-1">
                              <div className="text-white text-xs">June 25, 2025</div>
                              <div className="text-[#CCCCCC] text-xs">P:68 • D:54 • A:72</div>
                            </div>
                            <div className="text-[#1E90FF] text-xs font-semibold animate-in zoom-in duration-300 delay-2000">
                              +15
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Tab Bar */}
                    <div className="h-16 bg-[#101010] border-t border-[#333333] flex items-center justify-around">
                      {[
                        { icon: "🏠", label: "Home", active: false },
                        { icon: "⚡", label: "Spar", active: false },
                        { icon: "📅", label: "Events", active: false },
                        { icon: "📊", label: "Analyze", active: true },
                        { icon: "👤", label: "Profile", active: false },
                      ].map((tab, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <span
                            className={`text-lg mb-1 transition-all duration-300 ${tab.active ? "opacity-100 scale-110" : "opacity-50"}`}
                          >
                            {tab.icon}
                          </span>
                          <span
                            className={`text-xs transition-colors duration-300 ${tab.active ? "text-[#E31837]" : "text-[#555555]"}`}
                          >
                            {tab.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-white font-semibold mb-2">Performance Analytics</h3>
                <p className="text-[#CCCCCC] text-sm">Track your progress with AI-powered insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-[#101010]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#1E90FF] text-white mb-4">FEATURES</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-[#CCCCCC] max-w-2xl mx-auto">
              FightConnect brings together fighters, coaches, and fans in one seamless platform.
            </p>
          </div>

          <Tabs defaultValue="find-spar" className="w-full">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-12 bg-[#181818]">
              <TabsTrigger value="find-spar" className="text-white data-[state=active]:bg-[#E31837]">
                Find Spar
              </TabsTrigger>
              <TabsTrigger value="events" className="text-white data-[state=active]:bg-[#E31837]">
                Events
              </TabsTrigger>
              <TabsTrigger value="analyze" className="text-white data-[state=active]:bg-[#E31837]">
                Analyze
              </TabsTrigger>
            </TabsList>

            {/* Find Spar Preview */}
            <TabsContent value="find-spar" className="mt-0">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">Find Your Perfect Sparring Partner</h3>
                  <p className="text-[#CCCCCC] mb-6">
                    Match with fighters in your area based on weight class, skill level, and fighting style. Schedule
                    sessions and improve together.
                  </p>
                  <ul className="space-y-4">
                    {[
                      { icon: Users, text: "Filter by weight class, ELO rating, and discipline" },
                      { icon: Shield, text: "Verified fighter profiles with performance metrics" },
                      { icon: Zap, text: "Request and schedule spar sessions in-app" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="mr-4 mt-1 bg-[#E31837] p-1 rounded-full">
                          <item.icon size={16} className="text-white" />
                        </div>
                        <span className="text-white">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Find Spar Preview Cards */}
                <div className="bg-[#181818] p-6 rounded-lg">
                  <h4 className="text-white font-semibold mb-4">Preview Find Spar</h4>
                  <div className="space-y-4">
                    {mockData.fighters.slice(0, 2).map((fighter, index) => (
                      <Card key={fighter.fighterId} className="bg-[#202020] border-[#333333]">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            {/* Fighter Avatar */}
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#E31837] to-[#C7142F] flex-shrink-0">
                              {index === 0 && (
                                <img
                                  src="/images/boxer-mouthguard.webp"
                                  alt={fighter.name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                              {index === 1 && (
                                <img
                                  src="/images/ufc-champion.jpeg"
                                  alt={fighter.name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>

                            {/* Fighter Info */}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-white font-semibold">{fighter.name}</h3>
                                <Badge className="bg-[#1E90FF] text-white text-xs">
                                  {fighter.elo} | {fighter.tier}
                                </Badge>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-[#CCCCCC]">
                                <span>{fighter.discipline}</span>
                                <span>{fighter.weightClass}</span>
                                <span>{fighter.distance}</span>
                              </div>
                            </div>

                            {/* Request Spar Button */}
                            <Button
                              onClick={handleRequestSpar}
                              variant="outline"
                              size="sm"
                              className="border-[#E31837] text-[#E31837] hover:bg-[#E31837] hover:text-white flex-shrink-0"
                            >
                              Request Spar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button onClick={onGetStarted} className="bg-[#E31837] hover:bg-[#C7142F] text-white">
                      Try Find Spar
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Events Preview */}
            <TabsContent value="events" className="mt-0">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">Discover & Join Fight Events</h3>
                  <p className="text-[#CCCCCC] mb-6">
                    Browse upcoming events, from local sparring sessions to professional fight cards. Purchase tickets
                    and manage your schedule all in one place.
                  </p>
                  <ul className="space-y-4">
                    {[
                      { icon: Calendar, text: "Find local and regional fight events" },
                      { icon: Star, text: "Join free sparring sessions or buy tickets to pro events" },
                      { icon: Award, text: "For gyms: Create and promote your own events" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="mr-4 mt-1 bg-[#E31837] p-1 rounded-full">
                          <item.icon size={16} className="text-white" />
                        </div>
                        <span className="text-white">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Events Preview Cards */}
                <div className="bg-[#181818] p-6 rounded-lg">
                  <h4 className="text-white font-semibold mb-4">Preview Events</h4>
                  <div className="space-y-4">
                    {mockData.events.slice(0, 2).map((event, index) => (
                      <Card key={event.eventId} className="bg-[#202020] border-[#333333] overflow-hidden">
                        <CardContent className="p-0">
                          <div className="h-32 relative">
                            {index === 0 && (
                              <img
                                src="/images/arm-wrestling.webp"
                                alt={event.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                            {index === 1 && (
                              <img
                                src="/images/boxing-match.webp"
                                alt={event.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                              <div className="text-center text-white">
                                <h3 className="text-lg font-bold">{event.title}</h3>
                              </div>
                            </div>
                            <div className="absolute top-2 left-2">
                              {event.isFree ? (
                                <Badge className="bg-[#E31837] text-white">FREE</Badge>
                              ) : (
                                <Badge className="bg-[#E31837] text-white">${event.price}</Badge>
                              )}
                            </div>
                          </div>
                          <div className="p-3">
                            <p className="text-[#CCCCCC] text-sm">
                              {event.date} • {event.time} • {event.location}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button onClick={onGetStarted} className="bg-[#E31837] hover:bg-[#C7142F] text-white">
                      Explore Events
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Analyze Preview */}
            <TabsContent value="analyze" className="mt-0">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">Track & Improve Performance</h3>
                  <p className="text-[#CCCCCC] mb-6">
                    Upload your sparring videos and get AI-powered analysis of your technique, power, defense, and
                    accuracy. Track your progress over time.
                  </p>
                  <ul className="space-y-4">
                    {[
                      { icon: BarChart3, text: "AI analysis of power, defense, and accuracy" },
                      { icon: Star, text: "Track ELO rating and tier progression" },
                      { icon: Award, text: "Earn achievements and badges as you improve" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="mr-4 mt-1 bg-[#E31837] p-1 rounded-full">
                          <item.icon size={16} className="text-white" />
                        </div>
                        <span className="text-white">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Analyze Preview */}
                <div className="bg-[#181818] p-6 rounded-lg">
                  <h4 className="text-white font-semibold mb-4">Preview Analytics</h4>
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Power", value: 68, color: "#E31837" },
                        { label: "Defense", value: 54, color: "#1E90FF" },
                        { label: "Accuracy", value: 72, color: "#E31837" },
                      ].map((metric, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="relative w-20 h-20">
                            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="45" stroke="#333333" strokeWidth="8" fill="none" />
                              <circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke={metric.color}
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 45}`}
                                strokeDashoffset={`${2 * Math.PI * 45 * (1 - metric.value / 100)}`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">{metric.value}</span>
                            </div>
                          </div>
                          <span className="text-[#CCCCCC] text-sm mt-2">{metric.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#202020] p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">ELO Progress</span>
                        <Badge className="bg-[#1E90FF] text-white">Silver Tier</Badge>
                      </div>
                      <div className="h-4 bg-[#333333] rounded-full overflow-hidden">
                        <div className="h-full bg-[#E31837]" style={{ width: "65%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-[#CCCCCC] text-xs">1325</span>
                        <span className="text-[#CCCCCC] text-xs">1500 (Gold)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <Button onClick={onGetStarted} className="bg-[#E31837] hover:bg-[#C7142F] text-white">
                      Try Analytics
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-[#181818]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Step Into the Ring?</h2>
          <p className="text-[#CCCCCC] max-w-2xl mx-auto mb-8">
            Join thousands of fighters already using FightConnect to find sparring partners, track progress, and
            discover events.
          </p>
          <Button onClick={onGetStarted} size="lg" className="bg-[#E31837] hover:bg-[#C7142F] text-white">
            Sign Up Now
          </Button>
        </div>
      </div>

      {/* Sign Up Prompt Modal */}
      {showSignUpPrompt && <SignUpPrompt onClose={() => setShowSignUpPrompt(false)} onSignUp={onGetStarted} />}
    </div>
  )
}
