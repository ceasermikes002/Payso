'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  ExternalLink, 
  Copy, 
  CheckCircle2, 
  Clock,
  AlertCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  Hash,
  Coins,
  Shield
} from 'lucide-react'
import { STABLECOIN_SYMBOLS } from '@/lib/contracts/config'
import { formatTokenAmount, formatAddress, formatDateTime } from '@/lib/contracts/utils'
import { toast } from 'sonner'

/**
 * Transaction Details Page
 * 
 * Displays comprehensive information about a specific transaction
 * including all blockchain data, status, and verification details.
 * 
 * Features:
 * - Full transaction details
 * - Status tracking
 * - Block explorer links
 * - Copy to clipboard
 * - Industry-standard information display
 */

interface TransactionDetails {
  id: string
  type: 'sent' | 'received'
  status: 'scheduled' | 'claimed' | 'claimable' | 'pending'
  amount: string
  token: string
  preferredPayout?: string
  releaseAt?: string
  timestamp: string
  transactionHash: string
  blockNumber: string
  workVerified?: boolean
  requiresWorkEvent?: boolean
  claimedAt?: string
  claimTransactionHash?: string
  verifiedAt?: string
}

export default function TransactionDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const hash = params.hash as string
  
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    // In a real implementation, fetch transaction details from API
    // For now, we'll use dummy data
    const fetchTransactionDetails = async () => {
      try {
        setIsLoading(true)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Dummy transaction data
        const now = Math.floor(Date.now() / 1000)
        const dummyTransaction: TransactionDetails = {
          id: '1',
          type: 'received',
          status: hash.includes('claimed') ? 'claimed' : hash.includes('claimable') ? 'claimable' : 'scheduled',
          amount: '5000000000', // 5000 USDC
          token: '0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e',
          preferredPayout: '0xd2A490ac2e2eDAEb41a0DB39De526342B1a93Ac5',
          releaseAt: (now + 86400 * 7).toString(),
          requiresWorkEvent: true,
          workVerified: hash.includes('claimed'),
          blockNumber: '1000000',
          transactionHash: hash,
          timestamp: (now - 86400).toString(),
          claimedAt: hash.includes('claimed') ? '1000500' : undefined,
          claimTransactionHash: hash.includes('claimed') ? '0x' + hash.slice(2, 66) : undefined,
        }
        
        setTransaction(dummyTransaction)
      } catch (error) {
        console.error('Error fetching transaction:', error)
        toast.error('Failed to load transaction details')
      } finally {
        setIsLoading(false)
      }
    }

    if (hash) {
      fetchTransactionDetails()
    }
  }, [hash])

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    toast.success(`${label} copied to clipboard`)
    setTimeout(() => setCopied(null), 2000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading transaction details...</p>
        </div>
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D] flex items-center justify-center">
        <Card className="bg-white/5 border-white/10 max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Transaction Not Found</h2>
            <p className="text-white/60 mb-4">The transaction you're looking for doesn't exist.</p>
            <Button onClick={() => router.back()} className="bg-indigo-600 hover:bg-indigo-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const tokenSymbol = STABLECOIN_SYMBOLS[transaction.token as keyof typeof STABLECOIN_SYMBOLS] || 'Unknown'
  const payoutSymbol = transaction.preferredPayout 
    ? STABLECOIN_SYMBOLS[transaction.preferredPayout as keyof typeof STABLECOIN_SYMBOLS] 
    : tokenSymbol

  const getStatusBadge = () => {
    switch (transaction.status) {
      case 'claimed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-lg px-4 py-1">✓ Claimed</Badge>
      case 'claimable':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-lg px-4 py-1">⚡ Claimable</Badge>
      case 'scheduled':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-lg px-4 py-1">📅 Scheduled</Badge>
      default:
        return <Badge variant="outline" className="text-lg px-4 py-1">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-white/60 hover:text-white hover:bg-white/5 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Transactions
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Transaction Details</h1>
              <p className="text-white/60">Complete information about this payment</p>
            </div>
            {getStatusBadge()}
          </div>
        </div>

        {/* Main Transaction Card */}
        <Card className="bg-white/5 border-white/10 mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              {transaction.type === 'received' ? (
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <ArrowDownCircle className="w-8 h-8 text-green-400" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <ArrowUpCircle className="w-8 h-8 text-blue-400" />
                </div>
              )}
              <div>
                <CardTitle className="text-white text-2xl">
                  {formatTokenAmount(BigInt(transaction.amount))} {tokenSymbol}
                </CardTitle>
                <CardDescription className="text-white/60 text-lg">
                  {transaction.type === 'received' ? 'Payment Received' : 'Payment Sent'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Payment Information */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Coins className="w-5 h-5 text-indigo-400" />
                Payment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  label="Amount"
                  value={`${formatTokenAmount(BigInt(transaction.amount))} ${tokenSymbol}`}
                  icon={<Coins className="w-4 h-4" />}
                />
                <InfoItem
                  label="Payment Token"
                  value={tokenSymbol}
                  subValue={formatAddress(transaction.token)}
                  icon={<Coins className="w-4 h-4" />}
                  copyable
                  copyValue={transaction.token}
                  onCopy={() => copyToClipboard(transaction.token, 'Token Address')}
                />
                {transaction.preferredPayout && tokenSymbol !== payoutSymbol && (
                  <>
                    <InfoItem
                      label="Payout Currency"
                      value={payoutSymbol}
                      icon={<Coins className="w-4 h-4" />}
                    />
                    <InfoItem
                      label="Payout Token Address"
                      value={formatAddress(transaction.preferredPayout)}
                      icon={<Coins className="w-4 h-4" />}
                      copyable
                      copyValue={transaction.preferredPayout}
                      onCopy={() => copyToClipboard(transaction.preferredPayout!, 'Payout Token Address')}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Timeline Information */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                Timeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  label="Created At"
                  value={formatDateTime(parseInt(transaction.timestamp))}
                  icon={<Clock className="w-4 h-4" />}
                />
                {transaction.releaseAt && (
                  <InfoItem
                    label="Release Date"
                    value={formatDateTime(parseInt(transaction.releaseAt))}
                    icon={<Calendar className="w-4 h-4" />}
                  />
                )}
                {transaction.claimedAt && (
                  <InfoItem
                    label="Claimed At"
                    value={`Block #${transaction.claimedAt}`}
                    icon={<CheckCircle2 className="w-4 h-4 text-green-400" />}
                  />
                )}
              </div>
            </div>

            {/* Verification Status */}
            {transaction.requiresWorkEvent !== undefined && (
              <div>
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-400" />
                  Verification Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem
                    label="Work Verification Required"
                    value={transaction.requiresWorkEvent ? 'Yes' : 'No'}
                    icon={transaction.requiresWorkEvent ? <AlertCircle className="w-4 h-4 text-yellow-400" /> : <CheckCircle2 className="w-4 h-4 text-green-400" />}
                  />
                  {transaction.requiresWorkEvent && (
                    <InfoItem
                      label="Work Verified"
                      value={transaction.workVerified ? 'Verified' : 'Pending'}
                      icon={transaction.workVerified ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Clock className="w-4 h-4 text-yellow-400" />}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Blockchain Information */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-indigo-400" />
                Blockchain Information
              </h3>
              <div className="space-y-3">
                <InfoItem
                  label="Transaction Hash"
                  value={formatAddress(transaction.transactionHash)}
                  fullValue={transaction.transactionHash}
                  icon={<Hash className="w-4 h-4" />}
                  copyable
                  copyValue={transaction.transactionHash}
                  onCopy={() => copyToClipboard(transaction.transactionHash, 'Transaction Hash')}
                  link={`https://testnet.arcscan.app/tx/${transaction.transactionHash}`}
                />
                <InfoItem
                  label="Block Number"
                  value={`#${transaction.blockNumber}`}
                  icon={<Hash className="w-4 h-4" />}
                  link={`https://testnet.arcscan.app/block/${transaction.blockNumber}`}
                />
                {transaction.claimTransactionHash && (
                  <InfoItem
                    label="Claim Transaction Hash"
                    value={formatAddress(transaction.claimTransactionHash)}
                    fullValue={transaction.claimTransactionHash}
                    icon={<Hash className="w-4 h-4" />}
                    copyable
                    copyValue={transaction.claimTransactionHash}
                    onCopy={() => copyToClipboard(transaction.claimTransactionHash!, 'Claim Transaction Hash')}
                    link={`https://testnet.arcscan.app/tx/${transaction.claimTransactionHash}`}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={() => window.open(`https://testnet.arcscan.app/tx/${transaction.transactionHash}`, '_blank')}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Block Explorer
          </Button>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex-1 border-white/10 text-white hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

interface InfoItemProps {
  label: string
  value: string
  subValue?: string
  fullValue?: string
  icon?: React.ReactNode
  copyable?: boolean
  copyValue?: string
  onCopy?: () => void
  link?: string
}

function InfoItem({ label, value, subValue, fullValue, icon, copyable, copyValue, onCopy, link }: InfoItemProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1">
          <p className="text-white font-medium break-all" title={fullValue || value}>
            {value}
          </p>
          {subValue && (
            <p className="text-white/40 text-xs mt-1 font-mono">{subValue}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {copyable && copyValue && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onCopy}
              className="text-white/60 hover:text-white hover:bg-white/5 h-8 w-8 p-0"
            >
              <Copy className="w-4 h-4" />
            </Button>
          )}
          {link && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => window.open(link, '_blank')}
              className="text-indigo-400 hover:text-indigo-300 hover:bg-white/5 h-8 w-8 p-0"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

