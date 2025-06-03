"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Minus } from "lucide-react"

interface TicketPurchaseModalProps {
  event: any
  onClose: () => void
  onPurchased: (quantity: number, tier: string) => void
}

export function TicketPurchaseModal({ event, onClose, onPurchased }: TicketPurchaseModalProps) {
  const [selectedTier, setSelectedTier] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const tiers = event.tiers || [{ name: "General Admission", price: event.price }]
  const selectedTierData = tiers.find((tier: any) => tier.name === selectedTier)
  const totalPrice = selectedTierData ? selectedTierData.price * quantity : 0

  const handleConfirmPurchase = () => {
    if (!selectedTier || quantity < 1) return
    setShowConfirmation(true)
  }

  const handleFinalConfirm = () => {
    onPurchased(quantity, selectedTier)
  }

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="bg-[#181818] border-[#333333] w-full max-w-md animate-in slide-in-from-bottom-4">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl">Ticket Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="w-48 h-48 bg-white mx-auto rounded-lg flex items-center justify-center">
              <div className="text-black text-xs">
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-white">Show this QR code at the door.</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF] hover:text-white"
              >
                View Ticket
              </Button>
              <Button
                onClick={handleFinalConfirm}
                variant="outline"
                className="flex-1 border-[#E31837] text-[#E31837] hover:bg-[#E31837] hover:text-white"
              >
                Done
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="bg-[#181818] border-[#333333] w-full max-w-md animate-in slide-in-from-bottom-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-lg">Purchase Ticket for {event.title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} className="text-white" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {tiers.length > 1 && (
            <div>
              <label className="text-[#CCCCCC] text-sm mb-2 block">Ticket Tier</label>
              <Select value={selectedTier} onValueChange={setSelectedTier}>
                <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent className="bg-[#181818] border-[#333333]">
                  {tiers.map((tier: any) => (
                    <SelectItem key={tier.name} value={tier.name} className="text-white">
                      {tier.name} - ${tier.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <label className="text-[#CCCCCC] text-sm mb-2 block">Quantity (1-4)</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border-[#333333] text-white"
              >
                <Minus size={16} />
              </Button>
              <span className="text-white font-semibold w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.min(4, quantity + 1))}
                className="border-[#333333] text-white"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <div className="bg-[#101010] p-3 rounded-lg">
            <div className="flex justify-between text-white">
              <span>Total Price:</span>
              <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleConfirmPurchase}
              disabled={!selectedTier && tiers.length > 1}
              className="flex-1 bg-[#E31837] hover:bg-[#C7142F] text-white"
            >
              Confirm & Pay
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
