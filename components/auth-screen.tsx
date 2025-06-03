"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface AuthScreenProps {
  onAuth: (role: "fighter" | "coach" | "fan") => void
}

export function AuthScreen({ onAuth }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(true)
  const [selectedRole, setSelectedRole] = useState<"fighter" | "coach" | "fan">("fighter")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAuth(selectedRole)
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/images/boxing-match-background.webp')" }}
        ></div>
      </div>

      <div className="w-full max-w-md z-20">
        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">FightConnect</h1>
          <p className="text-[#CCCCCC]">Connect. Spar. Improve.</p>
        </div>

        {/* Auth Form */}
        <Card className="bg-[#181818] bg-opacity-90 border-[#333333]">
          <CardContent className="p-6">
            <h2 className="text-white text-xl font-bold mb-6">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="bg-[#101010] border-[#333333] text-white placeholder:text-[#555555]"
                />
              )}

              <Input
                type="email"
                placeholder="you@example.com"
                className="bg-[#101010] border-[#333333] text-white placeholder:text-[#555555]"
              />
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-[#101010] border-[#333333] text-white placeholder:text-[#555555]"
              />

              {isSignUp && (
                <>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    className="bg-[#101010] border-[#333333] text-white placeholder:text-[#555555]"
                  />

                  {/* Role Selector */}
                  <div className="space-y-2">
                    <label className="text-white text-sm">I am a:</label>
                    <div className="flex gap-2">
                      {(["fighter", "coach", "fan"] as const).map((role) => (
                        <Button
                          key={role}
                          type="button"
                          variant={selectedRole === role ? "default" : "outline"}
                          className={`flex-1 ${
                            selectedRole === role
                              ? "bg-[#E31837] text-white"
                              : "border-[#E31837] text-white bg-transparent hover:bg-[#E31837]"
                          }`}
                          onClick={() => setSelectedRole(role)}
                        >
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full bg-[#E31837] hover:bg-[#C7142F] text-white">
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-[#CCCCCC] text-sm mb-3">— OR —</p>
              <div className="flex gap-2 mb-4">
                <Button variant="outline" className="flex-1 border-[#1E90FF] text-white bg-transparent">
                  Google
                </Button>
                <Button variant="outline" className="flex-1 border-[#1E90FF] text-white bg-transparent">
                  Facebook
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#1E90FF] text-sm hover:underline"
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
