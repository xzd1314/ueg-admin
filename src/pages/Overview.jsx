import { useState, useEffect } from 'react'
import { getDB } from '../data.js'
import Icon from '../icons.jsx'
import { Countdown } from '../ui.jsx'

// 关键节点倒计时的默认目标（相对于首次访问，存 localStorage 保持稳定）
const CD_KEY = 'ueg_event_countdown'
const defaultTarget = Date.now() + (12 * 24 + 6) * 3600 * 1000 // 12 天 6 小时后
function getTarget() {
  try {
    const v = localStorage.getItem(CD_KEY)
    if (v) return Number(v)
  } catch (e) {}
  const t = defaultTarget
  try { localStorage.setItem(CD_KEY, String(t)) } catch (e) {}
  return t
}

export default function Overview({ go }) {
  const db = getDB()
  const { status, engineMonitor, population } = db
  const [target, setTarget] = useState(getTarget)

  const setNew = (days, hrs) => {
    const t = Date.now() + ((days * 24 + hrs) * 3600 + 120) * 1000
    try { localStorage.setItem(CD_KEY, String(t)) } catch (e) {}
    setTarget(t)
  }

  return (
    <div>
      {/* 关键节点倒计时 —— 流浪地球事件 */}
      <div className="panel hl" style={{ marginBottom: 22, padding: '30px 32px', background: 'linear-gradient(110deg, rgba(9,18,28,0.97) 30%, rgba(9,18,28,0.82) 55%, rgba(9,18,28,0.72)), url(img/bg-qq2.webp) center/cover no-repeat' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <Icon name="timer" size={20} style={{ color: 'var(--gold)' }} />
              <span style={{ fontFamily: 'var(--font-en)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--gold)', textTransform: 'uppercase' }}>Next Milestone · 下一关键行动节点</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>行星发动机例行推力调整 · 北半球低温保护会商</div>
            <div className="muted small" style={{ maxWidth: 420 }}>本次会商将评估低温期推力输出相位，关乎全球居民区供暖负荷与地下城能源调配，请各署提前提交预案。</div>
          </div>
          <div style={{ flexShrink: 0 }}>
            <Countdown target={target} />
          </div>
        </div>
        <div className="mt-2" style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="muted small">演示：</span>
          <button className="btn ghost sm" onClick={() => setNew(3, 5)}>3 天 5 小时</button>
          <button className="btn ghost sm" onClick={() => setNew(12, 6)}>12 天 6 小时</button>
          <button className="btn ghost sm" onClick={() => setNew(45, 0)}>45 天</button>
          <span className="small muted">调整目标以演示倒计时</span>
        </div>
      </div>

      <div className="grid grid-4">
        <Stat label="现役总人口" value={`${population.total}亿`} sub="地下城＋直辖区" trend="+0.31%" up />
        <Stat label="运行发动机" value={status.active.toLocaleString()} sub={`共 ${status.totalEngines.toLocaleString()} 台`} />
        <Stat label="维护作业" value={status.maintenance.toLocaleString()} sub="例行检修与负载调整" />
        <Stat label="聚变核心温度" value={status.fusionCoreTemp} sub="符合运行曲线" trend="稳定" />
      </div>

      <div className="section-gap" />

      <div className="grid grid-2">
        <div className="panel">
          <div className="panel-title"><span className="bar" /><h3>关键运行指标</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Metric label="地下城入住率" v={population.ratioUnderground} unit="%" />
            <Metric label="疏散计划完成度" v={72} unit="%" />
            <Metric label="转向发动机平均出力" v={engineMonitor[1]?.power} unit="%" />
            <Metric label="行星推力加速度" text="2.1×10⁻⁷ m/s²" note="目标 3.4×10⁻⁶" />
          </div>
        </div>

        <div className="panel">
          <div className="panel-title"><span className="bar" /><h3>全局通联广播</h3></div>
          {engineMonitor.map((e) => (
            <div key={e.id} className="row mb-1">
              <span className="mono" style={{ width: 56, color: 'var(--text-muted)' }}>{e.id}</span>
              <span className="grow">{e.site}</span>
              <div className="progress" style={{ width: 90 }}><div style={{ width: `${e.power}%` }} /></div>
              <Badge status={e.status} />
            </div>
          ))}
          <div className="section-gap" />
          <div className="panel-title"><span className="bar" /><h3>最新通告</h3></div>
          {[
            { time: '09:42', tag: '紧急', text: '月球危机告警进入第 284 天，全球疏散计划有序进行', page: 'notices' },
            { time: '08:15', tag: '通告', text: '行星发动机维护公告：亚太 31 号机进入例行检修', page: 'notices' },
            { time: '07:00', tag: '会议', text: '联合政府大会：第十六届特别会议将于明日召开', page: 'notices' },
            { time: '06:20', tag: '城务', text: '地下城管委会：北美区域剩余配额下周开放补录', page: 'shelters' },
          ].map((n, i) => (
            <div key={i} className="row mb-1">
              <span className="mono" style={{ width: 44, color: 'var(--text-faint)' }}>{n.time}</span>
              <Badge status={n.tag} />
              <span className="grow small" style={{ cursor: 'pointer' }} onClick={() => go(n.page)}>{n.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 联合政府发展规划（白底 art 图浅色展区） */}
      <div className="section-gap" />
      <div className="plan-section">
        <div className="ps-head"><span className="bar" /><h3>联合政府 · 关键发展规划</h3><span className="en">Key Development Programs</span></div>
        <div className="plan-grid">
          {[
            { img: 'img/art-space-elevator.png', t: '太空电梯 · 天地往返通道' },
            { img: 'img/art-moon-plan.png', t: '逐月计划 · 远景能源战略' },
            { img: 'img/art-scc.png', t: 'UEG-SCC · 飞控中心' },
          ].map((p) => (
            <div className="plan-item" key={p.t}>
              <img src={p.img} alt={p.t} loading="lazy" />
              <div className="ti">{p.t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, sub, trend, up }) {
  return (
    <div className="stat-card">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div className="sub">{sub}{trend && <span className={`trend ${up ? 'up' : trend === '稳定' ? '' : 'down'}`}>{trend}</span>}</div>
    </div>
  )
}

function Metric({ label, v, unit, text, note }) {
  return (
    <div className="row">
      <span className="grow small">{label}</span>
      {text ? (
        <span className="mono">{text}</span>
      ) : (
        <>
          <div className="progress" style={{ width: 120 }}><div style={{ width: `${v}%` }} /></div>
          <span className="mono" style={{ minWidth: 46, textAlign: 'right' }}>{v}{unit}</span>
        </>
      )}
      {note && <span className="small muted">{note}</span>}
    </div>
  )
}

function Badge({ status }) {
  const map = { '稳定': 'green', '维护中': 'amber_g', '例行检修': 'amber_g', '负载偏低': 'amber_g', '紧急': 'red', '通告': 'blue', '会议': 'blue', '城务': 'blue', '满负荷': 'green', '运行中': 'blue' }
  const cls = map[status] === 'amber_g' ? 'gray' : map[status] === 'red' ? 'red' : map[status] === 'blue' ? 'blue' : 'green'
  return <span className={`badge ${cls}`}>{status}</span>
}
