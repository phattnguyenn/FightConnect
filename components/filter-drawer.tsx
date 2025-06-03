"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

interface FilterDrawerProps {
  onClose: () => void
  onApply: () => void
}

export function FilterDrawer({ onClose, onApply }: FilterDrawerProps) {
  const [dateRange, setDateRange] = useState("All Dates")
  const [discipline, setDiscipline] = useState("All")
  const [maxPrice, setMaxPrice] = useState([100])

  const handleApply = () => {
    onApply()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
      <Card className="bg-[#181818] border-[#333333] h-full w-80 animate-in slide-in-from-right-4 rounded-l-lg rounded-r-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-lg">Filter Events</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} className="text-white" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-[#CCCCCC] text-sm mb-2 block">Date Range</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#181818] border-[#333333]">
                <SelectItem value="All Dates" className="text-white">
                  All Dates
                </SelectItem>
                <SelectItem value="This Week" className="text-white">
                  This Week
                </SelectItem>
                <SelectItem value="This Month" className="text-white">
                  This Month
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-[#CCCCCC] text-sm mb-2 block">Discipline</label>
            <Select value={discipline} onValueChange={setDiscipline}>
              <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#181818] border-[#333333]">
                <SelectItem value="All" className="text-white">
                  All
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
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex justify-between text-sm text-[#CCCCCC] mb-2">
              <span>Max Price</span>
              <span>${maxPrice[0]}</span>
            </div>
            <Slider value={maxPrice} onValueChange={setMaxPrice} max={100} min={0} step={5} className="w-full" />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleApply} className="flex-1 bg-[#E31837] hover:bg-[#C7142F] text-white">
              Apply
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-[#E31837] text-[#E31837] hover:bg-[#E31837] hover:text-white"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
