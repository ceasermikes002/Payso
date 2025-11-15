import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { MapPin, Clock, Briefcase, ArrowRight, Heart, Zap, Users, Globe } from 'lucide-react'
import Link from 'next/link'

/**
 * Careers Page Component
 * 
 * Displays open positions at Payso with company culture, benefits, and job listings.
 * Each job listing links to a detailed job description page.
 * 
 * @returns {JSX.Element} The careers page with job listings
 */
export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D]">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Join Our
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Mission
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Help us build the future of crypto payments. We're looking for talented individuals 
            who are passionate about blockchain and financial innovation.
          </p>
        </div>

        {/* Why Join Us */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Join Payso?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/60 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Open Positions</h2>
          <div className="space-y-4">
            {jobListings.map((job, index) => (
              <Link
                key={index}
                href={`/careers/${job.slug}`}
                className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-indigo-500/50 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {job.title}
                      </h3>
                      {job.featured && (
                        <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-white/60 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-white/50">
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
                  </div>
                  <ArrowRight className="w-6 h-6 text-white/40 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Perks & Benefits */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Perks & Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-400">✓</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{perk.title}</h3>
                  <p className="text-white/60 text-sm">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don't See a Perfect Fit?</h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            We're always looking for talented people. Send us your resume and let us know how you can contribute.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
          >
            Get in Touch
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/**
 * Company benefits data
 */
const benefits = [
  {
    icon: <Heart className="w-6 h-6 text-white" />,
    title: 'Great Culture',
    description: 'Work with passionate people who love what they do'
  },
  {
    icon: <Zap className="w-6 h-6 text-white" />,
    title: 'Fast Growth',
    description: 'Grow your career in a rapidly expanding company'
  },
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: 'Amazing Team',
    description: 'Collaborate with talented engineers and designers'
  },
  {
    icon: <Globe className="w-6 h-6 text-white" />,
    title: 'Remote First',
    description: 'Work from anywhere in the world'
  }
]

/**
 * Job listings data
 */
const jobListings = [
  {
    slug: 'senior-blockchain-engineer',
    title: 'Senior Blockchain Engineer',
    description: 'Build and optimize smart contracts for our escrow platform. Work with Solidity, Hardhat, and cutting-edge blockchain technology.',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    featured: true
  },
  {
    slug: 'product-designer',
    title: 'Product Designer',
    description: 'Design beautiful and intuitive user experiences for our crypto payment platform. Shape the future of how users interact with blockchain.',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    featured: true
  },
  {
    slug: 'frontend-engineer',
    title: 'Frontend Engineer',
    description: 'Create responsive and performant web applications using React, Next.js, and modern web technologies.',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    featured: false
  },
  {
    slug: 'security-engineer',
    title: 'Security Engineer',
    description: 'Ensure the security of our platform through audits, penetration testing, and security best practices implementation.',
    department: 'Security',
    location: 'Remote',
    type: 'Full-time',
    featured: false
  },
  {
    slug: 'customer-success-manager',
    title: 'Customer Success Manager',
    description: 'Help our users succeed with Payso. Provide support, gather feedback, and ensure customer satisfaction.',
    department: 'Customer Success',
    location: 'Remote',
    type: 'Full-time',
    featured: false
  }
]

/**
 * Company perks data
 */
const perks = [
  { title: 'Competitive Salary', description: 'Industry-leading compensation packages' },
  { title: 'Equity Options', description: 'Share in our success with stock options' },
  { title: 'Health Insurance', description: 'Comprehensive health, dental, and vision coverage' },
  { title: 'Flexible Hours', description: 'Work when you\'re most productive' },
  { title: 'Learning Budget', description: 'Annual budget for courses and conferences' },
  { title: 'Latest Equipment', description: 'Top-of-the-line hardware and tools' }
]

