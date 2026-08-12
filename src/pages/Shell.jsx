import { useState } from 'react'
import { useAuth } from '../auth.jsx'
import Icon from '../icons.jsx'
import { Clock } from '../ui.jsx'

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
  const displayName = user?.displayName || '执政官'

  return (
    <div className="app-shell">
      <div className={`sidebar-backdrop ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-text">
            <img src="/img/ueg-logo-full.png" alt="地球联合政府·UEG" style={{ height: 46, maxWidth: 210, mixBlendMode: 'screen', display: 'block' }} />
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
        </nav>
        <div className="sidebar-foot">
          <img className="avatar-img" src="/img/avatar.jpg" alt="官员头像" />
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
