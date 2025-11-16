/**
 * @fileoverview Dashboard sidebar navigation component
 */

'use client'

import { LayoutDashboard, Wallet, Clock, Settings, LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAccount, useDisconnect } from 'wagmi'
import { formatAddress } from '@/lib/utils'
import { useEmployer, useIsAuthorizedEmployer } from '@/lib/contracts/hooks/usePayrollEscrow'
import { usePathname } from 'next/navigation'

const employerNavItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Wallet, label: 'Schedule Payment', href: '/dashboard/payments' },
  { icon: Clock, label: 'Scheduled', href: '/dashboard/scheduled' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

const employeeNavItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Wallet, label: 'My Payments', href: '/dashboard/payments' },
  { icon: Clock, label: 'Upcoming', href: '/dashboard/scheduled' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: employer } = useEmployer()
  const { data: isAuthorized } = useIsAuthorizedEmployer(
    address && isConnected ? address : undefined
  )
  const pathname = usePathname()
  
  // Prevent hydration mismatch by ensuring client-side only rendering
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Debug logging
  useEffect(() => {
    console.log('=== SIDEBAR DEBUG ===')
    console.log('Connected address:', address)
    console.log('Contract employer:', employer)
    console.log('Is authorized:', isAuthorized)
    console.log('Address comparison:', address && employer && typeof employer === 'string' && address.toLowerCase() === (employer as string).toLowerCase())
    console.log('Final isEmployer:', address && employer && typeof employer === 'string' && (address.toLowerCase() === (employer as string).toLowerCase() || isAuthorized))
    console.log('=====================')
  }, [address, employer, isAuthorized])
  
  const isEmployer = address && employer && typeof employer === 'string' && (address.toLowerCase() === (employer as string).toLowerCase() || isAuthorized)
  const userRole = isEmployer ? 'Employer' : 'Employee'
  const displayAddress = address ? formatAddress(address) : 'Not connected'
  const navItems = isClient && isEmployer ? employerNavItems : employeeNavItems

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-64 
          bg-gradient-to-b from-[#0B1A3D] to-[#162447] 
          border-r border-white/10 backdrop-blur-xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-indigo-500" />
              <div className="w-3 h-3 rounded-full bg-indigo-400" />
              <div className="w-3 h-3 rounded-full bg-indigo-600" />
            </div>
            <Link href="/" className="text-xl font-bold text-white hover:opacity-80 transition-opacity">
              Payso
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = isClient && pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'text-white bg-white/10' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="pt-6 border-t border-white/10">
            {isClient && isConnected && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 mb-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                  {userRole.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{userRole}</p>
                  <p className="text-xs text-white/40 truncate">{displayAddress}</p>
                </div>
              </div>
            )}
            {isClient && isConnected && (
              <Button
                variant="ghost"
                className="w-full justify-start text-white/60 hover:text-white hover:bg-white/5"
                onClick={() => disconnect()}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

