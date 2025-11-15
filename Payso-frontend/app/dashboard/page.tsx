'use client'

import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, Clock, CheckCircle, TrendingUp, ExternalLink } from 'lucide-react'
import { useEmployer, useGetPaymentsByRecipient } from '@/lib/contracts/hooks/usePayrollEscrow'
import { useTokenBalance } from '@/lib/contracts/hooks/useToken'
import { CONTRACT_ADDRESSES, STABLECOIN_SYMBOLS } from '@/lib/contracts/config'
import { formatTokenAmount, formatAddress } from '@/lib/contracts/utils'

export default function DashboardPage() {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { data: employer } = useEmployer()
  const { data: paymentIds, isLoading } = useGetPaymentsByRecipient(address || '0x0000000000000000000000000000000000000000')
  const { data: usdcBalance } = useTokenBalance(CONTRACT_ADDRESSES.USDC, address)
  const { data: eurcBalance } = useTokenBalance(CONTRACT_ADDRESSES.EURC, address)

  const isEmployer = address && employer && address.toLowerCase() === employer.toLowerCase()

  // Calculate stats
  const totalPayments = paymentIds?.length || 0
  const claimablePayments = paymentIds?.filter((payment: any) => !payment.claimed && payment.releaseAt * 1000 <= Date.now()).length || 0
  const totalValue = paymentIds?.reduce((sum: number, payment: any) => sum + Number(payment.amount), 0) || 0

  // Quick action handlers
  const handleSchedulePayment = () => {
    router.push('/dashboard/payments')
  }

  const handleViewPayments = () => {
    router.push('/dashboard/payments')
  }

  const handleViewAvailablePayments = () => {
    router.push('/dashboard/payments')
  }

  const handlePaymentHistory = () => {
    router.push('/dashboard/scheduled')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-white/60 mt-1">
              {isEmployer ? 'Manage your payroll escrow payments' : 'View and claim your payments'}
            </p>
          </div>
          {isConnected && (
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={isEmployer ? handleSchedulePayment : handleViewPayments}
            >
              {isEmployer ? 'Schedule Payment' : 'View Payments'}
            </Button>
          )}
        </div>

        {!isConnected ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h2>
            <p className="text-white/60">Please connect your wallet to access the dashboard.</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">Total Payments</CardTitle>
                  <Wallet className="h-4 w-4 text-indigo-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{totalPayments}</div>
                  <p className="text-xs text-white/60">All time payments</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">Ready to Claim</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{claimablePayments}</div>
                  <p className="text-xs text-white/60">Available for withdrawal</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">USDC Balance</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {usdcBalance ? formatTokenAmount(usdcBalance) : '0.00'}
                  </div>
                  <p className="text-xs text-white/60">USDC tokens</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">EURC Balance</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {eurcBalance ? formatTokenAmount(eurcBalance) : '0.00'}
                  </div>
                  <p className="text-xs text-white/60">EURC tokens</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-white/60">
                    {isEmployer ? 'Manage your payroll operations' : 'Access your payment features'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isEmployer ? (
                    <>
                      <Button 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={handleSchedulePayment}
                      >
                        Schedule New Payment
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-white/20 text-white hover:bg-white/5"
                        onClick={handleViewPayments}
                      >
                        View All Payments
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleViewAvailablePayments}
                      >
                        View Available Payments
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-white/20 text-white hover:bg-white/5"
                        onClick={handlePaymentHistory}
                      >
                        Payment History
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-white/60">
                    Your latest transactions and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {totalPayments > 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">Total Payment Value</span>
                        <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-400">
                          {formatTokenAmount(BigInt(totalValue))} USDC
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">Active Payments</span>
                        <Badge variant="secondary" className="bg-green-500/10 text-green-400">
                          {claimablePayments} Ready
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/60 text-center py-4">
                      No recent activity to display
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

