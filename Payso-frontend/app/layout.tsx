import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Web3Provider } from '@/components/web3-provider'
import './globals.css'
import { Toaster } from 'sonner'

// Import Space Grotesk font
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  title: 'Payso - Blockchain Payroll Escrow on Arc',
  description: 'Revolutionary blockchain-powered payroll escrow service. Automate employee payments, eliminate disputes, and ensure on-time salary distribution with smart contracts on Arc Testnet.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <Web3Provider>
          {children}
        </Web3Provider>
        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  )
}
