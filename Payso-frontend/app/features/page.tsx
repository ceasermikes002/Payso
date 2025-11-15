import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Shield, Clock, Globe, Lock, Zap, Users, CheckCircle, ArrowRight } from 'lucide-react'

/**
 * Features Page Component
 * 
 * Displays comprehensive information about Payso's key features and capabilities.
 * Organized into sections highlighting security, automation, global reach, and user benefits.
 * 
 * @returns {JSX.Element} The features page with detailed feature descriptions
 */
export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D]">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Powerful Features for
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Seamless Payments
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Everything you need to manage crypto payments securely and efficiently
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/60 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                      <CheckCircle className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Payso for their crypto payment needs
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
          >
            Start Using Payso
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/**
 * Feature data structure
 * Contains all feature information including icons, titles, descriptions, and benefits
 */
const features = [
  {
    icon: <Shield className="w-7 h-7 text-white" />,
    title: 'Smart Contract Escrow',
    description: 'Trustless payment protection powered by blockchain technology',
    benefits: [
      'Automated fund release based on conditions',
      'No intermediaries required',
      'Transparent and verifiable transactions',
      'Immutable payment records'
    ]
  },
  {
    icon: <Clock className="w-7 h-7 text-white" />,
    title: 'Scheduled Payments',
    description: 'Set up recurring or time-based payment releases',
    benefits: [
      'Flexible scheduling options',
      'Automatic payment execution',
      'Milestone-based releases',
      'Customizable payment terms'
    ]
  },
  {
    icon: <Globe className="w-7 h-7 text-white" />,
    title: 'Global Accessibility',
    description: 'Send and receive payments anywhere in the world',
    benefits: [
      'No geographical restrictions',
      'Multi-currency support',
      'Instant cross-border transfers',
      '24/7 availability'
    ]
  },
  {
    icon: <Lock className="w-7 h-7 text-white" />,
    title: 'Bank-Grade Security',
    description: 'Enterprise-level security for your digital assets',
    benefits: [
      'Multi-signature wallet support',
      'Encrypted data storage',
      'Regular security audits',
      'Cold storage integration'
    ]
  },
  {
    icon: <Zap className="w-7 h-7 text-white" />,
    title: 'Lightning Fast',
    description: 'Near-instant transaction processing and confirmations',
    benefits: [
      'Optimized gas fees',
      'Batch transaction support',
      'Real-time status updates',
      'Quick dispute resolution'
    ]
  },
  {
    icon: <Users className="w-7 h-7 text-white" />,
    title: 'Team Collaboration',
    description: 'Manage payments across your entire organization',
    benefits: [
      'Role-based access control',
      'Team payment dashboards',
      'Approval workflows',
      'Activity audit logs'
    ]
  }
]

