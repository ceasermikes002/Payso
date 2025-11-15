'use client'

import { useState, useEffect } from 'react'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/lib/contracts/wagmi'
import '@rainbow-me/rainbowkit/styles.css'

/**
 * Web3 Provider Component
 *
 * Wraps the application with necessary Web3 providers:
 * - WagmiProvider: Ethereum wallet connection
 * - QueryClientProvider: React Query for data fetching
 * - RainbowKitProvider: Wallet UI components
 *
 * Note: QueryClient is created inside component to avoid SSR issues
 * and prevent "Cannot set property message" errors
 */

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // Create QueryClient inside component to avoid SSR issues
  // Using useState ensures it's only created once per component instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            // Disable automatic retries to prevent error loops
            retryOnMount: false,
            // Increase stale time to reduce unnecessary refetches
            staleTime: 60 * 1000, // 1 minute
          },
          mutations: {
            retry: false,
          },
        },
      })
  )

  // Only render on client side to avoid hydration mismatches
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent SSR rendering issues
  if (!mounted) {
    return null
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#0F172A',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          modalSize="compact"
          showRecentTransactions={true}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}