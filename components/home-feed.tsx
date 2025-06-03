"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share, Play } from "lucide-react"
import { mockData } from "@/lib/mock-data"

export function HomeFeed() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-4 p-4">
        {mockData.feed.map((item, index) => {
          if (item.type === "video") {
            return (
              <Card key={index} className="bg-[#181818] border-[#333333] relative overflow-hidden">
                <CardContent className="p-0">
                  {/* Video Placeholder */}
                  <div className="aspect-[9/16] bg-gradient-to-br from-[#333333] to-[#101010] relative flex items-center justify-center">
                    <Play size={64} className="text-white opacity-50" />

                    {/* Top-left overlay */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-white overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-[#E31837] to-[#C7142F]" />
                      </div>
                      <div className="bg-[#1E90FF] px-2 py-1 rounded-full">
                        <span className="text-white text-xs font-semibold">
                          {item.elo} | {item.tier}
                        </span>
                      </div>
                    </div>

                    {/* Right side overlay */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                      <button className="flex flex-col items-center">
                        <Heart size={32} className="text-white mb-1" />
                        <span className="text-white text-xs">{item.likes}</span>
                      </button>
                      <button className="flex flex-col items-center">
                        <MessageCircle size={32} className="text-white mb-1" />
                        <span className="text-white text-xs">{item.comments}</span>
                      </button>
                      <button className="flex flex-col items-center">
                        <Share size={32} className="text-white mb-1" />
                      </button>
                    </div>

                    {/* Bottom overlay */}
                    <div className="absolute bottom-4 left-4 right-16">
                      <p className="text-white font-semibold mb-1">
                        @{item.fighterName.replace(" ", "").toLowerCase()}
                      </p>
                      <p className="text-white text-sm">{item.description}</p>
                      <div className="flex gap-4 mt-2 text-xs text-[#CCCCCC]">
                        <span>Power: {item.stats.power}</span>
                        <span>Defense: {item.stats.defense}</span>
                        <span>Accuracy: {item.stats.accuracy}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          }

          if (item.type === "event") {
            return (
              <Card key={index} className="bg-[#181818] border-[#333333] overflow-hidden">
                <CardContent className="p-0">
                  {/* Event Banner */}
                  <div className="h-48 bg-gradient-to-r from-[#E31837] to-[#C7142F] relative flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm opacity-90">
                        {item.date} • {item.time}
                      </p>
                    </div>

                    {/* Price badge */}
                    <div className="absolute top-4 left-4 bg-[#E31837] px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-semibold">${item.price}</span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-4">
                    <p className="text-[#CCCCCC] text-sm mb-3">{item.location}</p>
                    <Button className="w-full bg-[#1E90FF] hover:bg-[#1873CC] text-white">Buy Tickets →</Button>
                  </div>
                </CardContent>
              </Card>
            )
          }

          if (item.type === "announcement") {
            return (
              <Card key={index} className="bg-[#181818] border-[#333333] border-l-4 border-l-[#E31837]">
                <CardContent className="p-4">
                  <p className="text-white text-sm">{item.text}</p>
                  <p className="text-[#555555] text-xs mt-2">Posted {item.datePosted}</p>
                </CardContent>
              </Card>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
