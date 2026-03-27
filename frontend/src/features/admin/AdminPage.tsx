import { useState, useCallback } from 'react'
import { useAdminStore } from './adminStore'
import { TripPlayback } from './TripPlayback'
import { DriverAnalytics } from './DriverAnalytics'
import { ServiceHeatmap } from './ServiceHeatmap'
import { AlertFeed } from './AlertFeed'
import { useWebSocket } from '../../shared/hooks/useWebSocket'
import type { WebSocketMessage } from '../../shared/types'

type TabId = 'alerts' | 'playback' | 'analytics' | 'heatmap'

const TABS: { id: TabId; label: string }[] = [
  { id: 'alerts',    label: 'Live Alerts' },
  { id: 'playback',  label: 'Trip Playback' },
  { id: 'analytics', label: 'Driver Analytics' },
  { id: 'heatmap',   label: 'Service Heatmap' },
]

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws/tracking'

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabId>('alerts')
  const { addAlert } = useAdminStore()

  const handleMessage = useCallback((data: WebSocketMessage) => {
    if (data.type === 'alert') {
      addAlert(data.payload as unknown as Parameters<typeof addAlert>[0])
    }
  }, [addAlert])

  useWebSocket({
    url: WS_URL,
    onMessage: handleMessage,
    onOpen: (ws: WebSocket) => {
      ws.send(JSON.stringify({ action: 'subscribe_alerts' }))
    },
  })

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <div className="bg-admin-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-bold">Fleet Manager Dashboard</h1>
          <p className="text-admin-200 text-sm mt-0.5">Deshipping — Real-time fleet overview</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-surface-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2
                transition-colors duration-150
                ${activeTab === tab.id
                  ? 'border-admin-500 text-admin-600'
                  : 'border-transparent text-surface-500 hover:text-surface-800 hover:border-surface-300'
                }
              `}
            >
              {tab.id === 'alerts'    && <span className="w-2 h-2 rounded-full bg-red-500"/>}
              {tab.id === 'playback'   && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              )}
              {tab.id === 'analytics' && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              )}
              {tab.id === 'heatmap' && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'alerts'    && <AlertFeed />}
        {activeTab === 'playback'  && <TripPlayback />}
        {activeTab === 'analytics' && <DriverAnalytics />}
        {activeTab === 'heatmap'   && <ServiceHeatmap />}
      </div>
    </div>
  )
}
