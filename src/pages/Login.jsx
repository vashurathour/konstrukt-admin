import React, { useState } from 'react'
import API from '../api/client'
import { T } from '../components'

export default function Login({ onLogin }) {
  const [form,    setForm]    = useState({ username:'', password:'' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e?.preventDefault()
    if (!form.username || !form.password) return setError('Enter username and password')
    setLoading(true); setError('')
    try {
      const r = await API.post('/auth/admin/login', form)
      localStorage.setItem('admin_token', r.token)
      onLogin()
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials')
    }
    setLoading(false) 
  }

  return (
    <div style={{ minHeight:'100vh', background:T.primary, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:'#fff', borderRadius:20, padding:40, width:'100%', maxWidth:400, boxShadow:'0 20px 60px rgba(0,0,0,.3)' }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ fontSize:52, marginBottom:8 }}>🏗️</div>
          <div style={{ fontSize:26, fontWeight:800, color:T.primary }}>
            KON<span style={{ color:T.accent }}>STRUKT</span>
          </div>
          <div style={{ fontSize:13, color:T.muted, marginTop:4 }}>Admin Control Panel</div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" placeholder="admin" value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••••" value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}
            style={{ width:'100%', padding:'12px', fontSize:15, marginTop:8 }}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <div style={{ marginTop:20, padding:12, background:T.bg, borderRadius:8, fontSize:12, color:T.muted, textAlign:'center' }}>
          username: <strong>admin</strong> &nbsp;·&nbsp; password: <strong>konstrukt@admin2025</strong>
        </div>
      </div>
    </div>
  )
}
