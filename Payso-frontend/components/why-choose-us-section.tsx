import { Shield, Zap, TrendingUp, Heart } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Top-Notch Security',
    description:
      'Proactively envision brand new multimedia based expertise to also make revenue growth.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Quick Service',
    description:
      'Bring to the table new win-win survival strategies to ensure an active proactive domination.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: TrendingUp,
    title: 'Best Market Rate',
    description:
      'Capitalize on low hanging fruit to identify a new ballpark value added activity to beta test.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Heart,
    title: 'Customer Support',
    description:
      'Podcasting operational change management inside of all users\' workflows to establish work.',
    color: 'from-pink-500 to-rose-500',
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-24 relative" id="about">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Why choose us<span className="text-indigo-400">?</span>
          </h2>
          <div className="space-y-4 text-white/70 text-lg">
            <p className="text-balance font-semibold text-white">
              We make the process simple and effortless.
            </p>
            <p className="text-balance">
              Enthusiastically engage fully tested process improvements before
              top-line platforms and without any specific or worsening delays.
            </p>
            <p className="text-balance">
              Rapaciously seize adaptive infomediaries and user-centric before
              intellectual capital. Collaboratively unleash market-driven &quot;outside
              the box&quot; thinking for long-term high-impact solutions.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
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
