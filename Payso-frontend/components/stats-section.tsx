'use client'

import { DollarSign, Bitcoin, EthernetPort } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

interface ChainStats {
  icon: React.ElementType
  value: number
  label: string
  color: string
  chain: string
  symbol: string
  usdValue: number
}

const chainStats: ChainStats[] = [
  {
    icon: DollarSign,
    value: 2450000, // $2.45M USDC
    label: 'USDC Secured',
    color: 'from-green-500 to-emerald-500',
    chain: 'Ethereum',
    symbol: 'USDC',
    usdValue: 2450000
  },
  {
    icon: DollarSign,
    value: 1890000, // $1.89M USDT
    label: 'USDT Secured',
    color: 'from-blue-500 to-cyan-500',
    chain: 'Tron',
    symbol: 'USDT',
    usdValue: 1890000
  },
  {
    icon: Bitcoin,
    value: 45.8, // 45.8 BTC
    label: 'Bitcoin Secured',
    color: 'from-orange-500 to-yellow-500',
    chain: 'Bitcoin',
    symbol: 'BTC',
    usdValue: 1987000 // ~$1.99M at $43,400/BTC
  },
  {
    icon: EthernetPort,
    value: 1250, // 1250 ETH
    label: 'Ethereum Secured',
    color: 'from-purple-500 to-indigo-500',
    chain: 'Ethereum',
    symbol: 'ETH',
    usdValue: 2875000 // ~$2.88M at $2,300/ETH
  }
]

interface AnimatedCounterProps {
  value: number
  delay?: number
  isUsd?: boolean
  precision?: number
}

function AnimatedCounter({ value, delay = 0, isUsd = true, precision = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => {
            // Simple counter animation
            const duration = 1500
            const startTime = Date.now()
            const startValue = 0
            
            const animate = () => {
              const elapsed = Date.now() - startTime
              const progress = Math.min(elapsed / duration, 1)
              const currentValue = startValue + (value - startValue) * progress
              
              setDisplayValue(currentValue)
              
              if (progress < 1) {
                requestAnimationFrame(animate)
              }
            }
            
            requestAnimationFrame(animate)
          }, delay * 1000)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => observer.disconnect()
  }, [value, delay])
  
  const formatValue = (val: number) => {
    if (isUsd) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(val)
    } else {
      return val.toLocaleString('en-US', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      })
    }
  }

  return (
    <div
      ref={ref}
      className={`text-2xl lg:text-3xl font-bold text-white transition-opacity duration-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <span>
        {formatValue(displayValue)}
      </span>
    </div>
  )
}

function ChainStatCard({ stat, index }: { stat: ChainStats; index: number }) {
  const isCrypto = stat.symbol === 'BTC' || stat.symbol === 'ETH'
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, index * 100)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    )
    
    if (cardRef.current) {
      observer.observe(cardRef.current)
    }
    
    return () => observer.disconnect()
  }, [index])
  
  return (
    <div
      ref={cardRef}
      className={`group transition-all duration-500 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-200 hover:translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
            {stat.icon && <stat.icon className="h-5 w-5 text-white" />}
          </div>
          <div className="text-right">
            <div className="text-xs text-white/60 font-medium">{stat.chain}</div>
            <div className="text-xs text-white/40">{stat.symbol}</div>
          </div>
        </div>
        
        <AnimatedCounter 
          value={stat.value} 
          delay={index * 0.1} 
          isUsd={!isCrypto}
          precision={isCrypto ? 2 : 0}
        />
        
        <div className="text-white/60 text-sm mt-1">
          {stat.label}
        </div>
        
        {isCrypto && (
          <div className="text-xs text-white/40 mt-1">
            ≈ ${stat.usdValue.toLocaleString('en-US')}
          </div>
        )}
      </div>
    </div>
  )
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsSectionVisible(true)
          }, 200)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => observer.disconnect()
  }, [])
  
  const totalValue = chainStats.reduce((sum, stat) => sum + stat.usdValue, 0)

  return (
    <section id="stats" ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-600/10 to-purple-600/10 blur-3xl rounded-full"></div>
      </div>
      <div className="container mx-auto px-4 lg:px-8">
        <div 
          className={`text-center mb-16 transition-all duration-600 transform ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Total Volume Escrowed
          </h2>
          <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-3">
            <AnimatedCounter value={totalValue} delay={0.2} precision={0} />
          </div>
          <p className="text-white/60">
            Secured across multiple blockchains
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {chainStats.map((stat, index) => (
            <ChainStatCard key={stat.symbol} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}