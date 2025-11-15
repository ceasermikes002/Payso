'use client'

import { useState, useRef, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Calendar, HelpCircle } from 'lucide-react'
import { usePayrollEscrow, useEmployer } from '@/lib/contracts/hooks/usePayrollEscrow'
import { useApproveToken } from '@/lib/contracts/hooks/useToken'
import { CONTRACT_ADDRESSES, STABLECOIN_ADDRESSES, STABLECOIN_SYMBOLS } from '@/lib/contracts/config'
import { formatTokenAmount, parseTokenAmount } from '@/lib/contracts/utils'

export function EmployerDashboard() {
  const { address, isConnected } = useAccount()
  const showToast = (props: {title: string, description?: string, variant?: 'default' | 'destructive'}) => {
    if (props.variant === 'destructive') {
      toast.error(props.title, { description: props.description })
    } else {
      toast.success(props.title, { description: props.description })
    }
  }
  const { depositAndSchedule, isPending, isConfirming } = usePayrollEscrow()
  const { approve, isPending: isApproving } = useApproveToken()
  const { data: employer } = useEmployer()

  // Set default release date to tomorrow and time to 9:00 AM for better UX
  const getDefaultDateTime = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(9, 0, 0, 0)
    
    return {
      releaseDate: tomorrow.toISOString().split('T')[0],
      releaseTime: '09:00'
    }
  }

  const defaultDateTime = getDefaultDateTime()

  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    releaseDate: defaultDateTime.releaseDate,
    releaseTime: defaultDateTime.releaseTime,
    requiresWorkEvent: false,
    stablecoin: CONTRACT_ADDRESSES.USDC,
    preferredPayout: CONTRACT_ADDRESSES.EURC,
  })

  const isEmployer = address && employer && address.toLowerCase() === (employer as string).toLowerCase()

  // Custom date picker state
  const [showCalendar, setShowCalendar] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  // Handle date selection from calendar
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0]
      setFormData({ ...formData, releaseDate: formattedDate })
      setShowCalendar(false)
    }
  }

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false)
      }
    }

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCalendar])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected) {
      showToast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to schedule a payment.',
        variant: 'destructive',
      })
      return
    }

    if (!isEmployer) {
      showToast({
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
        showToast({
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

      showToast({
        title: 'Payment scheduled',
        description: 'Your payment has been successfully scheduled.',
      })

      // Reset form with default datetime
      setFormData({
        recipient: '',
        amount: '',
        releaseDate: defaultDateTime.releaseDate,
        releaseTime: defaultDateTime.releaseTime,
        requiresWorkEvent: false,
        stablecoin: CONTRACT_ADDRESSES.USDC,
        preferredPayout: CONTRACT_ADDRESSES.EURC,
      })
    } catch (error) {
      console.error('Error scheduling payment:', error)
      showToast({
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
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10"
                    onClick={() => setShowCalendar(!showCalendar)}
                    type="button"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {formData.releaseDate ? new Date(formData.releaseDate).toLocaleDateString() : <span>Pick a date</span>}
                  </Button>
                  {showCalendar && (
                    <div ref={calendarRef} className="absolute top-full left-0 mt-1 z-50 bg-[#1a2b4f] border border-white/10 rounded-lg shadow-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/10"
                          onClick={() => {
                            const prevMonth = new Date(formData.releaseDate || new Date())
                            prevMonth.setMonth(prevMonth.getMonth() - 1)
                            setFormData({ ...formData, releaseDate: prevMonth.toISOString().split('T')[0] })
                          }}
                        >
                          ←
                        </Button>
                        <span className="text-white font-medium">
                          {new Date(formData.releaseDate || new Date()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/10"
                          onClick={() => {
                            const nextMonth = new Date(formData.releaseDate || new Date())
                            nextMonth.setMonth(nextMonth.getMonth() + 1)
                            setFormData({ ...formData, releaseDate: nextMonth.toISOString().split('T')[0] })
                          }}
                        >
                          →
                        </Button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-xs text-center text-white/60 mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                          <div key={day}>{day}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 35 }, (_, i) => {
                          const today = new Date()
                          const selectedDate = new Date(formData.releaseDate || today)
                          const currentMonth = selectedDate.getMonth()
                          const currentYear = selectedDate.getFullYear()
                          
                          // Calculate the first day of the month
                          const firstDay = new Date(currentYear, currentMonth, 1)
                          const startDate = new Date(firstDay)
                          startDate.setDate(startDate.getDate() - firstDay.getDay())
                          
                          const date = new Date(startDate)
                          date.setDate(startDate.getDate() + i)
                          
                          const isCurrentMonth = date.getMonth() === currentMonth
                          const isToday = date.toDateString() === today.toDateString()
                          const isSelected = date.toDateString() === selectedDate.toDateString()
                          const isPast = date < new Date(today.toDateString())
                          
                          return (
                            <Button
                              key={i}
                              variant={isSelected ? 'default' : 'ghost'}
                              size="sm"
                              className={`h-8 w-8 p-0 ${
                                isCurrentMonth ? 'text-white' : 'text-white/40'
                              } ${
                                isToday ? 'ring-1 ring-white/50' : ''
                              } ${
                                isPast ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
                              }`}
                              onClick={() => !isPast && handleDateSelect(date)}
                              disabled={isPast}
                            >
                              {date.getDate()}
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
                {formData.releaseDate && formData.releaseTime && (
                  <p className="text-xs text-white/60">
                    Release: {new Date(`${formData.releaseDate}T${formData.releaseTime}`).toLocaleString()}
                  </p>
                )}
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
                  onValueChange={(value) => setFormData({ ...formData, stablecoin: value as typeof CONTRACT_ADDRESSES.USDC })}
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
                  onValueChange={(value) => setFormData({ ...formData, preferredPayout: value as typeof CONTRACT_ADDRESSES.EURC })}
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

            <div className="space-y-3 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center space-x-2">
                <Switch
                  id="requiresWorkEvent"
                  checked={formData.requiresWorkEvent}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, requiresWorkEvent: checked })
                  }
                />
                <Label htmlFor="requiresWorkEvent" className="font-medium">
                  Require work verification
                </Label>
                <HelpCircle className="h-4 w-4 text-white/40 hover:text-white/60 cursor-help" />
              </div>
              
              {formData.requiresWorkEvent && (
                <div className="space-y-2 text-sm text-white/70">
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">⚠️</span>
                    <span><strong>How it works:</strong> The employee must mark work as completed before the payment can be released.</span>
                  </p>
                  <div className="grid gap-1 ml-5">
                    <p>• Employee completes work and marks it as done</p>
                    <p>• Payment remains locked until work verification</p>
                    <p>• You can review and approve the completion</p>
                    <p>• Payment releases automatically after approval</p>
                  </div>
                  <p className="text-xs text-yellow-400/80 font-medium">
                    💡 Pro tip: Use this for milestone-based projects or deliverable-based payments
                  </p>
                </div>
              )}
              
              {!formData.requiresWorkEvent && (
                <p className="text-sm text-white/60">
                  Payment will be released automatically at the scheduled time without any verification required.
                </p>
              )}
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