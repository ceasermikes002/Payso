'use client'

import { Toaster } from 'sonner'

export function useToast() {
  const toast = (props: {
    title: string
    description?: string
    variant?: 'default' | 'destructive'
  }) => {
    if (props.variant === 'destructive') {
      // @ts-ignore - sonner types
      import('sonner').then(({ toast: sonnerToast }) => {
        sonnerToast.error(props.title, {
          description: props.description,
        })
      })
    } else {
      // @ts-ignore - sonner types
      import('sonner').then(({ toast: sonnerToast }) => {
        sonnerToast.success(props.title, {
          description: props.description,
        })
      })
    }
  }

  return { toast }
}

export { Toaster }