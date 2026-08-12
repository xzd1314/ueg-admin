import { createContext, useContext, useState } from 'react'

/**
 * 登录凭据（管理后台演示用途）。
 *
 * 注意：纯前端托管（如 Vercel）无法真正保护密码，任何客户端的校验都能被绕过。
 * 这里是「流浪地球 / UEG 联合政府」世界观的管理后台演示，凭据按需求固定为：
 *   用户名：xzd1314       密码：123456
 *
 * 若要真实生产使用，应将登录逻辑放进后端服务（BFF / Serverless），
 * 密码做哈希并加盐，配合会话与访问控制。此演示仅用于前端界面与交互展示。
 */
const CREDENTIALS = { username: 'xzd1314', password: '123456' }

const AuthContext = createContext(null)

const SESSION_KEY = 'ueg_admin_session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY)
      if (raw) return JSON.parse(raw)
    } catch (e) {
      /* ignore */
    }
    return null
  })

  const login = (username, password) => {
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      const profile = {
        username,
        displayName: username.slice(0, 3).toUpperCase() + ' 执政官',
        role: '联合政府 · 行政总署',
        clear: String(username).length + String(password).length,
      }
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(profile))
      } catch (e) {
        /* ignore */
      }
      setUser(profile)
      return { ok: true }
    }
    return { ok: false, error: '凭据无效：用户名或密码不正确，访问已拒绝并记录审计日志。' }
  }

  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch (e) {
      /* ignore */
    }
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
