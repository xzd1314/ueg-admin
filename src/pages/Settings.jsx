import { useState } from 'react'
import { resetDB } from '../data.js'

export default function Settings() {
  const [msg, setMsg] = useState('')
  const flash = (text) => { setMsg(text); setTimeout(() => setMsg(''), 2000) }

  return (
    <div>
      {msg && <div className="alert-box cyan mb-2"><span>✓</span> {msg}</div>}
      <div className="grid grid-2">
        <div className="panel">
          <div className="panel-title"><span className="bar" /><h3>安全与访问控制</h3></div>
          <div className="field"><label>当前登录账号</label><input defaultValue="xzd1314" readOnly /></div>
          <div className="field"><label>令牌有效期</label>
            <select style={{ background: 'var(--color-surface-low)', border: '1px solid var(--color-outline-soft)', color: '#fff', padding: '10px 12px', borderRadius: 8, width: '100%' }}>
              <option>会话时长 8 小时</option><option>24 小时</option><option>长期（本地信任网络）</option>
            </select>
          </div>
          <button className="btn primary sm" onClick={() => flash('安全策略已更新（演示）')}>保存安全策略</button>
          <div className="field-hint">凭据按需求固定为用户名 xzd1314 · 密码 123456。真实环境请接入后端认证。</div>
        </div>

        <div className="panel">
          <div className="panel-title"><span className="bar" /><h3>数据与诊断</h3></div>
          <div className="mb-1"><b>演示数据存储</b></div>
          <p className="small muted" style={{ marginBottom: 12 }}>本演示的编辑数据保存在当前浏览器 localStorage。可随时重置回初始示例。</p>
          <div className="row">
            <button className="btn ghost sm" onClick={() => { resetDB(); flash('已重置为初始示例数据。') }}>重置全部数据</button>
            <button className="btn primary sm" onClick={() => flash('诊断完成：所有模块运行正常')}>运行诊断</button>
          </div>
          <div className="section-gap" />
          <div className="mt-2 alert-box cyan small"><b>版本信息：</b>UEG 行政管理中心 v1.0 · 基于《流浪地球》联合政府世界观构建 · 仅供展示</div>
        </div>
      </div>
    </div>
  )
}
