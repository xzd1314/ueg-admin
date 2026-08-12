import { useState } from 'react'
import { getDB, saveDB } from '../data.js'
import Icon from '../icons.jsx'

export default function Shelters() {
  const db = getDB()
  const [rows, setRows] = useState(db.population?.distribution || [])
  const [saved, setSaved] = useState(false)

  const save = () => { saveDB({ ...db, population: { ...db.population, distribution: rows } }); setSaved(true); setTimeout(() => setSaved(false), 1800) }
  const setStatus = (i, status) => setRows(rows.map((x, j) => (j === i ? { ...x, status } : x)))

  return (
    <div>
      <div className="grid grid-4">
        <div className="stat-card"><div className="label">地下城总数</div><div className="value">12,000+</div><div className="sub">规划容纳 35 亿人</div></div>
        <div className="stat-card"><div className="label">平均入住率</div><div className="value">69.4%</div><div className="sub">抽样统计</div></div>
        <div className="stat-card"><div className="label">空间站在轨</div><div className="value">7</div><div className="sub">领航员 / 轨道站</div></div>
        <div className="stat-card"><div className="label">剩余抽签配额</div><div className="value" style={{ color: 'var(--blue)' }}>2.5亿</div><div className="sub">下周开放补录</div></div>
      </div>

      <div className="section-gap" />

      <div className="panel">
        <div className="panel-title"><span className="bar" /><h3>地下城运行状态登记</h3>
          <span className="act"><button className="btn primary sm" onClick={save}><Icon name="save" size={14} />{saved ? '已保存' : '保存变更'}</button></span>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead><tr><th>地下城</th><th>行政区</th><th>在册人口（百万）</th><th>配额使用</th><th>状态</th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td><td>{r.region}</td>
                  <td className="mono">{r.pop}</td>
                  <td style={{ minWidth: 190 }}>
                    <div className="row"><div className="progress"><div style={{ width: `${Math.min(100, Math.round(r.pop / 1300 * 100))}%` }} /></div><span className="mono small">{Math.min(100, Math.round(r.pop / 1300 * 100))}%</span></div>
                  </td>
                  <td>
                    <select value={r.status} onChange={(e) => setStatus(i, e.target.value)} style={{ background: 'rgba(10,26,40,0.6)', border: '1px solid var(--border-strong)', color: 'var(--text)', padding: '5px 8px', borderRadius: 8 }}>
                      {['运行中', '满负荷', '扩建审批中', '停用'].map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
