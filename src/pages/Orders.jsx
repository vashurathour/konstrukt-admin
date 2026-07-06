import React, { useState, useEffect, useCallback } from 'react'
import API from '../api/client'
import { Loading, Badge, EmptyState, fmtMoney, fmtDate, fmtDT, T } from '../components'

const STATUS_FILTERS = ['', 'confirmed', 'accepted', 'dispatched', 'delivered', 'cancelled']

export default function Orders() {
  const [orders,   setOrders]   = useState([])
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState('')
  const [search,   setSearch]   = useState('')
  const [selected, setSelected] = useState(null)

  const load = useCallback((status = '') => {
    setLoading(true)
    API.get(`/admin/orders${status ? `?status=${status}` : '?limit=100'}`)
      .then(r => setOrders(r.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = orders.filter(o =>
    !search ||
    String(o.id).includes(search) ||
    o.user_name?.toLowerCase().includes(search.toLowerCase()) ||
    o.shop_name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      {/* Filter tabs */}
      <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
        {STATUS_FILTERS.map(s => (
          <button key={s}
            className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => { setFilter(s); load(s) }}>
            {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All Orders'}
          </button>
        ))}
      </div>

      <div className="search-bar" style={{ marginBottom:16 }}>
        <span>🔍</span>
        <input placeholder="Search by order #, customer, seller…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-title">{filter ? `${filter.charAt(0).toUpperCase()}${filter.slice(1)} Orders` : 'All Orders'}</span>
          <span className="badge badge-blue">{filtered.length} orders</span>
        </div>
        {loading
          ? <Loading />
          : filtered.length === 0
            ? <EmptyState icon="📦" title="No orders found" desc="Try a different filter or search term" />
            : <table>
                <thead>
                  <tr><th>#</th><th>Customer</th><th>Seller</th><th>Amount</th><th>Payment</th><th>Status</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {filtered.map(o => (
                    <tr key={o.id} style={{ cursor:'pointer' }} onClick={() => setSelected(o)}>
                      <td><span className="tag">#{o.id}</span></td>
                      <td>
                        <div className="fw-bold">{o.user_name}</div>
                        {o.user_phone && <div className="text-muted text-sm">{o.user_phone}</div>}
                      </td>
                      <td className="text-muted">{o.shop_name}</td>
                      <td><span className="fw-bold" style={{ color:T.primary }}>{fmtMoney(o.total_amount)}</span></td>
                      <td><span style={{ textTransform:'uppercase', fontSize:11, fontWeight:700, color:T.muted }}>{o.payment_mode}</span></td>
                      <td><Badge status={o.status} /></td>
                      <td className="text-muted text-sm">{fmtDT(o.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>}
      </div>

      {/* Order detail modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <div className="modal-title" style={{ marginBottom:0 }}>Order #{selected.id}</div>
              <button className="btn btn-outline btn-sm" onClick={() => setSelected(null)}>✕</button>
            </div>
            <Badge status={selected.status} />
            <div style={{ marginTop:16 }}>
              {[
                ['Customer',   selected.user_name],
                ['Phone',      selected.user_phone],
                ['Seller',     selected.shop_name],
                ['Amount',     fmtMoney(selected.total_amount)],
                ['Payment',    selected.payment_mode?.toUpperCase()],
                ['Pay Status', selected.payment_status],
                ['Address',    selected.delivery_address],
                ['Slot',       selected.delivery_slot],
                ['Placed',     fmtDT(selected.created_at)],
              ].map(([k, v]) => (
                <div className="info-row" key={k}>
                  <span className="info-key">{k}</span>
                  <span className="info-val">{v || '—'}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-outline" style={{ marginTop:16, width:'100%' }} onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
