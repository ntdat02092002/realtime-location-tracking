/**
 * ui/MetricCard.tsx — KPI metric display card
 */
import type { ReactNode } from 'react'

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  icon?: ReactNode
  trend?: { value: number; label?: string }
  color?: 'brand' | 'blue' | 'green' | 'red' | 'yellow' | 'purple'
  className?: string
}

const colorMap = {
  brand:  'text-brand-500',
  blue:   'text-blue-500',
  green:  'text-emerald-500',
  red:    'text-red-500',
  yellow: 'text-yellow-500',
  purple: 'text-purple-500',
}

export function MetricCard({ label, value, unit, icon, trend, color = 'brand', className = '' }: MetricCardProps) {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-card border border-surface-100 flex flex-col gap-1 ${className}`}>
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-surface-500 uppercase tracking-wider">{label}</p>
        {icon && <span className={`${colorMap[color]} mt-0.5`}>{icon}</span>}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold tracking-tight text-surface-900">{value}</span>
        {unit && <span className="text-sm text-surface-500 font-medium">{unit}</span>}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trend.value >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {trend.value >= 0 ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}
          </svg>
          <span>{Math.abs(trend.value)}%</span>
          {trend.label && <span className="text-surface-400 font-normal">{trend.label}</span>}
        </div>
      )}
    </div>
  )
}
