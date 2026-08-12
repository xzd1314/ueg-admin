import { useState } from 'react'
import { useAuth } from '../auth.jsx'
import { Icon } from '../ui.jsx'

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
    const res = login(username.trim(), password)
    if (!res.ok) {
      setError(res.error)
      setBusy(false)
    }
  }

  return (
    <div className="login-wrap grid-bg">
      <div className="login-global-header">
        <Icon name="planet" size={14} /> UNITED EARTH GOVERNMENT · 地球联合政府中央指挥中心
      </div>

      <form className="login-card" onSubmit={submit}>
        <div className="login-head">
          <div className="logo-row">
            <img src="/ueg-mark.svg" alt="UEG 徽标" />
            <h1>行政管理中心</h1>
          </div>
          <div className="sub">ADMINISTRATION CONSOLE · 地球联盾指挥舱</div>
          <div className="dec desc">
            以联合政府地球联合管理中心（UEG）为蓝本构建的行政总署指挥平台。
            <br />
            请以授权官员身份登录后进入下级指挥舱。
          </div>
        </div>
        <div className="login-sep" />

        {error && <div className="login-error">{error}</div>}

        <div className="field">
          <label>官员识别码 / 用户名</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="请输入用户名"
            autoComplete="username"
          />
        </div>

        <div className="field">
          <label>身份密钥 / 密码</label>
          <div className="row">
            <input
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              autoComplete="current-password"
            />
            <button type="button" className="btn ghost sm" onClick={() => setShowPwd((v) => !v)} style={{ whiteSpace: 'nowrap' }}>
              {showPwd ? '隐藏' : '显示'}
            </button>
          </div>
        </div>

        <button className="btn primary login-btn" type="submit" disabled={busy}>
          <Icon name="key" size={15} /> {busy ? '正在验证身份…' : '进入指挥舱'}
        </button>

        <div className="login-foot">AUTHORIZED PERSONNEL ONLY · 仅供授权官员 · 连接已加密 · 操作全程留痕</div>

        <div className="login-tip">
          <b>考核演示账号</b>
          <br />
          用户名 <b>xzd1314</b> · 密码 <b>123456</b>
        </div>
      </form>
    </div>
  )
}
