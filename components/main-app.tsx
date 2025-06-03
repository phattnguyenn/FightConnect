"use client"

import { useState } from "react"
import { Home, Zap, Calendar, BarChart3, User } from "lucide-react"
import { HomeFeed } from "@/components/home-feed"
import { FindSpar } from "@/components/find-spar"
import { Events } from "@/components/events"
import { Analyze } from "@/components/analyze"
import { Profile } from "@/components/profile"

interface MainAppProps {
  userRole: "fighter" | "coach" | "fan" | null
}

export function MainApp({ userRole }: MainAppProps) {
  const [activeTab, setActiveTab] = useState<"home" | "spar" | "events" | "analyze" | "profile">("home")

  const tabs = [
    { id: "home" as const, icon: Home, label: "Home" },
    { id: "spar" as const, icon: Zap, label: "Find Spar" },
    { id: "events" as const, icon: Calendar, label: "Events" },
    { id: "analyze" as const, icon: BarChart3, label: "Analyze" },
    { id: "profile" as const, icon: User, label: "Profile" },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeFeed />
      case "spar":
        return <FindSpar />
      case "events":
        return <Events userRole={userRole} />
      case "analyze":
        return <Analyze />
      case "profile":
        return <Profile userRole={userRole} />
      default:
        return <HomeFeed />
    }
  }

  return (
    <div className="min-h-screen bg-[#101010] flex flex-col">
      {/* Content - Takes remaining space */}
      <main className="flex-1 overflow-hidden">{renderContent()}</main>

      {/* Bottom Tab Bar - Fixed at bottom */}
      <nav className="h-16 bg-[#101010] border-t border-[#333333] flex items-center justify-around px-2 flex-shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center py-2 px-3 min-w-0 flex-1 transition-colors"
            >
              <Icon size={24} className={`mb-1 ${isActive ? "text-[#E31837]" : "text-[#555555]"}`} />
              <span className={`text-xs ${isActive ? "text-[#E31837]" : "text-[#555555]"}`}>{tab.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
