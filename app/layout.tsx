import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FightConnect - Connect. Spar. Improve.",
  description:
    "The ultimate platform for fighters to find sparring partners, track performance, and join local events.",
  keywords: ["fighting", "sparring", "MMA", "boxing", "martial arts", "training"],
  authors: [{ name: "FightConnect Team" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent extension injection errors */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress extension-related errors before they occur
              (function() {
                const originalError = window.console.error;
                const originalWarn = window.console.warn;
                
                window.console.error = function(...args) {
                  const message = args.join(' ').toLowerCase();
                  if (message.includes('metamask') || 
                      message.includes('chrometransport') || 
                      message.includes('extension not found') ||
                      message.includes('wallet') ||
                      message.includes('web3')) {
                    return;
                  }
                  originalError.apply(console, args);
                };
                
                window.console.warn = function(...args) {
                  const message = args.join(' ').toLowerCase();
                  if (message.includes('metamask') || 
                      message.includes('chrometransport') || 
                      message.includes('extension') ||
                      message.includes('wallet')) {
                    return;
                  }
                  originalWarn.apply(console, args);
                };
                
                // Prevent unhandled promise rejections from extensions
                window.addEventListener('unhandledrejection', function(event) {
                  const reason = String(event.reason).toLowerCase();
                  if (reason.includes('metamask') || 
                      reason.includes('chrometransport') || 
                      reason.includes('extension not found') ||
                      reason.includes('wallet')) {
                    event.preventDefault();
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
