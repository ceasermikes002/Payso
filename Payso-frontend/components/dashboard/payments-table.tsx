/**
 * @fileoverview Payments table component for dashboard
 */

import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PaymentStatus, type PaymentWithStatus } from '@/lib/types'
import { truncateAddress } from '@/lib/format'
import { ArrowRightLeft, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

interface PaymentsTableProps {
  payments: PaymentWithStatus[]
}

/** Get badge variant based on payment status */
function getStatusBadge(status: PaymentStatus) {
  const config = {
    [PaymentStatus.CLAIMED]: { variant: 'success' as const, label: 'Claimed', icon: CheckCircle2 },
    [PaymentStatus.CLAIMABLE]: { variant: 'success' as const, label: 'Claimable', icon: CheckCircle2 },
    [PaymentStatus.PENDING]: { variant: 'warning' as const, label: 'Pending', icon: Clock },
    [PaymentStatus.WORK_PENDING]: { variant: 'outline' as const, label: 'Work Pending', icon: AlertCircle },
  }
  
  const { variant, label, icon: Icon } = config[status]
  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  )
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  return (
    <Card className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Recent Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Release Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-white/60 py-8">
                  No payments found
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium text-white">#{payment.id}</TableCell>
                  <TableCell className="font-mono text-sm text-white/80">
                    {truncateAddress(payment.recipient)}
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    {payment.formattedAmount}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-white/80">
                      <span>{payment.stablecoinSymbol}</span>
                      {payment.stablecoinSymbol !== payment.payoutSymbol && (
                        <>
                          <ArrowRightLeft className="h-3 w-3 text-white/40" />
                          <span>{payment.payoutSymbol}</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-white/80">
                    <div className="flex flex-col">
                      <span>{payment.formattedReleaseDate}</span>
                      {payment.daysUntilRelease > 0 && (
                        <span className="text-xs text-white/40">
                          in {payment.daysUntilRelease}d
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

