"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SignUpPromptProps {
  onClose: () => void
  onSignUp: () => void
}

export function SignUpPrompt({ onClose, onSignUp }: SignUpPromptProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="bg-[#181818] border-[#333333] w-full max-w-md animate-in slide-in-from-bottom-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-lg">Sign Up Required</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} className="text-white" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-[#CCCCCC]">
            To request a spar session and access all features of FightConnect, you need to create an account.
          </p>
          <div className="flex gap-3">
            <Button onClick={onSignUp} className="flex-1 bg-[#E31837] hover:bg-[#C7142F] text-white">
              Sign Up Now
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-[#333333] text-white hover:bg-[#333333]"
            >
              Maybe Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
