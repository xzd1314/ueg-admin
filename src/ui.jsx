import { useEffect, useState } from 'react'

/* ---- 实时时钟 (北京时间) ---- */
export function Clock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const fmt = (n) => String(n).padStart(2, '0')
  const dateStr = `${now.getFullYear()}-${fmt(now.getMonth() + 1)}-${fmt(now.getDate())}`
  const timeStr = `${fmt(now.getHours())}:${fmt(now.getMinutes())}:${fmt(now.getSeconds())}`
  const week = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()]
  return (
    <div className="clock">
      <div className="dt mono">UEG/{dateStr} 周{week} · 北京时区</div>
      <div>{timeStr}</div>
    </div>
  )
}

/* ---- 图标 (内联 SVG, stroke 风格) ---- */
export function Icon({ name, size = 18, className = '' }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const paths = {
    dashboard: (<><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></>),
    population: (<><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.4 3.4-5 6.5-5s5.7 1.6 6.5 5"/><path d="M16 4.5a3.2 3.2 0 0 1 0 6.4"/><path d="M17.5 15c2.3.4 3.8 2 4.3 5"/></>),
    engine: (<><path d="M12 3v4M9 7h6l3 5-4 3h-4l-4-3 3-5z"/><path d="M12 15v6M9 16l-2 3M15 16l2 3"/></>),
    station: (<><circle cx="12" cy="9" r="5"/><path d="M12 4a5 5 0 0 0-5 5c0 3 2 5.5 5 11 3-5.5 5-8 5-11a5 5 0 0 0-5-5z"/><circle cx="12" cy="9" r="1.8"/></>),
    order: (<><path d="M4 3h12l4 4v14H4z"/><path d="M4 7h12"/><path d="M8 14h8M8 17.5h5M8 10.5h3"/></>),
    personnel: (<><circle cx="9" cy="8" r="3.3"/><path d="M2.8 20c.7-3.3 3.2-4.8 6.2-4.8s5.5 1.5 6.2 4.8"/><path d="M16 8.6a3 3 0 1 0 0-5.4M19.2 15.5c1.4.6 2 1.7 2 4.5"/></>),
    news: (<><path d="M4 5h11v14H4z"/><path d="M17 7h3v12h-6"/><path d="M7 9h5M7 13h5M7 16h5"/></>),
    law: (<><path d="M12 3v18M5 6h9M5 9h7M15 9h3v12h-3zM4 20h13"/></>),
    list: (<><path d="M4 6h16M4 12h16M4 18h16"/></>),
    stats: (<><path d="M4 20V4M4 20h16"/><rect x="7" y="12" width="3" height="6" rx="0.5"/><rect x="12" y="8" width="3" height="10" rx="0.5"/><rect x="17" y="5" width="3" height="13" rx="0.5"/></>),
    terminal: (<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l4 3-4 3M13 15h4"/></>),
    settings: (<><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/></>),
    lock: (<><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>),
    shield: (<><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></>),
    planet: (<><circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17M12 3c-2.5 2.8-2.5 15.2 0 18M12 3c2.5 2.8 2.5 15.2 0 18"/></>),
    logout: (<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></>),
    check: (<path d="M20 6L9 17l-5-5"/>),
    warning: (<><path d="M12 3L2 20h20z"/><path d="M12 10v5M12 18v.5"/></>),
    key: (<><circle cx="8" cy="15" r="4"/><path d="M11 12L20 3M16 7l3 3M13 10l2 2"/></>),
    transmit: (<><path d="M12 3v14M6 13l6 6 6-6"/></>),
  }
  return (
    <svg className={className} {...common} aria-hidden="true">
      {paths[name] || paths.shield}
    </svg>
  )
}

/* 简单 Gauge（环形百分比） */
export function Ring({ value, size = 88, label }) {
  const r = 34
  const c = 2 * Math.PI * r
  const off = c * (1 - Math.min(value, 100) / 100)
  const color = value > 80 ? 'var(--color-green)' : value > 40 ? 'var(--color-cyan)' : 'var(--color-amber)'
  return (
    <div className="row" style={{ justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 84 84" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="42" cy="42" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <circle cx="42" cy="42" r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <div style={{ position: 'absolute' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 22, color }}>{Math.round(value)}%</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-on-variant)', textAlign: 'center', letterSpacing: '0.1em' }}>{label}</div>
      </div>
    </div>
  )
}
