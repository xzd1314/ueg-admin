import { useState } from 'react'
import { resetDB } from '../data.js'
import Icon from '../icons.jsx'

export default function Settings() {
  const [msg, setMsg] = useState('')
  const flash = (t) => { setMsg(t); setTimeout(() => setMsg(''), 2200) }

  return (
    <div>
      {msg && <div className="alert-box gold mb-2" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="check" size={16} />{msg}</div>}
      <div className="grid grid-2">
        <div className="panel">
          <div className="panel-title"><span className="bar" /><h3>安全与访问控制</h3></div>
          <div className="field"><label>当前登录账号</label><input defaultValue="xzd1314" readOnly /></div>
          <div className="field">
            <label>令牌有效期</label>
            <select style={{ background: 'rgba(10,26,40,0.6)', border: '1px solid var(--border-strong)', color: 'var(--text)', padding: '11px 13px', borderRadius: 10, width: '100%' }}>
              <option>会话时长 8 小时</option><option>24 小时</option><option>长期（本地信任网络）</option>
            </select>
          </div>
          <button className="btn primary sm" onClick={() => flash('安全策略已更新（演示）')}><Icon name="shield" size={15} />保存安全策略</button>
          <div className="field-hint">凭据按需求固定为 用户名 xzd1314 · 密码 123456。真实环境请接入后端认证。</div>
        </div>

        <div className="panel">
          <div className="panel-title"><span className="bar" /><h3>数据与诊断</h3></div>
          <div className="mb-1"><b>演示数据存储</b></div>
          <p className="small muted" style={{ marginBottom: 12 }}>本演示的编辑数据保存在当前浏览器 localStorage，可随时重置回初始示例。</p>
          <div className="row">
            <button className="btn ghost sm" onClick={() => { resetDB(); flash('已重置为初始示例数据。') }}>重置全部数据</button>
            <button className="btn primary sm" onClick={() => flash('诊断完成：所有模块运行正常')}><Icon name="search" size={15} />运行诊断</button>
          </div>
          <div className="section-gap" />
          <div className="mt-2 alert-box blue small"><b>版本信息：</b>UEG 行政管理中心 v2.0 · 基于《流浪地球》联合政府世界观构建 · 仅供展示</div>
        </div>
      </div>
    </div>
  )
}
