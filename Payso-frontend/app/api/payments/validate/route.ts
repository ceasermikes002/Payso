import { NextRequest, NextResponse } from 'next/server'
import { isAddress } from 'viem'

/**
 * Payment Validation API Route
 * 
 * Provides server-side validation for payment data before blockchain submission.
 * Implements security checks including:
 * - Address validation
 * - Amount validation
 * - Timestamp validation
 * - Rate limiting (basic implementation)
 * 
 * @route POST /api/payments/validate
 */

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

/**
 * Rate limiting middleware
 * Limits requests to 10 per minute per IP
 */
function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(identifier)

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + 60000, // 1 minute
    })
    return true
  }

  if (limit.count >= 10) {
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = request.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(identifier)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rate limit exceeded. Please try again later.' 
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { recipient, amount, releaseTimestamp, stablecoin, preferredPayout } = body

    // Validation errors array
    const errors: string[] = []

    // Validate recipient address
    if (!recipient || !isAddress(recipient)) {
      errors.push('Invalid recipient address')
    }

    // Validate amount
    const amountNum = parseFloat(amount)
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      errors.push('Amount must be greater than 0')
    }

    if (amountNum > 1000000) {
      errors.push('Amount exceeds maximum limit of 1,000,000')
    }

    // Validate release timestamp
    const currentTimestamp = Math.floor(Date.now() / 1000)
    if (!releaseTimestamp || releaseTimestamp <= currentTimestamp) {
      errors.push('Release time must be in the future')
    }

    // Validate release time is not too far in the future (max 5 years)
    const fiveYearsFromNow = currentTimestamp + (5 * 365 * 24 * 60 * 60)
    if (releaseTimestamp > fiveYearsFromNow) {
      errors.push('Release time cannot be more than 5 years in the future')
    }

    // Validate stablecoin address
    if (!stablecoin || !isAddress(stablecoin)) {
      errors.push('Invalid stablecoin address')
    }

    // Validate preferred payout address
    if (!preferredPayout || !isAddress(preferredPayout)) {
      errors.push('Invalid preferred payout address')
    }

    // Check for suspicious patterns
    if (recipient && recipient.toLowerCase() === '0x0000000000000000000000000000000000000000') {
      errors.push('Cannot send to zero address')
    }

    // Return validation result
    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
        },
        { status: 400 }
      )
    }

    // Calculate estimated gas (mock - in production, estimate from blockchain)
    const estimatedGas = '0.001'

    return NextResponse.json({
      success: true,
      data: {
        validated: true,
        estimatedGas,
        warnings: [],
      },
    })
  } catch (error) {
    console.error('Payment validation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error during validation',
      },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint for health check
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'payment-validation',
    timestamp: new Date().toISOString(),
  })
}

