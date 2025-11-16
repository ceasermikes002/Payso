'use client'
import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SafeImage } from '@/components/ui/safe-image'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Freelance Designer',
    rating: 5,
    text: 'Payso made my international payments seamless. No more worrying about delayed payments or high fees!',
    avatar: '/professional-woman-avatar.png',
  },
  {
    name: 'Michael Chen',
    role: 'Tech Startup CEO',
    rating: 5,
    text: 'The best escrow service for crypto payments. Secure, fast, and transparent. Highly recommended!',
    avatar: '/professional-man-avatar.png',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Remote Developer',
    rating: 5,
    text: 'Finally, a payroll solution that works globally. The automatic currency conversion is a game-changer.',
    avatar: '/professional-woman-avatar-2.png',
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate heading
            if (headingRef.current) {
              gsap.fromTo(headingRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
              )
            }

            // Animate paragraph
            if (paragraphRef.current) {
              gsap.fromTo(paragraphRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' }
              )
            }

            // Animate cards with stagger effect
            const validCards = cardRefs.current.filter(Boolean)
            if (validCards.length > 0) {
              gsap.fromTo(validCards,
                { opacity: 0, y: 50, scale: 0.9 },
                { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  duration: 0.6, 
                  stagger: 0.15,
                  ease: 'power3.out',
                  delay: 0.4
                }
              )
            }

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
    <section ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 ref={headingRef} className="text-4xl lg:text-5xl font-bold text-white mb-4 opacity-0">
          What our clients
        </h2>
        <p ref={paragraphRef} className="text-white/60 text-xl mb-16 opacity-0">say about us</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              ref={(el: HTMLDivElement | null) => { cardRefs.current[index] = el }}
              className="relative group opacity-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <Card className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300 p-6 hover:translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <SafeImage
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    fallback="👤"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/60">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
