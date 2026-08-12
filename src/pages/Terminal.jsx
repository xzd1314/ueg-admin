import { useState } from 'react'

const BANNER = `联合政府管控终端 v1.0 · 连接：MOSS 量子计算机集群
输入 help 查看可用命令。`

function run(cmd) {
  const c = cmd.trim().toLowerCase()
  if (c === 'help' || c === '？' || c === '?') {
    return ['可用命令：',
      '  status      —— 系统与行星发动机状态',
      '  engines     —— 发动机概览',
      '  population  —— 人口抽样',
      '  ping        —— 链路检测',
      '  clear       —— 清空终端',
      '  logout      —— 退出（需通过界面）',
    ].join('\n')
  }
  if (c === 'status') return '状态：全部系统正常 · 故障数量 0 · 聚变核心稳定 · 灾备在线'
  if (c === 'engines') return '运行 9,892 / 12,000 台 · 检修 2,108 台 · 平均出力 74%'
  if (c === 'population') return '现役总人口 155 亿 · 地下城入住率 69.4% · 本月新生儿 1,284,000'
  if (c === 'ping') return 'MOSS 响应：18ms · 量子链路 / 稳定 · 丢包 0.0%'
  if (c === 'clear' || c === 'cls') return null
  if (c === '') return ''
  return `未知命令：${cmd}　输入 help 查看可用命令。`
}

export default function Terminal() {
  const [lines, setLines] = useState(['> ' + BANNER])
  const [val, setVal] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const res = run(val)
    setLines([...lines, '> ' + val, res ? '  ' + res.replace(/\n/g, '\n  ') : ''])
    if (val.trim().toLowerCase() === 'clear' || val.trim().toLowerCase() === 'cls') setLines([])
    setVal('')
  }

  return (
    <div className="panel">
      <div className="panel-title"><span className="bar" /><h3>系统管控终端 · MOSS 交互接口</h3></div>
      <div style={{ background: '#010b14', border: '1px solid rgba(79,209,197,0.25)', borderRadius: 8, padding: 16, fontFamily: 'var(--font-mono)', fontSize: 13, minHeight: 320, whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: 'var(--color-cyan-bright)' }}>
        {lines.filter((l) => l !== '').map((l, i) => <div key={i} style={{ marginBottom: 2 }}>{l}</div>)}
        <form onSubmit={submit} className="row" style={{ marginTop: 8 }}>
          <span style={{ color: 'var(--color-green)' }}>❯</span>
          <input autoFocus value={val} onChange={(e) => setVal(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-cyan-bright)', fontFamily: 'var(--font-mono)', fontSize: 13 }} placeholder="输入命令，如 status" />
        </form>
      </div>
    </div>
  )
}
