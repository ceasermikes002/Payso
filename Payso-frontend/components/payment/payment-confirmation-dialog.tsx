'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Coins, 
  User, 
  Calendar,
  Shield,
  Info
} from 'lucide-react'
import { formatTokenAmount, formatAddress, formatDateTime } from '@/lib/contracts/utils'
import { STABLECOIN_SYMBOLS } from '@/lib/contracts/config'

/**
 * Payment Confirmation Dialog Component
 * 
 * Implements a two-step confirmation process for payment security:
 * 1. Review payment details
 * 2. Confirm understanding of transaction
 * 
 * Security features:
 * - Double confirmation required
 * - Clear display of all payment details
 * - Warning messages for irreversible actions
 * - Checkbox confirmations for critical information
 * 
 * @param {PaymentConfirmationDialogProps} props - Component props
 */

export interface PaymentData {
  recipient: string
  amount: string
  releaseTimestamp: number
  stablecoin: string
  preferredPayout: string
  requiresWorkEvent: boolean
  estimatedGas?: string
}

interface PaymentConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  paymentData: PaymentData | null
  onConfirm: () => void
  isProcessing: boolean
}

export function PaymentConfirmationDialog({
  open,
  onOpenChange,
  paymentData,
  onConfirm,
  isProcessing,
}: PaymentConfirmationDialogProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [confirmations, setConfirmations] = useState({
    detailsReviewed: false,
    understandIrreversible: false,
    correctRecipient: false,
  })

  if (!paymentData) return null

  const depositSymbol = STABLECOIN_SYMBOLS[paymentData.stablecoin as keyof typeof STABLECOIN_SYMBOLS] || 'Unknown'
  const payoutSymbol = STABLECOIN_SYMBOLS[paymentData.preferredPayout as keyof typeof STABLECOIN_SYMBOLS] || 'Unknown'
  const releaseDate = new Date(paymentData.releaseTimestamp * 1000)
  const now = new Date()
  const daysUntilRelease = Math.ceil((releaseDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  const allConfirmed = Object.values(confirmations).every(Boolean)

  const handleClose = () => {
    setStep(1)
    setConfirmations({
      detailsReviewed: false,
      understandIrreversible: false,
      correctRecipient: false,
    })
    onOpenChange(false)
  }

  const handleConfirm = () => {
    if (step === 1) {
      setStep(2)
    } else {
      onConfirm()
      handleClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-b from-[#0B1A3D] to-[#162447] border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            {step === 1 ? (
              <>
                <Info className="w-6 h-6 text-indigo-400" />
                Review Payment Details
              </>
            ) : (
              <>
                <Shield className="w-6 h-6 text-amber-400" />
                Final Confirmation Required
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {step === 1 
              ? 'Please carefully review all payment details before proceeding.'
              : 'This is your final confirmation. Please verify all information is correct.'}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-4 py-4">
            {/* Payment Details */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-indigo-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-white/60">Recipient</p>
                  <p className="text-white font-mono text-sm break-all">{paymentData.recipient}</p>
                  <p className="text-xs text-white/40 mt-1">
                    Short: {formatAddress(paymentData.recipient)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Coins className="w-5 h-5 text-green-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-white/60">Payment Amount</p>
                  <p className="text-2xl font-bold text-white">
                    {paymentData.amount} {depositSymbol}
                  </p>
                  {depositSymbol !== payoutSymbol && (
                    <p className="text-sm text-white/60 mt-1">
                      Will be converted to {payoutSymbol} upon claim
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-white/60">Release Date</p>
                  <p className="text-white font-medium">
                    {formatDateTime(paymentData.releaseTimestamp)}
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    {daysUntilRelease} days from now
                  </p>
                </div>
              </div>

              {paymentData.requiresWorkEvent && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-white/60">Work Verification</p>
                    <Badge variant="outline" className="mt-1 border-amber-400/50 text-amber-400">
                      Required
                    </Badge>
                    <p className="text-xs text-white/40 mt-1">
                      Payment requires work verification before claim
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Estimated Gas */}
            {paymentData.estimatedGas && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-sm text-blue-400">
                  Estimated Gas Fee: ~{paymentData.estimatedGas} ARC
                </p>
              </div>
            )}

            {/* Warning */}
            <Alert className="bg-amber-500/10 border-amber-500/20">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <AlertDescription className="text-amber-400 text-sm">
                Once confirmed, this payment cannot be cancelled or modified. Ensure all details are correct.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {/* Final Confirmations */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <Checkbox
                  id="details-reviewed"
                  checked={confirmations.detailsReviewed}
                  onCheckedChange={(checked) =>
                    setConfirmations({ ...confirmations, detailsReviewed: checked as boolean })
                  }
                  className="mt-1"
                />
                <Label htmlFor="details-reviewed" className="text-white cursor-pointer flex-1">
                  I have carefully reviewed all payment details and they are correct
                </Label>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <Checkbox
                  id="understand-irreversible"
                  checked={confirmations.understandIrreversible}
                  onCheckedChange={(checked) =>
                    setConfirmations({ ...confirmations, understandIrreversible: checked as boolean })
                  }
                  className="mt-1"
                />
                <Label htmlFor="understand-irreversible" className="text-white cursor-pointer flex-1">
                  I understand this transaction is irreversible and cannot be cancelled
                </Label>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <Checkbox
                  id="correct-recipient"
                  checked={confirmations.correctRecipient}
                  onCheckedChange={(checked) =>
                    setConfirmations({ ...confirmations, correctRecipient: checked as boolean })
                  }
                  className="mt-1"
                />
                <Label htmlFor="correct-recipient" className="text-white cursor-pointer flex-1">
                  I confirm the recipient address is correct: {formatAddress(paymentData.recipient)}
                </Label>
              </div>
            </div>

            <Alert className="bg-red-500/10 border-red-500/20">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400 text-sm font-medium">
                Final Warning: Sending funds to the wrong address will result in permanent loss. 
                Double-check the recipient address above.
              </AlertDescription>
            </Alert>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isProcessing}
            className="border-white/10 text-white hover:bg-white/5"
          >
            Cancel
          </Button>
          {step === 1 ? (
            <Button
              onClick={handleConfirm}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Continue to Confirmation
            </Button>
          ) : (
            <Button
              onClick={handleConfirm}
              disabled={!allConfirmed || isProcessing}
              className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Confirm & Send Payment
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

