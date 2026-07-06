import React, { useState, useEffect } from 'react'
import API from '../api/client'
import { Loading, EmptyState } from '../components'

export default function FeatureFlags() {
  const [flags,   setFlags]   = useState([])
  const [loading, setLoading] = useState(true)
  const [newKey,  setNewKey]  = useState('')
  const [adding,  setAdding]  = useState(false)
  const [msg,     setMsg]     = useState('')

  const load = () => {
    API.get('/admin/flags')
      .then(r => setFlags(r.flags || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const toggle = async (key, val) => {
    await API.put(`/admin/flags/${key}`, { enabled: val })
    load()
  }

  const addFlag = async () => {
    if (!newKey.trim()) return
    setAdding(true)
    try {
      await API.put(`/admin/flags/${newKey.trim()}`, { enabled: false })
      setMsg('Flag created ✓')
      setNewKey('')
      load()
    } catch {}
    setAdding(false)
    setTimeout(() => setMsg(''), 2500)
  }

  return (
    <div className="page">
      {/* Explainer */}
      <div style={{ background:'#EEEDFE', borderRadius:12, padding:16, marginBottom:20, fontSize:13, color:'#3C3489', lineHeight:1.7 }}>
        <strong>Feature Flags</strong> let you turn features on/off for all users instantly — without redeploying the app.
        Ship code hidden behind a flag, test it, then enable it here with one click.
      </div>

      {/* Create new flag */}
      <div className="card" style={{ marginBottom:20 }}>
        <div className="card-head"><span className="card-title">Create New Flag</span></div>
        <div className="card-pad">
          {msg && <div className="alert alert-success">{msg}</div>}
          <div style={{ display:'flex', gap:10, alignItems:'flex-end' }}>
            <div className="form-group" style={{ flex:1, marginBottom:0 }}>
              <label className="form-label">Flag key (snake_case)</label>
              <input className="form-input" placeholder="e.g. whatsapp_ordering"
                value={newKey}
                onChange={e => setNewKey(e.target.value.replace(/\s/g, '_').toLowerCase())} />
            </div>
            <button className="btn btn-primary" disabled={adding || !newKey} onClick={addFlag}>
              {adding ? '…' : '+ Create Flag'}
            </button>
          </div>
        </div>
      </div>

      {/* Flags list */}
      <div className="card">
        <div className="card-head">
          <span className="card-title">All Feature Flags</span>
          <span className="badge badge-green">{flags.filter(f => f.enabled).length} enabled</span>
        </div>
        {loading
          ? <Loading />
          : flags.length === 0
            ? <EmptyState icon="🚩" title="No flags yet" desc="Create your first feature flag above" />
            : flags.map(f => (
                <div className="flag-row" key={f.id || f.flag_key}>
                  <div>
                    <div className="flag-key">{f.flag_key}</div>
                    <div className="flag-desc">{f.description || 'No description'}</div>
                    <div style={{ marginTop:4 }}>
                      <span className={`badge ${f.enabled ? 'badge-green' : 'badge-gray'}`}>
                        {f.enabled ? '● Enabled' : '○ Disabled'}
                      </span>
                    </div>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" checked={!!f.enabled}
                      onChange={e => toggle(f.flag_key, e.target.checked)} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              ))}
      </div>
    </div>
  )
}
