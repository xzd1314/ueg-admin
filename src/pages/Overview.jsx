import { getDB } from '../data.js'
import { Icon, Ring } from '../ui.jsx'

const news = [
  { time: '09:42', tag: '紧急', text: '月球危机告警进入第 284 天，全球疏散计划有序进行', page: 'notices' },
  { time: '08:15', tag: '通告', text: '行星发动机维护公告：亚太区域第 31 号发动机进入例行检修', page: 'notices' },
  { time: '07:00', tag: '会议', text: '联合政府大会通知：第十六届特别会议将于明日召开', page: 'notices' },
  { time: '06:20', tag: '城务', text: '地下城管委会：北美区域地下城入住率已达 89%，剩余名额下周开放补录', page: 'shelters' },
]

export default function Overview({ go }) {
  const db = getDB()
  const { population, status, engineMonitor } = db

  return (
    <div>
      <div className="grid grid-4">
        <StatCard label="现役总人口" value={`${population.total}亿`} sub="全球地下城 + 直辖市" trend="+0.31%" up />
        <StatCard label="运行中发动机" value={status.active.toLocaleString()} sub={`共 ${status.totalEngines.toLocaleString()} 台`} trend="±0" />
        <StatCard label="维护中" value={status.maintenance.toLocaleString()} sub="含例行检修与负载调整" trend="" />
        <StatCard label="聚变核心温度" value={status.fusionCoreTemp} sub="推进行星 · 符合运行曲线" trend="稳定" />
      </div>

      <div className="section-gap" />

      <div className="alert-box">
        <Icon name="warning" size={15} style={{ verticalAlign: '-2px', marginRight: 8 }} />
        系统运行正常 · 已启用自动灾备。距地球抵达比邻星新家园（估算）尚有 <b style={{ color: '#ffe3a1' }}>1,742 年</b>，请各级官员保持计划推进。
      </div>

      <div className="section-gap" />

      <div className="grid grid-2">
        {/* 左侧：关键监测 */}
        <div className="panel">
          <div className="panel-title"><span className="bar" /><h3>关键运行指标</h3></div>
          <div className="grid" style={{ gap: 14 }}>
            <MetricRow label="地下城入住率" value={population.ratioUnderground} unit="%" progress />
            <MetricRow label="行星推力加速度" value="2.1×10⁻⁷" unit="m/s²" note="目标 3.4×10⁻⁶" />
            <MetricRow label="疏散计划完成度" value={72} unit="%" progress />
            <MetricRow label="转向发动机平均出力" value={engineMonitor[1]?.power} unit="%" progress />
          </div>
          <div className="section-gap" />
          <div className="panel-title"><span className="bar" /><h3>比邻星航线进度</h3></div>
          <Ring value={0.9} label="已启程 0.9%" />
          <div className="mt-2 small muted right">剩余距离估算 · 4.22 光年</div>
        </div>

        {/* 右侧：全局电台 */}
        <div className="panel">
          <div className="panel-title"><span className="bar" /><h3>全局通联广播</h3></div>
          {engineMonitor.map((e) => (
            <div key={e.id} className="row mb-1">
              <span className="mono" style={{ width: 64 }}>{e.id}</span>
              <span className="grow">{e.site}</span>
              <div className="progress" style={{ width: 90 }}><div style={{ width: `${e.power}%` }} /></div>
              <Badge status={e.status} />
            </div>
          ))}
          <div className="section-gap" />
          <div className="panel-title"><span className="bar" /><h3>最新通告</h3></div>
          {news.map((n, i) => (
            <div key={i} className="row mb-1">
              <span className="mono muted" style={{ width: 44 }}>{n.time}</span>
              <Badge status={n.tag} />
              <span className="grow small" style={{ cursor: 'pointer' }} onClick={() => go(n.page)}>{n.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, trend, up }) {
  return (
    <div className="stat-card">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div className="sub">
        {sub}
        {trend && <span className={`trend ${up ? 'up' : trend === '稳定' ? '' : 'down'}`}>{trend}</span>}
      </div>
    </div>
  )
}

function MetricRow({ label, value, unit, progress, note }) {
  return (
    <div className="row">
      <span className="grow small">{label}</span>
      {progress ? (
        <div className="row">
          <div className="progress"><div style={{ width: `${value}%` }} /></div>
          <span className="mono" style={{ minWidth: 42, textAlign: 'right' }}>{value}{unit}</span>
        </div>
      ) : (
        <span className="mono" style={{ minWidth: 42, textAlign: 'right' }}>{value}</span>
      )}
      {note && <span className="small muted">{note}</span>}
    </div>
  )
}

function Badge({ status }) {
  const map = {
    '稳定': 'green', '维护中': 'amber', '负载偏低': 'amber', '例行检修': 'amber', '紧急': 'red', '通告': 'cyan', '会议': 'cyan', '城务': 'cyan', '满负荷': 'green', '运行中': 'cyan',
  }
  return <span className={`badge ${map[status] || 'gray'}`}>{status}</span>
}
