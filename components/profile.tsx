"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Edit, Plus, Trophy, Calendar } from "lucide-react"
import { mockData } from "@/lib/mock-data"

interface ProfileProps {
  userRole: "fighter" | "coach" | "fan" | null
}

export function Profile({ userRole }: ProfileProps) {
  if (userRole === "fighter") {
    return <FighterProfile />
  }

  if (userRole === "coach") {
    return <CoachProfile />
  }

  return <FanProfile />
}

function FighterProfile() {
  const user = mockData.user.fighter

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#333333] to-[#101010] p-6 relative">
        <div className="flex items-end gap-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E31837] to-[#C7142F] flex items-center justify-center border-4 border-white">
            <span className="text-white font-bold text-2xl">
              {user.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold">{user.fullName}</h1>
            <p className="text-[#CCCCCC]">"{user.nickname}"</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-[#1E90FF] text-white">
                {user.elo} | {user.tier}
              </Badge>
              <Badge variant="outline" className="border-[#333333] text-[#CCCCCC]">
                {user.weightClass}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="border-[#1E90FF] text-[#1E90FF]">
            <Edit size={16} className="mr-1" />
            Edit Profile
          </Button>
          <Button variant="outline" size="sm" className="border-[#333333] text-white">
            <Settings size={16} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Stats Overview */}
        <Card className="bg-[#181818] border-[#333333]">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3">Performance Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E31837]">68</div>
                <div className="text-xs text-[#CCCCCC]">Power</div>
                <div className="text-xs text-[#E31837]">↑ +3</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1E90FF]">54</div>
                <div className="text-xs text-[#CCCCCC]">Defense</div>
                <div className="text-xs text-[#555555]">±0</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E31837]">72%</div>
                <div className="text-xs text-[#CCCCCC]">Accuracy</div>
                <div className="text-xs text-[#E31837]">↑ +2%</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#333333] text-center">
              <span className="text-white font-semibold">Record: 18 W – 5 L</span>
            </div>
          </CardContent>
        </Card>

        {/* Spar Invitations */}
        <Card className="bg-[#181818] border-[#333333]">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3">Spar Invitations</h3>
            {mockData.sparInvites.map((invite) => (
              <div key={invite.inviteId} className="flex items-center gap-3 p-3 bg-[#101010] rounded-lg">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E90FF] to-[#1873CC] flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {invite.fromFighter
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{invite.fromFighter}</p>
                  <p className="text-[#CCCCCC] text-sm">{invite.message}</p>
                  <p className="text-[#555555] text-xs">{invite.sentAt}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-[#E31837] hover:bg-[#C7142F] text-white">
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" className="border-[#333333] text-[#CCCCCC]">
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-[#181818] border-[#333333]">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3">Achievements</h3>
            <div className="grid grid-cols-3 gap-3">
              {["Rising Star", "First Win", "100 Likes"].map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-[#1E90FF] rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy size={20} className="text-white" />
                  </div>
                  <p className="text-xs text-[#CCCCCC]">{achievement}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CoachProfile() {
  const gym = mockData.user.coach

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#333333] to-[#101010] p-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1E90FF] to-[#1873CC] flex items-center justify-center">
            <span className="text-white font-bold text-xl">DF</span>
          </div>
          <div className="flex-1">
            <h1 className="text-white text-xl font-bold">{gym.gymName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-[#1E90FF] text-white">Verified</Badge>
            </div>
            <div className="flex gap-2 mt-2">
              {gym.disciplines.map((discipline) => (
                <Badge key={discipline} variant="outline" className="border-[#333333] text-[#CCCCCC] text-xs">
                  {discipline}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="border-[#1E90FF] text-[#1E90FF]">
            <Edit size={16} className="mr-1" />
            Edit Gym Info
          </Button>
          <Button size="sm" className="bg-[#E31837] hover:bg-[#C7142F] text-white">
            <Plus size={16} className="mr-1" />
            Create Event
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Gym Insights */}
        <Card className="bg-[#181818] border-[#333333]">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3">Gym Insights</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1E90FF]">45</div>
                <div className="text-xs text-[#CCCCCC]">Active Fighters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E31837]">+20</div>
                <div className="text-xs text-[#CCCCCC]">Avg ELO Gain/Month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1E90FF]">12</div>
                <div className="text-xs text-[#CCCCCC]">Events Hosted</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roster */}
        <Card className="bg-[#181818] border-[#333333]">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3">Gym Roster</h3>
            <div className="space-y-3">
              {mockData.roster.map((fighter) => (
                <div key={fighter.fighterId} className="flex items-center gap-3 p-3 bg-[#101010] rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E31837] to-[#C7142F] flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {fighter.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{fighter.name}</p>
                    <Badge className="bg-[#1E90FF] text-white text-xs">
                      {fighter.elo} | {fighter.tier}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#1E90FF]">
                    View Profile →
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function FanProfile() {
  const user = mockData.user.fan

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#333333] to-[#101010] p-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1E90FF] to-[#1873CC] flex items-center justify-center">
            <span className="text-white font-bold text-xl">
              {user.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">{user.fullName}</h1>
            <p className="text-[#CCCCCC]">Fight Fan</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Followed Fighters */}
        <Card className="bg-[#181818] border-[#333333]">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3">Followed Fighters</h3>
            <div className="flex gap-3 overflow-x-auto">
              {mockData.followedFighters.map((fighter) => (
                <div key={fighter.fighterId} className="flex-shrink-0 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E31837] to-[#C7142F] flex items-center justify-center mb-2">
                    <span className="text-white font-semibold">
                      {fighter.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <p className="text-white text-xs font-medium">{fighter.name.split(" ")[0]}</p>
                  <Badge className="bg-[#1E90FF] text-white text-xs mt-1">{fighter.tier}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tickets & Bookings */}
        <Card className="bg-[#181818] border-[#333333]">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3">My Tickets</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#101010] rounded-lg">
                <div className="w-12 h-12 bg-[#E31837] rounded-lg flex items-center justify-center">
                  <Calendar size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Pro MMA Fight Card: Titans Clash</p>
                  <p className="text-[#CCCCCC] text-sm">July 10, 2025 • General Admission</p>
                  <p className="text-[#1E90FF] text-sm">Qty: 2</p>
                </div>
                <Button variant="ghost" size="sm" className="text-[#1E90FF]">
                  View →
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
