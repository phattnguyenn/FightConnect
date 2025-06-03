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
        {/* Comprehensive extension error suppression */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Immediate error suppression before any other scripts load
              (function() {
                // Store original console methods
                const originalError = window.console.error;
                const originalWarn = window.console.warn;
                const originalLog = window.console.log;
                const originalInfo = window.console.info;
                const originalDebug = window.console.debug;
                
                // Extension-related keywords to suppress
                const suppressKeywords = [
                  'metamask', 'chrometransport', 'extension not found', 'connectchrome',
                  'wallet', 'web3', 'ethereum', 'injected provider', 'browser extension',
                  'chrome extension', 'firefox extension', 'extension error', 'wallet_',
                  'coinbase wallet', 'trust wallet', 'phantom', 'solflare', 'keplr',
                  'leap wallet', 'station wallet', 'terra station', 'binance wallet',
                  'okx wallet', 'rabby', 'frame', 'talisman', 'subwallet', 'polkadot',
                  'kusama', 'avalanche wallet', 'core wallet', 'xdefi', 'leap cosmos',
                  'cosmostation', 'keplr extension', 'metamask extension', 'wallet extension',
                  'crypto wallet', 'defi wallet', 'nft wallet', 'blockchain wallet'
                ];
                
                function shouldSuppress(message) {
                  const msg = String(message).toLowerCase();
                  return suppressKeywords.some(keyword => msg.includes(keyword));
                }
                
                // Override all console methods
                window.console.error = function(...args) {
                  if (shouldSuppress(args.join(' '))) return;
                  originalError.apply(console, args);
                };
                
                window.console.warn = function(...args) {
                  if (shouldSuppress(args.join(' '))) return;
                  originalWarn.apply(console, args);
                };
                
                window.console.log = function(...args) {
                  if (shouldSuppress(args.join(' '))) return;
                  originalLog.apply(console, args);
                };
                
                window.console.info = function(...args) {
                  if (shouldSuppress(args.join(' '))) return;
                  originalInfo.apply(console, args);
                };
                
                window.console.debug = function(...args) {
                  if (shouldSuppress(args.join(' '))) return;
                  originalDebug.apply(console, args);
                };
                
                // Suppress unhandled promise rejections
                window.addEventListener('unhandledrejection', function(event) {
                  if (shouldSuppress(String(event.reason))) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                  }
                });
                
                // Suppress general errors
                window.addEventListener('error', function(event) {
                  if (shouldSuppress(event.message || '')) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                  }
                });
                
                // Block extension detection attempts
                Object.defineProperty(window, 'ethereum', {
                  get: function() { return undefined; },
                  set: function() { return false; },
                  configurable: false
                });
                
                Object.defineProperty(window, 'web3', {
                  get: function() { return undefined; },
                  set: function() { return false; },
                  configurable: false
                });
                
                // Block common extension globals
                const extensionGlobals = [
                  'metamask', 'coinbaseWallet', 'trustWallet', 'phantom', 'solflare',
                  'keplr', 'leap', 'station', 'binanceWallet', 'okxwallet', 'rabby'
                ];
                
                extensionGlobals.forEach(global => {
                  try {
                    Object.defineProperty(window, global, {
                      get: function() { return undefined; },
                      set: function() { return false; },
                      configurable: false
                    });
                  } catch (e) {
                    // Ignore if property already exists
                  }
                });
                
                // Override fetch to block extension-related requests
                const originalFetch = window.fetch;
                window.fetch = function(...args) {
                  const url = String(args[0]).toLowerCase();
                  if (suppressKeywords.some(keyword => url.includes(keyword))) {
                    return Promise.reject(new Error('Blocked extension request'));
                  }
                  return originalFetch.apply(this, args);
                };
                
                // Block extension script injection
                const originalCreateElement = document.createElement;
                document.createElement = function(tagName) {
                  const element = originalCreateElement.call(this, tagName);
                  if (tagName.toLowerCase() === 'script') {
                    const originalSetAttribute = element.setAttribute;
                    element.setAttribute = function(name, value) {
                      if (name === 'src' && shouldSuppress(String(value))) {
                        return;
                      }
                      return originalSetAttribute.call(this, name, value);
                    };
                  }
                  return element;
                };
                
                // Store suppression state globally
                window.__extensionSuppressionActive = true;
                
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
