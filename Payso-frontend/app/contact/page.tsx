import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Mail, MessageSquare, Phone, MapPin, Send } from 'lucide-react'

/**
 * Contact Page Component
 * 
 * Provides multiple ways for users to get in touch with Payso team.
 * Includes contact form, email addresses, and support information.
 * 
 * @returns {JSX.Element} The contact page with form and contact information
 */
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D]">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get in
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-white/80 mb-2 text-sm font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-white/80 mb-2 text-sm font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-white/80 mb-2 text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white/80 mb-2 text-sm font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white/80 mb-2 text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  {method.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-white/60 text-sm mb-3">{method.description}</p>
                <a
                  href={method.link}
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                >
                  {method.linkText}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-white/60">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/**
 * Contact methods data
 */
const contactMethods = [
  {
    icon: <Mail className="w-6 h-6 text-white" />,
    title: 'Email Us',
    description: 'Send us an email and we\'ll get back to you within 24 hours.',
    link: 'mailto:support@payso.com',
    linkText: 'support@payso.com'
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-white" />,
    title: 'Live Chat',
    description: 'Chat with our support team in real-time during business hours.',
    link: '#',
    linkText: 'Start Chat'
  },
  {
    icon: <Phone className="w-6 h-6 text-white" />,
    title: 'Call Us',
    description: 'Speak directly with our team for urgent matters.',
    link: 'tel:+1234567890',
    linkText: '+1 (234) 567-890'
  },
  {
    icon: <MapPin className="w-6 h-6 text-white" />,
    title: 'Visit Us',
    description: 'Our headquarters in San Francisco.',
    link: '#',
    linkText: 'Get Directions'
  }
]

/**
 * FAQ data
 */
const faqs = [
  {
    question: 'What are your support hours?',
    answer: 'Our support team is available 24/7 via email. Live chat support is available Monday-Friday, 9 AM - 6 PM PST.'
  },
  {
    question: 'How quickly will I receive a response?',
    answer: 'We aim to respond to all inquiries within 24 hours. Urgent matters are typically addressed within a few hours.'
  },
  {
    question: 'Do you offer phone support?',
    answer: 'Phone support is available for enterprise customers and urgent security matters. Please email us first to schedule a call.'
  },
  {
    question: 'Where can I report a bug or security issue?',
    answer: 'Please email security@payso.com for security issues. For bugs, you can use our contact form or email support@payso.com.'
  }
]

