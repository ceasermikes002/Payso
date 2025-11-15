import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'

/**
 * Blog Page Component
 * 
 * Displays blog posts and articles about crypto payments, blockchain technology,
 * and Payso platform updates. Features categorization and search functionality.
 * 
 * @returns {JSX.Element} The blog listing page
 */
export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D]">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Insights &
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Updates
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Stay updated with the latest news, guides, and insights from the Payso team
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center min-h-[300px]">
                <span className="text-6xl">🚀</span>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="text-white/40 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Nov 15, 2025
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Introducing Payso 2.0: The Future of Crypto Escrow
                </h2>
                <p className="text-white/60 mb-6">
                  We're excited to announce the launch of Payso 2.0 with advanced features including 
                  multi-chain support, enhanced security, and a completely redesigned user experience.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-indigo-500/50 transition-all group"
            >
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 h-48 flex items-center justify-center">
                <span className="text-5xl">{post.emoji}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-indigo-400" />
                  <span className="text-indigo-400 text-sm font-medium">{post.category}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-white/60 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-white/40">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay in the Loop</h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest updates, guides, and exclusive insights
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500"
            />
            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/**
 * Blog posts data
 */
const blogPosts = [
  {
    emoji: '🔐',
    category: 'Security',
    title: 'Understanding Smart Contract Security in Escrow Services',
    excerpt: 'Learn how smart contracts provide trustless security for your crypto payments and what makes them superior to traditional escrow.',
    date: 'Nov 10, 2025',
    readTime: '5 min read'
  },
  {
    emoji: '💡',
    category: 'Guide',
    title: 'Getting Started with Crypto Payments: A Beginner\'s Guide',
    excerpt: 'New to crypto payments? This comprehensive guide covers everything you need to know to start using Payso effectively.',
    date: 'Nov 5, 2025',
    readTime: '8 min read'
  },
  {
    emoji: '📊',
    category: 'Industry',
    title: 'The State of Crypto Payments in 2025',
    excerpt: 'An in-depth analysis of current trends, adoption rates, and the future outlook for cryptocurrency payments globally.',
    date: 'Oct 28, 2025',
    readTime: '10 min read'
  },
  {
    emoji: '⚡',
    category: 'Product',
    title: 'New Feature: Automated Recurring Payments',
    excerpt: 'Discover how our new recurring payment feature can streamline your subscription and payroll management.',
    date: 'Oct 20, 2025',
    readTime: '4 min read'
  },
  {
    emoji: '🌍',
    category: 'Case Study',
    title: 'How Global Teams Use Payso for Cross-Border Payments',
    excerpt: 'Real stories from companies using Payso to manage international payments and overcome traditional banking limitations.',
    date: 'Oct 15, 2025',
    readTime: '6 min read'
  },
  {
    emoji: '🛡️',
    category: 'Security',
    title: 'Best Practices for Securing Your Crypto Wallet',
    excerpt: 'Essential security tips and best practices to keep your digital assets safe when using crypto payment platforms.',
    date: 'Oct 8, 2025',
    readTime: '7 min read'
  }
]

