"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { MapPin, Clock, Zap, RefreshCw, ArrowLeft } from "lucide-react"
import { mockData } from "@/lib/mock-data"
import { SparRequestModal } from "@/components/spar-request-modal"
import { Toast } from "@/components/toast"

export function FindSpar() {
  const [filters, setFilters] = useState({
    weightClass: "All Classes",
    discipline: "All Disciplines",
    eloRange: [1000, 2400],
  })

  const [appliedFilters, setAppliedFilters] = useState(filters)
  const [filteredFighters, setFilteredFighters] = useState(mockData.fighters)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedFighter, setSelectedFighter] = useState<any>(null)
  const [showSparModal, setShowSparModal] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null)

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const hasFiltersChanged = () => {
    return (
      filters.weightClass !== appliedFilters.weightClass ||
      filters.discipline !== appliedFilters.discipline ||
      filters.eloRange[0] !== appliedFilters.eloRange[0] ||
      filters.eloRange[1] !== appliedFilters.eloRange[1]
    )
  }

  const applyFilters = () => {
    if (!hasFiltersChanged()) {
      showToast("No changes to apply.")
      return
    }

    setIsLoading(true)
    setAppliedFilters({ ...filters })

    setTimeout(() => {
      const filtered = mockData.fighters.filter((fighter) => {
        if (filters.weightClass !== "All Classes" && fighter.weightClass !== filters.weightClass) {
          return false
        }
        if (filters.discipline !== "All Disciplines" && fighter.discipline !== filters.discipline) {
          return false
        }
        if (fighter.elo < filters.eloRange[0] || fighter.elo > filters.eloRange[1]) {
          return false
        }
        return true
      })

      setFilteredFighters(filtered)
      setIsLoading(false)
      showToast("Filters applied", "success")
    }, 300)
  }

  const resetFilters = () => {
    const defaultFilters = {
      weightClass: "All Classes",
      discipline: "All Disciplines",
      eloRange: [1000, 2400],
    }
    setFilters(defaultFilters)
    setAppliedFilters(defaultFilters)
    setFilteredFighters(mockData.fighters)
    showToast("Filters reset", "success")
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    showToast("Refreshing...")

    setTimeout(() => {
      setIsRefreshing(false)
      showToast("All spar partners up to date", "success")
    }, 500)
  }

  const handleRequestSpar = (fighter: any) => {
    setSelectedFighter(fighter)
    setShowSparModal(true)
  }

  const handleSparRequestSent = () => {
    setShowSparModal(false)
    showToast(`Spar request sent to ${selectedFighter?.name}!`, "success")
  }

  const handleFighterCardClick = (fighter: any) => {
    showToast(`Opening profile for ${fighter.name}`)
  }

  return (
    <div className="h-full flex flex-col bg-[#101010]">
      {/* Header - Fixed */}
      <header className="sticky top-0 z-20 h-12 bg-[#101010] border-b border-[#333333] flex items-center justify-between px-4">
        <ArrowLeft size={20} className="text-white" />
        <h1 className="text-white font-bold text-lg">Find Spar</h1>
        <button onClick={handleRefresh} className={`p-1 ${isRefreshing ? "animate-spin" : ""}`}>
          <RefreshCw size={20} className="text-[#E31837]" />
        </button>
      </header>

      {/* Filter Bar - Fixed */}
      <div className="sticky top-12 z-10 bg-[#181818] p-4 border-b border-[#333333]">
        <div className="space-y-3">
          {/* Weight Class and Discipline */}
          <div className="flex gap-2">
            <Select
              value={filters.weightClass}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, weightClass: value }))}
            >
              <SelectTrigger className="flex-1 bg-[#101010] border-[#333333] text-white">
                <SelectValue placeholder="Weight Class" />
              </SelectTrigger>
              <SelectContent className="bg-[#181818] border-[#333333]">
                <SelectItem value="All Classes" className="text-white">
                  All Classes
                </SelectItem>
                <SelectItem value="125 lbs" className="text-white">
                  125 lbs
                </SelectItem>
                <SelectItem value="135 lbs" className="text-white">
                  135 lbs
                </SelectItem>
                <SelectItem value="145 lbs" className="text-white">
                  145 lbs
                </SelectItem>
                <SelectItem value="155 lbs" className="text-white">
                  155 lbs
                </SelectItem>
                <SelectItem value="165 lbs" className="text-white">
                  165 lbs
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.discipline}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, discipline: value }))}
            >
              <SelectTrigger className="flex-1 bg-[#101010] border-[#333333] text-white">
                <SelectValue placeholder="Discipline" />
              </SelectTrigger>
              <SelectContent className="bg-[#181818] border-[#333333]">
                <SelectItem value="All Disciplines" className="text-white">
                  All Disciplines
                </SelectItem>
                <SelectItem value="Boxing" className="text-white">
                  Boxing
                </SelectItem>
                <SelectItem value="MMA" className="text-white">
                  MMA
                </SelectItem>
                <SelectItem value="Muay Thai" className="text-white">
                  Muay Thai
                </SelectItem>
                <SelectItem value="Kickboxing" className="text-white">
                  Kickboxing
                </SelectItem>
                <SelectItem value="BJJ" className="text-white">
                  BJJ
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ELO Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-[#CCCCCC]">
              <span>ELO Range</span>
              <span>
                {filters.eloRange[0]} - {filters.eloRange[1]}
              </span>
            </div>
            <Slider
              value={filters.eloRange}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, eloRange: value }))}
              max={2400}
              min={1000}
              step={25}
              className="w-full"
            />
          </div>

          {/* Apply Filters Button */}
          <Button
            onClick={applyFilters}
            disabled={!hasFiltersChanged()}
            className={`w-full ${
              hasFiltersChanged()
                ? "bg-[#E31837] hover:bg-[#C7142F] text-white"
                : "border border-[#E31837] text-[#E31837] bg-transparent"
            }`}
          >
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Results Container - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-[#E31837] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredFighters.length === 0 ? (
          <div className="flex items-center justify-center h-64 p-4">
            <Card className="bg-[#181818] border-[#333333] w-full max-w-md">
              <CardContent className="p-6 text-center">
                <h3 className="text-white font-semibold mb-2">No spar partners found</h3>
                <p className="text-[#CCCCCC] text-sm mb-4">Try widening your filters.</p>
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF] hover:text-white"
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {filteredFighters.map((fighter, index) => (
              <Card
                key={fighter.fighterId}
                className="bg-[#181818] border-[#333333] cursor-pointer hover:bg-[#202020] transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Fighter Avatar with Real Image */}
                    <div
                      className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-[#E31837] to-[#C7142F] flex-shrink-0"
                      onClick={() => handleFighterCardClick(fighter)}
                    >
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
                      {index === 2 && (
                        <img src="/images/mma-fighter.jpeg" alt={fighter.name} className="w-full h-full object-cover" />
                      )}
                      {index > 2 && (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {fighter.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Fighter Info */}
                    <div className="flex-1" onClick={() => handleFighterCardClick(fighter)}>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold">{fighter.name}</h3>
                        <Badge className="bg-[#1E90FF] text-white text-xs">
                          {fighter.elo} | {fighter.tier}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-[#CCCCCC] mb-2">
                        <span className="flex items-center gap-1">
                          <Zap size={14} className="text-[#1E90FF]" />
                          {fighter.discipline}
                        </span>
                        <span>{fighter.weightClass}</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {fighter.distance}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#555555]">
                        <Clock size={12} />
                        <span>Last seen {fighter.lastSeen}</span>
                      </div>
                    </div>

                    {/* Request Spar Button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRequestSpar(fighter)
                      }}
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
        )}
      </div>

      {/* Modals and Toast */}
      {showSparModal && selectedFighter && (
        <SparRequestModal
          fighter={selectedFighter}
          onClose={() => setShowSparModal(false)}
          onSent={handleSparRequestSent}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
