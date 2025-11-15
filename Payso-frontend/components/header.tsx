'use client'

import { Button } from '@/components/ui/button'
import { LogIn, UserPlus, Menu, LayoutDashboard, DollarSign, Users, Shield, Clock, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { WalletConnect } from '@/components/wallet-connect'
import { useRouter } from 'next/navigation'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div>
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B1A3D]/80 border-b border-white/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
              <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
            </div>
            <span className="text-xl font-bold text-white">Payso</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('stats')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Stats
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('payroll')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Payroll
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <WalletConnect />
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-[#1a2b4f] border-white/10 text-white"
              >
                <DropdownMenuItem 
                  className="flex items-center gap-2 focus:bg-white/10 cursor-pointer"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex items-center gap-2 focus:bg-white/10 cursor-pointer"
                  onClick={() => window.location.href = '/dashboard?tab=payroll'}
                >
                  <DollarSign className="h-4 w-4" />
                  <span>Start Payroll</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    {mobileOpen && (
      <div className="fixed inset-0 z-[60]">
        <div
          className="absolute inset-0 bg-[#0B1A3D]/80 backdrop-blur"
          onClick={() => setMobileOpen(false)}
        ></div>
        <div className="absolute right-0 top-0 h-full w-80 bg-[#1a2b4f] border-l border-white/10 p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-white">Menu</span>
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => { scrollToSection('home'); setMobileOpen(false) }}
              className="text-white/80 hover:text-white transition-colors text-left"
            >
              Home
            </button>
            <button
              onClick={() => { scrollToSection('about'); setMobileOpen(false) }}
              className="text-white/80 hover:text-white transition-colors text-left"
            >
              Features
            </button>
            <button
              onClick={() => { scrollToSection('stats'); setMobileOpen(false) }}
              className="text-white/80 hover:text-white transition-colors text-left"
            >
              Stats
            </button>
            <button
              onClick={() => { scrollToSection('testimonials'); setMobileOpen(false) }}
              className="text-white/80 hover:text-white transition-colors text-left"
            >
              Testimonials
            </button>
            <button
              onClick={() => { scrollToSection('payroll'); setMobileOpen(false) }}
              className="text-white/80 hover:text-white transition-colors text-left"
            >
              Payroll
            </button>
            <Button
              variant="ghost"
              className="justify-start text-white/80 hover:text-white transition-colors"
              onClick={() => {
                setMobileOpen(false)
                window.location.href = '/dashboard'
              }}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-white/80 hover:text-white transition-colors"
              onClick={() => {
                setMobileOpen(false)
                window.location.href = '/dashboard?tab=payroll'
              }}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Start Payroll
            </Button>
          </nav>
          <div className="mt-auto">
            <WalletConnect />
          </div>
        </div>
      </div>
    )}
    </header>
    </div>
  )
}
