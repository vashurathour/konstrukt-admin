import React, { useState, useEffect } from 'react'
import API from '../api/client'
import { Loading, Badge, EmptyState, T } from '../components'

const CAT_ICON = {
  'raw-material':'🧱', paint:'🎨', wood:'🪵', tiles:'⬜',
  steel:'🔩', furniture:'🛋️', electrical:'💡', plumbing:'🚿',
}

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [preview,  setPreview]  = useState(null) // { photos, name }

  useEffect(() => {
    API.get('/products?limit=100')
      .then(r => setProducts(r.products || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = products.filter(p =>
    !search ||
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.shop_name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <div className="search-bar" style={{ marginBottom:16 }}>
        <span>🔍</span>
        <input placeholder="Search products, sellers, categories…"
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-title">All Products</span>
          <span className="badge badge-blue">{filtered.length} products</span>
        </div>
        {loading
          ? <Loading />
          : filtered.length === 0
            ? <EmptyState icon="📦" title="No products found" />
            : <table>
                <thead>
                  <tr><th>Photo</th><th>Product</th><th>Seller</th><th>Category</th><th>Price</th><th>Unit</th><th>Stock</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {filtered.map(p => {
                    const mainPhoto = p.photos?.[0]
                    const icon      = CAT_ICON[p.category] || '📦'
                    return (
                      <tr key={p.id}>
                        {/* Photo thumbnail */}
                        <td style={{ width:60, padding:'8px 12px' }}>
                          {mainPhoto
                            ? <img
                                src={mainPhoto}
                                alt={p.name}
                                onClick={() => setPreview({ photos: p.photos, name: p.name })}
                                style={{ width:48, height:48, borderRadius:8, objectFit:'cover', cursor:'pointer', border:`1px solid ${T.border}` }}
                              />
                            : <div style={{ width:48, height:48, borderRadius:8, background:T.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, border:`1px solid ${T.border}` }}>
                                {icon}
                              </div>}
                          {p.photos?.length > 1 && (
                            <div style={{ fontSize:10, color:T.muted, textAlign:'center', marginTop:2 }}>
                              +{p.photos.length - 1} more
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="fw-bold">{p.name}</div>
                          {p.description && <div className="text-muted text-sm" style={{ maxWidth:200, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{p.description}</div>}
                        </td>
                        <td className="text-muted">{p.shop_name}</td>
                        <td><span className="tag">{p.category}</span></td>
                        <td><span className="fw-bold" style={{ color:T.primary }}>₹{parseFloat(p.price_per_unit).toLocaleString()}</span></td>
                        <td className="text-muted">{p.unit}</td>
                        <td>{p.stock_qty}</td>
                        <td><Badge status={p.is_active ? 'active' : 'inactive'} /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>}
      </div>

      {/* Photo preview modal */}
      {preview && (
        <div className="modal-overlay" onClick={() => setPreview(null)}>
          <div className="modal" style={{ maxWidth:520 }} onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
              <div className="modal-title" style={{ marginBottom:0 }}>{preview.name}</div>
              <button className="btn btn-outline btn-sm" onClick={() => setPreview(null)}>✕</button>
            </div>
            {/* Photo grid */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:10 }}>
              {preview.photos.filter(Boolean).map((url, i) => (
                <div key={i} style={{ position:'relative' }}>
                  <img src={url} alt={`Photo ${i+1}`}
                    style={{ width:'100%', height:140, objectFit:'cover', borderRadius:10, border:`1px solid ${T.border}` }} />
                  {i === 0 && (
                    <div style={{ position:'absolute', bottom:6, left:6, background:'rgba(29,158,117,0.85)', borderRadius:6, padding:'2px 8px' }}>
                      <span style={{ color:'#fff', fontSize:10, fontWeight:700 }}>MAIN</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginTop:14, fontSize:12, color:T.muted, textAlign:'center' }}>
              {preview.photos.length} photo{preview.photos.length !== 1 ? 's' : ''} uploaded by seller
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
