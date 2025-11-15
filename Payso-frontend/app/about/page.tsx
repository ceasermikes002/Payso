import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Target, Users, Zap, Globe } from 'lucide-react'

/**
 * About Page Component
 * 
 * Displays company information, mission, vision, values, and team overview.
 * Provides insight into Payso's purpose and the people behind the platform.
 * 
 * @returns {JSX.Element} The about page with company information
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D]">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Building the Future of
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Crypto Payments
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            We're on a mission to make crypto payments secure, simple, and accessible to everyone.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white/60 leading-relaxed">
              To revolutionize global payments by providing a trustless, secure, and efficient escrow platform 
              that empowers individuals and businesses to transact with confidence in the digital economy.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-white/60 leading-relaxed">
              A world where cross-border payments are instant, transparent, and accessible to everyone, 
              regardless of location or financial status. We envision a future where blockchain technology 
              eliminates traditional payment barriers.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-white/60 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
          <div className="space-y-4 text-white/60 leading-relaxed">
            <p>
              Payso was founded in 2024 by a team of blockchain enthusiasts and fintech veterans who experienced 
              firsthand the challenges of cross-border payments and the lack of trust in traditional escrow services.
            </p>
            <p>
              We recognized that blockchain technology could solve these problems by providing transparency, 
              security, and automation through smart contracts. What started as a simple idea has grown into 
              a comprehensive platform serving thousands of users worldwide.
            </p>
            <p>
              Today, Payso processes millions in transactions monthly, helping freelancers, businesses, and 
              organizations manage their crypto payments with confidence. We're just getting started.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Meet Our Team</h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-12">
            We're a diverse team of engineers, designers, and blockchain experts passionate about 
            building the future of payments.
          </p>
          <a
            href="/careers"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
          >
            Join Our Team
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/**
 * Core values data
 */
const coreValues = [
  {
    icon: <Target className="w-6 h-6 text-white" />,
    title: 'Transparency',
    description: 'Open and honest in everything we do'
  },
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: 'User-Centric',
    description: 'Building for our users, always'
  },
  {
    icon: <Zap className="w-6 h-6 text-white" />,
    title: 'Innovation',
    description: 'Pushing boundaries with technology'
  },
  {
    icon: <Globe className="w-6 h-6 text-white" />,
    title: 'Accessibility',
    description: 'Making crypto payments for everyone'
  }
]

/**
 * Company statistics
 */
const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '$100M+', label: 'Transaction Volume' },
  { value: '150+', label: 'Countries Served' },
  { value: '99.9%', label: 'Uptime' }
]

