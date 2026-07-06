import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'
import API from '../api/client'
import { Loading, Badge, EmptyState, fmtMoney, fmtDate, T } from '../components'

export default function Dashboard() {
  const [stats,   setStats]   = useState(null)
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      API.get('/admin/dashboard'),
      API.get('/admin/orders?limit=8'),
    ]).then(([s, o]) => {
      setStats(s.dashboard)
      setOrders(o.orders || [])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading />

  const cards = [
    { icon:'📦', label:'Orders Today',   value: stats?.orders_today   || 0,        color: T.primary },
    { icon:'💰', label:'Total GMV',      value: fmtMoney(stats?.total_gmv || 0),   color: T.accent  },
    { icon:'🏪', label:'Active Sellers', value: stats?.active_sellers || 0,        color: T.orange  },
    { icon:'👥', label:'Total Users',    value: stats?.total_users    || 0,        color: T.purple  },
    { icon:'⏳', label:'Pending KYC',    value: stats?.pending_kyc    || 0,        color: T.amber   },
  ]

  const chartData = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => ({
    day,
    orders: Math.floor(Math.random() * 20) + 2,
    gmv:    Math.floor(Math.random() * 50000) + 5000,
  }))

  return (
    <div className="page">
      {/* Stat cards */}
      <div className="stat-grid">
        {cards.map((c, i) => (
          <div className="stat-card" key={i} style={{ '--accent-color': c.color }}>
            <div className="stat-icon">{c.icon}</div>
            <div className="stat-num">{c.value}</div>
            <div className="stat-label">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-head"><span className="card-title">Orders This Week</span></div>
          <div style={{ padding: '16px 8px' }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis dataKey="day" tick={{ fontSize:11, fill:T.muted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:11, fill:T.muted }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius:8, border:`1px solid ${T.border}` }} />
                <Bar dataKey="orders" fill={T.primary} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><span className="card-title">Revenue Trend (₹)</span></div>
          <div style={{ padding: '16px 8px' }}>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis dataKey="day" tick={{ fontSize:11, fill:T.muted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:11, fill:T.muted }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius:8, border:`1px solid ${T.border}` }} formatter={v => [`₹${v.toLocaleString()}`, 'GMV']} />
                <Line type="monotone" dataKey="gmv" stroke={T.accent} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent orders table */}
      <div className="card">
        <div className="card-head">
          <span className="card-title">Recent Orders</span>
          <span className="badge badge-blue">{orders.length} latest</span>
        </div>
        <div className="card-body">
          {orders.length === 0
            ? <EmptyState icon="📦" title="No orders yet" desc="Orders will appear here once placed" />
            : <table>
                <thead>
                  <tr><th>#</th><th>Customer</th><th>Seller</th><th>Amount</th><th>Payment</th><th>Status</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td><span className="tag">#{o.id}</span></td>
                      <td><span className="fw-bold">{o.user_name}</span></td>
                      <td className="text-muted">{o.shop_name}</td>
                      <td><span className="fw-bold" style={{ color:T.primary }}>{fmtMoney(o.total_amount)}</span></td>
                      <td><span style={{ textTransform:'uppercase', fontSize:11, fontWeight:700, color:T.muted }}>{o.payment_mode}</span></td>
                      <td><Badge status={o.status} /></td>
                      <td className="text-muted text-sm">{fmtDate(o.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>}
        </div>
      </div>
    </div>
  )
}
