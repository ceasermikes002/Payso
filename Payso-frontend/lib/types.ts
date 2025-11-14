/**
 * @fileoverview Type definitions for ArcPay Escrow Dashboard
 */

/** Payment status enum */
export enum PaymentStatus {
  PENDING = 'pending',
  CLAIMABLE = 'claimable',
  CLAIMED = 'claimed',
  WORK_PENDING = 'work_pending',
}

/** Supported stablecoin types */
export type StablecoinType = 'USDC' | 'EURC'

/** Payment data structure matching smart contract */
export interface Payment {
  id: number
  recipient: string
  amount: bigint
  releaseAt: number
  claimed: boolean
  requiresWorkEvent: boolean
  stablecoin: string
  preferredPayout: string
}

/** Enhanced payment with computed fields for UI */
export interface PaymentWithStatus extends Payment {
  status: PaymentStatus
  formattedAmount: string
  formattedReleaseDate: string
  daysUntilRelease: number
  stablecoinSymbol: StablecoinType
  payoutSymbol: StablecoinType
}

/** Dashboard statistics */
export interface DashboardStats {
  totalPayments: number
  totalValue: string
  pendingPayments: number
  claimedPayments: number
  averagePayment: string
}

/** Activity data for charts */
export interface ActivityData {
  date: string
  payments: number
  volume: number
}

