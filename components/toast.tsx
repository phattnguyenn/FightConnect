"use client"

import { useEffect } from "react"
import { CheckCircle, XCircle, Info } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error" | "info"
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  }

  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-[#1E90FF]",
  }

  const Icon = icons[type]

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 animate-in slide-in-from-bottom-2">
      <div className={`${colors[type]} text-white px-4 py-3 rounded-lg flex items-center gap-3 shadow-lg`}>
        <Icon size={20} />
        <span className="flex-1">{message}</span>
      </div>
    </div>
  )
}
