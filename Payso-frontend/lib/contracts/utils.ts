import { formatUnits } from 'viem'

export function formatTokenAmount(amount: bigint, decimals: number = 6): string {
  return formatUnits(amount, decimals)
}

export function parseTokenAmount(amount: string, decimals: number = 6): bigint {
  const [integer, fractional] = amount.split('.')
  const paddedFractional = (fractional || '').padEnd(decimals, '0').slice(0, decimals)
  return BigInt(integer + paddedFractional)
}

export function formatCurrency(amount: string, symbol: string): string {
  const num = parseFloat(amount)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: symbol === 'USDC' ? 'USD' : 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString()
}

export function formatDateTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString()
}

export function isPaymentClaimable(
  releaseAt: bigint,
  claimed: boolean,
  workVerified: boolean,
  requiresWorkEvent: boolean,
  currentTimestamp: number
): boolean {
  if (claimed) return false
  if (currentTimestamp < Number(releaseAt)) return false
  if (requiresWorkEvent && !workVerified) return false
  return true
}

export function getPaymentStatus(
  claimed: boolean,
  releaseAt: bigint,
  workVerified: boolean,
  requiresWorkEvent: boolean,
  currentTimestamp: number
): 'claimed' | 'claimable' | 'pending' | 'work_required' {
  if (claimed) return 'claimed'
  if (currentTimestamp < Number(releaseAt)) return 'pending'
  if (requiresWorkEvent && !workVerified) return 'work_required'
  return 'claimable'
}