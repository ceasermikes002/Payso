import { Github, Twitter, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

/**
 * Footer Component
 *
 * Global footer with navigation links to all major pages including:
 * - Product pages (Features, Pricing, Security, Roadmap)
 * - Company pages (About, Blog, Careers, Contact)
 * - Legal pages (Privacy, Terms, Cookie Policy, Licenses)
 * - Social media links
 *
 * @returns {JSX.Element} The footer component with navigation and branding
 */
export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 mt-24 relative" id="contact">
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-gradient-to-br from-indigo-600/10 to-purple-600/10 blur-3xl rounded-full"></div>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
                <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
              </div>
              <span className="text-xl font-bold text-white">Payso</span>
            </Link>
            <p className="text-white/60 text-sm">
              Trusted crypto escrow service for seamless global payments.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-white/60 hover:text-white transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white/60 hover:text-white transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-white/60 hover:text-white transition-colors text-sm">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-white/60 hover:text-white transition-colors text-sm">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/60 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/60 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white/60 hover:text-white transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-white/60 hover:text-white transition-colors text-sm">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/60 hover:text-white transition-colors text-sm">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-white/60 hover:text-white transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/licenses" className="text-white/60 hover:text-white transition-colors text-sm">
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2025 Payso. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com/payso"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/payso"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/company/payso"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:hello@payso.com"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
