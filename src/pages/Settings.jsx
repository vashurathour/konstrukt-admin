import React from 'react'
import { Badge, T } from '../components'

export default function Settings({ onLogout }) {
  return (
    <div className="page">
      <div className="card" style={{ maxWidth:520 }}>
        <div className="card-head"><span className="card-title">Platform Configuration</span></div>
        <div className="card-pad">
          {[
            ['Platform Name',       'Konstrukt'],
            ['Launch City',         'Ludhiana, Punjab'],
            ['Commission Rate',     '2% per order'],
            ['Delivery Fee',        '₹150 per order'],
            ['OTP Mode',            'Dev: all phones use 123456'],
            ['Payment Gateway',     'Razorpay'],
            ['SMS Provider',        'MSG91'],
            ['Push Notifications',  'Firebase FCM'],
            ['File Storage',        'Cloudflare R2'],
            ['Backend Hosting',     'Railway.app'],
            ['Admin Panel Hosting', 'Vercel'],
          ].map(([k, v]) => (
            <div className="info-row" key={k}>
              <span className="info-key">{k}</span>
              <span className="info-val">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ maxWidth:520 }}>
        <div className="card-head"><span className="card-title">Admin Account</span></div>
        <div className="card-pad">
          <div className="info-row">
            <span className="info-key">Username</span>
            <span className="info-val">admin</span>
          </div>
          <div className="info-row">
            <span className="info-key">Role</span>
            <span className="info-val"><Badge status="active" /></span>
          </div>
          <div className="info-row">
            <span className="info-key">Version</span>
            <span className="info-val">Konstrukt Admin v1.0.0</span>
          </div>
          <div style={{ marginTop:20 }}>
            <button className="btn btn-danger" onClick={onLogout}>Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  )
}
