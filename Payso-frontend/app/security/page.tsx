import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Shield, Lock, Eye, FileCheck, Server, AlertTriangle, CheckCircle2 } from 'lucide-react'

/**
 * Security Page Component
 * 
 * Comprehensive overview of Payso's security measures, protocols, and best practices.
 * Demonstrates commitment to protecting user assets and data.
 * 
 * @returns {JSX.Element} The security information page
 */
export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D]">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Security First,
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Always
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Your assets and data are protected by industry-leading security measures and blockchain technology
          </p>
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-white/60 mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance Section */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Compliance & Certifications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {compliance.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Security Best Practices</h2>
          <div className="space-y-6">
            {bestPractices.map((practice, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-400 font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{practice.title}</h3>
                  <p className="text-white/60">{practice.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Alert */}
        <div className="mt-20 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-8 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Report Security Issues</h3>
            <p className="text-white/60 mb-4">
              If you discover a security vulnerability, please report it to our security team immediately at{' '}
              <a href="mailto:security@payso.com" className="text-indigo-400 hover:text-indigo-300">
                security@payso.com
              </a>
            </p>
            <p className="text-white/50 text-sm">
              We take all security reports seriously and will respond within 24 hours.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/**
 * Security features data
 */
const securityFeatures = [
  {
    icon: <Lock className="w-7 h-7 text-white" />,
    title: 'Smart Contract Security',
    description: 'Audited and battle-tested smart contracts protect your funds',
    points: [
      'Multiple independent security audits',
      'Open-source code for transparency',
      'Time-locked upgrades for safety',
      'Bug bounty program active'
    ]
  },
  {
    icon: <Eye className="w-7 h-7 text-white" />,
    title: 'Transparent Operations',
    description: 'All transactions are verifiable on the blockchain',
    points: [
      'Real-time transaction monitoring',
      'Public audit trail',
      'Immutable transaction records',
      'On-chain verification'
    ]
  },
  {
    icon: <Server className="w-7 h-7 text-white" />,
    title: 'Infrastructure Security',
    description: 'Enterprise-grade infrastructure and data protection',
    points: [
      'End-to-end encryption',
      'DDoS protection',
      'Regular security assessments',
      'Secure key management'
    ]
  },
  {
    icon: <Shield className="w-7 h-7 text-white" />,
    title: 'Multi-Layer Protection',
    description: 'Defense in depth approach to security',
    points: [
      'Multi-signature wallet support',
      'Two-factor authentication',
      'IP whitelisting options',
      'Withdrawal limits and controls'
    ]
  }
]

/**
 * Compliance certifications
 */
const compliance = [
  {
    title: 'SOC 2 Type II',
    description: 'Certified for security, availability, and confidentiality'
  },
  {
    title: 'GDPR Compliant',
    description: 'Full compliance with EU data protection regulations'
  },
  {
    title: 'ISO 27001',
    description: 'Information security management system certified'
  }
]

/**
 * Security best practices for users
 */
const bestPractices = [
  {
    title: 'Enable Two-Factor Authentication',
    description: 'Add an extra layer of security to your account by enabling 2FA using an authenticator app.'
  },
  {
    title: 'Use Hardware Wallets',
    description: 'For maximum security, connect a hardware wallet like Ledger or Trezor to manage your funds.'
  },
  {
    title: 'Verify Contract Addresses',
    description: 'Always double-check contract addresses before interacting with them to avoid phishing attacks.'
  },
  {
    title: 'Keep Software Updated',
    description: 'Regularly update your wallet software and browser to ensure you have the latest security patches.'
  },
  {
    title: 'Never Share Private Keys',
    description: 'Payso will never ask for your private keys or seed phrases. Never share them with anyone.'
  }
]

