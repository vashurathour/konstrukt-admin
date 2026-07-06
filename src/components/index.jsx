import React from 'react'

// ── Shared design tokens ──────────────────────────────────────────────────────
export const T = {
  primary: '#2D2B5E', accent: '#1D9E75', orange: '#D85A30',
  amber:   '#EF9F27', danger: '#E24B4A', purple: '#534AB7',
  bg:      '#F4F3FD', white:  '#FFFFFF', border: '#E8E6F0',
  text:    '#1A1A2E', muted:  '#6B6880',
}

// ── Global CSS string (imported by App.jsx) ───────────────────────────────────
export const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:${T.bg}; color:${T.text}; }
  button { cursor: pointer; font-family: inherit; }
  input, select, textarea { font-family: inherit; }
  .sidebar { position:fixed; left:0; top:0; bottom:0; width:220px; background:${T.primary}; display:flex; flex-direction:column; z-index:100; }
  .sidebar-logo { padding:20px; border-bottom:1px solid rgba(255,255,255,0.1); display:flex; align-items:center; gap:10px; }
  .sidebar-logo .icon { font-size:24px; }
  .sidebar-logo .name { font-size:18px; font-weight:800; color:#fff; letter-spacing:.5px; }
  .sidebar-logo .name span { color:#9FE1CB; }
  .nav-section { padding:12px 0 4px; }
  .nav-label { font-size:10px; font-weight:700; color:rgba(255,255,255,0.35); letter-spacing:.08em; text-transform:uppercase; padding:0 20px 6px; }
  .nav-item { display:flex; align-items:center; gap:10px; padding:10px 20px; color:rgba(255,255,255,0.65); cursor:pointer; font-size:13px; border-left:3px solid transparent; transition:all .15s; }
  .nav-item:hover { background:rgba(255,255,255,0.08); color:#fff; }
  .nav-item.active { background:rgba(255,255,255,0.12); color:#fff; border-left-color:#9FE1CB; }
  .nav-item .nav-icon { font-size:16px; width:20px; text-align:center; }
  .sidebar-footer { margin-top:auto; padding:16px; border-top:1px solid rgba(255,255,255,0.1); }
  .main { margin-left:220px; min-height:100vh; }
  .topbar { background:${T.white}; border-bottom:1px solid ${T.border}; padding:14px 24px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:50; }
  .topbar-title { font-size:18px; font-weight:700; color:${T.text}; }
  .topbar-sub { font-size:12px; color:${T.muted}; margin-top:1px; }
  .online-dot { width:8px; height:8px; border-radius:50%; background:#22c55e; display:inline-block; margin-right:4px; }
  .page { padding:24px; }
  .stat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:16px; margin-bottom:24px; }
  .stat-card { background:${T.white}; border-radius:14px; padding:20px; border:1px solid ${T.border}; position:relative; overflow:hidden; }
  .stat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--accent-color,${T.primary}); }
  .stat-icon { font-size:28px; margin-bottom:10px; }
  .stat-num { font-size:26px; font-weight:800; color:${T.text}; }
  .stat-label { font-size:12px; color:${T.muted}; margin-top:3px; }
  .card { background:${T.white}; border-radius:14px; border:1px solid ${T.border}; overflow:hidden; margin-bottom:20px; }
  .card-head { padding:14px 20px; border-bottom:1px solid ${T.border}; display:flex; align-items:center; justify-content:space-between; }
  .card-title { font-size:14px; font-weight:700; color:${T.text}; }
  .card-body { padding:0; }
  .card-pad { padding:20px; }
  table { width:100%; border-collapse:collapse; }
  thead tr { background:#F8F7FE; }
  th { padding:10px 16px; text-align:left; font-size:11px; font-weight:700; color:${T.muted}; text-transform:uppercase; letter-spacing:.05em; white-space:nowrap; }
  td { padding:13px 16px; border-bottom:1px solid ${T.border}; font-size:13px; color:${T.text}; vertical-align:middle; }
  tr:last-child td { border-bottom:none; }
  tbody tr:hover td { background:#FAFAF9; }
  .badge { display:inline-flex; align-items:center; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:700; white-space:nowrap; }
  .badge-green { background:#EAF3DE; color:#27500A; }
  .badge-amber { background:#FAEEDA; color:#633806; }
  .badge-red { background:#FCEBEB; color:#791F1F; }
  .badge-blue { background:#E6F1FB; color:#0C447C; }
  .badge-purple { background:#EEEDFE; color:#3C3489; }
  .badge-gray { background:#F1EFE8; color:#5F5E5A; }
  .btn { display:inline-flex; align-items:center; gap:6px; padding:8px 16px; border-radius:8px; border:none; font-size:13px; font-weight:600; transition:all .15s; white-space:nowrap; cursor:pointer; }
  .btn:disabled { opacity:.6; cursor:not-allowed; }
  .btn-primary { background:${T.primary}; color:#fff; }
  .btn-primary:hover { background:#3D3A7A; }
  .btn-accent { background:${T.accent}; color:#fff; }
  .btn-accent:hover { background:#16875F; }
  .btn-danger { background:${T.danger}; color:#fff; }
  .btn-danger:hover { background:#C93B3A; }
  .btn-outline { background:transparent; border:1.5px solid ${T.border}; color:${T.text}; }
  .btn-outline:hover { border-color:${T.primary}; color:${T.primary}; }
  .btn-sm { padding:4px 10px; font-size:11px; border-radius:6px; }
  .form-group { margin-bottom:16px; }
  .form-label { display:block; font-size:12px; font-weight:600; color:${T.muted}; margin-bottom:6px; }
  .form-input { width:100%; padding:10px 12px; border:1.5px solid ${T.border}; border-radius:8px; font-size:14px; color:${T.text}; background:${T.white}; transition:border-color .15s; }
  .form-input:focus { outline:none; border-color:${T.primary}; }
  .toggle { position:relative; width:44px; height:24px; flex-shrink:0; }
  .toggle input { opacity:0; width:0; height:0; }
  .toggle-slider { position:absolute; inset:0; background:#CBD5E1; border-radius:24px; cursor:pointer; transition:.3s; }
  .toggle input:checked + .toggle-slider { background:${T.accent}; }
  .toggle-slider::before { content:''; position:absolute; width:18px; height:18px; left:3px; bottom:3px; background:#fff; border-radius:50%; transition:.3s; box-shadow:0 1px 3px rgba(0,0,0,.2); }
  .toggle input:checked + .toggle-slider::before { transform:translateX(20px); }
  .empty-state { text-align:center; padding:48px 24px; }
  .empty-state .e-icon { font-size:48px; margin-bottom:12px; }
  .empty-state .e-title { font-size:16px; font-weight:700; color:${T.text}; margin-bottom:6px; }
  .empty-state .e-desc { font-size:13px; color:${T.muted}; }
  .loading-wrap { display:flex; align-items:center; justify-content:center; padding:60px; }
  .spinner { width:32px; height:32px; border:3px solid ${T.border}; border-top-color:${T.primary}; border-radius:50%; animation:spin .7s linear infinite; }
  @keyframes spin { to { transform:rotate(360deg); } }
  .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
  .alert { padding:12px 16px; border-radius:8px; font-size:13px; margin-bottom:16px; }
  .alert-error { background:#FCEBEB; color:#791F1F; border:1px solid #F5C6C6; }
  .alert-success { background:#EAF3DE; color:#27500A; border:1px solid #B8DCA0; }
  .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.4); z-index:200; display:flex; align-items:center; justify-content:center; padding:20px; }
  .modal { background:#fff; border-radius:16px; padding:24px; width:100%; max-width:480px; max-height:90vh; overflow-y:auto; box-shadow:0 20px 60px rgba(0,0,0,.2); }
  .modal-title { font-size:16px; font-weight:700; color:${T.text}; margin-bottom:16px; }
  .tag { display:inline-block; padding:2px 8px; border-radius:4px; font-size:11px; font-weight:600; background:${T.bg}; color:${T.muted}; font-family:monospace; }
  .search-bar { display:flex; align-items:center; gap:8px; background:${T.bg}; border:1.5px solid ${T.border}; border-radius:8px; padding:8px 12px; }
  .search-bar input { border:none; background:transparent; font-size:13px; color:${T.text}; flex:1; outline:none; }
  .info-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid ${T.border}; font-size:13px; }
  .info-row:last-child { border-bottom:none; }
  .info-key { color:${T.muted}; }
  .info-val { font-weight:600; color:${T.text}; text-align:right; max-width:60%; }
  .flag-row { display:flex; align-items:center; justify-content:space-between; padding:14px 20px; border-bottom:1px solid ${T.border}; }
  .flag-row:last-child { border-bottom:none; }
  .flag-key { font-size:13px; font-weight:700; color:${T.text}; font-family:monospace; margin-bottom:3px; }
  .flag-desc { font-size:12px; color:${T.muted}; }
  .fw-bold { font-weight:700; }
  .text-muted { color:${T.muted}; font-size:13px; }
  .text-sm { font-size:12px; }
`

// ── Reusable UI components ────────────────────────────────────────────────────
export const Loading = () => (
  <div className="loading-wrap"><div className="spinner" /></div>
)

export const Badge = ({ status }) => {
  const map = {
    delivered:'green', confirmed:'blue', accepted:'blue', dispatched:'amber',
    pending:'amber', cancelled:'red', verified:'green', true:'green',
    false:'amber', active:'green', inactive:'red', paid:'green', unpaid:'amber',
  }
  const labels = {
    true:'Verified', false:'Pending', delivered:'Delivered', confirmed:'Confirmed',
    accepted:'Accepted', dispatched:'On the Way', pending:'Pending',
    cancelled:'Cancelled', verified:'Verified', active:'Active', inactive:'Inactive',
    paid:'Paid', unpaid:'Unpaid',
  }
  const k   = String(status)
  const cls = map[k] || 'gray'
  return <span className={`badge badge-${cls}`}>{labels[k] || k}</span>
}

export const EmptyState = ({ icon = '📭', title, desc }) => (
  <div className="empty-state">
    <div className="e-icon">{icon}</div>
    <div className="e-title">{title}</div>
    {desc && <div className="e-desc">{desc}</div>}
  </div>
)

export const fmtMoney = (n) => `₹${parseFloat(n || 0).toLocaleString('en-IN')}`
export const fmtDate  = (d) => new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
export const fmtDT    = (d) => new Date(d).toLocaleString('en-IN', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })
