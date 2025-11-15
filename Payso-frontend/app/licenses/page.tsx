import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileCode, Package, ExternalLink, Github } from 'lucide-react'

/**
 * Licenses Page Component
 * 
 * Displays open-source licenses and attributions for third-party software
 * used in the Payso platform. Ensures compliance with open-source licenses.
 * 
 * @returns {JSX.Element} The licenses and attributions page
 */
export default function LicensesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D]">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-6">
            <FileCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Open Source Licenses
          </h1>
          <p className="text-white/60 max-w-3xl mx-auto">
            Payso is built with amazing open-source software. We're grateful to the open-source community 
            and comply with all license requirements.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <Github className="w-8 h-8 text-white flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Our Commitment to Open Source</h2>
                <p className="text-white/80 leading-relaxed mb-3">
                  Payso leverages numerous open-source libraries and frameworks. We are committed to complying 
                  with all license requirements and giving credit to the amazing developers who make these 
                  projects possible.
                </p>
                <p className="text-white/80 leading-relaxed">
                  This page lists the major open-source dependencies used in our platform along with their 
                  respective licenses.
                </p>
              </div>
            </div>
          </div>

          {/* License Categories */}
          <div className="space-y-8 mb-12">
            {licenseCategories.map((category, index) => (
              <section key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-indigo-400" />
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                </div>
                
                <div className="space-y-4">
                  {category.packages.map((pkg, pkgIndex) => (
                    <div
                      key={pkgIndex}
                      className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{pkg.name}</h3>
                            <span className="text-xs text-white/50 font-mono">{pkg.version}</span>
                          </div>
                          <p className="text-white/60 text-sm mb-3">{pkg.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-indigo-400 font-medium">{pkg.license}</span>
                            {pkg.url && (
                              <a
                                href={pkg.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-white/60 hover:text-white transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" />
                                View Project
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* License Texts */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Common License Texts</h2>
            <div className="space-y-6">
              {commonLicenses.map((license, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-white mb-2">{license.name}</h3>
                  <p className="text-white/60 text-sm mb-3">{license.description}</p>
                  <a
                    href={license.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Read Full License Text
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Smart Contract Licenses */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Smart Contract Licenses</h2>
            <p className="text-white/60 mb-6">
              Our smart contracts are open-source and available on GitHub. They use the following licenses:
            </p>
            <div className="space-y-4">
              {smartContractLicenses.map((contract, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{contract.name}</h3>
                      <p className="text-white/60 text-sm mb-3">{contract.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-indigo-400 font-medium">{contract.license}</span>
                        <a
                          href={contract.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-white/60 hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          View on GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">License Inquiries</h2>
            <p className="text-white/60 mb-4">
              If you have questions about our use of open-source software or believe we've made an error 
              in attribution, please contact us at:
            </p>
            <p className="text-white/80">
              Email: <a href="mailto:opensource@payso.com" className="text-indigo-400 hover:text-indigo-300">opensource@payso.com</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/**
 * License categories with packages
 */
const licenseCategories = [
  {
    name: 'Frontend Framework & Libraries',
    packages: [
      {
        name: 'Next.js',
        version: 'v16.0.3',
        description: 'React framework for production-grade applications',
        license: 'MIT',
        url: 'https://nextjs.org'
      },
      {
        name: 'React',
        version: 'v19.2.0',
        description: 'JavaScript library for building user interfaces',
        license: 'MIT',
        url: 'https://react.dev'
      },
      {
        name: 'TypeScript',
        version: 'v5.x',
        description: 'Typed superset of JavaScript',
        license: 'Apache 2.0',
        url: 'https://www.typescriptlang.org'
      },
      {
        name: 'Tailwind CSS',
        version: 'v3.x',
        description: 'Utility-first CSS framework',
        license: 'MIT',
        url: 'https://tailwindcss.com'
      }
    ]
  },
  {
    name: 'Blockchain & Web3',
    packages: [
      {
        name: 'viem',
        version: 'v2.x',
        description: 'TypeScript interface for Ethereum',
        license: 'MIT',
        url: 'https://viem.sh'
      },
      {
        name: 'wagmi',
        version: 'v2.x',
        description: 'React hooks for Ethereum',
        license: 'MIT',
        url: 'https://wagmi.sh'
      },
      {
        name: 'WalletConnect',
        version: 'v2.x',
        description: 'Open protocol for connecting wallets',
        license: 'Apache 2.0',
        url: 'https://walletconnect.com'
      }
    ]
  },
  {
    name: 'UI Components & Icons',
    packages: [
      {
        name: 'Radix UI',
        version: 'v1.x',
        description: 'Unstyled, accessible UI components',
        license: 'MIT',
        url: 'https://www.radix-ui.com'
      },
      {
        name: 'Lucide React',
        version: 'v0.x',
        description: 'Beautiful & consistent icon toolkit',
        license: 'ISC',
        url: 'https://lucide.dev'
      }
    ]
  }
]

/**
 * Common license information
 */
const commonLicenses = [
  {
    name: 'MIT License',
    description: 'A permissive license that allows reuse with minimal restrictions. Requires preservation of copyright and license notices.',
    url: 'https://opensource.org/licenses/MIT'
  },
  {
    name: 'Apache License 2.0',
    description: 'A permissive license that also provides an express grant of patent rights from contributors.',
    url: 'https://www.apache.org/licenses/LICENSE-2.0'
  },
  {
    name: 'ISC License',
    description: 'A permissive license functionally equivalent to MIT, with simpler language.',
    url: 'https://opensource.org/licenses/ISC'
  }
]

/**
 * Smart contract licenses
 */
const smartContractLicenses = [
  {
    name: 'Payso Escrow Contracts',
    description: 'Core smart contracts for escrow functionality',
    license: 'MIT',
    github: 'https://github.com/payso/contracts'
  },
  {
    name: 'OpenZeppelin Contracts',
    description: 'Secure smart contract library for Ethereum',
    license: 'MIT',
    github: 'https://github.com/OpenZeppelin/openzeppelin-contracts'
  }
]

