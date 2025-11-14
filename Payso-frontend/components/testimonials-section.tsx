import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Freelance Designer',
    rating: 5,
    text: 'ArcPay made my international payments seamless. No more worrying about delayed payments or high fees!',
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
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          What our clients
        </h2>
        <p className="text-white/60 text-xl mb-16">say about us</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <Card className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300 p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 overflow-hidden">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
