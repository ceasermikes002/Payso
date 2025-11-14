import { Heart, TrendingUp, Repeat } from 'lucide-react'

const stats = [
  {
    icon: Heart,
    value: '10,000',
    label: 'Satisfied Clients',
    color: 'from-pink-500 to-purple-500',
  },
  {
    icon: TrendingUp,
    value: '$13,392',
    label: 'Total Volume Escrowed',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Repeat,
    value: '2,193',
    label: 'Transactions',
    color: 'from-blue-500 to-cyan-500',
  },
]

export function StatsSection() {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-white/60 text-center mb-8">
          We have the numbers to back it up.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/60">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
