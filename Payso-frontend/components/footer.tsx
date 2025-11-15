import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 mt-24 relative" id="contact">
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-gradient-to-br from-indigo-600/10 to-purple-600/10 blur-3xl rounded-full"></div>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
                <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
              </div>
              <span className="text-xl font-bold text-white">Payso</span>
            </div>
            <p className="text-white/60 text-sm">
              Trusted crypto escrow service for seamless global payments.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Features</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Pricing</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Security</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">About</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Privacy</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Terms</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Cookie Policy</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Licenses</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2025 Payso. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
