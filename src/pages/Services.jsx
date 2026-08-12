import { useState } from 'react'

const SERVICES = [
  { name: '地下城资格抽签', dept: '资源调配署', type: '抽签', desc: '申请加入全球抽签池，获取地下城入住资格' },
  { name: '空间站入站资格测试', dept: '领航员委员会', type: '测试', desc: 'MOSS 智能量子计算机构运营应急测试' },
  { name: '地球日报新闻订阅', dept: '地球日报社', type: '订阅', desc: '订阅全球新闻终端服务' },
  { name: '联合政府名牌制作', dept: '公民事务署', type: '制证', desc: '申请定制 UEG 名牌身份卡' },
  { name: '火星样本回收委托', dept: '科研总署', type: '委托', desc: '委托 「领航员」科研船回收火星岩石样本' },
]

const statusMap = { '办理中': 'amber', '已办结': 'green', '审核中': 'cyan', '已驳回': 'red' }

export default function Services() {
  const [list, setList] = useState([])
  const [sv, setSv] = useState(SERVICES[0].name)
  const [applicant, setApplicant] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const item = SERVICES.find((s) => s.name === sv)
    setList([{ id: Date.now(), service: item.name, dept: item.dept, applicant, time: new Date().toLocaleString('zh-CN', { hour12: false }), status: '审核中' }, ...list])
    setApplicant('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <div>
      <div className="grid grid-2">
        <div className="panel">
          <div className="panel-title"><span className="bar" /><h3>发起政务申请</h3></div>
          <form onSubmit={submit}>
            <div className="field"><label>服务事项</label>
              <select value={sv} onChange={(e) => setSv(e.target.value)}>
                {SERVICES.map((s) => <option key={s.name}>{s.name}</option>)}
              </select>
            </div>
            <div className="field"><label>申请人 / 关联认号</label>
              <input value={applicant} onChange={(e) => setApplicant(e.target.value)} placeholder="输入公民认号或官员代码" required />
            </div>
            <div className="field"><label>事项概要</label>
              <textarea placeholder="简述申请需求…（前端演示，不写入真实数据库）" />
            </div>
            <button className="btn primary" type="submit">{submitted ? '✓ 已受理' : '提交申请'}</button>
          </form>
        </div>

        <div className="panel">
          <div className="panel-title"><span className="bar" /><h3>待办受理队列</h3></div>
          <div className="table-wrap">
            <table className="data">
              <thead><tr><th>事项</th><th>申请人</th><th>时间</th><th>状态</th></tr></thead>
              <tbody>
                {list.length === 0 && <tr><td colSpan="4" className="empty-state">暂无待办受理，提交一笔申请以演示</td></tr>}
                {list.map((it) => (
                  <tr key={it.id}>
                    <td>{it.service}<div className="small muted mono">{it.dept}</div></td>
                    <td>{it.applicant}</td><td className="mono small">{it.time}</td>
                    <td><span className={`badge ${statusMap[it.status]}`}>{it.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="section-gap" />
      <div className="panel">
        <div className="panel-title"><span className="bar" /><h3>常用服务目录</h3></div>
        <div className="grid grid-3" style={{ gap: 14 }}>
          {SERVICES.map((s, i) => (
            <div key={s.name} className="stat-card" style={{ padding: 16 }}>
              <div className="label">{String(i + 1).padStart(2, '0')} · {s.type}</div>
              <div style={{ margin: '8px 0 6px' }}>{s.name}</div>
              <div className="small muted">{s.desc}</div>
              <div className="mt-1 small muted mono">{s.dept}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
