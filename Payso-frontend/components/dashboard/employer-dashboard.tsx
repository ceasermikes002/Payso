'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from 'sonner'
import { Calendar } from 'lucide-react'
import { usePayrollEscrow, useEmployer } from '@/lib/contracts/hooks/usePayrollEscrow'
import { useApproveToken } from '@/lib/contracts/hooks/useToken'
import { CONTRACT_ADDRESSES, STABLECOIN_ADDRESSES, STABLECOIN_SYMBOLS } from '@/lib/contracts/config'
import { formatTokenAmount, parseTokenAmount } from '@/lib/contracts/utils'

export function EmployerDashboard() {
  const { address, isConnected } = useAccount()
  const toast = (props: {title: string, description?: string, variant?: 'default' | 'destructive'}) => {
    if (props.variant === 'destructive') {
      // @ts-ignore
      import('sonner').then(({ toast: sonnerToast }) => {
        sonnerToast.error(props.title, { description: props.description })
      })
    } else {
      // @ts-ignore
      import('sonner').then(({ toast: sonnerToast }) => {
        sonnerToast.success(props.title, { description: props.description })
      })
    }
  }
  const { depositAndSchedule, isPending, isConfirming } = usePayrollEscrow()
  const { approve, isPending: isApproving } = useApproveToken()
  const { data: employer } = useEmployer()

  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    releaseDate: '',
    releaseTime: '',
    requiresWorkEvent: false,
    stablecoin: CONTRACT_ADDRESSES.USDC,
    preferredPayout: CONTRACT_ADDRESSES.EURC,
  })

  const isEmployer = address && employer && address.toLowerCase() === employer.toLowerCase()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to schedule a payment.',
        variant: 'destructive',
      })
      return
    }

    if (!isEmployer) {
      toast({
        title: 'Access denied',
        description: 'Only the employer can schedule payments.',
        variant: 'destructive',
      })
      return
    }

    try {
      const releaseDateTime = new Date(`${formData.releaseDate}T${formData.releaseTime}`)
      const releaseTimestamp = Math.floor(releaseDateTime.getTime() / 1000)
      const currentTimestamp = Math.floor(Date.now() / 1000)

      if (releaseTimestamp <= currentTimestamp) {
        toast({
          title: 'Invalid release time',
          description: 'Release time must be in the future.',
          variant: 'destructive',
        })
        return
      }

      // First approve the token
      await approve(
        formData.stablecoin,
        CONTRACT_ADDRESSES.PayrollEscrow,
        formData.amount
      )

      // Then schedule the payment
      await depositAndSchedule(
        formData.recipient as `0x${string}`,
        formData.amount,
        releaseTimestamp,
        formData.requiresWorkEvent,
        formData.stablecoin,
        formData.preferredPayout
      )

      toast({
        title: 'Payment scheduled',
        description: 'Your payment has been successfully scheduled.',
      })

      // Reset form
      setFormData({
        recipient: '',
        amount: '',
        releaseDate: '',
        releaseTime: '',
        requiresWorkEvent: false,
        stablecoin: CONTRACT_ADDRESSES.USDC,
        preferredPayout: CONTRACT_ADDRESSES.EURC,
      })
    } catch (error) {
      console.error('Error scheduling payment:', error)
      toast({
        title: 'Error',
        description: 'Failed to schedule payment. Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-muted-foreground mb-4">
            Please connect your wallet to access the employer dashboard.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!isEmployer) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
          <p className="text-muted-foreground">
            Only the contract employer can schedule payments.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Schedule New Payment</CardTitle>
          <CardDescription>
            Create a new time-locked payment with optional work verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input
                  id="recipient"
                  placeholder="0x..."
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="1000.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="releaseDate">Release Date</Label>
                <div className="relative">
                  <Input
                    id="releaseDate"
                    type="date"
                    value={formData.releaseDate}
                    onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="releaseTime">Release Time</Label>
                <Input
                  id="releaseTime"
                  type="time"
                  value={formData.releaseTime}
                  onChange={(e) => setFormData({ ...formData, releaseTime: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stablecoin">Payment Token</Label>
                <Select
                  value={formData.stablecoin}
                  onValueChange={(value) => setFormData({ ...formData, stablecoin: value })}
                >
                  <SelectTrigger id="stablecoin">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={CONTRACT_ADDRESSES.USDC}>USDC</SelectItem>
                    <SelectItem value={CONTRACT_ADDRESSES.EURC}>EURC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredPayout">Payout Token</Label>
                <Select
                  value={formData.preferredPayout}
                  onValueChange={(value) => setFormData({ ...formData, preferredPayout: value })}
                >
                  <SelectTrigger id="preferredPayout">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={CONTRACT_ADDRESSES.USDC}>USDC</SelectItem>
                    <SelectItem value={CONTRACT_ADDRESSES.EURC}>EURC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="requiresWorkEvent"
                checked={formData.requiresWorkEvent}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, requiresWorkEvent: checked })
                }
              />
              <Label htmlFor="requiresWorkEvent">Require work verification</Label>
            </div>

            <Button
              type="submit"
              disabled={isPending || isConfirming || isApproving}
              className="w-full"
            >
              {isApproving
                ? 'Approving...'
                : isPending
                ? 'Scheduling...'
                : isConfirming
                ? 'Confirming...'
                : 'Schedule Payment'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}