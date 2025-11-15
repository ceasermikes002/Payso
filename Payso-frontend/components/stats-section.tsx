'use client'

import { DollarSign, Bitcoin, EthernetPort } from 'lucide-react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

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
  const isInView = useInView(ref, { once: true })
  
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 1500, bounce: 0 })
  
  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(value)
      }, delay * 1000)
    }
  }, [isInView, value, delay, motionValue])

  const displayValue = useTransform(springValue, (latest) => {
    if (isUsd) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(latest)
    } else {
      return latest.toLocaleString('en-US', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      })
    }
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay }}
      className="text-2xl lg:text-3xl font-bold text-white"
    >
      <motion.span>
        {displayValue}
      </motion.span>
    </motion.div>
  )
}

function ChainStatCard({ stat, index }: { stat: ChainStats; index: number }) {
  const isCrypto = stat.symbol === 'BTC' || stat.symbol === 'ETH'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1
      }}
      className="group"
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
    </motion.div>
  )
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const totalValue = chainStats.reduce((sum, stat) => sum + stat.usdValue, 0)

  return (
    <section id="stats" ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-600/10 to-purple-600/10 blur-3xl rounded-full"></div>
      </div>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
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
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {chainStats.map((stat, index) => (
            <ChainStatCard key={stat.symbol} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}