import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileText, AlertCircle, Scale, Shield, Users, Ban } from 'lucide-react'

/**
 * Terms of Service Page Component
 * 
 * Legal terms and conditions governing the use of Payso platform.
 * Outlines user rights, responsibilities, and platform policies.
 * 
 * @returns {JSX.Element} The terms of service page
 */
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D]">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-white/60 max-w-3xl mx-auto">
            Last updated: November 15, 2025
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 mb-12">
            <p className="text-white/80 leading-relaxed mb-4">
              Welcome to Payso. These Terms of Service ("Terms") govern your access to and use of Payso's 
              crypto escrow platform, website, and services (collectively, the "Services").
            </p>
            <p className="text-white/80 leading-relaxed">
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree 
              to these Terms, you may not access or use our Services.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-12">
            {termsSections.map((section, index) => (
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
                      {item.subtitle && (
                        <h3 className="text-lg font-semibold text-white mb-2">{item.subtitle}</h3>
                      )}
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

          {/* Important Notice */}
          <div className="mt-12 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-8 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Important Notice</h3>
              <p className="text-white/60 leading-relaxed">
                These Terms constitute a legally binding agreement. By using Payso, you acknowledge that you have 
                read, understood, and agree to be bound by these Terms. We reserve the right to modify these Terms 
                at any time, and your continued use of the Services constitutes acceptance of any changes.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Terms?</h2>
            <p className="text-white/60 mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-white/80">
              Email: <a href="mailto:legal@payso.com" className="text-indigo-400 hover:text-indigo-300">legal@payso.com</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/**
 * Terms of service sections data
 */
const termsSections = [
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: 'Eligibility and Account',
    description: 'Requirements for using Payso services',
    content: [
      {
        subtitle: 'Eligibility',
        text: 'To use Payso, you must:',
        list: [
          'Be at least 18 years old',
          'Have the legal capacity to enter into binding contracts',
          'Not be prohibited from using our Services under applicable laws',
          'Comply with all local laws regarding online conduct and acceptable content'
        ]
      },
      {
        subtitle: 'Account Registration',
        text: 'You are responsible for maintaining the security of your account and wallet. You must provide accurate and complete information during registration and keep your account information updated.'
      },
      {
        subtitle: 'Account Security',
        text: 'You are solely responsible for safeguarding your private keys, passwords, and account credentials. Payso will never ask for your private keys or seed phrases.'
      }
    ]
  },
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: 'Use of Services',
    description: 'How you may use Payso platform',
    content: [
      {
        subtitle: 'Permitted Use',
        text: 'You may use our Services for lawful purposes only, including:',
        list: [
          'Creating and managing escrow transactions',
          'Sending and receiving crypto payments',
          'Scheduling automated payments',
          'Accessing analytics and reporting features'
        ]
      },
      {
        subtitle: 'Service Availability',
        text: 'We strive to provide reliable service but do not guarantee uninterrupted access. We may modify, suspend, or discontinue any part of the Services at any time.'
      }
    ]
  },
  {
    icon: <Ban className="w-6 h-6 text-white" />,
    title: 'Prohibited Activities',
    description: 'Activities that are not allowed on Payso',
    content: [
      {
        text: 'You agree not to:',
        list: [
          'Use the Services for any illegal activities or to violate any laws',
          'Engage in fraudulent transactions or money laundering',
          'Attempt to gain unauthorized access to our systems',
          'Interfere with or disrupt the Services or servers',
          'Use automated systems to access the Services without permission',
          'Impersonate any person or entity',
          'Transmit viruses, malware, or harmful code',
          'Violate the rights of others, including intellectual property rights'
        ]
      }
    ]
  },
  {
    icon: <Scale className="w-6 h-6 text-white" />,
    title: 'Fees and Payments',
    description: 'Transaction fees and payment terms',
    content: [
      {
        subtitle: 'Transaction Fees',
        text: 'Payso charges fees for certain transactions. All fees are clearly displayed before you confirm a transaction. Fees are subject to change with notice.'
      },
      {
        subtitle: 'Blockchain Fees',
        text: 'You are responsible for paying all blockchain network fees (gas fees) associated with your transactions. These fees are paid to network validators, not to Payso.'
      },
      {
        subtitle: 'No Refunds',
        text: 'All fees paid to Payso are non-refundable except as required by law or as explicitly stated in these Terms.'
      }
    ]
  },
  {
    icon: <AlertCircle className="w-6 h-6 text-white" />,
    title: 'Disclaimers and Limitations',
    description: 'Important legal disclaimers',
    content: [
      {
        subtitle: 'No Investment Advice',
        text: 'Payso does not provide investment, legal, or tax advice. You are solely responsible for determining whether any transaction is appropriate for you.'
      },
      {
        subtitle: 'Cryptocurrency Risks',
        text: 'Cryptocurrency transactions involve significant risks, including price volatility, regulatory changes, and technical failures. You acknowledge and accept these risks.'
      },
      {
        subtitle: 'Limitation of Liability',
        text: 'To the maximum extent permitted by law, Payso shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.'
      },
      {
        subtitle: 'Service "As Is"',
        text: 'The Services are provided "as is" and "as available" without warranties of any kind, either express or implied.'
      }
    ]
  },
  {
    icon: <FileText className="w-6 h-6 text-white" />,
    title: 'Dispute Resolution',
    description: 'How disputes are handled',
    content: [
      {
        subtitle: 'Governing Law',
        text: 'These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles.'
      },
      {
        subtitle: 'Arbitration',
        text: 'Any disputes arising from these Terms or your use of the Services shall be resolved through binding arbitration, except where prohibited by law.'
      },
      {
        subtitle: 'Class Action Waiver',
        text: 'You agree to resolve disputes with Payso on an individual basis and waive your right to participate in class actions or class arbitrations.'
      }
    ]
  }
]

