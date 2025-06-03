"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronRight,
  Zap,
  Calendar,
  BarChart3,
  Users,
  Star,
  Shield,
  Play,
  Trophy,
  Target,
  MapPin,
  CheckCircle,
  Smartphone,
} from "lucide-react"
import { SignUpPrompt } from "@/components/sign-up-prompt"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false)

  const handleRequestSpar = () => {
    setShowSignUpPrompt(true)
  }

  const stats = [
    { number: "50K+", label: "Active Fighters", icon: Users },
    { number: "2M+", label: "Sparring Sessions", icon: Target },
    { number: "500+", label: "Gyms Connected", icon: MapPin },
    { number: "98%", label: "Match Success Rate", icon: Trophy },
  ]

  const features = [
    {
      icon: Users,
      title: "Smart Matching",
      description: "AI-powered algorithm matches you with fighters based on skill level, weight class, and location.",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description:
        "Track your progress with detailed analytics on power, defense, accuracy, and technique improvement.",
    },
    {
      icon: Calendar,
      title: "Event Discovery",
      description: "Find and join local tournaments, sparring sessions, and fight events in your area.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Verified profiles, safety ratings, and comprehensive insurance coverage for all sessions.",
    },
    {
      icon: Trophy,
      title: "ELO Rating System",
      description: "Competitive ranking system that tracks your skill progression and matches you fairly.",
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Seamless experience across all devices with our responsive, mobile-optimized platform.",
    },
  ]

  const testimonials = [
    {
      name: "Marcus Rodriguez",
      role: "Professional Boxer",
      image: "/images/boxer-mouthguard.webp",
      quote:
        "FightConnect revolutionized my training. I've found amazing sparring partners and improved my technique significantly.",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      role: "MMA Fighter",
      image: "/images/ufc-champion.jpeg",
      quote:
        "The analytics feature helped me identify weaknesses in my game. My performance has improved 40% since joining.",
      rating: 5,
    },
    {
      name: "Coach Mike Thompson",
      role: "Gym Owner",
      image: "/images/mma-fighter.jpeg",
      quote: "Our gym has connected with fighters worldwide. The platform has expanded our community tremendously.",
      rating: 5,
    },
  ]

  const pricingPlans = [
    {
      name: "Fighter",
      price: "Free",
      description: "Perfect for casual fighters",
      features: [
        "Find sparring partners",
        "Basic performance tracking",
        "Join free events",
        "Community access",
        "Mobile app access",
      ],
      popular: false,
    },
    {
      name: "Pro Fighter",
      price: "$19/month",
      description: "For serious competitors",
      features: [
        "Everything in Fighter",
        "Advanced analytics",
        "Priority matching",
        "Video analysis tools",
        "Tournament entry discounts",
        "Coach collaboration tools",
      ],
      popular: true,
    },
    {
      name: "Gym/Coach",
      price: "$49/month",
      description: "For gyms and coaches",
      features: [
        "Everything in Pro Fighter",
        "Manage multiple fighters",
        "Create and host events",
        "Advanced team analytics",
        "Custom branding",
        "Revenue sharing program",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-[#101010] flex flex-col">
      {/* Hero Section */}
      <div className="relative min-h-screen">
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
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white hover:text-[#E31837]">
                Sign In
              </Button>
              <Button onClick={onGetStarted} className="bg-[#E31837] hover:bg-[#C7142F] text-white">
                Get Started
              </Button>
            </div>
          </header>

          <div className="flex-1 flex items-center">
            <div className="max-w-4xl">
              <Badge className="bg-[#1E90FF] text-white mb-6">🚀 NOW LIVE - 2025</Badge>
              <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                Connect. Train. <span className="text-[#E31837]">Dominate.</span>
              </h1>
              <p className="text-xl text-[#CCCCCC] mb-8 max-w-2xl">
                Join the world's largest fighting community. Find sparring partners, track your performance, and compete
                in events. Over 50,000 fighters trust FightConnect to elevate their game.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-[#E31837] hover:bg-[#C7142F] text-white text-lg px-8 py-4"
                >
                  Start Training Today
                  <ChevronRight size={20} className="ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-[#101010] text-lg px-8 py-4"
                >
                  <Play size={20} className="mr-2" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon size={24} className="text-[#E31837] mr-2" />
                      <span className="text-3xl font-bold text-white">{stat.number}</span>
                    </div>
                    <p className="text-[#CCCCCC] text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-[#181818]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#1E90FF] text-white mb-4">FEATURES</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need to Excel</h2>
            <p className="text-[#CCCCCC] max-w-2xl mx-auto">
              From finding the perfect sparring partner to tracking your progress, FightConnect provides all the tools
              you need to become a better fighter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-[#202020] border-[#333333] hover:border-[#E31837] transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#E31837] flex items-center justify-center mr-4">
                      <feature.icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-white text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-[#CCCCCC]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-[#101010]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#1E90FF] text-white mb-4">HOW IT WORKS</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">Get Started in 3 Simple Steps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E31837] flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-[#CCCCCC]">
                Set up your fighter profile with your discipline, weight class, and skill level.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E31837] flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Find Your Match</h3>
              <p className="text-[#CCCCCC]">
                Our AI algorithm connects you with compatible sparring partners in your area.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E31837] flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Train & Improve</h3>
              <p className="text-[#CCCCCC]">
                Spar safely, track your progress, and watch your skills improve over time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-[#181818]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#1E90FF] text-white mb-4">TESTIMONIALS</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">Loved by Fighters Worldwide</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-[#202020] border-[#333333]">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-[#CCCCCC] text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-[#CCCCCC] italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-[#101010]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#1E90FF] text-white mb-4">PRICING</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-[#CCCCCC] max-w-2xl mx-auto">
              Start free and upgrade as you grow. All plans include our core features with no hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`bg-[#202020] border-[#333333] relative ${plan.popular ? "border-[#E31837]" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#E31837] text-white">MOST POPULAR</Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-white text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-[#CCCCCC] mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-white text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && <span className="text-[#CCCCCC]">/month</span>}
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle size={16} className="text-[#E31837] mr-3" />
                        <span className="text-[#CCCCCC]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={onGetStarted}
                    className={`w-full ${plan.popular ? "bg-[#E31837] hover:bg-[#C7142F]" : "bg-[#333333] hover:bg-[#444444]"} text-white`}
                  >
                    {plan.price === "Free" ? "Get Started" : "Start Free Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-[#E31837] to-[#C7142F]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Training?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            Join over 50,000 fighters who are already using FightConnect to find sparring partners, track their
            progress, and compete in events. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-[#E31837] hover:bg-gray-100 text-lg px-8 py-4"
            >
              Start Free Today
              <ChevronRight size={20} className="ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#E31837] text-lg px-8 py-4"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#101010] border-t border-[#333333] py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-[#E31837] flex items-center justify-center mr-2">
                  <Zap size={16} className="text-white" />
                </div>
                <h3 className="text-white text-xl font-bold">FightConnect</h3>
              </div>
              <p className="text-[#CCCCCC] mb-4">
                The world's leading platform for fighters to connect, train, and compete.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-[#333333] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-[#333333] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-[#333333] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">i</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#CCCCCC] hover:text-white">
                    Find Sparring
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#CCCCCC] hover:text-white">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#CCCCCC] hover:text-white">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#CCCCCC] hover:text-white">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#CCCCCC] hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#CCCCCC] hover:text-white">
                    Safety Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#CCCCCC] hover:text-white">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#CCCCCC] hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#CCCCCC] hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#CCCCCC] hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#CCCCCC] hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#CCCCCC] hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#333333] mt-8 pt-8 text-center">
            <p className="text-[#CCCCCC]">© 2025 FightConnect. All rights reserved. Built for fighters, by fighters.</p>
          </div>
        </div>
      </footer>

      {/* Sign Up Prompt Modal */}
      {showSignUpPrompt && <SignUpPrompt onClose={() => setShowSignUpPrompt(false)} onSignUp={onGetStarted} />}
    </div>
  )
}
