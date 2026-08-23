import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../auth.jsx'
import Icon from '../icons.jsx'

const TURNSTILE_SITEKEY = '0x4AAAAAAEYslAufS7xZQ-Jn'

export default function Login() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [busy, setBusy] = useState(false)
  const [cfToken, setCfToken] = useState('')
  const turnstileRef = useRef(null)
  const widgetIdRef = useRef(null)

  // Render Turnstile when API is ready
  useEffect(() => {
    let cancelled = false
    const render = () => {
      if (cancelled || !turnstileRef.current || !window.turnstile) return
      if (widgetIdRef.current) {
        try { window.turnstile.remove(widgetIdRef.current) } catch (e) {}
      }
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
    if (window.turnstile) {
      render()
    } else {
      const tries = setInterval(() => {
        if (window.turnstile) { clearInterval(tries); render() }
      }, 200)
      setTimeout(() => clearInterval(tries), 15000)
    }
    return () => { cancelled = true; if (widgetIdRef.current) { try { window.turnstile.remove(widgetIdRef.current) } catch (e) {} } }
  }, [])

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (!cfToken) {
      setError('请先完成人机验证')
      return
    }
    setBusy(true)
    const res = login(username.trim(), password)
    if (!res.ok) { setError(res.error); setBusy(false) }
  }

  return (
    <div className="login-wrap">
      {/* 背景照片（QQ 图，深色遮罩保证可读） */}
      <div className="bg-photo" style={{ backgroundImage: 'url(/img/bg-qq1.webp)' }} />

      <div className="login-header">UNITED EARTH GOVERNMENT · 地球联合政府 · 行政总署登录网关</div>

      <form className="login-card" onSubmit={submit}>
        <div className="login-head">
          {/* UEG 官方徽标（深蓝底白色徽章，screen 混合去底） */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
            <img src="/img/ueg-logo.png" alt="地球联合政府徽标" style={{ height: 120, mixBlendMode: 'screen', filter: 'brightness(1.08)' }} />
          </div>
          <h1>行政管理中心</h1>
          <div className="sub">UEG ADMINISTRATION CONSOLE</div>

          {/* 官员身份标识 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 18 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', border: '2px solid rgba(212,186,138,0.55)', padding: 3, boxShadow: '0 10px 30px -12px rgba(0,0,0,0.7)', background: 'rgba(255,255,255,0.04)' }}>
              <img src="/img/avatar.jpg" alt="官员头像" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
            <div style={{ marginTop: 10, fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>执政官 · xzd1314</div>
            <div style={{ fontFamily: 'var(--font-en)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--gold)', marginTop: 3, textTransform: 'uppercase' }}>Officer Identity Verified</div>
          </div>
        </div>

        <div className="login-sep" />
        {error && <div className="login-error">{error}</div>}

        <div className="field">
          <label>识别码 / 用户名</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="请输入用户名" autoComplete="username" />
        </div>
        <div className="field">
          <label>身份密钥 / 密码</label>
          <div className="row">
            <input type={showPwd ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="请输入密码" autoComplete="current-password" />
            <button type="button" className="btn ghost sm" onClick={() => setShowPwd((v) => !v)} style={{ whiteSpace: 'nowrap' }}>{showPwd ? '隐藏' : '显示'}</button>
          </div>
        </div>

        {/* Cloudflare Turnstile 人机验证 */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0 4px' }}>
          <div ref={turnstileRef} />
        </div>

        <button className="btn primary login-btn" type="submit" disabled={busy || !cfToken}>
          <Icon name="lock" size={18} /> {busy ? '正在核验身份…' : '进入管理指挥舱'}
        </button>

        <div className="login-foot">Authorized Personnel Only · 仅供授权官员 · 全程加密留痕</div>

        <div className="login-tip">考核账号：用户名 <b>xzd1314</b> · 密码 <b>123456</b></div>
      </form>

      {/* 550W 行星发动机 —— 新版黑底 logo，置于深色条幅（screen 去黑底） */}
      <div className="u550-wrap" style={{ marginTop: 26 }}>
        <img src="/img/logo-550w.png" alt="550W 行星发动机" style={{ maxWidth: '100%' }} />
      </div>
      <div className="login-header" style={{ marginTop: 16 }}>流浪地球计划 · MOVE THE EARTH · 使地球成为人类永远的家园</div>
    </div>
  )
}
