"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Play, TrendingUp } from "lucide-react"
import { mockData } from "@/lib/mock-data"

export function Analyze() {
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setSelectedSession(mockData.sessions[1]) // Use latest session
      setIsAnalyzing(false)
    }, 3000)
  }

  const CircularProgress = ({ value, label }: { value: number; label: string }) => {
    const circumference = 2 * Math.PI * 45
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (value / 100) * circumference

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#333333" strokeWidth="8" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#1E90FF"
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{value}</span>
          </div>
        </div>
        <span className="text-[#CCCCCC] text-sm mt-2">{label}</span>
      </div>
    )
  }

  if (isAnalyzing) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E31837] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Analyzing your performance...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="space-y-6">
        {/* Upload Section */}
        {!selectedSession && (
          <Card className="bg-[#181818] border-[#333333] border-dashed">
            <CardContent className="p-8 text-center">
              <Upload size={48} className="text-[#555555] mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Upload Spar Video</h3>
              <p className="text-[#CCCCCC] text-sm mb-4">Max 3 minutes</p>
              <Button onClick={handleAnalyze} className="bg-[#E31837] hover:bg-[#C7142F] text-white">
                Analyze Now
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Current Session Metrics */}
        {selectedSession && (
          <>
            <Card className="bg-[#181818] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-4">Current Session</h3>
                <div className="flex justify-around">
                  <CircularProgress value={selectedSession.metrics.power} label="Power" />
                  <CircularProgress value={selectedSession.metrics.defense} label="Defense" />
                  <CircularProgress value={selectedSession.metrics.accuracy} label="Accuracy" />
                </div>

                <div className="mt-6 p-4 bg-[#1E90FF] bg-opacity-20 rounded-lg">
                  <div className="flex items-center gap-2 text-[#1E90FF]">
                    <TrendingUp size={20} />
                    <span className="font-semibold">ELO Update</span>
                  </div>
                  <p className="text-white mt-1">You gained +15 ELO! New ELO: {selectedSession.eloAfter} (Gold Tier)</p>
                </div>
              </CardContent>
            </Card>

            {/* Historical Sessions */}
            <Card className="bg-[#181818] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-4">Historical Sessions</h3>
                <div className="space-y-3">
                  {mockData.sessions.map((session) => (
                    <div key={session.sessionId} className="flex items-center gap-4 p-3 bg-[#101010] rounded-lg">
                      <div className="w-16 h-16 bg-[#333333] rounded-lg flex items-center justify-center">
                        <Play size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{session.date}</p>
                        <p className="text-[#CCCCCC] text-sm">
                          P:{session.metrics.power} • D:{session.metrics.defense} • A:{session.metrics.accuracy}
                        </p>
                        <p className="text-[#1E90FF] text-sm">ELO {session.eloAfter}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
