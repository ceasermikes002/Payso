/**
 * @fileoverview Dashboard statistics cards component
 */

import { Card, CardContent } from '@/components/ui/card'
import { DollarSign, Clock, CheckCircle2, TrendingUp } from 'lucide-react'
import type { DashboardStats } from '@/lib/types'

interface StatsCardsProps {
  stats: DashboardStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Value Locked',
      value: `$${stats.totalValue}`,
      icon: DollarSign,
      gradient: 'from-indigo-500/20 to-purple-500/20',
      iconColor: 'text-indigo-400',
    },
    {
      title: 'Total Payments',
      value: stats.totalPayments.toString(),
      icon: TrendingUp,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments.toString(),
      icon: Clock,
      gradient: 'from-yellow-500/20 to-orange-500/20',
      iconColor: 'text-yellow-400',
    },
    {
      title: 'Claimed Payments',
      value: stats.claimedPayments.toString(),
      icon: CheckCircle2,
      gradient: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-400',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div key={card.title} className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300`} />
            <Card className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-white/60">{card.title}</p>
                    <p className="text-2xl font-bold text-white">{card.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-white/5 ${card.iconColor}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

