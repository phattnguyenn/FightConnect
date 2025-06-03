"use client"

import { useState, useEffect, Suspense } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignUpPrompt } from "@/components/sign-up-prompt"
import { mockData } from "@/lib/mock-data"
import {
  ChevronRight,
  Zap,
  Calendar,
  BarChart3,
  Users,
  Star,
  Shield,
  Award,
} from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
}

function Model3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#E31837" />
        </mesh>
        <OrbitControls enableZoom={false} autoRotate />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div className="min-h-screen bg-[#101010]">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 container mx-auto px-4 h-full flex flex-col"
        >
          <header className="py-6 flex justify-between items-center">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#E31837] flex items-center justify-center mr-2">
                <Zap size={20} className="text-white" />
              </div>
              <h1 className="text-white text-2xl font-bold">FightConnect</h1>
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button onClick={onGetStarted} className="bg-[#E31837] hover:bg-[#C7142F] text-white">
                Sign Up
              </Button>
            </motion.div>
          </header>

          <div className="flex-1 flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="md:w-1/2 text-center md:text-left mb-8 md:mb-0"
            >
              <Badge className="bg-[#1E90FF] text-white mb-4">BETA ACCESS</Badge>
              <h1 className="text-5xl font-bold text-white mb-4">Connect. Spar. Improve.</h1>
              <p className="text-xl text-[#CCCCCC] mb-8">
                The ultimate platform for fighters to find sparring partners, track performance, and join local events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-[#E31837] hover:bg-[#C7142F] text-white"
                >
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="md:w-1/2 h-[400px]"
            >
              <Model3D />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        style={{ y }}
        className="py-20 bg-gradient-to-b from-[#101010] to-[#181818]"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#1E90FF] text-white mb-4">FEATURES</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-[#CCCCCC] max-w-2xl mx-auto">
              FightConnect brings together fighters, coaches, and fans in one seamless platform.
            </p>
          </motion.div>

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

            {/* Tab Content */}
            <TabsContent value="find-spar" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
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

                <div className="bg-[#181818] p-6 rounded-lg">
                  <h4 className="text-white font-semibold mb-4">Preview Find Spar</h4>
                  <div className="space-y-4">
                    {mockData.fighters.slice(0, 2).map((fighter, index) => (
                      <Card key={fighter.fighterId} className="bg-[#202020] border-[#333333]">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
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
                            <Button
                              onClick={() => setShowSignUpPrompt(true)}
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
              </motion.div>
            </TabsContent>

            <TabsContent value="events" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
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
              </motion.div>
            </TabsContent>

            <TabsContent value="analyze" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
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
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-[#181818]"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Step Into the Ring?</h2>
          <p className="text-[#CCCCCC] max-w-2xl mx-auto mb-8">
            Join thousands of fighters already using FightConnect to find sparring partners, track progress, and discover
            events.
          </p>
          <Button onClick={onGetStarted} size="lg" className="bg-[#E31837] hover:bg-[#C7142F] text-white">
            Sign Up Now
          </Button>
        </div>
      </motion.div>

      {/* Sign Up Prompt Modal */}
      {showSignUpPrompt && <SignUpPrompt onClose={() => setShowSignUpPrompt(false)} onSignUp={onGetStarted} />}
    </div>
  )
}

export { LandingPage }