'use client'

import { Button } from '@/components/ui/button'
import { LogIn, UserPlus, Menu } from 'lucide-react'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
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
            <span className="text-xl font-bold text-white">ArcPay</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-white/80 hover:text-white transition-colors">
              Home
            </a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors">
              About Us
            </a>
            <a href="#events" className="text-white/80 hover:text-white transition-colors">
              Events
            </a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">
              Contact Us
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
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
                <DropdownMenuItem className="flex items-center gap-2 focus:bg-white/10 cursor-pointer">
                  <LogIn className="h-4 w-4" />
                  <span>Log In</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 focus:bg-white/10 cursor-pointer">
                  <UserPlus className="h-4 w-4" />
                  <span>Create an Account</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
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
                <DropdownMenuItem className="focus:bg-white/10">Home</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10">About Us</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10">Events</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10">Contact Us</DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 focus:bg-white/10">
                  <LogIn className="h-4 w-4" />
                  <span>Log In</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 focus:bg-white/10">
                  <UserPlus className="h-4 w-4" />
                  <span>Create an Account</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
