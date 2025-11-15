import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Cookie, Settings, Eye, Shield } from 'lucide-react'

/**
 * Cookie Policy Page Component
 * 
 * Explains how Payso uses cookies and similar tracking technologies.
 * Provides information about cookie types, purposes, and user controls.
 * 
 * @returns {JSX.Element} The cookie policy page
 */
export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D]">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-6">
            <Cookie className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Cookie Policy
          </h1>
          <p className="text-white/60 max-w-3xl mx-auto">
            Last updated: November 15, 2025
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 mb-12">
            <p className="text-white/80 leading-relaxed mb-4">
              This Cookie Policy explains how Payso ("we", "us", or "our") uses cookies and similar tracking 
              technologies when you visit our website and use our services.
            </p>
            <p className="text-white/80 leading-relaxed">
              By using our website, you consent to the use of cookies in accordance with this Cookie Policy. 
              If you do not agree to our use of cookies, you should change your browser settings accordingly 
              or not use our website.
            </p>
          </div>

          {/* What Are Cookies */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Cookies are small text files that are placed on your device when you visit a website. They are 
              widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="text-white/60 leading-relaxed">
              Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device after 
              you close your browser, while session cookies are deleted when you close your browser.
            </p>
          </section>

          {/* Cookie Types */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Types of Cookies We Use</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {cookieTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{type.title}</h3>
                  <p className="text-white/60 mb-4">{type.description}</p>
                  <div className="space-y-2">
                    {type.examples.map((example, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                        <span className="text-indigo-400 mt-1">•</span>
                        <span>{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specific Cookies Table */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/80 font-semibold py-3 px-4">Cookie Name</th>
                    <th className="text-left text-white/80 font-semibold py-3 px-4">Purpose</th>
                    <th className="text-left text-white/80 font-semibold py-3 px-4">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {specificCookies.map((cookie, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="text-white/70 py-3 px-4 font-mono text-sm">{cookie.name}</td>
                      <td className="text-white/60 py-3 px-4 text-sm">{cookie.purpose}</td>
                      <td className="text-white/60 py-3 px-4 text-sm">{cookie.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Cookies</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              We may use third-party services that set cookies on your device. These services include:
            </p>
            <ul className="space-y-3">
              {thirdPartyCookies.map((service, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">•</span>
                  <div>
                    <span className="text-white font-semibold">{service.name}:</span>
                    <span className="text-white/60"> {service.purpose}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Managing Cookies */}
          <section className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-xl p-8 mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Managing Your Cookie Preferences</h2>
                <p className="text-white/60">You have several options to manage cookies:</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Browser Settings</h3>
                <p className="text-white/60 leading-relaxed">
                  Most browsers allow you to refuse or accept cookies. You can usually find these settings in 
                  the "Options" or "Preferences" menu of your browser. Note that blocking all cookies may 
                  impact your ability to use certain features of our website.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Cookie Consent Tool</h3>
                <p className="text-white/60 leading-relaxed">
                  When you first visit our website, you'll see a cookie consent banner where you can choose 
                  which types of cookies to accept. You can change your preferences at any time by clicking 
                  the cookie settings link in the footer.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Opt-Out Links</h3>
                <p className="text-white/60 leading-relaxed mb-2">
                  You can opt out of certain third-party cookies:
                </p>
                <ul className="space-y-2">
                  <li className="text-white/60 text-sm">
                    • Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-indigo-400 hover:text-indigo-300">Google Analytics Opt-out</a>
                  </li>
                  <li className="text-white/60 text-sm">
                    • Network Advertising Initiative: <a href="http://www.networkadvertising.org/choices/" className="text-indigo-400 hover:text-indigo-300">NAI Opt-out</a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Cookies?</h2>
            <p className="text-white/60 mb-4">
              If you have questions about our use of cookies, please contact us at:
            </p>
            <p className="text-white/80">
              Email: <a href="mailto:privacy@payso.com" className="text-indigo-400 hover:text-indigo-300">privacy@payso.com</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/**
 * Cookie types data
 */
const cookieTypes = [
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: 'Essential Cookies',
    description: 'Required for the website to function properly',
    examples: [
      'Authentication and security',
      'Session management',
      'Load balancing',
      'User preferences'
    ]
  },
  {
    icon: <Eye className="w-6 h-6 text-white" />,
    title: 'Analytics Cookies',
    description: 'Help us understand how visitors use our website',
    examples: [
      'Page views and traffic sources',
      'User behavior patterns',
      'Feature usage statistics',
      'Performance metrics'
    ]
  },
  {
    icon: <Settings className="w-6 h-6 text-white" />,
    title: 'Functional Cookies',
    description: 'Enable enhanced functionality and personalization',
    examples: [
      'Language preferences',
      'Theme settings',
      'Recently viewed items',
      'Customized content'
    ]
  },
  {
    icon: <Cookie className="w-6 h-6 text-white" />,
    title: 'Marketing Cookies',
    description: 'Track visitors across websites for marketing purposes',
    examples: [
      'Ad targeting and retargeting',
      'Campaign effectiveness',
      'Social media integration',
      'Conversion tracking'
    ]
  }
]

/**
 * Specific cookies used
 */
const specificCookies = [
  { name: '_payso_session', purpose: 'Maintains user session state', duration: 'Session' },
  { name: '_payso_auth', purpose: 'Authentication token', duration: '30 days' },
  { name: '_payso_preferences', purpose: 'Stores user preferences', duration: '1 year' },
  { name: '_ga', purpose: 'Google Analytics tracking', duration: '2 years' },
  { name: '_gid', purpose: 'Google Analytics session tracking', duration: '24 hours' }
]

/**
 * Third-party cookie services
 */
const thirdPartyCookies = [
  { name: 'Google Analytics', purpose: 'Website analytics and performance tracking' },
  { name: 'Cloudflare', purpose: 'Security and performance optimization' },
  { name: 'Intercom', purpose: 'Customer support and messaging' },
  { name: 'Stripe', purpose: 'Payment processing (for fiat transactions)' }
]

