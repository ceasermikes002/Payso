'use client'

import { useAccount } from 'wagmi'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Settings, User, Bell, Shield, Wallet } from 'lucide-react'
import { useEmployer } from '@/lib/contracts/hooks/usePayrollEscrow'
import { formatAddress } from '@/lib/utils'

export default function SettingsPage() {
  const { address, isConnected, connector } = useAccount()
  const { data: employer } = useEmployer()

  const isEmployer = address && employer && address.toLowerCase() === employer.toLowerCase()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-white/60 mt-1">
              Manage your account preferences and wallet settings
            </p>
          </div>
        </div>

        {!isConnected ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h2>
            <p className="text-white/60">Please connect your wallet to access settings.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {/* Wallet Settings */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-indigo-400" />
                  <CardTitle className="text-white">Wallet Settings</CardTitle>
                </div>
                <CardDescription className="text-white/60">
                  Your connected wallet information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Connected Address</span>
                  <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-400">
                    {formatAddress(address)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Wallet Provider</span>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-400">
                    {connector?.name || 'Unknown'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Role</span>
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-400">
                    {isEmployer ? 'Employer' : 'Employee'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-indigo-400" />
                  <CardTitle className="text-white">Account Settings</CardTitle>
                </div>
                <CardDescription className="text-white/60">
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Email Notifications</span>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Transaction Alerts</span>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-400" />
                  <CardTitle className="text-white">Security Settings</CardTitle>
                </div>
                <CardDescription className="text-white/60">
                  Protect your account and transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Two-Factor Authentication</span>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    Enable
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Session Timeout</span>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    30 minutes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-indigo-400" />
                  <CardTitle className="text-white">Advanced Settings</CardTitle>
                </div>
                <CardDescription className="text-white/60">
                  Advanced configuration options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Default Currency</span>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    USDC
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Gas Price Preference</span>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    Standard
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Auto-Claim Payments</span>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    Disabled
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}