"use client"

import {  LayoutDashboard } from 'lucide-react'
import { useAccount, useBalance } from 'wagmi'
import { Button } from '@/components/ui/button'

function formatAddress(addr?: string) {
  if (!addr) return 'Not connected'
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

function roundUpBalance(formattedBalance: string): string {
  // Extract number and symbol from formatted balance (e.g., "1.2345 ETH")
  const match = formattedBalance.match(/^([\d.]+)\s*(.*)$/)
  if (!match) return formattedBalance
  
  const [, amountStr, symbol] = match
  const amount = parseFloat(amountStr)
  if (isNaN(amount)) return formattedBalance
  
  // Round up to 2 decimal places
  const roundedUp = Math.ceil(amount * 100) / 100
  
  // Format back to string with proper decimal places
  return `${roundedUp.toFixed(2)} ${symbol}`
}

export function TotalVolumeSection() {
  const { address, isConnected } = useAccount()
  const { data: nativeBalance, isLoading } = useBalance({
    address: address as `0x${string}` | undefined,
  })

  return (
    <section id="payroll" className="py-24 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 -translate-x-1/2 w-[900px] h-[300px] bg-gradient-to-br from-indigo-600/10 to-purple-600/10 blur-3xl rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-4xl lg:text-5xl font-bold text-white text-center mb-6">
          Your Wallet Overview<span className="text-indigo-400">.</span>
        </h2>
        <p className="text-center text-white/60 mb-12">
          {isConnected ? `Connected: ${formatAddress(address)}` : 'Connect your wallet to view balances'}
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 hover:translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6">
                <img src="/wallet_.png" alt="Wallet" className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2 mb-6">
                <h3 className="text-2xl font-bold text-white">Wallet Balance</h3>
                <p className="text-white/40 text-sm tracking-wider">Native currency</p>
              </div>
              <div className="h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0 mb-6"></div>
              <div className="space-y-1">
                {isLoading ? (
                  <div className="h-7 w-40 bg-white/10 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-bold text-white">
                    {isConnected && nativeBalance ? roundUpBalance(`${nativeBalance.formatted} ${nativeBalance.symbol}`) : '—'}
                  </p>
                )}
                <p className="text-white/40 text-sm">
                  {isConnected ? 'Live from connected network' : 'Connect to load balance'}
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 hover:translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                <img src="/shield_.png" alt="Shield" className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2 mb-6">
                <h3 className="text-2xl font-bold text-white">Escrow Balance</h3>
                <p className="text-white/40 text-sm tracking-wider">Payso Payroll</p>
              </div>
              <div className="h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0 mb-6"></div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white">—</p>
                <p className="text-white/40 text-sm">Connect and create an escrow to begin</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 hover:translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-6">
                <img src="/start_.png" alt="Dashboard" className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2 mb-6">
                <h3 className="text-2xl font-bold text-white">Start Payroll</h3>
                <p className="text-white/40 text-sm tracking-wider">Create your first escrow</p>
              </div>
              <div className="h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0 mb-6"></div>
              <div className="space-y-1">
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 h-12"
                  onClick={() => {
                    window.location.href = '/dashboard'
                  }}
                >
                  Launch Dashboard
                </Button>
                <p className="text-white/40 text-sm">Guide your team payments securely</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
            <div className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
              {isConnected && nativeBalance ? roundUpBalance(`${nativeBalance.formatted} ${nativeBalance.symbol}`) : 'Connect Wallet'}
            </div>
            <div className="text-white/60 text-lg">Wallet Status</div>
          </div>
        </div>
      </div>
    </section>
  )
}
