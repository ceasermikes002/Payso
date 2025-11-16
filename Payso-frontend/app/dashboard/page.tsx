'use client'

import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, Clock, CheckCircle, TrendingUp, ExternalLink } from 'lucide-react'
import { useEmployer, useGetPaymentsByRecipient, useIsAuthorizedEmployer } from '@/lib/contracts/hooks/usePayrollEscrow'
import { useTokenBalance } from '@/lib/contracts/hooks/useToken'
import { CONTRACT_ADDRESSES, STABLECOIN_SYMBOLS } from '@/lib/contracts/config'
import { formatTokenAmount, formatAddress } from '@/lib/contracts/utils'

export default function DashboardPage() {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { data: employer, error: employerError, isLoading: employerLoading } = useEmployer()
  const { data: isAuthorized, error: authError, isLoading: authLoading } = useIsAuthorizedEmployer(
    address && isConnected ? address : undefined
  )
  const { data: paymentIds, isLoading } = useGetPaymentsByRecipient(
    address && isConnected ? address : undefined
  )
  const { data: usdcBalance } = useTokenBalance(CONTRACT_ADDRESSES.USDC, address)
  const { data: eurcBalance } = useTokenBalance(CONTRACT_ADDRESSES.EURC, address)

  // Debug logging - commented out for production
  // useEffect(() => {
  //   console.log('=== DASHBOARD DEBUG ===')
  //   console.log('Connected address:', address)
  //   console.log('Contract employer:', employer)
  //   console.log('Employer loading:', employerLoading)
  //   console.log('Employer error:', employerError)
  //   console.log('Is authorized:', isAuthorized)
  //   console.log('Auth loading:', authLoading)
  //   console.log('Auth error:', authError)
  //   console.log('Contract address:', CONTRACT_ADDRESSES.PayrollEscrow)
  //   console.log('Employer type:', typeof employer)
  //   console.log('Employer value:', employer)
  //   console.log('IsAuthorized type:', typeof isAuthorized)
  //   console.log('IsAuthorized value:', isAuthorized)
  //   console.log('Address comparison:', address && employer && address.toLowerCase() === (employer as string).toLowerCase())
  //   console.log('Final isEmployer logic:', {
  //     hasAddress: !!address,
  //     hasEmployer: !!employer,
  //     isMainEmployer: address && employer && address.toLowerCase() === (employer as string).toLowerCase(),
  //     isAuthorizedEmployer: isAuthorized,
  //     finalResult: address && employer && (address.toLowerCase() === (employer as string).toLowerCase() || isAuthorized)
  //   })
  //   console.log('=======================')
  // }, [address, employer, isAuthorized, employerLoading, authLoading, employerError, authError])

  const isEmployer = address && (employer ? (address.toLowerCase() === (employer as string).toLowerCase() || isAuthorized) : fallbackEmployer)

  // If contract calls are failing, show a warning but default to employer if address matches expected deployer
  const contractFailed = employerError || authError || (!employer && !employerLoading) || (isAuthorized === undefined && !authLoading)
  const fallbackEmployer = address && (address.toLowerCase() === '0x24f2c1199B390Ffe5de345495eDA04492dc4e12E'.toLowerCase())

  // Calculate statss
  const totalPayments = (paymentIds as any[])?.length || 0
  const claimablePayments = (paymentIds as any[])?.filter((payment: any) => !payment.claimed && payment.releaseAt * 1000 <= Date.now()).length || 0
  const totalValue = (paymentIds as any[])?.reduce((sum: number, payment: any) => sum + Number(payment.amount), 0) || 0

  // Debug info display
  // Debug Info - commented out for production
  // const DebugInfo = () => (
  //   <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
  //     <h3 className="text-yellow-400 font-semibold mb-2">🔍 Debug Information</h3>
  //     <div className="text-xs text-yellow-300 space-y-1">
  //       <div>Your Address: {address || 'Not connected'}</div>
  //       <div>Contract Employer: {employer || (employerLoading ? 'Loading...' : employerError ? 'Error' : 'Not loaded')}</div>
  //       <div>Is Authorized: {isAuthorized === undefined ? (authLoading ? 'Loading...' : 'Not loaded') : isAuthorized.toString()}</div>
  //       <div>RPC URL: {process.env.NEXT_PUBLIC_ARC_RPC_URL || 'Default'}</div>
  //       <div>Contract Address: {CONTRACT_ADDRESSES.PayrollEscrow}</div>
  //       <div>Network: Arc Testnet (5042002)</div>
  //       <div>Contract Failed: {contractFailed.toString()}</div>
  //       <div>Fallback Employer: {fallbackEmployer.toString()}</div>
  //       {employerError && <div className="text-red-400">Employer Error: {employerError.message}</div>}
  //       {authError && <div className="text-red-400">Auth Error: {authError.message}</div>}
  //       {contractFailed && (
  //         <div className="mt-2 p-2 bg-red-500/20 rounded border border-red-500/30">
  //           <div className="text-red-400 font-semibold">⚠️ Contract Connection Failed</div>
  //           <div className="text-red-300 text-xs">Network or RPC issues detected</div>
  //         </div>
  //       )}
  //       {employer && address && (
  //         <div className="mt-2 p-2 bg-yellow-500/20 rounded">
  //           <div>Address Match: {(address.toLowerCase() === (employer as string).toLowerCase()).toString()}</div>
  //           <div>Final Role: {address && employer && (address.toLowerCase() === (employer as string).toLowerCase() || isAuthorized) ? 'Employer' : 'Employee'}</div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // )

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
        {/* Debug Info - commented out for production */}
        {/* {isConnected && <DebugInfo />} */}
        
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
                    {usdcBalance ? formatTokenAmount(usdcBalance as bigint) : '0.00'}
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
                    {eurcBalance ? formatTokenAmount(eurcBalance as bigint) : '0.00'}
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

