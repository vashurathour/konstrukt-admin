import React, { useState, useEffect } from 'react'
import API from '../api/client'
import { Loading, EmptyState, fmtDate } from '../components'

export default function Users() {
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')

  useEffect(() => {
    API.get('/admin/users')
      .then(r => setUsers(r.users || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = users.filter(u =>
    !search ||
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.phone?.includes(search) ||
    u.city?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <div className="search-bar" style={{ marginBottom:16 }}>
        <span>🔍</span>
        <input placeholder="Search by name, phone, city…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-title">All Users</span>
          <span className="badge badge-blue">{filtered.length} users</span>
        </div>
        {loading
          ? <Loading />
          : filtered.length === 0
            ? <EmptyState icon="👥" title="No users found" />
            : <table>
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Phone</th><th>City</th><th>Joined</th></tr>
                </thead>
                <tbody>
                  {filtered.map(u => (
                    <tr key={u.id}>
                      <td><span className="tag">#{u.id}</span></td>
                      <td><span className="fw-bold">{u.name || <span className="text-muted">Not set</span>}</span></td>
                      <td><span className="tag">{u.phone}</span></td>
                      <td className="text-muted">{u.city || '—'}</td>
                      <td className="text-muted text-sm">{fmtDate(u.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>}
      </div>
    </div>
  )
}
