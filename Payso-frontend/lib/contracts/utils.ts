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

export function formatAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
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

export function getStatusIcon(status: string) {
  switch (status) {
    case 'claimed':
      return '✅'
    case 'claimable':
      return '🟢'
    case 'pending':
      return '⏰'
    case 'work_required':
      return '🔒'
    default:
      return '❓'
  }
}

export function getStatusBadge(status: string) {
  const variants = {
    claimed: { className: 'bg-green-500/10 text-green-400', text: 'Claimed' },
    claimable: { className: 'bg-blue-500/10 text-blue-400', text: 'Claimable' },
    pending: { className: 'bg-yellow-500/10 text-yellow-400', text: 'Pending' },
    work_required: { className: 'bg-purple-500/10 text-purple-400', text: 'Work Required' },
  }
  
  const variant = variants[status as keyof typeof variants] || { className: 'bg-gray-500/10 text-gray-400', text: 'Unknown' }
  
  return { className: `px-2 py-1 rounded-full text-xs ${variant.className}`, text: variant.text }
}