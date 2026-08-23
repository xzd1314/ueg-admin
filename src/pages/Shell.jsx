import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../auth.jsx'
import Icon from '../icons.jsx'
import { Clock } from '../ui.jsx'

const TURNSTILE_SITEKEY = '0x4AAAAAAEYslAufS7xZQ-Jn'
const PERSONAL_SITE = 'https://xzd1314.github.io/'

const NAV = [
  { group: '综合指挥', items: [
    { label: '全局总览', en: 'Overview', icon: 'dashboard', page: 'overview' },
    { label: '人口与城市', en: 'Population', icon: 'global', page: 'population' },
    { label: '行星发动机', en: 'Engines', icon: 'cpu', page: 'engines' },
    { label: '地下城与空间站', en: 'Shelters', icon: 'building', page: 'shelters' },
  ]},
  { group: '行政事务', items: [
    { label: '政务办理', en: 'Services', icon: 'fileList', page: 'services' },
    { label: '官员与人事', en: 'Cadres', icon: 'group', page: 'personnel' },
    { label: '公文与通告', en: 'Notices', icon: 'megaphone', page: 'notices' },
  ]},
  { group: '制度与数据', items: [
    { label: '法律与宪章', en: 'Laws', icon: 'scale', page: 'laws' },
    { label: '决策分析', en: 'Analytics', icon: 'barChart', page: 'analytics' },
    { label: '系统终端', en: 'Terminal', icon: 'terminal', page: 'terminal' },
    { label: '系统设置', en: 'Settings', icon: 'settings', page: 'settings' },
  ]},
]

export default function Shell({ page, setPage, children }) {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [verifyOpen, setVerifyOpen] = useState(false)
  const [cfToken, setCfToken] = useState('')
  const turnstileRef = useRef(null)
  const widgetIdRef = useRef(null)
  const displayName = user?.displayName || '执政官'

  // Render Turnstile when verify modal opens
  useEffect(() => {
    if (!verifyOpen) return
    let cancelled = false
    const render = () => {
      if (cancelled || !turnstileRef.current || !window.turnstile) return
      if (widgetIdRef.current) { try { window.turnstile.remove(widgetIdRef.current) } catch (e) {} }
      try {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITEKEY,
          theme: 'dark',
          callback: (token) => setCfToken(token),
          'error-callback': () => setCfToken(''),
          'expired-callback': () => setCfToken(''),
        })
      } catch (e) {}
    }
    setCfToken('')
    if (window.turnstile) { render() }
    else {
      const tries = setInterval(() => {
        if (window.turnstile) { clearInterval(tries); render() }
      }, 200)
      setTimeout(() => clearInterval(tries), 15000)
    }
    return () => { cancelled = true; if (widgetIdRef.current) { try { window.turnstile.remove(widgetIdRef.current) } catch (e) {} } }
  }, [verifyOpen])

  const handleBackToSite = () => {
    setVerifyOpen(true)
  }

  const handleVerifyConfirm = () => {
    if (!cfToken) return
    window.location.href = PERSONAL_SITE
  }

  const handleVerifyCancel = () => {
    setVerifyOpen(false)
    setCfToken('')
  }

  return (
    <div className="app-shell">
      <div className={`sidebar-backdrop ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-text">
            <img src="img/ueg-logo-full.png" alt="地球联合政府·UEG" style={{ height: 46, maxWidth: 210, mixBlendMode: 'screen', display: 'block' }} />
          </div>
        </div>
        <nav className="nav">
          {NAV.map((grp) => (
            <div key={grp.group}>
              <div className="nav-group">{grp.group}</div>
              {grp.items.map((it) => (
                <a key={it.page} href={`#/${it.page}`} className={`nav-item ${page === it.page ? 'active' : ''}`} onClick={() => setOpen(false)}>
                  <Icon name={it.icon} size={19} />
                  <span>{it.label}</span>
                </a>
              ))}
            </div>
          ))}
          {/* 返回个人网站 */}
          <div>
            <div className="nav-group">外部</div>
            <button className="nav-item" style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }} onClick={handleBackToSite}>
              <Icon name="logout" size={19} />
              <span>返回个人网站</span>
            </button>
          </div>
        </nav>
        <div className="sidebar-foot">
          <img className="avatar-img" src="img/avatar.jpg" alt="官员头像" />
          <div className="who">
            <div className="org-name">联合政府管理中心</div>
            <div className="org-en">UEG Administration</div>
            <div className="name">{displayName}</div>
            <div className="role">{user?.role || '联合政府 · 行政总署'}</div>
          </div>
          <button className="logout-btn" onClick={logout} title="退出登录"><Icon name="logout" size={17} /></button>
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <div className="row">
            <button className="menu-toggle" onClick={() => setOpen((v) => !v)} aria-label="菜单"><Icon name="menu" size={18} /></button>
            <div>
              <div className="page-crumb">UEG / {page}</div>
              <div className="page-title">{pageTitle(page)}</div>
            </div>
          </div>
          <div className="topbar-right">
            <Clock />
          </div>
        </header>
        <div className="content">{children}</div>
        <div className="footer">
          <span>地球联合政府 · 行政管理中心 · 内部系统 v2.0</span>
          <span>联合政府宪章 · 官员权限 · 仅供授权使用</span>
        </div>
      </div>

      {/* 返回个人网站验证弹窗 */}
      {verifyOpen && (
        <div className="verify-modal-overlay" onClick={handleVerifyCancel} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)'
        }}>
          <div className="verify-modal-box" onClick={(e) => e.stopPropagation()} style={{
            background: 'var(--card-bg,#111)', color: 'var(--text,#eee)', borderRadius: 16,
            padding: '32px 28px', maxWidth: 400, width: '90%', textAlign: 'center',
            border: '1px solid var(--border,#333)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}>
            <div style={{ width: 48, height: 48, margin: '0 auto 16px', color: 'var(--gold,#d4ba8a)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '100%', height: '100%' }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>需要验证</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary,#888)', marginBottom: 20, lineHeight: 1.6 }}>
              请证明你是人类，以返回个人网站
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <div ref={turnstileRef} />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button onClick={handleVerifyCancel} style={{
                padding: '10px 24px', borderRadius: 100, border: '1px solid var(--border,#333)',
                background: 'transparent', color: 'var(--text,#eee)', cursor: 'pointer', fontSize: 14, fontWeight: 600
              }}>取消</button>
              <button onClick={handleVerifyConfirm} disabled={!cfToken} style={{
                padding: '10px 24px', borderRadius: 100, border: 'none',
                background: cfToken ? 'var(--gold,#d4ba8a)' : '#444', color: cfToken ? '#111' : '#888',
                cursor: cfToken ? 'pointer' : 'not-allowed', fontSize: 14, fontWeight: 700
              }}>确认返回</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function pageTitle(page) {
  const map = {
    overview: '全局总览', population: '人口与城市', engines: '行星发动机管控',
    shelters: '地下城与空间站', services: '政务办理', personnel: '官员与人事',
    notices: '公文与通告', laws: '法律与宪章', analytics: '决策分析',
    terminal: '系统终端', settings: '系统设置',
  }
  return map[page] || page
}
