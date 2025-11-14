/**
 * @fileoverview Dashboard overview page
 */

'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { PaymentsTable } from '@/components/dashboard/payments-table'
import { ActivityChart } from '@/components/dashboard/activity-chart'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { Button } from '@/components/ui/button'
import { Plus, Download } from 'lucide-react'
import type { DashboardStats, PaymentWithStatus, ActivityData } from '@/lib/types'
import { PaymentStatus } from '@/lib/types'

/** Mock data for demonstration */
const mockStats: DashboardStats = {
  totalPayments: 24,
  totalValue: '125,450.00',
  pendingPayments: 8,
  claimedPayments: 16,
  averagePayment: '5,227.08',
}

const mockPayments: PaymentWithStatus[] = [
  {
    id: 0,
    recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    amount: BigInt('5000000000'),
    releaseAt: Math.floor(Date.now() / 1000) + 86400 * 5,
    claimed: false,
    requiresWorkEvent: false,
    stablecoin: '0xUSDC',
    preferredPayout: '0xUSDC',
    status: PaymentStatus.PENDING,
    formattedAmount: '5,000.00',
    formattedReleaseDate: 'Nov 19, 2025',
    daysUntilRelease: 5,
    stablecoinSymbol: 'USDC',
    payoutSymbol: 'USDC',
  },
  {
    id: 1,
    recipient: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    amount: BigInt('3500000000'),
    releaseAt: Math.floor(Date.now() / 1000) - 86400,
    claimed: false,
    requiresWorkEvent: false,
    stablecoin: '0xUSDC',
    preferredPayout: '0xEURC',
    status: PaymentStatus.CLAIMABLE,
    formattedAmount: '3,500.00',
    formattedReleaseDate: 'Nov 13, 2025',
    daysUntilRelease: 0,
    stablecoinSymbol: 'USDC',
    payoutSymbol: 'EURC',
  },
  {
    id: 2,
    recipient: '0x9F33a4809aA708d7a399fedBa514e0A0d15EfA85',
    amount: BigInt('7500000000'),
    releaseAt: Math.floor(Date.now() / 1000) - 86400 * 7,
    claimed: true,
    requiresWorkEvent: false,
    stablecoin: '0xEURC',
    preferredPayout: '0xEURC',
    status: PaymentStatus.CLAIMED,
    formattedAmount: '7,500.00',
    formattedReleaseDate: 'Nov 7, 2025',
    daysUntilRelease: 0,
    stablecoinSymbol: 'EURC',
    payoutSymbol: 'EURC',
  },
]

const mockActivity: ActivityData[] = [
  { date: 'Nov 1', payments: 3, volume: 12500 },
  { date: 'Nov 4', payments: 5, volume: 18750 },
  { date: 'Nov 7', payments: 4, volume: 15200 },
  { date: 'Nov 10', payments: 6, volume: 22100 },
  { date: 'Nov 13', payments: 4, volume: 16800 },
  { date: 'Nov 14', payments: 2, volume: 8500 },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-white/60 mt-1">Manage your payroll escrow payments</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Payment
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={mockStats} />

        {/* Charts and Tables */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ActivityChart data={mockActivity} />
          </div>
          <QuickActions />
          <div className="lg:col-span-3">
            <PaymentsTable payments={mockPayments} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

