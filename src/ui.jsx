import { useEffect, useState } from 'react'

/* ---- 实时时钟（用 Rajdhani 数字） ---- */
export function Clock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const p = (n) => String(n).padStart(2, '0')
  const dateStr = `${now.getFullYear()}.${p(now.getMonth() + 1)}.${p(now.getDate())}`
  const timeStr = `${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())}`
  const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][now.getDay()]
  return (
    <div className="clock">
      <div className="time">{timeStr}</div>
      <div className="dt">{dateStr} · {week} · 北京时区</div>
    </div>
  )
}

/* ---- 流浪地球事件倒计时（大数字用 DIN 字体） ----
 * 输出一个倒计时模块：目标时间 + 实时计算剩余 天/时/分/秒 */
export function Countdown({ target, title }) {
  const [left, setLeft] = useState(calc(target))
  useEffect(() => {
    const t = setInterval(() => setLeft(calc(target)), 1000)
    return () => clearInterval(t)
  }, [target])
  function calc(ts) {
    const ms = Math.max(0, new Date(ts) - Date.now())
    const s = Math.floor(ms / 1000)
    return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 }
  }
  const pad = (n) => String(n).padStart(2, '0')
  return (
    <div>
      {title && <div className="panel-title"><span className="bar" /><h3>{title}</h3></div>}
      <div className="countdown">
        <div className="cd-cell"><div className="cd-num">{left.d}</div><div className="cd-label">天 / DAYS</div></div>
        <div className="cd-sep">:</div>
        <div className="cd-cell"><div className="cd-num">{pad(left.h)}</div><div className="cd-label">时 / HRS</div></div>
        <div className="cd-sep">:</div>
        <div className="cd-cell"><div className="cd-num">{pad(left.m)}</div><div className="cd-label">分 / MIN</div></div>
        <div className="cd-sep">:</div>
        <div className="cd-cell"><div className="cd-num">{pad(left.s)}</div><div className="cd-label">秒 / SEC</div></div>
      </div>
    </div>
  )
}

/* ---- 环形百分比（小数用 Rajdhani） ---- */
export function Ring({ value = 0, size = 92, label = '' }) {
  const r = 34, c = 2 * Math.PI * r
  const off = c * (1 - Math.min(value, 100) / 100)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 84 84" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="42" cy="42" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <circle cx="42" cy="42" r={r} fill="none" stroke="var(--gold)" strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <div style={{ position: 'absolute', marginTop: size / 2 - 26 }}>
        <div style={{ fontFamily: 'var(--font-en)', fontWeight: 700, fontSize: 24, color: 'var(--gold-bright)', textAlign: 'center' }}>{Math.round(value)}%</div>
        {label && <div style={{ fontFamily: 'var(--font-en)', fontSize: 9, color: 'var(--text-faint)', textAlign: 'center', letterSpacing: '0.12em' }}>{label}</div>}
      </div>
    </div>
  )
}
