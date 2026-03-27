import { useQuery } from '@tanstack/react-query'
import { MetricCard } from '../../components/ui/MetricCard'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

function getDensityColor(count: number, max: number): { bg: string; text: string; label: string } {
  if (max === 0) return { bg: 'bg-surface-100', text: 'text-surface-500', label: 'None' }
  const ratio = count / max
  if (ratio >= 0.75) return { bg: 'bg-red-100',    text: 'text-red-700',    label: 'High' }
  if (ratio >= 0.5)  return { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Medium' }
  if (ratio >= 0.25) return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Low' }
  return             { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Minimal' }
}

export function ServiceHeatmap() {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const { data: cells = [], isLoading } = useQuery<{ geohash: string; delivery_count: number }[]>({
    queryKey: ['admin', 'heatmap'],
    queryFn: () =>
      fetch(`${API_BASE}/api/admin/heatmap?since=${since}`)
        .then(r => r.json())
        .catch(() => []),
  })

  const totalDeliveries = cells.reduce((s: number, c: { delivery_count: number }) => s + c.delivery_count, 0)
  const maxCount = Math.max(...cells.map((c: { delivery_count: number }) => c.delivery_count), 1)
  const activeZones = cells.filter(c => c.delivery_count > 0).length

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-surface-900">Service Heatmap</h2>
        <p className="text-sm text-surface-500 mt-0.5">Delivery density by zone — last 7 days</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <MetricCard label="Total Deliveries" value={totalDeliveries} color="brand"/>
        <MetricCard label="Active Zones" value={activeZones} color="blue"/>
        <MetricCard label="Peak Zone" value={maxCount} unit="deliveries" color="red"/>
      </div>

      {/* Heatmap table */}
      <div className="card overflow-hidden">
        {/* Table header */}
        <div className="px-5 py-3 bg-surface-50 border-b border-surface-100 grid grid-cols-12 gap-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">
          <div className="col-span-4">Zone (Geohash)</div>
          <div className="col-span-3">Deliveries</div>
          <div className="col-span-5">Density</div>
        </div>

        {isLoading ? (
          <div className="p-5 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 items-center animate-pulse">
                <div className="col-span-4 h-4 bg-surface-100 rounded w-3/4"/>
                <div className="col-span-3 h-4 bg-surface-50 rounded w-1/2"/>
                <div className="col-span-5 h-4 bg-surface-50 rounded"/>
              </div>
            ))}
          </div>
        ) : cells.length === 0 ? (
          <div className="card-body text-center py-12">
            <p className="text-sm text-surface-500">No heatmap data available</p>
          </div>
        ) : (
          <div className="divide-y divide-surface-100">
            {cells.map((cell: { geohash: string; delivery_count: number }) => {
              const cfg = getDensityColor(cell.delivery_count, maxCount)
              const pct = maxCount > 0 ? (cell.delivery_count / maxCount) * 100 : 0
              return (
                <div key={cell.geohash} className="px-5 py-3.5 grid grid-cols-12 gap-4 items-center hover:bg-surface-50 transition-colors">
                  {/* Zone */}
                  <div className="col-span-4">
                    <code className="text-xs font-mono font-medium text-surface-700 bg-surface-100 px-2 py-1 rounded">
                      {cell.geohash}
                    </code>
                  </div>

                  {/* Count */}
                  <div className="col-span-3 flex items-center gap-2">
                    <span className="text-sm font-bold text-surface-800">{cell.delivery_count}</span>
                    <span className={`text-2xs font-semibold px-1.5 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                      {cfg.label}
                    </span>
                  </div>

                  {/* Bar */}
                  <div className="col-span-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-surface-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            pct >= 75 ? 'bg-red-500'
                            : pct >= 50 ? 'bg-orange-400'
                            : pct >= 25 ? 'bg-yellow-400'
                            : 'bg-emerald-400'
                          }`}
                          style={{ width: `${Math.max(pct, 4)}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-surface-500 w-10 text-right">
                        {pct.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-surface-500">
        <span className="font-medium">Density:</span>
        {[
          { color: 'bg-emerald-400', label: 'Minimal (<25%)' },
          { color: 'bg-yellow-400',   label: 'Low (25–50%)' },
          { color: 'bg-orange-400',   label: 'Medium (50–75%)' },
          { color: 'bg-red-500',      label: 'High (>75%)' },
        ].map(item => (
          <span key={item.label} className="flex items-center gap-1.5">
            <span className={`w-3 h-2 rounded-full ${item.color}`}/>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}
