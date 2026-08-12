import { useState } from 'react'

const seed = [
  { title: '关于《流浪地球法》生育条款修订的意见征集', dept: '立法委员会', date: '2075-03-12', type: '意见征集', status: '进行中' },
  { title: '地下城扩建规划方案公示及意见征集', dept: '资源调配署', date: '2075-03-10', type: '公示', status: '进行中' },
  { title: '行星发动机维护通告（第31号机）', dept: '发动机委员会', date: '2075-03-09', type: '公告', status: '已发布' },
  { title: '第十六届特别会议议程通知', dept: '大会秘书处', date: '2075-03-08', type: '会议通知', status: '已发布' },
  { title: '月球危机应急演练评估报告', dept: '安理会 · 监察署', date: '2075-03-05', type: '评估', status: '内部' },
]

const statusMap = { '进行中': 'amber', '已发布': 'green', '内部': 'cyan' }

export default function Notices() {
  const [rows, setRows] = useState(seed)
  const [title, setTitle] = useState('')
  const [dept, setDept] = useState('')

  const publish = (e) => {
    e.preventDefault()
    if (!title.trim() || !dept.trim()) return
    setRows([{ title, dept, date: new Date().toISOString().slice(0, 10), type: '公告', status: '进行中' }, ...rows])
    setTitle(''); setDept('')
  }

  return (
    <div>
      <div className="grid grid-2">
        <div className="panel">
          <div className="panel-title"><span className="bar" /><h3>发布新通告</h3></div>
          <form onSubmit={publish}>
            <div className="field"><label>公文标题</label><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="输入通告标题…" required /></div>
            <div className="field"><label>发文部门</label><input value={dept} onChange={(e) => setDept(e.target.value)} placeholder="如：联合政府大会秘书处" required /></div>
            <div className="field"><label>正文</label><textarea placeholder="通告正文（前端演示）…" /></div>
            <button className="btn primary" type="submit">保存并发布</button>
          </form>
        </div>

        <div className="panel">
          <div className="panel-title"><span className="bar" /><h3>公文流转队列</h3></div>
          <div className="table-wrap">
            <table className="data">
              <thead><tr><th>公文标题</th><th>部门</th><th>日期</th><th>状态</th></tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td style={{ minWidth: 240 }}>{r.title}</td><td>{r.dept}</td>
                    <td className="mono small">{r.date}</td><td><span className={`badge ${statusMap[r.status]}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
