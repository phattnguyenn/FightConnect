"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Plus, Filter, ArrowLeft } from "lucide-react"
import { mockData } from "@/lib/mock-data"
import { TicketPurchaseModal } from "@/components/ticket-purchase-modal"
import { CreateEventModal } from "@/components/create-event-modal"
import { FilterDrawer } from "@/components/filter-drawer"
import { Toast } from "@/components/toast"

interface EventsProps {
  userRole?: "fighter" | "coach" | "fan" | null
}

export function Events({ userRole = "fighter" }: EventsProps) {
  const [activeTab, setActiveTab] = useState<"all" | "my">("all")
  const [events, setEvents] = useState(mockData.events)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showFilterDrawer, setShowFilterDrawer] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null)

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleTabSwitch = (tab: "all" | "my") => {
    setActiveTab(tab)
    if (tab === "all") {
      showToast("Showing all events")
    } else {
      showToast("Showing your events")
    }
  }

  const handleJoinEvent = (event: any) => {
    if (event.spotsAvailable > 0) {
      const updatedEvents = events.map((e) =>
        e.eventId === event.eventId ? { ...e, spotsAvailable: e.spotsAvailable - 1 } : e,
      )
      setEvents(updatedEvents)
      showToast(`You've joined '${event.title}'!`, "success")
    } else {
      showToast("Event is full", "error")
    }
  }

  const handleBuyTicket = (event: any) => {
    setSelectedEvent(event)
    setShowTicketModal(true)
  }

  const handleTicketPurchased = (quantity: number, tier: string) => {
    setShowTicketModal(false)
    showToast(`Purchased ${quantity} x ${tier} tickets for '${selectedEvent?.title}'!`, "success")
  }

  const handleEventCreated = (eventData: any) => {
    const newEvent = {
      ...eventData,
      eventId: `event_${Date.now()}`,
    }
    setEvents([...events, newEvent])
    setShowCreateModal(false)
    showToast(`Event '${eventData.title}' published!`, "success")
  }

  const handleEventCardClick = (event: any) => {
    showToast("Opening event details")
  }

  const displayedEvents = activeTab === "all" ? events : events.slice(0, 1) // Mock "my events"

  return (
    <div className="h-full flex flex-col bg-[#101010]">
      {/* Header - Fixed */}
      <header className="sticky top-0 z-20 h-12 bg-[#101010] border-b border-[#333333] flex items-center justify-between px-4">
        <ArrowLeft size={20} className="text-white" />
        <h1 className="text-white font-bold text-lg">Events</h1>
        <button onClick={() => setShowFilterDrawer(true)}>
          <Filter size={20} className="text-[#E31837]" />
        </button>
      </header>

      {/* Tab Bar - Fixed */}
      <div className="sticky top-12 z-10 bg-[#181818] border-b border-[#333333]">
        <div className="flex">
          <button
            onClick={() => handleTabSwitch("all")}
            className={`flex-1 py-4 px-4 text-center relative ${activeTab === "all" ? "text-white" : "text-[#CCCCCC]"}`}
          >
            <span className="font-medium">All Events</span>
            {activeTab === "all" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E90FF]"></div>}
          </button>
          <button
            onClick={() => handleTabSwitch("my")}
            className={`flex-1 py-4 px-4 text-center relative ${activeTab === "my" ? "text-white" : "text-[#CCCCCC]"}`}
          >
            <span className="font-medium">My Events</span>
            {activeTab === "my" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E90FF]"></div>}
          </button>
        </div>
      </div>

      {/* Events List - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {displayedEvents.length === 0 ? (
          <div className="flex items-center justify-center h-64 p-4">
            <div className="text-center">
              <p className="text-white mb-4">You have no events.</p>
              <Button onClick={() => setShowCreateModal(true)} className="bg-[#E31837] hover:bg-[#C7142F] text-white">
                <Plus size={16} className="mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {displayedEvents.map((event, index) => (
              <Card key={event.eventId} className="bg-[#181818] border-[#333333] overflow-hidden">
                <CardContent className="p-0">
                  {/* Event Banner with Real Images */}
                  <div
                    className="h-48 relative flex items-center justify-center cursor-pointer"
                    onClick={() => handleEventCardClick(event)}
                  >
                    {index === 0 && (
                      <img src="/images/arm-wrestling.webp" alt={event.title} className="w-full h-full object-cover" />
                    )}
                    {index === 1 && (
                      <img
                        src="/images/mayweather-pacquiao.webp"
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {index === 2 && (
                      <img src="/images/garcia-boxing.jpeg" alt={event.title} className="w-full h-full object-cover" />
                    )}
                    {index > 2 && (
                      <div className="w-full h-full bg-gradient-to-r from-[#E31837] to-[#C7142F] flex items-center justify-center">
                        <div className="text-center text-white">
                          <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                          <p className="text-sm opacity-90">
                            {event.date} • {event.time}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Overlay for images */}
                    {index <= 2 && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                          <p className="text-sm opacity-90">
                            {event.date} • {event.time}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Price Badge */}
                    <div className="absolute top-3 left-3">
                      {event.isFree ? (
                        <Badge className="bg-[#E31837] text-white">FREE</Badge>
                      ) : (
                        <Badge className="bg-[#E31837] text-white">${event.price}</Badge>
                      )}
                    </div>

                    {/* Spots Available Badge */}
                    {event.spotsAvailable && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-[#1E90FF] text-white">
                          <Users size={12} className="mr-1" />
                          {event.spotsAvailable} spots
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-[#CCCCCC] text-sm mb-3">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>

                    {event.isFree ? (
                      <Button
                        onClick={() => handleJoinEvent(event)}
                        className="w-full bg-[#E31837] hover:bg-[#C7142F] text-white"
                        disabled={event.spotsAvailable === 0}
                      >
                        {event.spotsAvailable === 0 ? "Event Full" : "Join Event"}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleBuyTicket(event)}
                        className="w-full bg-[#E31837] hover:bg-[#C7142F] text-white"
                      >
                        Buy Tickets - ${event.price}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Floating Create Button (Coach/Gym only) */}
      {userRole === "coach" && (
        <button
          onClick={() => setShowCreateModal(true)}
          className="fixed bottom-20 right-4 w-14 h-14 bg-[#E31837] hover:bg-[#C7142F] rounded-full flex items-center justify-center shadow-lg z-10"
        >
          <Plus size={24} className="text-white" />
        </button>
      )}

      {/* Modals */}
      {showTicketModal && selectedEvent && (
        <TicketPurchaseModal
          event={selectedEvent}
          onClose={() => setShowTicketModal(false)}
          onPurchased={handleTicketPurchased}
        />
      )}

      {showCreateModal && <CreateEventModal onClose={() => setShowCreateModal(false)} onCreated={handleEventCreated} />}

      {showFilterDrawer && (
        <FilterDrawer
          onClose={() => setShowFilterDrawer(false)}
          onApply={() => {
            setShowFilterDrawer(false)
            showToast("Event filters applied", "success")
          }}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
