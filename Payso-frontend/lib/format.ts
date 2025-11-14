/**
 * @fileoverview Utility functions for formatting data in the dashboard
 */

import { Payment, PaymentStatus, PaymentWithStatus, StablecoinType } from './types'

/** Format wei amount to human-readable string with symbol */
export function formatAmount(amount: bigint, decimals = 6): string {
  const divisor = BigInt(10 ** decimals)
  const whole = amount / divisor
  const fraction = amount % divisor
  const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 2)
  return `${whole}.${fractionStr}`
}

/** Format timestamp to readable date */
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/** Calculate days until release */
export function daysUntilRelease(releaseAt: number): number {
  const now = Math.floor(Date.now() / 1000)
  const diff = releaseAt - now
  return Math.max(0, Math.ceil(diff / 86400))
}

/** Get stablecoin symbol from address */
export function getStablecoinSymbol(address: string, usdcAddress: string, eurcAddress: string): StablecoinType {
  return address.toLowerCase() === usdcAddress.toLowerCase() ? 'USDC' : 'EURC'
}

/** Determine payment status */
export function getPaymentStatus(payment: Payment, workVerified: boolean): PaymentStatus {
  if (payment.claimed) return PaymentStatus.CLAIMED
  
  const now = Math.floor(Date.now() / 1000)
  const isTimeReached = now >= payment.releaseAt
  
  if (payment.requiresWorkEvent && !workVerified) {
    return PaymentStatus.WORK_PENDING
  }
  
  return isTimeReached ? PaymentStatus.CLAIMABLE : PaymentStatus.PENDING
}

/** Enhance payment with computed fields */
export function enhancePayment(
  payment: Payment,
  workVerified: boolean,
  usdcAddress: string,
  eurcAddress: string
): PaymentWithStatus {
  return {
    ...payment,
    status: getPaymentStatus(payment, workVerified),
    formattedAmount: formatAmount(payment.amount),
    formattedReleaseDate: formatDate(payment.releaseAt),
    daysUntilRelease: daysUntilRelease(payment.releaseAt),
    stablecoinSymbol: getStablecoinSymbol(payment.stablecoin, usdcAddress, eurcAddress),
    payoutSymbol: getStablecoinSymbol(payment.preferredPayout, usdcAddress, eurcAddress),
  }
}

/** Truncate Ethereum address */
export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

