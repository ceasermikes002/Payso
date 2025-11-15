import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CheckCircle2, Circle, Clock } from 'lucide-react'

/**
 * Roadmap Page Component
 * 
 * Displays Payso's product roadmap with completed, in-progress, and planned features.
 * Organized by quarters to show timeline and development progress.
 * 
 * @returns {JSX.Element} The roadmap page with timeline visualization
 */
export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D]">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Product
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Roadmap
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Our vision for the future of crypto payments. Track our progress and upcoming features.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {roadmapItems.map((quarter, quarterIndex) => (
            <div key={quarterIndex} className="mb-16 last:mb-0">
              {/* Quarter Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold">
                  {quarter.period}
                </div>
                <div className="flex-1 h-px bg-white/10"></div>
                <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusStyle(quarter.status)}`}>
                  {quarter.status}
                </span>
              </div>

              {/* Features */}
              <div className="space-y-6">
                {quarter.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getStatusIcon(feature.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getFeatureStatusStyle(feature.status)}`}>
                            {feature.status}
                          </span>
                        </div>
                        <p className="text-white/60 mb-4">{feature.description}</p>
                        {feature.highlights && (
                          <ul className="space-y-2">
                            {feature.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                                <span className="text-indigo-400">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Future Vision */}
        <div className="mt-20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Beyond 2025</h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            We're constantly innovating and listening to our community. Have a feature request? Let us know!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
          >
            Share Your Ideas
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/**
 * Get status badge styling based on quarter status
 */
function getStatusStyle(status: string): string {
  switch (status) {
    case 'Completed':
      return 'bg-green-500/20 text-green-400'
    case 'In Progress':
      return 'bg-blue-500/20 text-blue-400'
    case 'Planned':
      return 'bg-purple-500/20 text-purple-400'
    default:
      return 'bg-gray-500/20 text-gray-400'
  }
}

/**
 * Get feature status badge styling
 */
function getFeatureStatusStyle(status: string): string {
  switch (status) {
    case 'Live':
      return 'bg-green-500/20 text-green-400'
    case 'In Development':
      return 'bg-blue-500/20 text-blue-400'
    case 'Planned':
      return 'bg-purple-500/20 text-purple-400'
    default:
      return 'bg-gray-500/20 text-gray-400'
  }
}

/**
 * Get status icon based on feature status
 */
function getStatusIcon(status: string) {
  switch (status) {
    case 'Live':
      return <CheckCircle2 className="w-6 h-6 text-green-400" />
    case 'In Development':
      return <Clock className="w-6 h-6 text-blue-400" />
    case 'Planned':
      return <Circle className="w-6 h-6 text-purple-400" />
    default:
      return <Circle className="w-6 h-6 text-gray-400" />
  }
}

/**
 * Roadmap data structure organized by quarters
 */
const roadmapItems = [
  {
    period: 'Q4 2024',
    status: 'Completed',
    features: [
      {
        title: 'Core Platform Launch',
        description: 'Initial release of Payso with essential escrow and payment features',
        status: 'Live',
        highlights: [
          'Smart contract escrow system',
          'Multi-currency support (USDC, USDT, ETH)',
          'Basic dashboard and analytics',
          'Wallet integration (MetaMask, WalletConnect)'
        ]
      },
      {
        title: 'Security Audit',
        description: 'Comprehensive smart contract security audit by leading firms',
        status: 'Live',
        highlights: [
          'Third-party security audit completed',
          'Bug bounty program launched',
          'Security documentation published'
        ]
      }
    ]
  },
  {
    period: 'Q1 2025',
    status: 'In Progress',
    features: [
      {
        title: 'Advanced Scheduling',
        description: 'Enhanced payment scheduling with recurring payments and milestones',
        status: 'In Development',
        highlights: [
          'Recurring payment automation',
          'Milestone-based releases',
          'Custom scheduling rules',
          'Payment templates'
        ]
      },
      {
        title: 'Team Collaboration',
        description: 'Multi-user accounts with role-based access control',
        status: 'In Development',
        highlights: [
          'Team workspaces',
          'Role-based permissions',
          'Approval workflows',
          'Activity audit logs'
        ]
      },
      {
        title: 'Mobile App',
        description: 'Native mobile applications for iOS and Android',
        status: 'Planned'
      }
    ]
  },
  {
    period: 'Q2 2025',
    status: 'Planned',
    features: [
      {
        title: 'API & Integrations',
        description: 'Developer API and third-party integrations',
        status: 'Planned',
        highlights: [
          'RESTful API',
          'Webhooks support',
          'SDK for popular languages',
          'Integration marketplace'
        ]
      },
      {
        title: 'Advanced Analytics',
        description: 'Comprehensive analytics and reporting tools',
        status: 'Planned',
        highlights: [
          'Custom reports',
          'Data export options',
          'Real-time dashboards',
          'Predictive insights'
        ]
      }
    ]
  },
  {
    period: 'Q3-Q4 2025',
    status: 'Planned',
    features: [
      {
        title: 'Multi-Chain Support',
        description: 'Expand to additional blockchain networks',
        status: 'Planned',
        highlights: [
          'Polygon integration',
          'Arbitrum support',
          'Cross-chain bridges',
          'Layer 2 optimizations'
        ]
      },
      {
        title: 'DeFi Integration',
        description: 'Yield generation and DeFi protocol integration',
        status: 'Planned',
        highlights: [
          'Automated yield strategies',
          'Staking options',
          'Liquidity pool integration',
          'DeFi dashboard'
        ]
      },
      {
        title: 'White-Label Solution',
        description: 'Customizable platform for enterprise clients',
        status: 'Planned'
      }
    ]
  }
]

