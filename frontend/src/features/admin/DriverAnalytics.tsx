import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { MetricCard } from '../../components/ui/MetricCard'
import { Badge } from '../../components/ui/Badge'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

interface WeekData {
  week_start_date: string
  total_trips: number
  total_distance: number
  average_speed: number
  speeding_violations: number
}

export function DriverAnalytics() {
  const [selectedDriver, setSelectedDriver] = useState('D001')

  const { data: analytics = [], isLoading } = useQuery<WeekData[]>({
    queryKey: ['drivers', selectedDriver, 'analytics'],
    queryFn: () =>
      fetch(`${API_BASE}/api/drivers/${selectedDriver}/analytics`)
        .then(r => r.json())
        .catch(() => []),
  })

  // Totals
  const totalTrips = analytics.reduce((s: number, w: WeekData) => s + w.total_trips, 0)
  const totalDistance = analytics.reduce((s: number, w: WeekData) => s + w.total_distance, 0)
  const totalViolations = analytics.reduce((s: number, w: WeekData) => s + w.speeding_violations, 0)
  const avgSpeed = analytics.length
    ? analytics.reduce((s: number, w: WeekData) => s + w.average_speed, 0) / analytics.length
    : 0

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-surface-900">Driver Analytics</h2>
          <p className="text-sm text-surface-500 mt-0.5">Weekly performance overview</p>
        </div>

        {/* Driver selector */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-surface-600">Driver</label>
          <select
            value={selectedDriver}
            onChange={e => setSelectedDriver(e.target.value)}
            className="border border-surface-200 rounded-lg px-3 py-2 text-sm font-medium text-surface-700 bg-white hover:border-surface-300 focus:outline-none focus:ring-2 focus:ring-admin-500 focus:border-transparent transition-colors"
          >
            <option value="D001">D001 — Alex Kim</option>
            <option value="D002">D002 — Jordan Lee</option>
            <option value="D003">D003 — Sam Patel</option>
          </select>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          label="Total Trips"
          value={totalTrips}
          icon={
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13"/>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          }
          color="blue"
        />
        <MetricCard
          label="Total Distance"
          value={totalDistance.toFixed(0)}
          unit="km"
          icon={
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          }
          color="brand"
        />
        <MetricCard
          label="Avg Speed"
          value={avgSpeed.toFixed(1)}
          unit="km/h"
          icon={
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 0 20"/>
              <path d="M12 12l4-8"/>
            </svg>
          }
          color="purple"
        />
        <MetricCard
          label="Speeding Violations"
          value={totalViolations}
          icon={
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          }
          color="red"
        />
      </div>

      {/* Weekly breakdown */}
      <div>
        <h3 className="section-title">Weekly Breakdown</h3>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="card p-5 animate-pulse">
                <div className="h-4 bg-surface-100 rounded w-1/3 mb-4"/>
                <div className="space-y-2">
                  <div className="h-3 bg-surface-50 rounded w-3/4"/>
                  <div className="h-3 bg-surface-50 rounded w-1/2"/>
                  <div className="h-3 bg-surface-50 rounded w-2/3"/>
                </div>
              </div>
            ))}
          </div>
        ) : analytics.length === 0 ? (
          <div className="card-body text-center py-12">
            <p className="text-sm text-surface-500">No analytics data available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analytics.map((week: WeekData) => (
              <div key={week.week_start_date} className="card overflow-hidden group hover:shadow-card-hover transition-shadow duration-200">
                {/* Card header */}
                <div className="px-5 pt-5 pb-3 border-b border-surface-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider">Week</p>
                    <p className="text-sm font-bold text-surface-800">{week.week_start_date}</p>
                  </div>
                  <Badge variant={week.speeding_violations > 3 ? 'danger' : week.speeding_violations > 0 ? 'warning' : 'success'}>
                    {week.speeding_violations} violations
                  </Badge>
                </div>

                {/* Metrics */}
                <div className="p-5 grid grid-cols-2 gap-4">
                  {[
                    { label: 'Trips',   value: week.total_trips,         unit: '',     color: 'text-blue-500' },
                    { label: 'Distance',value: week.total_distance.toFixed(1), unit: 'km', color: 'text-brand-500' },
                    { label: 'Avg Speed', value: week.average_speed.toFixed(1), unit: 'km/h', color: 'text-purple-500' },
                    { label: 'Violations', value: week.speeding_violations, unit: '', color: 'text-red-500' },
                  ].map(stat => (
                    <div key={stat.label}>
                      <p className="text-2xs font-semibold text-surface-400 uppercase tracking-wider">{stat.label}</p>
                      <p className={`text-lg font-bold mt-0.5 ${stat.color}`}>
                        {stat.value}
                        <span className="text-xs font-medium text-surface-400 ml-0.5">{stat.unit}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
