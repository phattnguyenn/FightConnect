"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus, Trash2 } from "lucide-react"

interface CreateEventModalProps {
  onClose: () => void
  onCreated: (eventData: any) => void
}

export function CreateEventModal({ onClose, onCreated }: CreateEventModalProps) {
  const [step, setStep] = useState(1)
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    isFree: false,
    tiers: [] as any[],
  })
  const [newTier, setNewTier] = useState({ name: "", price: "" })

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleAddTier = () => {
    if (newTier.name && newTier.price) {
      setEventData((prev) => ({
        ...prev,
        tiers: [...prev.tiers, { name: newTier.name, price: Number.parseFloat(newTier.price) }],
      }))
      setNewTier({ name: "", price: "" })
    }
  }

  const handleRemoveTier = (index: number) => {
    setEventData((prev) => ({
      ...prev,
      tiers: prev.tiers.filter((_, i) => i !== index),
    }))
  }

  const handlePublish = () => {
    onCreated(eventData)
  }

  const canProceedStep1 = eventData.title && eventData.date && eventData.time && eventData.location
  const canPublish = eventData.isFree || eventData.tiers.length > 0

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="bg-[#181818] border-[#333333] w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-lg">Create Event - Step {step} of 3</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} className="text-white" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <h3 className="text-white font-semibold mb-4">Basic Information</h3>
              <div>
                <label className="text-[#CCCCCC] text-sm mb-2 block">Event Title</label>
                <Input
                  value={eventData.title}
                  onChange={(e) => setEventData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter event title"
                  className="bg-[#101010] border-[#333333] text-white placeholder:text-[#555555]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#CCCCCC] text-sm mb-2 block">Date</label>
                  <Select
                    value={eventData.date}
                    onValueChange={(value) => setEventData((prev) => ({ ...prev, date: value }))}
                  >
                    <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                      <SelectValue placeholder="Select date" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181818] border-[#333333]">
                      <SelectItem value="2025-07-10" className="text-white">
                        2025-07-10
                      </SelectItem>
                      <SelectItem value="2025-07-11" className="text-white">
                        2025-07-11
                      </SelectItem>
                      <SelectItem value="2025-07-12" className="text-white">
                        2025-07-12
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-[#CCCCCC] text-sm mb-2 block">Time</label>
                  <Select
                    value={eventData.time}
                    onValueChange={(value) => setEventData((prev) => ({ ...prev, time: value }))}
                  >
                    <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181818] border-[#333333]">
                      <SelectItem value="18:00" className="text-white">
                        18:00
                      </SelectItem>
                      <SelectItem value="20:00" className="text-white">
                        20:00
                      </SelectItem>
                      <SelectItem value="22:00" className="text-white">
                        22:00
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-[#CCCCCC] text-sm mb-2 block">Location</label>
                <Input
                  value={eventData.location}
                  onChange={(e) => setEventData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter gym/stadium address"
                  className="bg-[#101010] border-[#333333] text-white placeholder:text-[#555555]"
                />
              </div>

              <Button
                onClick={handleNext}
                disabled={!canProceedStep1}
                className="w-full bg-[#E31837] hover:bg-[#C7142F] text-white"
              >
                Next
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="text-white font-semibold mb-4">Match Setup</h3>
              <p className="text-[#CCCCCC] text-sm mb-4">
                For this demo, we'll skip detailed match setup and proceed to pricing.
              </p>

              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline" className="flex-1 border-[#333333] text-white">
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1 bg-[#E31837] hover:bg-[#C7142F] text-white">
                  Next
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="text-white font-semibold mb-4">Tickets & Pricing</h3>

              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="free-event"
                  checked={eventData.isFree}
                  onCheckedChange={(checked) => setEventData((prev) => ({ ...prev, isFree: !!checked }))}
                />
                <label htmlFor="free-event" className="text-white">
                  Free Event
                </label>
              </div>

              {!eventData.isFree && (
                <>
                  <div className="space-y-3">
                    <h4 className="text-white font-medium">Add Ticket Tiers</h4>
                    <div className="flex gap-2">
                      <Input
                        value={newTier.name}
                        onChange={(e) => setNewTier((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., General Admission"
                        className="flex-1 bg-[#101010] border-[#333333] text-white placeholder:text-[#555555]"
                      />
                      <Input
                        type="number"
                        value={newTier.price}
                        onChange={(e) => setNewTier((prev) => ({ ...prev, price: e.target.value }))}
                        placeholder="Price"
                        className="w-24 bg-[#101010] border-[#333333] text-white placeholder:text-[#555555]"
                      />
                      <Button
                        onClick={handleAddTier}
                        variant="outline"
                        size="sm"
                        className="border-[#1E90FF] text-[#1E90FF]"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>

                    {eventData.tiers.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="text-[#CCCCCC] text-sm">Added Tiers:</h5>
                        {eventData.tiers.map((tier, index) => (
                          <div key={index} className="flex items-center justify-between bg-[#101010] p-2 rounded">
                            <span className="text-white">
                              {tier.name} - ${tier.price}
                            </span>
                            <Button onClick={() => handleRemoveTier(index)} variant="ghost" size="sm">
                              <Trash2 size={16} className="text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="flex gap-3 mt-6">
                <Button onClick={handleBack} variant="outline" className="flex-1 border-[#333333] text-white">
                  Back
                </Button>
                <Button
                  onClick={handlePublish}
                  disabled={!canPublish}
                  className="flex-1 bg-[#E31837] hover:bg-[#C7142F] text-white"
                >
                  Publish Event
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
