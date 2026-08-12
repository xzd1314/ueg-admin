import { useState } from 'react'
import Icon from '../icons.jsx'

// 关键官员名录：状态可切换（受控 select）
const CADRES = [
  { name: '周喆直', title: '联合政府最高执政官', region: '地球联合政府', clear: '一级', status: '在任' },
  { name: '马兆', title: '联合政府政务官', region: '领航员国际空间站', clear: '一级', status: '在任' },
  { name: '刘培强', title: '领航员航天员 · 编队长', region: '领航员空间站', clear: '二级', status: '外勤' },
  { name: '图恒宇', title: '数字生命项目负责人', region: '中科院 · 数字生命所', clear: '二级', status: '在任' },
  { name: '韩朵朵', title: '地下城安全官', region: '北京京西地下城', clear: '三级', status: '休假' },
]

const STATUS = ['在任', '外勤', '休假', '已离任']
const statusCls = { '在任': 'green', '外勤': 'blue', '休假': 'gold', '已离任': 'gray' }

export default function Personnel() {
  const [rows, setRows] = useState(CADRES)
  const [q, setQ] = useState('')
  const filtered = rows.filter((r) => r.name.includes(q) || r.title.includes(q) || r.region.includes(q))

  const setStatus = (i, status) => setRows(rows.map((r, idx) => (idx === i ? { ...r, status } : r)))

  return (
    <div>
      <div className="grid grid-4">
        <Stat label="在编官员" value="4,820" sub="全球各级" />
        <Stat label="一级保密权限" value="21" sub="最高授权" />
        <Stat label="外勤在途" value="86" sub="航天 / 调度" />
        <Stat label="待升迁考核" value="142" sub="本季度" />
      </div>

      <div className="section-gap" />

      <div className="panel">
        <div className="panel-title">
          <span className="bar" /><h3>关键官员名录</h3>
          <span className="act">
            <div className="row">
              <Icon name="search" size={16} style={{ color: 'var(--text-faint)' }} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜索姓名 / 职务 / 机构" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-strong)', color: 'var(--text)', padding: '6px 2px', width: 220, outline: 'none' }} />
            </div>
          </span>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead><tr><th>官员</th><th>职务</th><th>所属机构</th><th>保密级别</th><th>在岗状态（可切换）</th></tr></thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.name}>
                  <td className="mono" style={{ color: 'var(--gold-bright)' }}>{r.name}</td>
                  <td>{r.title}</td>
                  <td>{r.region}</td>
                  <td><span className={`badge ${r.clear === '一级' ? 'red' : r.clear === '二级' ? 'gold' : 'gray'}`}>{r.clear}</span></td>
                  <td>
                    <select value={r.status} onChange={(e) => setStatus(i, e.target.value)} className="badge" style={{ fontFamily: 'var(--font-en)', fontSize: 11, padding: '5px 10px', borderRadius: 999, border: `1px solid var(--border-strong)`, background: 'rgba(10,26,40,0.6)', color: arrStatusColor(r.status) }}>
                      {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    &nbsp;<span className={`badge ${statusCls[r.status]}`}>{r.status}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="5" className="empty-state">未找到匹配记录</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="mt-2 small muted">官员在岗状态为演示数据，可即时切换并已绑定到选中的那一行。</div>
      </div>
    </div>
  )
}

// select 下拉内合法颜色
function arrStatusColor(s) {
  return s === '在任' ? 'var(--green)' : s === '外勤' ? 'var(--blue)' : s === '休假' ? 'var(--gold-bright)' : 'var(--text-muted)'
}

function Stat({ label, value, sub }) {
  return (
    <div className="stat-card">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div className="sub">{sub}</div>
    </div>
  )
}
