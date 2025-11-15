'use client'

import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Clock, CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react'
import { usePayrollEscrow, useGetPaymentsByRecipient, useIsClaimable, useWorkVerified, useGetPayment } from '@/lib/contracts/hooks/usePayrollEscrow'
import { CONTRACT_ADDRESSES, STABLECOIN_SYMBOLS } from '@/lib/contracts/config'
import { formatTokenAmount, formatDateTime, getPaymentStatus, isPaymentClaimable } from '@/lib/contracts/utils'
import { formatUnits } from 'viem'

export function EmployeeDashboard() {
  const { address, isConnected } = useAccount()
  const showToast = (props: {title: string, description?: string, variant?: 'default' | 'destructive'}) => {
    if (props.variant === 'destructive') {
      toast.error(props.title, { description: props.description })
    } else {
      toast.success(props.title, { description: props.description })
    }
  }
  const { claimPayment, isPending, isConfirming } = usePayrollEscrow()
  
  const { data: paymentIds, isLoading: isLoadingIds } = useGetPaymentsByRecipient(
    address || '0x0000000000000000000000000000000000000000'
  )

  const handleClaimPayment = async (paymentId: bigint) => {
    try {
      await claimPayment(paymentId)
      showToast({
        title: 'Payment claimed',
        description: 'Your payment has been successfully claimed.',
      })
    } catch (error) {
      console.error('Error claiming payment:', error)
      showToast({
        title: 'Error',
        description: 'Failed to claim payment. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'claimed':
        return <Badge variant="secondary" className="bg-green-500/10 text-green-400">Claimed</Badge>
      case 'claimable':
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-400">Ready to Claim</Badge>
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-400">Pending</Badge>
      case 'work_required':
        return <Badge variant="secondary" className="bg-orange-500/10 text-orange-400">Work Required</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'claimed':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'claimable':
        return <CheckCircle className="h-4 w-4 text-blue-400" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />
      case 'work_required':
        return <AlertCircle className="h-4 w-4 text-orange-400" />
      default:
        return <XCircle className="h-4 w-4 text-red-400" />
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-muted-foreground mb-4">
            Please connect your wallet to view your payments.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Payments</CardTitle>
          <CardDescription>
            View and claim your scheduled payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingIds ? (
            <div className="text-center py-8">
              <div className="animate-pulse text-muted-foreground">Loading payments...</div>
            </div>
          ) : !paymentIds || paymentIds.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No payments found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paymentIds.map((paymentId) => (
                <PaymentCard
                  key={paymentId.toString()}
                  paymentId={paymentId}
                  onClaim={handleClaimPayment}
                  isClaiming={isPending || isConfirming}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function PaymentCard({ 
  paymentId, 
  onClaim, 
  isClaiming 
}: { 
  paymentId: bigint
  onClaim: (id: bigint) => void
  isClaiming: boolean
}) {
  const { data: payment } = useGetPayment(paymentId)
  const { data: isClaimable } = useIsClaimable(paymentId)
  const { data: workVerified } = useWorkVerified(paymentId)

  if (!payment) return null

  const currentTimestamp = Math.floor(Date.now() / 1000)
  const status = getPaymentStatus(
    payment.claimed,
    payment.releaseAt,
    workVerified || false,
    payment.requiresWorkEvent,
    currentTimestamp
  )

  const amount = formatTokenAmount(payment.amount)
  const payoutSymbol = STABLECOIN_SYMBOLS[payment.preferredPayout] || 'Unknown'
  const depositSymbol = STABLECOIN_SYMBOLS[payment.stablecoin] || 'Unknown'

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getStatusIcon(status)}
          <span className="font-medium">Payment #{paymentId.toString()}</span>
        </div>
        {getStatusBadge(status)}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Amount:</span>
          <div className="font-medium">{amount} {depositSymbol}</div>
        </div>
        <div>
          <span className="text-muted-foreground">Payout:</span>
          <div className="font-medium">{payoutSymbol}</div>
        </div>
        <div>
          <span className="text-muted-foreground">Release Time:</span>
          <div className="font-medium">{formatDateTime(Number(payment.releaseAt))}</div>
        </div>
        {payment.requiresWorkEvent && (
          <div>
            <span className="text-muted-foreground">Work Status:</span>
            <div className="font-medium">
              {workVerified ? 'Verified' : 'Pending'}
            </div>
          </div>
        )}
      </div>

      {status === 'claimable' && (
        <Button 
          onClick={() => onClaim(paymentId)}
          disabled={isClaiming}
          className="w-full"
        >
          {isClaiming ? 'Claiming...' : 'Claim Payment'}
        </Button>
      )}
    </div>
  )
}