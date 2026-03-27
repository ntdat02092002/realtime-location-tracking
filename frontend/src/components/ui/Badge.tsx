/**
 * ui/Badge.tsx — Status badge with severity variants
 */
import type { ReactNode } from 'react'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  dot?: boolean
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  warning: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200',
  danger:  'bg-red-50 text-red-700 ring-1 ring-red-200',
  info:    'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  neutral: 'bg-surface-100 text-surface-600 ring-1 ring-surface-200',
  brand:   'bg-brand-50 text-brand-600 ring-1 ring-brand-200',
}

export function Badge({ children, variant = 'neutral', dot = false, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${variantClasses[variant]} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
          variant === 'success' ? 'bg-emerald-500'
          : variant === 'warning' ? 'bg-yellow-500'
          : variant === 'danger' ? 'bg-red-500'
          : variant === 'info' ? 'bg-blue-500'
          : variant === 'brand' ? 'bg-brand-500'
          : 'bg-surface-400'
        }`} />
      )}
      {children}
    </span>
  )
}
