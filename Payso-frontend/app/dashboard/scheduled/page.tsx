'use client'

import { useAccount } from 'wagmi'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, ExternalLink } from 'lucide-react'
import { useEmployer, useGetPaymentsByRecipient } from '@/lib/contracts/hooks/usePayrollEscrow'
import { formatTokenAmount, formatDateTime, getPaymentStatus } from '@/lib/contracts/utils'
import { CONTRACT_ADDRESSES, STABLECOIN_SYMBOLS } from '@/lib/contracts/config'
import { formatUnits } from 'viem'

export default function ScheduledPage() {
  const { address, isConnected } = useAccount()
  const { data: employer } = useEmployer()
  const { data: paymentIds, isLoading } = useGetPaymentsByRecipient(address || '0x0000000000000000000000000000000000000000')

  const isEmployer = address && employer && address.toLowerCase() === employer.toLowerCase()

  // Filter for pending payments (scheduled but not yet claimable)
  const pendingPayments = paymentIds?.filter((payment: any) => {
    const status = getPaymentStatus(payment)
    return status === 'pending'
  }) || []

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Scheduled Payments</h1>
            <p className="text-white/60 mt-1">
              {isEmployer ? 'View all your scheduled payroll payments' : 'View your upcoming payments'}
            </p>
          </div>
        </div>

        {!isConnected ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h2>
            <p className="text-white/60">Please connect your wallet to view your scheduled payments.</p>
          </div>
        ) : (
          <>
            {pendingPayments.length === 0 ? (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="py-12 text-center">
                  <Clock className="h-12 w-12 text-white/40 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No Scheduled Payments</h3>
                  <p className="text-white/60">
                    {isEmployer 
                      ? 'No payments are currently scheduled. Create a new payment to get started.'
                      : 'You have no upcoming payments scheduled.'
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {pendingPayments.map((payment: any) => (
                  <Card key={payment.id.toString()} className="bg-white/5 border-white/10">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">Payment #{payment.id.toString()}</CardTitle>
                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-400">
                          <Clock className="h-3 w-3 mr-1" />
                          Scheduled
                        </Badge>
                      </div>
                      <CardDescription className="text-white/60">
                        {isEmployer ? 'To:' : 'From:'} {formatAddress(payment.recipient)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-white/60">Amount</p>
                          <p className="text-lg font-semibold text-white">
                            {formatTokenAmount(payment.amount)} {STABLECOIN_SYMBOLS[payment.stablecoin]}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-white/60">Release Date</p>
                          <p className="text-lg font-semibold text-white">
                            {formatDateTime(payment.releaseAt)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-white/60">Preferred Payout</p>
                          <p className="text-lg font-semibold text-white">
                            {STABLECOIN_SYMBOLS[payment.preferredPayout]}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-white/60">Work Required</p>
                          <p className="text-lg font-semibold text-white">
                            {payment.requiresWorkEvent ? 'Yes' : 'No'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}