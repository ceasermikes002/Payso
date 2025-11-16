'use client'

import { Button } from '@/components/ui/button'
import { MessageSquare, ArrowDown, MousePointer2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paragraphRefs = useRef<HTMLParagraphElement[]>([])
  const buttonRefs = useRef<HTMLButtonElement[]>([])
  const imageRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Animate heading with text reveal effect
    if (headingRef.current) {
      tl.fromTo(headingRef.current.children, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }
      )
    }

    // Animate paragraphs
    const validParagraphs = paragraphRefs.current.filter(Boolean);
    if (validParagraphs.length > 0) {
      tl.fromTo(validParagraphs,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        '-=0.4'
      )
    }

    // Animate buttons
    const validButtons = buttonRefs.current.filter(Boolean);
    if (validButtons.length > 0) {
      tl.fromTo(validButtons,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      )
    }

    // Animate image with floating effect
    if (imageRef.current) {
      tl.fromTo(imageRef.current,
        { opacity: 0, scale: 0.8, rotateY: -15 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1, ease: 'power2.out' },
        '-=0.5'
      )

      // Add floating animation
      gsap.to(imageRef.current, {
        y: -10,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      })
    }

    // Animate orbital elements
    if (orbitRef.current) {
      tl.fromTo(orbitRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.8 },
        '-=0.8'
      )
    }

    // Add subtle parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const xPercent = (clientX / innerWidth - 0.5) * 2
      const yPercent = (clientY / innerHeight - 0.5) * 2

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          x: xPercent * 10,
          y: yPercent * 10,
          duration: 0.5,
          ease: 'power2.out'
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className="relative pt-20 pb-32 overflow-hidden" id="home">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-2 h-2 rounded-full bg-indigo-500 animate-pulse delay-300"></div>
      <div className="absolute bottom-20 left-1/4 w-2 h-2 rounded-full bg-indigo-600 animate-pulse delay-700"></div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 ref={headingRef} className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              <span className="text-balance">Payroll, Escrow,</span>
              <br />
              <span className="text-balance text-indigo-400">Guaranteed</span>
              <span className="text-white">.</span>
            </h1>

            <div className="space-y-4 text-white/70 text-lg">
              <p 
                ref={(el) => {
                  if (el) paragraphRefs.current[0] = el;
                }}
                className="text-balance"
              >
                Transform your payroll with blockchain-powered escrow on Arc Testnet. Payso enables 
                employers to lock payroll funds in secure smart contracts, ensuring employees 
                receive guaranteed payments on schedule without intermediaries.
              </p>
              <p 
                ref={(el) => {
                  if (el) paragraphRefs.current[1] = el;
                }}
                className="text-balance"
              >
                Eliminate payroll disputes and payment delays forever. Our decentralized escrow system 
                provides complete transparency for employers while guaranteeing employees receive 
                their hard-earned wages on time, every time, with cryptographic security.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/70 text-sm backdrop-blur-sm">Built on Arc Testnet</span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/70 text-sm backdrop-blur-sm">Non‑custodial Escrow</span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/70 text-sm backdrop-blur-sm">Global Payroll</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                ref={(el) => {
                  if (el) buttonRefs.current[0] = el;
                }}
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-14 text-lg shadow-lg shadow-indigo-500/20"
              >
                Launch Payroll Escrow
              </Button>
              <Button
                ref={(el) => {
                  if (el) buttonRefs.current[1] = el;
                }}
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full px-8 h-14 text-lg backdrop-blur-sm"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                View Smart Contracts
              </Button>
            </div>
          </div>

          {/* Right Content - 3D Illustration */}
          <div className="relative">
            {/* Orbital ring */}
            <div ref={orbitRef} className="absolute inset-0 flex items-center justify-center">
              <div className="w-[500px] h-[500px] rounded-full border-2 border-indigo-500/20 border-dashed animate-[spin_30s_linear_infinite]"></div>
            </div>

            {/* Decorative dots on orbit */}
            <div className="absolute top-[10%] right-[25%] w-3 h-3 rounded-full bg-indigo-400"></div>
            <div className="absolute bottom-[20%] left-[15%] w-2 h-2 rounded-full bg-indigo-500"></div>
            <div className="absolute top-[40%] left-[5%] w-2 h-2 rounded-full bg-indigo-600"></div>
            <div className="absolute bottom-[40%] right-[10%] w-4 h-4 rounded-full bg-indigo-400"></div>

            {/* Central 3D Bank Building */}
            <div ref={imageRef} className="relative z-10 flex items-center justify-center">
              <div className="absolute -inset-16 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 blur-3xl rounded-full"></div>
              <Image
                src="/3d-isometric-purple-bank-building-illustration-wit.jpg"
                alt="3D Bank Building"
                width={400}
                height={400}
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 mt-20 animate-bounce">
          <span className="text-white/50 text-sm">Scroll Down</span>
          <MousePointer2 className="h-5 w-5 text-white/50" />
        </div>
      </div>
    </section>
  )
}