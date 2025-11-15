'use client'

import { useAccount } from 'wagmi'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { EmployerDashboard } from '@/components/dashboard/employer-dashboard'
import { EmployeeDashboard } from '@/components/dashboard/employee-dashboard'
import { useEmployer } from '@/lib/contracts/hooks/usePayrollEscrow'

export default function PaymentsPage() {
  const { address, isConnected } = useAccount()
  const { data: employer } = useEmployer()

  const isEmployer = address && employer && address.toLowerCase() === employer.toLowerCase()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Payments</h1>
            <p className="text-white/60 mt-1">
              {isEmployer ? 'Manage all your payroll payments' : 'View all your payment history'}
            </p>
          </div>
        </div>

        {!isConnected ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h2>
            <p className="text-white/60">Please connect your wallet to access your payments.</p>
          </div>
        ) : (
          <>
            {isEmployer ? (
              <EmployerDashboard />
            ) : (
              <EmployeeDashboard />
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}