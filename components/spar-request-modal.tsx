"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface SparRequestModalProps {
  fighter: any
  onClose: () => void
  onSent: () => void
}

export function SparRequestModal({ fighter, onClose, onSent }: SparRequestModalProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSendRequest = () => {
    if (!selectedDate || !selectedTime) {
      setError("Select date & time.")
      return
    }

    setError("")
    onSent()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="bg-[#181818] border-[#333333] w-full max-w-md animate-in slide-in-from-bottom-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-lg">Request Spar with {fighter.name}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} className="text-white" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#CCCCCC] text-sm mb-2 block">Date</label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent className="bg-[#181818] border-[#333333]">
                  <SelectItem value="2025-06-30" className="text-white">
                    2025-06-30
                  </SelectItem>
                  <SelectItem value="2025-07-01" className="text-white">
                    2025-07-01
                  </SelectItem>
                  <SelectItem value="2025-07-02" className="text-white">
                    2025-07-02
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-[#CCCCCC] text-sm mb-2 block">Time</label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-[#181818] border-[#333333]">
                  <SelectItem value="17:00" className="text-white">
                    17:00
                  </SelectItem>
                  <SelectItem value="18:00" className="text-white">
                    18:00
                  </SelectItem>
                  <SelectItem value="19:00" className="text-white">
                    19:00
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="text-[#CCCCCC] text-sm mb-2 block">Message (Optional)</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Optional message..."
              className="bg-[#101010] border-[#333333] text-white placeholder:text-[#555555]"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSendRequest} className="flex-1 bg-[#E31837] hover:bg-[#C7142F] text-white">
              Send Request
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-[#E31837] text-[#E31837] hover:bg-[#E31837] hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
