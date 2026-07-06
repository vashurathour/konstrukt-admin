import React, { useState, useEffect, useCallback } from 'react'
import API from '../api/client'
import { Loading, Badge, EmptyState, fmtDate, T } from '../components'

export default function Sellers() {
  const [sellers,  setSellers]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [selected, setSelected] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    API.get('/admin/sellers')
      .then(r => setSellers(r.sellers || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const verify = async (id, verified) => {
    await API.put(`/admin/sellers/${id}/verify`, { verified })
    load()
  }

  const filtered = sellers.filter(s =>
    !search ||
    s.shop_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.phone?.includes(search) ||
    s.city?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <div style={{ display:'flex', gap:12, marginBottom:20, alignItems:'center' }}>
        <div className="search-bar" style={{ flex:1 }}>
          <span>🔍</span>
          <input placeholder="Search by shop name, phone, city…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <span className="badge badge-blue">{sellers.length} total</span>
        <span className="badge badge-amber">{sellers.filter(s => !s.verified).length} pending KYC</span>
      </div>

      <div className="card">
        <div className="card-head"><span className="card-title">All Sellers</span></div>
        {loading
          ? <Loading />
          : filtered.length === 0
            ? <EmptyState icon="🏪" title="No sellers found" />
            : <table>
                <thead>
                  <tr><th>Shop</th><th>Owner</th><th>Phone</th><th>City</th><th>GST</th><th>Rating</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.map(s => (
                    <tr key={s.id} style={{ cursor:'pointer' }} onClick={() => setSelected(s)}>
                      <td>
                        <div className="fw-bold">{s.shop_name}</div>
                        <div className="text-muted text-sm">{fmtDate(s.created_at)}</div>
                      </td>
                      <td>{s.owner_name}</td>
                      <td><span className="tag">{s.phone}</span></td>
                      <td>{s.city}</td>
                      <td><span className="tag">{s.gst_no || '—'}</span></td>
                      <td>{s.rating > 0 ? <span style={{ color:'#EF9F27', fontWeight:700 }}>⭐ {s.rating}</span> : <span className="text-muted">—</span>}</td>
                      <td><Badge status={s.verified} /></td>
                      <td onClick={e => e.stopPropagation()}>
                        {!s.verified
                          ? <button className="btn btn-accent btn-sm" onClick={() => verify(s.id, true)}>✓ Approve</button>
                          : <button className="btn btn-danger btn-sm" onClick={() => verify(s.id, false)}>✗ Revoke</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <div className="modal-title" style={{ marginBottom:0 }}>{selected.shop_name}</div>
              <button className="btn btn-outline btn-sm" onClick={() => setSelected(null)}>✕</button>
            </div>
            <Badge status={selected.verified} />
            <div style={{ marginTop:16 }}>
              {[
                ['Owner',    selected.owner_name],
                ['Phone',    selected.phone],
                ['City',     selected.city],
                ['Address',  selected.address],
                ['GST No',   selected.gst_no || 'Not provided'],
                ['Rating',   selected.rating > 0 ? `⭐ ${selected.rating}/5` : 'No ratings yet'],
                ['Delivery', selected.delivery_type === 'self' ? 'Own vehicle' : 'Platform fleet'],
                ['Joined',   fmtDate(selected.created_at)],
              ].map(([k, v]) => (
                <div className="info-row" key={k}>
                  <span className="info-key">{k}</span>
                  <span className="info-val">{v || '—'}</span>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:10, marginTop:20 }}>
              {!selected.verified
                ? <button className="btn btn-accent" style={{ flex:1 }} onClick={() => { verify(selected.id, true); setSelected(null) }}>✓ Approve Seller</button>
                : <button className="btn btn-danger"  style={{ flex:1 }} onClick={() => { verify(selected.id, false); setSelected(null) }}>✗ Revoke Verification</button>}
              <button className="btn btn-outline" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
