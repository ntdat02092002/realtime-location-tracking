import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { TrackingPage } from './features/tracking/TrackingPage'
import { DriverPage } from './features/driver/DriverPage'
import { AdminPage } from './features/admin/AdminPage'

/** Determines which view is active based on the current route */
function useRoleFromRoute() {
  const loc = useLocation()
  if (loc.pathname.startsWith('/driver')) return 'driver'
  if (loc.pathname.startsWith('/admin'))  return 'admin'
  return 'customer'
}

const ROLE_COLORS = {
  customer: { bg: 'bg-brand-50',   text: 'text-brand-600',   border: 'border-brand-200',   accent: '#F97316' },
  driver:   { bg: 'bg-driver-50',  text: 'text-driver-600',  border: 'border-driver-200',  accent: '#3B82F6' },
  admin:    { bg: 'bg-admin-50',   text: 'text-admin-600',   border: 'border-admin-200',   accent: '#6366F1' },
} as const

const ROLE_LABELS = {
  customer: 'Customer',
  driver: 'Driver',
  admin: 'Admin',
} as const

function Navbar() {
  const role = useRoleFromRoute()
  const cfg = ROLE_COLORS[role]

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
            style={{ background: `linear-gradient(135deg, ${cfg.accent}, ${cfg.accent}dd)` }}
          >
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
              <rect x="9" y="11" width="14" height="10" rx="2"/>
              <circle cx="12" cy="16" r="1"/>
            </svg>
          </div>
          <div>
            <span className="text-base font-bold text-surface-900 tracking-tight leading-none">Deshipping</span>
            <span className={`hidden md:block text-xs font-medium ${cfg.text} ml-1`}>— {ROLE_LABELS[role]}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {([
            { to: '/',        label: 'Track Order',  role: 'customer' as const },
            { to: '/driver',   label: 'Driver App',   role: 'driver' as const },
            { to: '/admin',    label: 'Admin',         role: 'admin' as const },
          ]).map(({ to, label, role: navRole }) => {
            const isActive = useLocation().pathname === to
            const navCfg = ROLE_COLORS[navRole]
            return (
              <Link
                key={to}
                to={to}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
                  transition-all duration-150
                  ${isActive
                    ? `${navCfg.bg} ${navCfg.text} border ${navCfg.border}`
                    : 'text-surface-500 hover:text-surface-900 hover:bg-surface-100'
                  }
                `}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: navCfg.accent }}/>
                )}
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export { Navbar }

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"        element={<TrackingPage />} />
            <Route path="/driver"  element={<DriverPage />} />
            <Route path="/admin"   element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
