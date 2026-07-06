import React, { useState } from 'react'
import { CSS, T } from './components'
import Login        from './pages/Login'
import Dashboard    from './pages/Dashboard'
import Sellers      from './pages/Sellers'
import Orders       from './pages/Orders'
import Products     from './pages/Products'
import Users        from './pages/Users'
import FeatureFlags from './pages/FeatureFlags'
import Settings     from './pages/Settings'

/* ── Navigation config ─────────────────────────────────────────────────────── */
const NAV = [
  { section: 'Overview',   items: [{ key:'dashboard',  icon:'📊', label:'Dashboard'     }] },
  { section: 'Management', items: [
    { key:'sellers',  icon:'🏪', label:'Sellers'  },
    { key:'orders',   icon:'📦', label:'Orders'   },
    { key:'products', icon:'🛍️', label:'Products' },
    { key:'users',    icon:'👥', label:'Users'    },
  ]},
  { section: 'Platform',   items: [
    { key:'flags',    icon:'🚩', label:'Feature Flags' },
    { key:'settings', icon:'⚙️', label:'Settings'      },
  ]},
]

const PAGE_META = {
  dashboard: { title:'Dashboard',     sub:'Live platform overview' },
  sellers:   { title:'Sellers',       sub:'KYC verification and seller management' },
  orders:    { title:'Orders',        sub:'All platform orders' },
  products:  { title:'Products',      sub:'All products listed by sellers' },
  users:     { title:'Users',         sub:'All registered homebuilders' },
  flags:     { title:'Feature Flags', sub:'Toggle features without redeploying' },
  settings:  { title:'Settings',      sub:'Platform configuration' },
}

/* ── Shell (sidebar + topbar layout) ───────────────────────────────────────── */
function Shell({ onLogout }) {
  const [page, setPage] = useState('dashboard')
  const meta = PAGE_META[page]

  const PageMap = {
    dashboard: Dashboard,
    sellers:   Sellers,
    orders:    Orders,
    products:  Products,
    users:     Users,
    flags:     FeatureFlags,
    settings:  () => <Settings onLogout={onLogout} />,
  }
  const Page = PageMap[page] || Dashboard

  return (
    <div>
      {/* ── Sidebar ── */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <span className="icon">🏗️</span>
          <span className="name">KON<span>STRUKT</span></span>
        </div>

        <div style={{ flex:1, overflowY:'auto', paddingBottom:8 }}>
          {NAV.map(section => (
            <div className="nav-section" key={section.section}>
              <div className="nav-label">{section.section}</div>
              {section.items.map(item => (
                <div key={item.key}
                  className={`nav-item ${page === item.key ? 'active' : ''}`}
                  onClick={() => setPage(item.key)}>
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="btn btn-outline"
            style={{ width:'100%', color:'rgba(255,255,255,0.6)', borderColor:'rgba(255,255,255,0.2)', fontSize:12 }}
            onClick={onLogout}>
            Sign Out
          </button>
          <div style={{ marginTop:10, fontSize:11, color:'rgba(255,255,255,0.3)', textAlign:'center' }}>
            Konstrukt Admin v1.0.0
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="main">
        {/* Top bar */}
        <div className="topbar">
          <div>
            <div className="topbar-title">{meta?.title}</div>
            <div className="topbar-sub">{meta?.sub}</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <span style={{ fontSize:13, color:T.muted }}>
              <span className="online-dot"></span>API Connected
            </span>
            <span style={{ fontSize:13, color:T.muted }}>
              {new Date().toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short' })}
            </span>
          </div>
        </div>

        {/* Active page */}
        <Page />
      </div>
    </div>
  )
}

/* ── Root ───────────────────────────────────────────────────────────────────── */
export default function App() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('admin_token'))

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setAuthed(false)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {authed
        ? <Shell onLogout={handleLogout} />
        : <Login onLogin={() => setAuthed(true)} />}
    </>
  )
}
