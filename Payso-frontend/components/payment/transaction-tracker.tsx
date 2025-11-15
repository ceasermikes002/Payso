'use client'

import { useEffect, useState } from 'react'
import { useAccount, useWatchContractEvent } from 'wagmi'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Clock,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Filter,
  Eye
} from 'lucide-react'
import { CONTRACT_ADDRESSES, STABLECOIN_SYMBOLS } from '@/lib/contracts/config'
import { formatTokenAmount, formatAddress, formatDateTime } from '@/lib/contracts/utils'
import PayrollEscrowABI from '@/lib/contracts/abis/PayrollEscrow.json'
import { toast } from 'sonner'

/**
 * Real-Time Transaction Tracker Component
 * 
 * Features:
 * - Live blockchain event monitoring
 * - Transaction history display
 * - Real-time updates via WebSocket
 * - Filter by transaction type
 * - Automatic refresh
 * 
 * Security:
 * - Read-only operations
 * - Client-side filtering
 * - Rate-limited API calls
 */

interface Transaction {
  id: string
  type: 'sent' | 'received'
  status: 'scheduled' | 'claimed' | 'pending'
  amount: string
  token: string
  preferredPayout?: string
  releaseAt?: string
  timestamp: string
  transactionHash: string
  blockNumber: string
  workVerified?: boolean
}

interface TransactionTrackerProps {
  address?: string
  limit?: number
}

export function TransactionTracker({ address, limit = 20 }: TransactionTrackerProps) {
  const { address: connectedAddress } = useAccount()
  const userAddress = address || connectedAddress
  
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'sent' | 'received'>('all')
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Watch for new PaymentScheduled events
  useWatchContractEvent({
    address: CONTRACT_ADDRESSES.PayrollEscrow as `0x${string}`,
    abi: PayrollEscrowABI,
    eventName: 'PaymentScheduled',
    onLogs(logs) {
      console.log('New payment scheduled:', logs)
      toast.success('New payment detected!', {
        description: 'A new payment has been scheduled.',
      })
      fetchTransactions()
    },
  })

  // Watch for PaymentClaimed events
  useWatchContractEvent({
    address: CONTRACT_ADDRESSES.PayrollEscrow as `0x${string}`,
    abi: PayrollEscrowABI,
    eventName: 'PaymentClaimed',
    onLogs(logs) {
      console.log('Payment claimed:', logs)
      toast.success('Payment claimed!', {
        description: 'A payment has been successfully claimed.',
      })
      fetchTransactions()
    },
  })

  // Fetch transactions from API
  const fetchTransactions = async () => {
    if (!userAddress) return

    try {
      setIsLoading(true)

      // Try to fetch real data first, API will fallback to dummy data if blockchain unavailable
      const response = await fetch(
        `/api/transactions?address=${userAddress}&type=${filter}&limit=${limit}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch transactions')
      }

      const data = await response.json()

      if (data.success) {
        setTransactions(data.data.transactions)
        setLastUpdate(new Date())

        // Show info message if using dummy data
        if (data.data.isDummy) {
          toast.info('Showing sample transactions', {
            description: 'No real blockchain transactions found. Displaying demo data.',
          })
        }
      }
    } catch (error) {
      console.error('Error fetching transactions:', error)

      // Try to fetch dummy data as fallback
      try {
        const dummyResponse = await fetch(
          `/api/transactions?address=${userAddress}&type=${filter}&limit=${limit}&dummy=true`
        )

        if (dummyResponse.ok) {
          const dummyData = await dummyResponse.json()
          if (dummyData.success) {
            setTransactions(dummyData.data.transactions)
            setLastUpdate(new Date())
            toast.info('Showing sample transactions', {
              description: 'Unable to connect to blockchain. Displaying demo data.',
            })
            return
          }
        }
      } catch (dummyError) {
        console.error('Failed to fetch dummy data:', dummyError)
      }

      toast.error('Failed to load transactions', {
        description: 'Please check your connection and try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Initial load and filter changes
  useEffect(() => {
    fetchTransactions()
  }, [userAddress, filter])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTransactions()
    }, 30000)

    return () => clearInterval(interval)
  }, [userAddress, filter])

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true
    return tx.type === filter
  })

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">Transaction History</CardTitle>
            <CardDescription className="text-white/60">
              Real-time payment tracking • Last updated: {lastUpdate.toLocaleTimeString()}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchTransactions}
              disabled={isLoading}
              className="border-white/10 text-white hover:bg-white/5"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-indigo-600' : 'border-white/10 text-white hover:bg-white/5'}
          >
            All
          </Button>
          <Button
            variant={filter === 'received' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('received')}
            className={filter === 'received' ? 'bg-indigo-600' : 'border-white/10 text-white hover:bg-white/5'}
          >
            <ArrowDownCircle className="w-4 h-4 mr-1" />
            Received
          </Button>
          <Button
            variant={filter === 'sent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('sent')}
            className={filter === 'sent' ? 'bg-indigo-600' : 'border-white/10 text-white hover:bg-white/5'}
          >
            <ArrowUpCircle className="w-4 h-4 mr-1" />
            Sent
          </Button>
        </div>

        {/* Transaction List */}
        {isLoading && transactions.length === 0 ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 text-white/40 animate-spin mx-auto mb-3" />
            <p className="text-white/60">Loading transactions...</p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/60">No transactions found</p>
            <p className="text-white/40 text-sm mt-1">
              Your transaction history will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((tx) => (
              <TransactionItem key={tx.transactionHash} transaction={tx} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const router = useRouter()
  const tokenSymbol = STABLECOIN_SYMBOLS[transaction.token as keyof typeof STABLECOIN_SYMBOLS] || 'Unknown'
  const payoutSymbol = transaction.preferredPayout
    ? STABLECOIN_SYMBOLS[transaction.preferredPayout as keyof typeof STABLECOIN_SYMBOLS]
    : tokenSymbol

  const getStatusBadge = () => {
    switch (transaction.status) {
      case 'claimed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Claimed</Badge>
      case 'scheduled':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Scheduled</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer group"
         onClick={() => router.push(`/transaction/${transaction.transactionHash}`)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {transaction.type === 'received' ? (
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <ArrowDownCircle className="w-5 h-5 text-green-400" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <ArrowUpCircle className="w-5 h-5 text-blue-400" />
            </div>
          )}
          <div>
            <p className="text-white font-medium">
              {transaction.type === 'received' ? 'Received Payment' : 'Sent Payment'}
            </p>
            <p className="text-white/40 text-sm">
              {transaction.timestamp ? formatDateTime(parseInt(transaction.timestamp)) : 'Pending'}
            </p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
        <div>
          <p className="text-white/60">Amount</p>
          <p className="text-white font-medium">
            {formatTokenAmount(BigInt(transaction.amount))} {tokenSymbol}
          </p>
        </div>
        {transaction.preferredPayout && tokenSymbol !== payoutSymbol && (
          <div>
            <p className="text-white/60">Payout Currency</p>
            <p className="text-white font-medium">{payoutSymbol}</p>
          </div>
        )}
        {transaction.releaseAt && (
          <div>
            <p className="text-white/60">Release Date</p>
            <p className="text-white font-medium">
              {formatDateTime(parseInt(transaction.releaseAt))}
            </p>
          </div>
        )}
        {transaction.workVerified !== undefined && (
          <div>
            <p className="text-white/60">Work Verification</p>
            <p className="text-white font-medium flex items-center gap-1">
              {transaction.workVerified ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  Verified
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 text-yellow-400" />
                  Pending
                </>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <p className="text-white/40 text-xs font-mono">
          {formatAddress(transaction.transactionHash)}
        </p>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/transaction/${transaction.transactionHash}`)
            }}
            className="text-indigo-400 hover:text-indigo-300 hover:bg-white/5 text-xs h-7 px-2"
          >
            <Eye className="w-3 h-3 mr-1" />
            Details
          </Button>
          <a
            href={`https://testnet.arcscan.app/tx/${transaction.transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-indigo-400 hover:text-indigo-300 text-xs flex items-center gap-1 px-2 py-1 rounded hover:bg-white/5"
          >
            Explorer
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}

