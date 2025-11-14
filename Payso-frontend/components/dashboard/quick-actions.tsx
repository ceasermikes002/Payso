/**
 * @fileoverview Quick actions component for common dashboard tasks
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Send, FileCheck, Settings } from 'lucide-react'

export function QuickActions() {
  const actions = [
    {
      icon: Plus,
      label: 'Schedule Payment',
      description: 'Create a new escrow payment',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
    },
    {
      icon: Send,
      label: 'Batch Transfer',
      description: 'Send multiple payments at once',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: FileCheck,
      label: 'Verify Work',
      description: 'Approve completed work',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Settings,
      label: 'Configure',
      description: 'Update contract settings',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ]

  return (
    <Card className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.label}
                variant="ghost"
                className="h-auto flex-col items-start p-4 hover:bg-white/5 text-left"
              >
                <div className={`p-2 rounded-lg ${action.bgColor} mb-2`}>
                  <Icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <span className="text-white font-medium text-sm">{action.label}</span>
                <span className="text-white/40 text-xs mt-1">{action.description}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

