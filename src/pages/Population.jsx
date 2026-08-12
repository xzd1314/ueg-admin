import { useState } from 'react'
import { getDB, saveDB } from '../data.js'
import Icon from '../icons.jsx'

export default function Population() {
  const db = getDB()
  const p = db.population
  const [rows, setRows] = useState(p.distribution)
  const [saved, setSaved] = useState(false)

  const save = () => {
    saveDB({ ...db, population: { ...p, distribution: rows } })
    setSaved(true); setTimeout(() => setSaved(false), 1800)
  }
  const update = (i, field, val) => setRows(rows.map((r, idx) => (idx === i ? { ...r, [field]: val } : r)))
  const cityPop = rows.reduce((s, r) => s + r.pop, 0)

  return (
    <div>
      <div className="grid grid-4">
        <Stat label="地下城在册" value={p.cityPopMillions.toLocaleString()} unit="百万" />
        <Stat label="地表直辖区" value={p.earthPopMillions.toLocaleString()} unit="百万" />
        <Stat label="本月新生儿" value={p.birthMonthly.toLocaleString()} unit="人" />
        <Stat label="平均年龄" value={p.avgAge} unit="岁" />
      </div>

      <div className="section-gap" />

      <div className="panel">
        <div className="panel-title">
          <span className="bar" /><h3>地下城节点人口分布（可编辑）</h3>
          <span className="act row">
            <span className="muted small">累计 {cityPop.toLocaleString()} 百万</span>
            {saved && <span className="badge green">已保存</span>}
          </span>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead><tr><th>地下城节点</th><th>行政区</th><th>在册人口（百万）</th><th>状态</th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td style={{ minWidth: 230 }}><input value={r.name} onChange={(e) => update(i, 'name', e.target.value)} style={{ background: 'transparent', border: '1px solid transparent', padding: '4px 6px', color: 'var(--text)', borderRadius: 6 }} /></td>
                  <td><input value={r.region} onChange={(e) => update(i, 'region', e.target.value)} style={{ background: 'transparent', border: '1px solid transparent', padding: '4px 6px', color: 'var(--text)', borderRadius: 6 }} /></td>
                  <td style={{ width: 170 }}><input type="number" value={r.pop} onChange={(e) => update(i, 'pop', Number(e.target.value) || 0)} style={{ width: 90, background: 'transparent', border: '1px solid transparent', padding: '4px 6px', color: 'var(--gold-bright)', fontFamily: 'var(--font-en)', borderRadius: 6 }} /></td>
                  <td><span className={`badge ${r.status === '满负荷' ? 'green' : 'blue'}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-2 row">
          <button className="btn primary sm" onClick={save}><Icon name="save" size={15} />{saved ? '已保存' : '保存数据'}</button>
          <span className="small muted">修改保存在本机浏览器，用于演示数据维护。</span>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, unit }) {
  return (
    <div className="stat-card">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div className="sub">{unit}</div>
    </div>
  )
}
