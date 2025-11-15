import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http, parseAbiItem } from 'viem'
import { arcTestnet } from '@/lib/contracts/config'

/**
 * Transaction History API Route
 * 
 * Fetches transaction history from blockchain events.
 * Provides real-time transaction data for the dashboard.
 * 
 * @route GET /api/transactions?address=0x...&type=sent|received|all
 */

const publicClient = createPublicClient({
  chain: arcTestnet,
  transport: http(),
})

const PAYROLL_ESCROW_ADDRESS = '0xE0390bB3c6fF668fC48767d4f0D334897770CB51'

/**
 * Generate dummy transaction data for testing
 * Used when blockchain is unavailable or no real transactions exist
 */
function getDummyTransactions(address: string, type: string, limit: number) {
  const now = Math.floor(Date.now() / 1000)
  const dummyData = [
    {
      id: '1',
      type: 'received',
      status: 'scheduled',
      amount: '5000000000', // 5000 USDC (6 decimals)
      token: '0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e', // USDC
      preferredPayout: '0xd2A490ac2e2eDAEb41a0DB39De526342B1a93Ac5', // EURC
      releaseAt: (now + 86400 * 7).toString(), // 7 days from now
      requiresWorkEvent: true,
      workVerified: false,
      blockNumber: '1000000',
      transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      timestamp: (now - 86400).toString(), // 1 day ago
    },
    {
      id: '2',
      type: 'received',
      status: 'claimable',
      amount: '3000000000', // 3000 USDC
      token: '0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e',
      preferredPayout: '0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e',
      releaseAt: (now - 86400).toString(), // 1 day ago (ready to claim)
      requiresWorkEvent: false,
      workVerified: false,
      blockNumber: '999000',
      transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      timestamp: (now - 86400 * 8).toString(), // 8 days ago
    },
    {
      id: '3',
      type: 'received',
      status: 'claimed',
      amount: '2500000000', // 2500 USDC
      token: '0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e',
      preferredPayout: '0xd2A490ac2e2eDAEb41a0DB39De526342B1a93Ac5',
      releaseAt: (now - 86400 * 15).toString(),
      requiresWorkEvent: true,
      workVerified: true,
      blockNumber: '998000',
      transactionHash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
      claimedAt: '998500',
      claimTransactionHash: '0x1111111111111111111111111111111111111111111111111111111111111111',
      timestamp: (now - 86400 * 20).toString(), // 20 days ago
    },
    {
      id: '4',
      type: 'received',
      status: 'scheduled',
      amount: '10000000000', // 10000 USDC
      token: '0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e',
      preferredPayout: '0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e',
      releaseAt: (now + 86400 * 30).toString(), // 30 days from now
      requiresWorkEvent: false,
      workVerified: false,
      blockNumber: '1001000',
      transactionHash: '0x2222222222222222222222222222222222222222222222222222222222222222',
      timestamp: (now - 3600).toString(), // 1 hour ago
    },
    {
      id: '5',
      type: 'received',
      status: 'scheduled',
      amount: '7500000000', // 7500 USDC
      token: '0xd2A490ac2e2eDAEb41a0DB39De526342B1a93Ac5', // EURC
      preferredPayout: '0xd2A490ac2e2eDAEb41a0DB39De526342B1a93Ac5',
      releaseAt: (now + 86400 * 14).toString(), // 14 days from now
      requiresWorkEvent: true,
      workVerified: false,
      blockNumber: '1000500',
      transactionHash: '0x3333333333333333333333333333333333333333333333333333333333333333',
      timestamp: (now - 86400 * 3).toString(), // 3 days ago
    },
  ]

  // Filter by type
  let filtered = dummyData
  if (type === 'sent') {
    filtered = [] // No sent transactions in dummy data
  }

  return filtered.slice(0, limit)
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const address = searchParams.get('address')
    const type = searchParams.get('type') || 'all'
    const limit = parseInt(searchParams.get('limit') || '50')
    const useDummy = searchParams.get('dummy') === 'true'

    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Address parameter required' },
        { status: 400 }
      )
    }

    // If dummy data requested or blockchain unavailable, return dummy data
    if (useDummy) {
      const dummyTransactions = getDummyTransactions(address, type, limit)
      return NextResponse.json({
        success: true,
        data: {
          transactions: dummyTransactions,
          total: dummyTransactions.length,
          address,
          type,
          isDummy: true,
        },
      })
    }

    // Try to fetch real blockchain data
    let scheduledEvents, claimedEvents, workVerifiedEvents

    try {
      // Get current block number
      const currentBlock = await publicClient.getBlockNumber()

      // Arc Testnet limits eth_getLogs to 10,000 block range
      // Query last 9,000 blocks to be safe
      const blockLimit = BigInt(9000)
      const fromBlock = currentBlock > blockLimit ? currentBlock - blockLimit : BigInt(0)

      // Fetch PaymentScheduled events
      scheduledEvents = await publicClient.getLogs({
        address: PAYROLL_ESCROW_ADDRESS as `0x${string}`,
        event: parseAbiItem('event PaymentScheduled(uint256 indexed id, address indexed recipient, uint256 amount, uint256 releaseAt, address stablecoin, address preferredPayout, bool requiresWorkEvent)'),
        fromBlock,
        toBlock: 'latest',
      })

      // Fetch PaymentClaimed events
      claimedEvents = await publicClient.getLogs({
        address: PAYROLL_ESCROW_ADDRESS as `0x${string}`,
        event: parseAbiItem('event PaymentClaimed(uint256 indexed id, address indexed recipient, uint256 amount, address payoutToken)'),
        fromBlock,
        toBlock: 'latest',
      })

      // Fetch WorkVerified events
      workVerifiedEvents = await publicClient.getLogs({
        address: PAYROLL_ESCROW_ADDRESS as `0x${string}`,
        event: parseAbiItem('event WorkVerified(uint256 indexed id, address indexed verifier)'),
        fromBlock,
        toBlock: 'latest',
      })
    } catch (blockchainError) {
      console.error('Blockchain fetch error, using dummy data:', blockchainError)
      // Fallback to dummy data if blockchain is unavailable
      const dummyTransactions = getDummyTransactions(address, type, limit)
      return NextResponse.json({
        success: true,
        data: {
          transactions: dummyTransactions,
          total: dummyTransactions.length,
          address,
          type,
          isDummy: true,
          error: 'Blockchain unavailable, showing sample data',
        },
      })
    }

    // Process and combine events
    const transactions: any[] = []

    // Process scheduled payments
    for (const event of scheduledEvents) {
      const args = event.args as any
      if (type === 'all' || type === 'received') {
        if (args.recipient?.toLowerCase() === address.toLowerCase()) {
          transactions.push({
            id: args.id?.toString(),
            type: 'received',
            status: 'scheduled',
            amount: args.amount?.toString(),
            token: args.stablecoin,
            preferredPayout: args.preferredPayout,
            releaseAt: args.releaseAt?.toString(),
            requiresWorkEvent: args.requiresWorkEvent,
            blockNumber: event.blockNumber?.toString(),
            transactionHash: event.transactionHash,
            timestamp: null, // Will be filled by block data
          })
        }
      }
    }

    // Process claimed payments
    for (const event of claimedEvents) {
      const args = event.args as any
      if (type === 'all' || type === 'received') {
        if (args.recipient?.toLowerCase() === address.toLowerCase()) {
          const existingTx = transactions.find(tx => tx.id === args.id?.toString())
          if (existingTx) {
            existingTx.status = 'claimed'
            existingTx.claimedAt = event.blockNumber?.toString()
            existingTx.claimTransactionHash = event.transactionHash
          }
        }
      }
    }

    // Add work verification status
    for (const event of workVerifiedEvents) {
      const args = event.args as any
      const existingTx = transactions.find(tx => tx.id === args.id?.toString())
      if (existingTx) {
        existingTx.workVerified = true
        existingTx.verifiedAt = event.blockNumber?.toString()
      }
    }

    // Sort by block number (most recent first)
    transactions.sort((a, b) => {
      const blockA = parseInt(a.blockNumber || '0')
      const blockB = parseInt(b.blockNumber || '0')
      return blockB - blockA
    })

    // If no real transactions found, return dummy data
    if (transactions.length === 0) {
      console.log('No real transactions found, returning dummy data')
      const dummyTransactions = getDummyTransactions(address, type, limit)
      return NextResponse.json({
        success: true,
        data: {
          transactions: dummyTransactions,
          total: dummyTransactions.length,
          address,
          type,
          isDummy: true,
          message: 'No blockchain transactions found. Showing sample data.',
        },
      })
    }

    // Limit results
    const limitedTransactions = transactions.slice(0, limit)

    // Fetch block timestamps for recent transactions
    const transactionsWithTimestamps = await Promise.all(
      limitedTransactions.map(async (tx) => {
        try {
          const block = await publicClient.getBlock({
            blockNumber: BigInt(tx.blockNumber),
          })
          return {
            ...tx,
            timestamp: block.timestamp.toString(),
          }
        } catch (error) {
          return tx
        }
      })
    )

    return NextResponse.json({
      success: true,
      data: {
        transactions: transactionsWithTimestamps,
        total: transactions.length,
        address,
        type,
        isDummy: false,
      },
    })
  } catch (error) {
    console.error('Transaction fetch error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch transactions',
      },
      { status: 500 }
    )
  }
}

