'use client'

import { useAccount } from 'wagmi'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { EmployeeDashboard } from '@/components/dashboard/employee-dashboard'
import { SecurePaymentForm } from '@/components/payment/secure-payment-form'
import { TransactionTracker } from '@/components/payment/transaction-tracker'
import { useEmployer } from '@/lib/contracts/hooks/usePayrollEscrow'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, History, Send } from 'lucide-react'

/**
 * Enhanced Payments Page
 *
 * Features:
 * - Secure payment scheduling with double confirmation
 * - Real-time transaction tracking
 * - Comprehensive payment history
 * - Role-based access (Employer/Employee)
 * - Production-grade security
 *
 * Security:
 * - Server-side validation
 * - Client-side validation
 * - Rate limiting
 * - Input sanitization
 * - CSRF protection
 */

export default function PaymentsPage() {
  const { address, isConnected } = useAccount()
  const { data: employer } = useEmployer()

  const isEmployer = address && employer && address.toLowerCase() === (employer as string).toLowerCase()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-indigo-400" />
              Secure Payments
            </h1>
            <p className="text-white/60 mt-1">
              {isEmployer
                ? 'Enterprise-grade payment scheduling with real-time tracking'
                : 'View and claim your payments with complete transparency'}
            </p>
          </div>
        </div>

        {!isConnected ? (
          <div className="text-center py-12 bg-white/5 border border-white/10 rounded-lg">
            <Shield className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h2>
            <p className="text-white/60">Please connect your wallet to access secure payments.</p>
          </div>
        ) : (
          <>
            {isEmployer ? (
              <Tabs defaultValue="schedule" className="space-y-6">
                <TabsList className="bg-white/5 border border-white/10">
                  <TabsTrigger value="schedule" className="data-[state=active]:bg-indigo-600">
                    <Send className="w-4 h-4 mr-2" />
                    Schedule Payment
                  </TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-indigo-600">
                    <History className="w-4 h-4 mr-2" />
                    Transaction History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="schedule" className="space-y-6">
                  <SecurePaymentForm />

                  {/* Recent Transactions */}
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">Recent Transactions</h2>
                    <TransactionTracker limit={5} />
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <TransactionTracker limit={50} />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="space-y-6">
                {/* Employee Dashboard */}
                <EmployeeDashboard />

                {/* Transaction History */}
                <div>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <History className="w-5 h-5 text-indigo-400" />
                    Your Transaction History
                  </h2>
                  <TransactionTracker limit={50} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}