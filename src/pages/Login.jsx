import { useState } from 'react'
import { useAuth } from '../auth.jsx'
import Icon from '../icons.jsx'
import EarthEmblem from '../EarthEmblem.jsx'

export default function Login() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [busy, setBusy] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    // 校验：凭据 xzd1314 / 123456
    const res = login(username.trim(), password)
    if (!res.ok) {
      setError(res.error)
      setBusy(false)
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-header">UNITED EARTH GOVERNMENT · 地球联合政府 · 行政总署登录网关</div>

      <form className="login-card" onSubmit={submit}>
        <div className="login-head">
          <div className="logo-row">
            <div className="emblem"><EarthEmblem size={42} /></div>
            <h1>行政管理中心</h1>
          </div>
          <div className="sub">UEG ADMINISTRATION CONSOLE</div>

          {/* 官员身份标识 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
            <div style={{ width: 76, height: 76, borderRadius: '50%', border: '2px solid rgba(212,186,138,0.55)', padding: 3, boxShadow: '0 10px 30px -12px rgba(0,0,0,0.7)', background: 'rgba(255,255,255,0.04)' }}>
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

        <button className="btn primary login-btn" type="submit" disabled={busy}>
          <Icon name="lock" size={18} /> {busy ? '正在核验身份…' : '进入管理指挥舱'}
        </button>

        <div className="login-foot">Authorized Personnel Only · 仅供授权官员 · 全程加密留痕</div>

        <div className="login-tip">
          考核账号：用户名 <b>xzd1314</b> · 密码 <b>123456</b>
        </div>
      </form>

      {/* 550W 全息徽标 —— 置于浅色条幅上，保证黑色 logo 清晰可见 */}
      <div style={{ marginTop: 34, padding: '18px 40px', background: 'linear-gradient(135deg,#f4f2ee,#ffffff 60%,#f0efe9)', borderRadius: 16, boxShadow: '0 18px 46px -20px rgba(0,0,0,0.55)' }}>
        <img src="/img/logo-550w.png" alt="地球联合政府 · 550W" style={{ height: 58, display: 'block', margin: '0 auto' }} />
      </div>
      <div className="login-header" style={{ marginTop: 16 }}>流浪地球计划 · MOVE THE EARTH · 使地球成为人类永远的家园</div>
    </div>
  )
}
