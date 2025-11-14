import { Button } from '@/components/ui/button'
import { MessageSquare, ArrowDown, MousePointer2 } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden" id="home">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-2 h-2 rounded-full bg-indigo-500 animate-pulse delay-300"></div>
      <div className="absolute bottom-20 left-1/4 w-2 h-2 rounded-full bg-indigo-600 animate-pulse delay-700"></div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              <span className="text-balance">Trusted crypto</span>
              <br />
              <span className="text-balance">escrow service</span>
              <span className="text-indigo-400">.</span>
            </h1>

            <div className="space-y-4 text-white/70 text-lg">
              <p className="text-balance">
                We offer escrow services for anything, physical or intangible.
              </p>
              <p className="text-balance">
                As of right now, crypto is the only method of escrow because it&apos;s
                extremely simple and easy for all parties to complete a transaction
                without any issues.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-14 text-lg"
              >
                Learn More
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full px-8 h-14 text-lg backdrop-blur-sm"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Right Content - 3D Illustration */}
          <div className="relative">
            {/* Orbital ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[500px] h-[500px] rounded-full border-2 border-indigo-500/20 border-dashed animate-[spin_30s_linear_infinite]"></div>
            </div>

            {/* Decorative dots on orbit */}
            <div className="absolute top-[10%] right-[25%] w-3 h-3 rounded-full bg-indigo-400"></div>
            <div className="absolute bottom-[20%] left-[15%] w-2 h-2 rounded-full bg-indigo-500"></div>
            <div className="absolute top-[40%] left-[5%] w-2 h-2 rounded-full bg-indigo-600"></div>
            <div className="absolute bottom-[40%] right-[10%] w-4 h-4 rounded-full bg-indigo-400"></div>

            {/* Central 3D Bank Building */}
            <div className="relative z-10 flex items-center justify-center">
              <Image
                src="/3d-isometric-purple-bank-building-illustration-wit.jpg"
                alt="3D Bank Building"
                width={400}
                height={400}
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 mt-20 animate-bounce">
          <span className="text-white/50 text-sm">Scroll Down</span>
          <MousePointer2 className="h-5 w-5 text-white/50" />
        </div>
      </div>
    </section>
  )
}
