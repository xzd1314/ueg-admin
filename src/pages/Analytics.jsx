import { Icon } from '../ui.jsx'

const KPIS = [
  { label: '行星推力达成率', v: 87, color: 'green' },
  { label: '地下城承载力', v: 69, color: 'cyan' },
  { label: '资源自给率', v: 64, color: 'cyan' },
  { label: '生育率目标', v: 41, color: 'amber' },
]

export default function Analytics() {
  return (
    <div>
      <div className="grid grid-4">
        {KPIS.map((k) => (
          <div className="stat-card" key={k.label}>
            <div className="label">{k.label}</div>
            <div className="value" style={{ color: k.color === 'green' ? 'var(--color-green)' : k.color === 'amber' ? 'var(--color-amber)' : 'var(--color-cyan-bright)' }}>{k.v}%</div>
            <div className="row" style={{ marginTop: 8 }}>
              <div className="progress grow"><div style={{ width: `${k.v}%` }} /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-gap" />

      <div className="grid grid-2">
        <div className="panel">
          <div className="panel-title"><span className="bar" /><h3>全球人口迁移趋势（最近 8 周期）</h3></div>
          <div className="row" style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <div className="spark" style={{ width: '100%' }}>
              {[3, 4, 3, 5, 4, 5, 6, 7].map((h, i) => <div key={i} style={{ height: `${h * 12}%` }} />)}
            </div>
          </div>
          <div className="mt-2 row">
            {['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'].map((t) => <span key={t} className="mono small muted" style={{ flex: 1, textAlign: 'center' }}>{t}</span>)}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title"><span className="bar" /><h3>航线与推力优化建议</h3></div>
          <div className="mb-1"><b>MOSS 量子辅助建议</b> <span className="badge cyan">自动生成</span></div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              '将亚太西岸 180° 大转向与东岸推力相位错开 6 个周期，预计省能 3.2%。',
              '趁近期太阳活动减弱窗口，增加转向发动机 2% 出力推进轨道平面修正。',
              '低温期临近，建议下调南极永昼区 58 号机负载至 35%，避免聚变核心过热。',
            ].map((t, i) => <li key={i} className="row" style={{ alignItems: 'flex-start', marginBottom: 10 }}><Icon name="check" size={15} style={{ color: 'var(--color-green)', flexShrink: 0, marginTop: 2 }} /><span className="small">{t}</span></li>)}
          </ul>
          <div className="mt-2"><button className="btn sm">生成分析简报</button></div>
        </div>
      </div>
    </div>
  )
}
