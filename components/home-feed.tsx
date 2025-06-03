"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share, Play, Calendar, MapPin, Users, Clock, Trophy, Star } from "lucide-react"
import { mockData } from "@/lib/mock-data"

export function HomeFeed() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-4 p-4">
        {mockData.feed.map((item, index) => {
          if (item.type === "fight_card") {
            return (
              <Card key={index} className="bg-[#181818] border-[#333333] relative overflow-hidden">
                <CardContent className="p-0">
                  {/* Fight Card Banner */}
                  <div className="h-64 relative">
                    <img
                      src={item.bannerImageUrl || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Promotion Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#E31837] text-white font-bold text-sm px-3 py-1">{item.promotion}</Badge>
                    </div>

                    {/* PPV Price Badge */}
                    {item.ppvPrice && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-[#1E90FF] text-white font-bold">PPV ${item.ppvPrice}</Badge>
                      </div>
                    )}

                    {/* Event Title and Date */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-2xl font-bold mb-2">{item.title}</h3>
                      <div className="flex items-center gap-4 text-white/90 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>
                            {item.date} • {item.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          <span>{item.venue}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Event Details */}
                  <div className="p-4 bg-gradient-to-r from-[#E31837]/10 to-[#1E90FF]/10 border-b border-[#333333]">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-[#E31837] text-white">MAIN EVENT</Badge>
                      <div className="flex items-center gap-1 text-[#CCCCCC] text-sm">
                        <Trophy size={14} />
                        <span>{item.mainEvent.title}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 items-center">
                      {/* Fighter 1 */}
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden border-2 border-[#E31837]">
                          {item.mainEvent.fighter1.image ? (
                            <img
                              src={item.mainEvent.fighter1.image || "/placeholder.svg"}
                              alt={item.mainEvent.fighter1.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#E31837] to-[#C7142F] flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {item.mainEvent.fighter1.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                          )}
                        </div>
                        <h4 className="text-white font-semibold text-sm mb-1">{item.mainEvent.fighter1.name}</h4>
                        <p className="text-[#CCCCCC] text-xs">{item.mainEvent.fighter1.record}</p>
                        <p className="text-[#CCCCCC] text-xs">{item.mainEvent.fighter1.country}</p>
                      </div>

                      {/* VS */}
                      <div className="text-center">
                        <div className="text-[#E31837] font-bold text-2xl mb-2">VS</div>
                        <div className="text-[#CCCCCC] text-xs">{item.mainEvent.rounds} Rounds</div>
                      </div>

                      {/* Fighter 2 */}
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden border-2 border-[#1E90FF]">
                          {item.mainEvent.fighter2.image ? (
                            <img
                              src={item.mainEvent.fighter2.image || "/placeholder.svg"}
                              alt={item.mainEvent.fighter2.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#1E90FF] to-[#1873CC] flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {item.mainEvent.fighter2.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                          )}
                        </div>
                        <h4 className="text-white font-semibold text-sm mb-1">{item.mainEvent.fighter2.name}</h4>
                        <p className="text-[#CCCCCC] text-xs">{item.mainEvent.fighter2.record}</p>
                        <p className="text-[#CCCCCC] text-xs">{item.mainEvent.fighter2.country}</p>
                      </div>
                    </div>
                  </div>

                  {/* Co-Main Event */}
                  {item.coMainEvent && (
                    <div className="p-4 border-b border-[#333333]">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-[#1E90FF] text-[#1E90FF]">
                          CO-MAIN EVENT
                        </Badge>
                        <span className="text-[#CCCCCC] text-sm">{item.coMainEvent.title}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">{item.coMainEvent.fighter1.name}</span>
                        <span className="text-[#E31837] font-bold">VS</span>
                        <span className="text-white text-sm font-medium">{item.coMainEvent.fighter2.name}</span>
                      </div>
                    </div>
                  )}

                  {/* Undercard */}
                  {item.undercard && item.undercard.length > 0 && (
                    <div className="p-4 border-b border-[#333333]">
                      <h5 className="text-white font-semibold mb-2 text-sm">Undercard</h5>
                      <div className="space-y-1">
                        {item.undercard.slice(0, 2).map((fight, fightIndex) => (
                          <div key={fightIndex} className="flex items-center justify-between text-sm">
                            <span className="text-[#CCCCCC]">{fight.fighter1}</span>
                            <span className="text-[#555555]">vs</span>
                            <span className="text-[#CCCCCC]">{fight.fighter2}</span>
                            <span className="text-[#555555] text-xs">{fight.weightClass}</span>
                          </div>
                        ))}
                        {item.undercard.length > 2 && (
                          <p className="text-[#555555] text-xs">+{item.undercard.length - 2} more fights</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Ticket Prices */}
                  {item.ticketPrices && (
                    <div className="p-4 border-b border-[#333333]">
                      <h5 className="text-white font-semibold mb-2 text-sm">Tickets From</h5>
                      <div className="flex gap-2 flex-wrap">
                        {Object.entries(item.ticketPrices)
                          .slice(0, 3)
                          .map(([tier, price]) => (
                            <Badge key={tier} variant="outline" className="border-[#333333] text-[#CCCCCC] text-xs">
                              {tier}: ${price}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="p-4">
                    <div className="flex gap-3 mb-3">
                      <Button className="flex-1 bg-[#E31837] hover:bg-[#C7142F] text-white">
                        <Calendar size={16} className="mr-2" />
                        Get Tickets
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF] hover:text-white"
                      >
                        <Star size={16} className="mr-2" />
                        Follow
                      </Button>
                    </div>

                    {/* Social Stats */}
                    <div className="flex items-center justify-between text-[#555555] text-sm">
                      <div className="flex gap-4">
                        <button className="flex items-center gap-1 hover:text-[#E31837] transition-colors">
                          <Heart size={16} />
                          <span>{item.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-[#1E90FF] transition-colors">
                          <MessageCircle size={16} />
                          <span>{item.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-white transition-colors">
                          <Share size={16} />
                          <span>{item.shares}</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>
                          {Math.ceil((new Date(item.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                          days
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          }

          if (item.type === "news") {
            return (
              <Card key={index} className="bg-[#181818] border-[#333333] overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    {/* News Image */}
                    <div className="w-32 h-24 flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.headline}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* News Content */}
                    <div className="flex-1 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#1E90FF] text-white text-xs">{item.category}</Badge>
                        <span className="text-[#555555] text-xs">{item.source}</span>
                      </div>

                      <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2">{item.headline}</h4>

                      <p className="text-[#CCCCCC] text-xs mb-2 line-clamp-2">{item.summary}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-[#555555] text-xs">{item.publishedAt}</span>
                        <div className="flex gap-3 text-[#555555] text-xs">
                          <button className="flex items-center gap-1 hover:text-[#E31837] transition-colors">
                            <Heart size={12} />
                            <span>{item.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-[#1E90FF] transition-colors">
                            <MessageCircle size={12} />
                            <span>{item.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          }

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

                    {/* Spots available */}
                    {item.spotsAvailable && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-[#1E90FF] text-white">
                          <Users size={12} className="mr-1" />
                          {item.spotsAvailable} spots
                        </Badge>
                      </div>
                    )}
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
