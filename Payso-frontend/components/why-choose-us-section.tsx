'use client'

import { Shield, Clock, TrendingUp, Users } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const features = [
  {
    icon: Shield,
    title: 'Cryptographic Security',
    description:
      'Payroll funds are cryptographically secured in smart contract escrow on Arc Testnet. Immutable blockchain records ensure tamper-proof payment history with complete auditability.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Clock,
    title: 'Automated Payroll Scheduling',
    description:
      'Schedule recurring payroll cycles with precision timing. Smart contracts automatically release payments to employees on predetermined dates without manual intervention or delays.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: TrendingUp,
    title: 'Zero Payment Disputes',
    description:
      'Eliminate payroll conflicts with transparent escrow terms. Employer funds are locked in advance, guaranteeing employees receive their wages on time, every time.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'Dual-Role Dashboard',
    description:
      'Employers manage payroll escrow and track payments while employees monitor and claim their earnings. Intuitive role-based interfaces optimized for each user type.',
    color: 'from-pink-500 to-rose-500',
  },
]

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate features with stagger effect
            gsap.fromTo(featureRefs.current.filter(Boolean),
              { opacity: 0, y: 50, scale: 0.9 },
              { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                duration: 0.6, 
                stagger: 0.1,
                ease: 'power3.out'
              }
            )
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 relative" id="about">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Why Payso<span className="text-indigo-400">?</span>
          </h2>
          <div className="space-y-4 text-white/70 text-lg">
            <p className="text-balance font-semibold text-white">
              The future of payroll management is here.
            </p>
            <p className="text-balance">
              Traditional payroll systems are slow, expensive, and prone to disputes. 
              Payso leverages blockchain technology to create a trustless, automated, 
              and transparent payroll ecosystem.
            </p>
            <p className="text-balance">
              From startups to enterprises, businesses worldwide are switching to decentralized 
              payroll solutions that guarantee security, efficiency, and peace of mind for 
              both employers and employees.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => featureRefs.current[index] = el}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all duration-300 h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
