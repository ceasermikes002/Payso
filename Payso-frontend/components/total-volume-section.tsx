import { Bitcoin, Coins, Wallet } from 'lucide-react'
import Image from 'next/image'

const currencies = [
  {
    icon: Wallet,
    symbol: 'USDT/C',
    name: 'STABLE COIN',
    amount: '0.0000 USDC',
    usdValue: '$0.00 USD',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Bitcoin,
    symbol: 'BTC',
    name: 'BITCOIN',
    amount: '0.0000 BTC',
    usdValue: '$0.00 BTC',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    icon: Coins,
    symbol: 'ETH',
    name: 'ETHEREUM',
    amount: '0.0000 ETH',
    usdValue: '$0.00 ETH',
    color: 'from-indigo-500 to-purple-500',
  },
]

export function TotalVolumeSection() {
  return (
    <section className="py-24 relative">
      {/* Floating coin decorations */}
      <div className="absolute top-20 left-10 animate-float">
        <Image
          src="/gold-coin-illustration.jpg"
          alt="Coin"
          width={100}
          height={100}
          className="opacity-50"
        />
      </div>
      <div className="absolute bottom-20 right-10 animate-float delay-300">
        <Image
          src="/gold-coin-illustration.jpg"
          alt="Coin"
          width={120}
          height={120}
          className="opacity-50"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-4xl lg:text-5xl font-bold text-white text-center mb-16">
          Total volume escrowed<span className="text-indigo-400">.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {currencies.map((currency, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currency.color} flex items-center justify-center mb-6`}>
                  <currency.icon className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2 mb-6">
                  <h3 className="text-2xl font-bold text-white">{currency.symbol}</h3>
                  <p className="text-white/40 text-sm tracking-wider">{currency.name}</p>
                </div>
                <div className="h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0 mb-6"></div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-white">{currency.amount}</p>
                  <p className="text-white/40 text-sm">{currency.usdValue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative group max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
            <div className="text-5xl lg:text-6xl font-bold text-white mb-2">
              $13,392 USD
            </div>
            <div className="text-white/60 text-lg">Total Volume Escrowed</div>
          </div>
        </div>
      </div>
    </section>
  )
}
