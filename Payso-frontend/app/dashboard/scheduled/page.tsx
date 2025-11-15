'use client'

import { useAccount } from 'wagmi'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { useEmployer, useIsAuthorizedEmployer, useGetPaymentsByRecipient, useGetPayment, useWorkVerified, usePaymentCounter } from '@/lib/contracts/hooks/usePayrollEscrow'
import { formatTokenAmount, formatDateTime, getPaymentStatus, formatAddress } from '@/lib/contracts/utils'
import { STABLECOIN_SYMBOLS } from '@/lib/contracts/config'

export default function ScheduledPage() {
  const { address, isConnected } = useAccount()
  const { data: employer, error: employerError, isError: isEmployerError } = useEmployer()
  const { data: isAuthorized, error: authError, isError: isAuthError } = useIsAuthorizedEmployer(address || '0x0000000000000000000000000000000000000000')
  const { data: paymentIds, error: paymentIdsError, isError: isPaymentIdsError, isLoading } = useGetPaymentsByRecipient(address || '0x000000000000000000000000000000000000000000000000')
  const { data: counter, error: counterError, isError: isCounterError, isLoading: isLoadingCounter } = usePaymentCounter()

  const isEmployer = address && employer && (address.toLowerCase() === (employer as string).toLowerCase() || isAuthorized)

  // Debug logging
  console.log('=== SCHEDULED PAGE DEBUG ===')
  console.log('Connected address:', address)
  console.log('Contract employer:', employer)
  console.log('Employer error:', employerError)
  console.log('Is employer error:', isEmployerError)
  console.log('Is authorized:', isAuthorized)
  console.log('Auth error:', authError)
  console.log('Is auth error:', isAuthError)
  console.log('Is employer:', isEmployer)
  console.log('Payment counter:', counter)
  console.log('Counter error:', counterError)
  console.log('Is counter error:', isCounterError)
  console.log('Payment IDs (employee view):', paymentIds)
  console.log('Payment IDs error:', paymentIdsError)
  console.log('Is payment IDs error:', isPaymentIdsError)
  console.log('Total payment IDs to display:', isEmployer ? (counter ? Number(counter) : 0) : (paymentIds ? (paymentIds as any[]).length : 0))
  console.log('==========================')

  const ids = (() => {
    if (isEmployer) {
      const total = Number(counter || 0)
      if (total <= 0) return []
      return Array.from({ length: total }, (_, i) => BigInt(i + 1))
    }
    return (paymentIds as any[]) || []
  })()

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
          <div className="bg-white/5 border-white/10 flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
            <div className="px-6 py-12 text-center">
              <h2 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h2>
              <p className="text-white/60">Please connect your wallet to view your scheduled payments.</p>
            </div>
          </div>
        ) : (
          <>
            {(isEmployer ? (isLoadingCounter || isEmployerError || isAuthError || isCounterError) : (isLoading || isPaymentIdsError)) ? (
              <div className="bg-white/5 border-white/10 flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
                <div className="px-6 py-12 text-center">
                  {(isEmployer ? (isEmployerError || isAuthError || isCounterError) : isPaymentIdsError) ? (
                    <>
                      <h3 className="text-lg font-semibold text-red-400 mb-2">Error Loading Payments</h3>
                      <p className="text-red-400/60 text-sm">
                        {employerError?.message || authError?.message || counterError?.message || paymentIdsError?.message || 'Failed to load payment data'}
                      </p>
                    </>
                  ) : (
                    <div className="animate-pulse text-white/60">
                      {isEmployer ? 'Loading all payments...' : 'Loading scheduled payments...'}
                    </div>
                  )}
                </div>
              </div>
            ) : (!ids || ids.length === 0) ? (
              <div className="bg-white/5 border-white/10 flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
                <div className="px-6 py-12 text-center">
                  <Clock className="h-12 w-12 text-white/40 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {isEmployer ? 'No Payments Found' : 'No Scheduled Payments'}
                  </h3>
                  <p className="text-white/60">
                    {isEmployer 
                      ? 'No payments have been created yet. Create a new payment to get started.'
                      : 'You have no upcoming payments scheduled.'
                    }
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {ids.map((paymentId: any) => (
                  <ScheduledPaymentCard key={paymentId.toString()} paymentId={paymentId} isEmployer={Boolean(isEmployer)} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

function ScheduledPaymentCard({ paymentId, isEmployer }: { paymentId: bigint; isEmployer: boolean }) {
  const { data: payment } = useGetPayment(paymentId)
  const { data: workVerified } = useWorkVerified(paymentId)

  if (!payment) return null

  const paymentData = payment as {
    id: bigint
    recipient: string
    amount: bigint
    releaseAt: bigint
    claimed: boolean
    requiresWorkEvent: boolean
    stablecoin: string
    preferredPayout: string
  }

  const currentTimestamp = Math.floor(Date.now() / 1000)
  const status = getPaymentStatus(
    paymentData.claimed,
    paymentData.releaseAt,
    Boolean(workVerified),
    paymentData.requiresWorkEvent,
    currentTimestamp
  )

  // For employees: only show pending payments
  // For employers: show all payments (we'll organize them by status later)
  if (!isEmployer && status !== 'pending') return null

  return (
    <div className="bg-white/5 border-white/10 flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
        <div className="flex items-center justify-between">
          <div className="leading-none font-semibold text-white">Payment #{paymentData.id.toString()}</div>
          <Badge 
            variant="secondary" 
            className={
              status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
              status === 'claimable' ? 'bg-blue-500/10 text-blue-400' :
              status === 'claimed' ? 'bg-green-500/10 text-green-400' :
              status === 'work_required' ? 'bg-purple-500/10 text-purple-400' :
              'bg-gray-500/10 text-gray-400'
            }
          >
            {status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
            {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
          </Badge>
        </div>
        <div className="text-muted-foreground text-sm text-white/60">
          {isEmployer ? 'To:' : 'From:'} {formatAddress(paymentData.recipient)}
        </div>
      </div>
      <div className="px-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-white/60">Amount</p>
            <p className="text-lg font-semibold text-white">
              {formatTokenAmount(paymentData.amount)} {STABLECOIN_SYMBOLS[paymentData.stablecoin as keyof typeof STABLECOIN_SYMBOLS]}
            </p>
          </div>
          <div>
            <p className="text-sm text-white/60">Release Date</p>
            <p className="text-lg font-semibold text-white">
              {formatDateTime(Number(paymentData.releaseAt))}
            </p>
          </div>
          <div>
            <p className="text-sm text-white/60">Preferred Payout</p>
            <p className="text-lg font-semibold text-white">
              {STABLECOIN_SYMBOLS[paymentData.preferredPayout as keyof typeof STABLECOIN_SYMBOLS]}
            </p>
          </div>
          <div>
            <p className="text-sm text-white/60">Work Required</p>
            <p className="text-lg font-semibold text-white">
              {paymentData.requiresWorkEvent ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}