import { useState } from 'react'
import { getDB, saveDB } from '../data.js'

export default function Engines() {
  const db = getDB()
  const base = db.engineMonitor || []
  const [rows, setRows] = useState(base)
  const [saved, setSaved] = useState(false)

  const save = () => {
    saveDB({ ...db, engineMonitor: rows })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }
  const update = (i, field, val) => setRows(rows.map((r, idx) => (idx === i ? { ...r, [field]: val } : r)))
  const add = () => setRows([{ id: 'PT' + (90 + rows.length), site: '新分配站点', type: '行星发动机', power: 50, status: '启动中' }, ...rows])

  return (
    <div>
      <div className="grid grid-3">
        <div className="stat-card"><div className="label">登记在册</div><div className="value">12,000</div><div className="sub">全球行星/转向发动机</div></div>
        <div className="stat-card"><div className="label">运行中</div><div className="value">9,892</div><div className="sub">输出功率符合曲线</div></div>
        <div className="stat-card"><div className="label">检修中</div><div className="value" style={{ color: 'var(--color-amber)' }}>2,108</div><div className="sub">含计划外停堆</div></div>
      </div>

      <div className="section-gap" />

      <div className="panel">
        <div className="panel-title">
          <span className="bar" /><h3>发动机状态看板（演示可编辑）</h3>
          <span className="act row">
            <button className="btn ghost sm" onClick={add}>+ 新增</button>
            <button className="btn primary sm" onClick={save}>{saved ? '✓ 已保存' : '保存变更'}</button>
          </span>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead><tr><th>编号</th><th>部署站点</th><th>发动机类型</th><th>当前出力</th><th>状态</th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td className="mono"><input defaultValue={r.id} style={{ width: 70, background: 'transparent', border: 'none', color: 'var(--color-cyan-bright)', fontFamily: 'var(--font-mono)' }} onBlur={(e) => update(i, 'id', e.target.value)} /></td>
                  <td><input defaultValue={r.site} style={{ background: 'transparent', border: '1px solid transparent', color: '#fff' }} onBlur={(e) => update(i, 'site', e.target.value)} /></td>
                  <td>{r.type}</td>
                  <td style={{ minWidth: 180 }}>
                    <div className="row">
                      <div className="progress"><div style={{ width: `${r.power}%` }} /></div>
                      <input type="number" defaultValue={r.power} style={{ width: 56, background: 'transparent', border: 'none', color: '#fff', fontFamily: 'var(--font-mono)' }} onBlur={(e) => update(i, 'power', Math.max(0, Math.min(100, Number(e.target.value) || 0)))} />%
                    </div>
                  </td>
                  <td><select value={r.status} onChange={(e) => update(i, 'status', e.target.value)} style={{ background: 'var(--color-surface-low)', border: '1px solid var(--color-outline-soft)', color: '#fff', padding: '5px 8px', borderRadius: 6 }}>
                    {['稳定', '运行中', '例行检修', '负载偏低', '停堆维护'].map((s) => <option key={s}>{s}</option>)}
                  </select></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section-gap" />
      <div className="alert-box cyan">
        <b>运行说明：</b>行星发动机总推力 1.15×10¹⁸ N，配合 5,000 座转向发动机执行偏航机动。检修期间请联动疏散与能源调配署做好区域供电负荷转移。
      </div>
    </div>
  )
}
