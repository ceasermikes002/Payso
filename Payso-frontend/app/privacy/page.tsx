import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Shield, Eye, Lock, Database, UserCheck, FileText } from 'lucide-react'

/**
 * Privacy Policy Page Component
 * 
 * Comprehensive privacy policy outlining how Payso collects, uses, and protects user data.
 * Compliant with GDPR, CCPA, and other privacy regulations.
 * 
 * @returns {JSX.Element} The privacy policy page
 */
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D]">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-white/60 max-w-3xl mx-auto">
            Last updated: November 15, 2025
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 mb-12">
            <p className="text-white/80 leading-relaxed">
              At Payso, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you use our crypto escrow platform. Please read this privacy policy 
              carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-12">
            {privacySections.map((section, index) => (
              <section key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{section.title}</h2>
                    <p className="text-white/60">{section.description}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {section.content.map((item, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-semibold text-white mb-2">{item.subtitle}</h3>
                      <p className="text-white/60 leading-relaxed">{item.text}</p>
                      {item.list && (
                        <ul className="mt-3 space-y-2">
                          {item.list.map((listItem, listIdx) => (
                            <li key={listIdx} className="flex items-start gap-2 text-white/60">
                              <span className="text-indigo-400 mt-1">•</span>
                              <span>{listItem}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us About Privacy</h2>
            <p className="text-white/60 mb-4">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="space-y-2 text-white/80">
              <p>Email: <a href="mailto:privacy@payso.com" className="text-indigo-400 hover:text-indigo-300">privacy@payso.com</a></p>
              <p>Address: 123 Blockchain Street, San Francisco, CA 94102</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/**
 * Privacy policy sections data
 */
const privacySections = [
  {
    icon: <Database className="w-6 h-6 text-white" />,
    title: 'Information We Collect',
    description: 'Types of data we collect when you use Payso',
    content: [
      {
        subtitle: 'Personal Information',
        text: 'We collect information that you provide directly to us, including:',
        list: [
          'Email address and contact information',
          'Wallet addresses and transaction data',
          'Account preferences and settings',
          'Communication history with our support team'
        ]
      },
      {
        subtitle: 'Automatically Collected Information',
        text: 'When you use our platform, we automatically collect certain information:',
        list: [
          'Device information (IP address, browser type, operating system)',
          'Usage data (pages visited, features used, time spent)',
          'Blockchain transaction data (publicly available on-chain data)',
          'Cookies and similar tracking technologies'
        ]
      }
    ]
  },
  {
    icon: <Eye className="w-6 h-6 text-white" />,
    title: 'How We Use Your Information',
    description: 'The purposes for which we process your data',
    content: [
      {
        subtitle: 'Service Delivery',
        text: 'We use your information to provide, maintain, and improve our services:',
        list: [
          'Process and facilitate crypto transactions',
          'Authenticate your identity and prevent fraud',
          'Provide customer support and respond to inquiries',
          'Send important service updates and notifications'
        ]
      },
      {
        subtitle: 'Analytics and Improvement',
        text: 'We analyze usage patterns to enhance our platform:',
        list: [
          'Understand how users interact with our platform',
          'Identify and fix technical issues',
          'Develop new features and improvements',
          'Conduct research and analysis'
        ]
      }
    ]
  },
  {
    icon: <Lock className="w-6 h-6 text-white" />,
    title: 'Data Security',
    description: 'How we protect your information',
    content: [
      {
        subtitle: 'Security Measures',
        text: 'We implement industry-standard security measures to protect your data:',
        list: [
          'End-to-end encryption for sensitive data',
          'Secure socket layer (SSL) technology',
          'Regular security audits and penetration testing',
          'Access controls and authentication protocols',
          'Secure data storage and backup systems'
        ]
      },
      {
        subtitle: 'Blockchain Security',
        text: 'Your crypto assets are protected by blockchain technology and smart contracts that have been audited by leading security firms.'
      }
    ]
  },
  {
    icon: <UserCheck className="w-6 h-6 text-white" />,
    title: 'Your Privacy Rights',
    description: 'Your rights regarding your personal data',
    content: [
      {
        subtitle: 'Access and Control',
        text: 'You have the right to:',
        list: [
          'Access your personal information',
          'Correct inaccurate data',
          'Request deletion of your data',
          'Export your data in a portable format',
          'Opt-out of marketing communications',
          'Withdraw consent for data processing'
        ]
      },
      {
        subtitle: 'GDPR and CCPA Compliance',
        text: 'We comply with GDPR (for EU users) and CCPA (for California residents), providing enhanced privacy rights and protections.'
      }
    ]
  },
  {
    icon: <FileText className="w-6 h-6 text-white" />,
    title: 'Data Sharing and Disclosure',
    description: 'When and how we share your information',
    content: [
      {
        subtitle: 'Third-Party Services',
        text: 'We may share your information with trusted third-party service providers who assist us in operating our platform, such as:',
        list: [
          'Cloud hosting providers',
          'Analytics services',
          'Customer support tools',
          'Payment processors'
        ]
      },
      {
        subtitle: 'Legal Requirements',
        text: 'We may disclose your information if required by law, court order, or government regulation, or to protect our rights and safety.'
      },
      {
        subtitle: 'No Sale of Data',
        text: 'We do not sell, rent, or trade your personal information to third parties for marketing purposes.'
      }
    ]
  }
]

