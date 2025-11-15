import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { MapPin, Clock, Briefcase, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

/**
 * Job Detail Page Component
 * 
 * Displays detailed information about a specific job opening including
 * responsibilities, requirements, and application form.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.slug - Job slug identifier
 * @returns {JSX.Element} The job detail page
 */
export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = jobDetails[params.slug]
  
  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D]">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-24">
        {/* Back Button */}
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Careers
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{job.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-8">
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {job.department}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {job.type}
              </span>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">About the Role</h2>
                <p className="text-white/60 leading-relaxed">{job.about}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/60">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/60">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {job.niceToHave && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Nice to Have</h2>
                  <ul className="space-y-3">
                    {job.niceToHave.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/60">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Apply Card */}
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Ready to Apply?</h3>
                <p className="text-white/60 text-sm mb-6">
                  Join our team and help build the future of crypto payments.
                </p>
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all">
                  Apply Now
                </button>
              </div>

              {/* Share */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Share this Job</h3>
                <div className="flex gap-3">
                  <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm transition-all">
                    Twitter
                  </button>
                  <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm transition-all">
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/**
 * Job details data structure
 * Contains comprehensive information for each job posting
 */
const jobDetails: Record<string, any> = {
  'senior-blockchain-engineer': {
    title: 'Senior Blockchain Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    about: 'We\'re looking for an experienced blockchain engineer to help build and scale our smart contract infrastructure. You\'ll work on critical features that handle millions in transactions and ensure the security and reliability of our escrow platform.',
    responsibilities: [
      'Design, develop, and deploy smart contracts using Solidity',
      'Optimize gas efficiency and contract performance',
      'Implement security best practices and conduct code reviews',
      'Collaborate with frontend engineers to integrate blockchain functionality',
      'Write comprehensive tests and documentation',
      'Stay updated with latest blockchain technologies and standards'
    ],
    requirements: [
      '5+ years of software engineering experience',
      '2+ years of Solidity and smart contract development',
      'Deep understanding of Ethereum and EVM',
      'Experience with Hardhat, Foundry, or similar frameworks',
      'Strong knowledge of security best practices',
      'Excellent problem-solving and communication skills'
    ],
    niceToHave: [
      'Experience with Layer 2 solutions (Polygon, Arbitrum)',
      'Smart contract audit experience',
      'Contributions to open-source blockchain projects',
      'Knowledge of DeFi protocols and standards'
    ]
  },
  'product-designer': {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    about: 'Join our design team to create beautiful, intuitive experiences for crypto payments. You\'ll own the design process from research to final implementation, working closely with engineers and product managers.',
    responsibilities: [
      'Design user interfaces for web and mobile applications',
      'Create wireframes, prototypes, and high-fidelity mockups',
      'Conduct user research and usability testing',
      'Maintain and evolve our design system',
      'Collaborate with engineers to ensure pixel-perfect implementation',
      'Present design concepts to stakeholders'
    ],
    requirements: [
      '4+ years of product design experience',
      'Strong portfolio demonstrating UI/UX skills',
      'Proficiency in Figma and modern design tools',
      'Understanding of web technologies (HTML, CSS, React)',
      'Experience designing for complex workflows',
      'Excellent visual design and typography skills'
    ],
    niceToHave: [
      'Experience designing crypto or fintech products',
      'Motion design and animation skills',
      'Front-end development experience',
      'Understanding of blockchain technology'
    ]
  }
}

