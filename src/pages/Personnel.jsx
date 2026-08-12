import { useState } from 'react'

const CADRES = [
  { name: '周喆直', title: '联合政府最高执政官', region: '地球联合政府', clear: '一级' },
  { name: '马兆', title: '联合政府政务官', region: '领航员国际空间站', clear: '一级' },
  { name: '刘培强', title: '领航员航天员 · 编队长', region: '领航员空间站', clear: '二级' },
  { name: '图恒宇', title: '数字生命项目负责人', region: '中科院 · 数字生命所', clear: '二级' },
  { name: '韩朵朵', title: '地下城安全官', region: '北京京西地下城', clear: '三级' },
]

const statusMap = { '在任': 'green', '外勤': 'cyan', '休假': 'amber' }

export default function Personnel() {
  const [rows, setRows] = useState(CADRES)
  const [q, setQ] = useState('')
  const filtered = rows.filter((r) => r.name.includes(q) || r.title.includes(q))

  return (
    <div>
      <div className="grid grid-4">
        <div className="stat-card"><div className="label">在编官员</div><div className="value">4,820</div><div className="sub">全球各级</div></div>
        <div className="stat-card"><div className="label">一级保密权限</div><div className="value">21</div><div className="sub">最高授权</div></div>
        <div className="stat-card"><div className="label">外勤在途</div><div className="value">86</div><div className="sub">航天/调度</div></div>
        <div className="stat-card"><div className="label">待升迁考核</div><div className="value">142</div><div className="sub">本季度</div></div>
      </div>

      <div className="section-gap" />

      <div className="panel">
        <div className="panel-title"><span className="bar" /><h3>关键官员名录</h3>
          <span className="act"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜索姓名 / 职务…" style={{ background: 'var(--color-surface-low)', border: '1px solid var(--color-outline-soft)', color: '#fff', padding: '7px 12px', borderRadius: 8, width: 220 }} /></span>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead><tr><th>姓名</th><th>职务</th><th>所属 <span style={{ textTransform: 'none' }}>/</span> 机构</th><th>保密级别</th><th>状态</th></tr></thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.name}>
                  <td className="mono" style={{ color: 'var(--color-cyan-bright)' }}>{r.name}</td>
                  <td>{r.title}</td><td>{r.region}</td>
                  <td><span className={`badge ${r.clear === '一级' ? 'red' : r.clear === '二级' ? 'amber' : 'gray'}`}>{r.clear}</span></td>
                  <td><select value="在任" style={{ background: 'var(--color-surface-low)', border: '1px solid var(--color-outline-soft)', color: '#fff', padding: '5px 8px', borderRadius: 6 }}>{['在任', '外勤', '休假'].map((s) => <option key={s}>{s}</option>)}</select></td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="5" className="empty-state">未找到匹配记录</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
