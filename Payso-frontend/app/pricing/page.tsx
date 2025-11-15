import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Check, X, ArrowRight } from 'lucide-react'

/**
 * Pricing Page Component
 * 
 * Displays pricing tiers and plans for Payso services.
 * Features comparison table and clear call-to-action for each tier.
 * 
 * @returns {JSX.Element} The pricing page with plan comparisons
 */
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D]">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Simple, Transparent
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 ${
                plan.popular
                  ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
                  : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 mb-6">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-white/60 ml-2">{plan.period}</span>}
                </div>
                <p className="text-sm text-white/50">{plan.priceDescription}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-white/30 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? 'text-white/80' : 'text-white/40'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="/dashboard"
                className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/50'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
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
 * Pricing plan data structure
 */
const pricingPlans = [
  {
    name: 'Starter',
    description: 'Perfect for individuals and freelancers',
    price: 'Free',
    period: '',
    priceDescription: 'Forever free',
    popular: false,
    cta: 'Get Started',
    features: [
      { text: 'Up to 10 transactions/month', included: true },
      { text: 'Basic escrow protection', included: true },
      { text: 'Email support', included: true },
      { text: 'Standard processing speed', included: true },
      { text: 'Advanced analytics', included: false },
      { text: 'Priority support', included: false },
      { text: 'Custom integrations', included: false }
    ]
  },
  {
    name: 'Professional',
    description: 'For growing businesses and teams',
    price: '$29',
    period: '/month',
    priceDescription: 'Billed monthly',
    popular: true,
    cta: 'Start Free Trial',
    features: [
      { text: 'Unlimited transactions', included: true },
      { text: 'Advanced escrow features', included: true },
      { text: 'Priority email & chat support', included: true },
      { text: 'Fast processing speed', included: true },
      { text: 'Advanced analytics & reporting', included: true },
      { text: 'Team collaboration tools', included: true },
      { text: 'API access', included: true }
    ]
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    price: 'Custom',
    period: '',
    priceDescription: 'Contact us for pricing',
    popular: false,
    cta: 'Contact Sales',
    features: [
      { text: 'Unlimited everything', included: true },
      { text: 'White-label solution', included: true },
      { text: '24/7 dedicated support', included: true },
      { text: 'Instant processing', included: true },
      { text: 'Custom analytics & BI tools', included: true },
      { text: 'Advanced team management', included: true },
      { text: 'Custom integrations & API', included: true }
    ]
  }
]

/**
 * FAQ data structure
 */
const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major cryptocurrencies including USDC, USDT, ETH, and more. Traditional payment methods are also available for enterprise plans.'
  },
  {
    question: 'Can I change my plan later?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
  },
  {
    question: 'What are the transaction fees?',
    answer: 'Transaction fees vary based on network conditions. We always display the exact fee before you confirm any transaction.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! The Professional plan comes with a 14-day free trial. No credit card required to start.'
  }
]

