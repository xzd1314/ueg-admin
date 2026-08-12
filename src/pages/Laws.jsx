const LAW = [
  { title: '《联合政府宪章》', en: 'United Earth Government Charter', year: '2030-06-10', type: '宪法性文件', note: '共十八章一百一十二条，确立大会、安理会、秘书处、最高法职权。' },
  { title: '《流浪地球法》', en: 'Wandering Earth Act', year: '2035-01-01', type: '基本法律', note: '建立行星发动机、地下城、疏散抽签、人口与生育管理框架。' },
  { title: '《联合政府组织法》', en: 'UEG Organization Act', year: '2031-04-22', type: '组织制度', note: '规定各直属机构职能、议事规则与政务运行程序。' },
  { title: '《地下城入居条例》', en: 'Underground City Regulations', year: '2035-06-18', type: '行政法规', note: '明确抽签资格、入居顺序与地下城日常管理事务。' },
  { title: '《境外生存资源管理条例》', en: 'Survival Resource Regulations', year: '2042-03-05', type: '行政法规', note: '规范全球资源统筹、粮食与能源分配机制。' },
]

export default function Laws() {
  return (
    <div>
      <div className="grid grid-3">
        <div className="stat-card"><div className="label">现行有效法律</div><div className="value">1,204</div><div className="sub">含宪法性文件与部门规章</div></div>
        <div className="stat-card"><div className="label">宪法性文件</div><div className="value">3</div><div className="sub">宪章 · 流浪地球法 · 组织法</div></div>
        <div className="stat-card"><div className="label">本次修订意见</div><div className="value" style={{ color: 'var(--color-amber)' }}>2,398</div><div className="sub">《流浪地球法》生育条款征集</div></div>
      </div>

      <div className="section-gap" />

      <div className="panel">
        <div className="panel-title"><span className="bar" /><h3>核心法律文库</h3></div>
        <div className="table-wrap">
          <table className="data">
            <thead><tr><th>法律名称</th><th>类型</th><th>通过 / 施行</th><th>简要说明</th><th></th></tr></thead>
            <tbody>
              {LAW.map((l) => (
                <tr key={l.title}>
                  <td style={{ minWidth: 220 }}><b>{l.title}</b><div className="mono small muted">{l.en}</div></td>
                  <td><span className="badge cyan">{l.type}</span></td>
                  <td className="mono small">{l.year}</td>
                  <td className="small muted">{l.note}</td>
                  <td><button className="btn ghost sm">全文</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section-gap" />
      <div className="alert-box">
        意见征集通道开放中：对《流浪地球法》生育条款、地下城扩建方案有意见的官员，可通过「公文与通告」页提交。前端演示，不写入真实数据库。
      </div>
    </div>
  )
}
