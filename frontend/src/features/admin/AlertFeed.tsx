import { useAdminStore } from './adminStore'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'

const SEVERITY_CONFIG = {
  HIGH:   { card: 'bg-red-50 border-l-4 border-red-500',  badge: 'danger' as const,  label: 'High',   color: 'text-red-600 bg-red-100' },
  MEDIUM: { card: 'bg-yellow-50 border-l-4 border-yellow-500', badge: 'warning' as const, label: 'Medium', color: 'text-yellow-700 bg-yellow-100' },
  LOW:    { card: 'bg-blue-50 border-l-4 border-blue-500',    badge: 'info' as const,   label: 'Low',    color: 'text-blue-700 bg-blue-100' },
}

export function AlertFeed() {
  const { activeAlerts, dismissAlert, clearAll } = useAdminStore()

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-surface-900">Live Alerts</h2>
          <p className="text-sm text-surface-500 mt-0.5">
            {activeAlerts.length > 0
              ? `${activeAlerts.length} active alert${activeAlerts.length > 1 ? 's' : ''}`
              : 'All systems operational'}
          </p>
        </div>
        {activeAlerts.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
            Clear all
          </Button>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {(['HIGH', 'MEDIUM', 'LOW'] as const).map(sev => {
          const count = activeAlerts.filter(a => a.severity === sev).length
          const cfg = SEVERITY_CONFIG[sev]
          return (
            <div key={sev} className="card-body text-center">
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg mb-1.5 ${cfg.color.split(' ')[1].replace('bg-', 'bg-').replace('-100', '-50')}`}>
                <span className={`text-sm font-bold ${cfg.color.split(' ')[0]}`}>{count}</span>
              </div>
              <p className="text-xs font-medium text-surface-500">{cfg.label}</p>
            </div>
          )
        })}
      </div>

      {/* Alert list */}
      {activeAlerts.length === 0 ? (
        <div className="card-body text-center py-16">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h3 className="text-base font-semibold text-surface-700 mb-1">All Clear</h3>
          <p className="text-sm text-surface-400">No active alerts at the moment</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activeAlerts.map(alert => {
            const cfg = SEVERITY_CONFIG[alert.severity] ?? SEVERITY_CONFIG.LOW
            return (
              <div key={alert.alert_id} className={`${cfg.card} rounded-xl p-4 transition-all duration-200 hover:shadow-card`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {/* Severity icon */}
                    <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold capitalize text-surface-800">
                          {alert.alert_type?.replace('_', ' ')}
                        </span>
                        <Badge variant={cfg.badge} className="capitalize">{cfg.label}</Badge>
                      </div>
                      <p className="text-sm text-surface-600">{alert.message}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-xs font-mono text-surface-400">{alert.driver_id}</span>
                    <button
                      onClick={() => dismissAlert(alert.alert_id)}
                      className="text-xs text-surface-400 hover:text-surface-700 transition-colors px-2 py-1 rounded hover:bg-white/50"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
