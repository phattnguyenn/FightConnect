"use client"

import React from "react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Check if error is extension-related
    const errorMessage = String(error).toLowerCase()
    const extensionKeywords = [
      "metamask",
      "chrometransport",
      "extension not found",
      "connectchrome",
      "wallet",
      "web3",
      "ethereum",
      "injected provider",
      "browser extension",
    ]

    if (extensionKeywords.some((keyword) => errorMessage.includes(keyword))) {
      // Don't show error boundary for extension-related errors
      return { hasError: false }
    }

    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Check if error is extension-related
    const errorMessage = String(error).toLowerCase()
    const extensionKeywords = [
      "metamask",
      "chrometransport",
      "extension not found",
      "connectchrome",
      "wallet",
      "web3",
      "ethereum",
      "injected provider",
      "browser extension",
    ]

    if (extensionKeywords.some((keyword) => errorMessage.includes(keyword))) {
      // Suppress extension-related errors
      return
    }

    // Log non-extension errors
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />
      }

      return (
        <div className="min-h-screen bg-[#101010] flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-white text-xl mb-4">Something went wrong</h1>
            <p className="text-[#CCCCCC] mb-4">An unexpected error occurred. Please try refreshing the page.</p>
            <button
              onClick={this.resetError}
              className="bg-[#E31837] text-white px-4 py-2 rounded hover:bg-[#C7142F] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
