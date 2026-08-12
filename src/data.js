/* 前端模拟数据层：用 localStorage 持久化，模拟后台数据库。
 * 所有页面共享这份数据，实现增删改查的真实交互感。
 * 真实生产环境应替换为后端 API。 */

const KEY = 'ueg_admin_db_v1'

const DEFAULT_DATA = {
  population: {
    total: 155,                       // 地球现役总人口(亿)
    earthPopMillions: 8650,          // 地表/各直辖市仍在运作的人口(百万)
    cityPopMillions: 6930,           // 地下城人口(百万)
    ratioUnderground: 69.4,          // 地入率 %
    birthMonthly: 1284000,           // 本月新生儿
    growthRatePct: 0.31,             // 年增长率%
    avgAge: 31.2,
    distribution: [
      { name: '北京京西地下城', region: '东亚-京畿圈', pop: 1280, status: '满负荷' },
      { name: '深圳港地下城', region: '东亚-粤港澳', pop: 1010, status: '满负荷' },
      { name: '上海临港地下城', region: '东亚-长三角', pop: 1205, status: '满负荷' },
      { name: '莫斯科地下城', region: '欧罗巴联邦', pop: 980, status: '运行中' },
      { name: '巴黎地下城', region: '欧罗巴联邦', pop: 860, status: '运行中' },
      { name: '纽约地下城', region: '美利坚联盟', pop: 1240, status: '满负荷' },
      { name: '开罗地下城', region: '非洲联盟', pop: 720, status: '运行中' },
      { name: '新德里地下城', region: '南亚联盟', pop: 890, status: '运行中' },
      { name: '布宜诺斯艾利斯地下城', region: '南美联邦', pop: 610, status: '运行中' },
    ],
  },
  engineMonitor: [
    { id: 'PT15', site: '亚洲东枢纽', type: '行星发动机', power: 92, status: '稳定' },
    { id: 'PT22', site: '非洲近地台', type: '转向发动机', power: 78, status: '稳定' },
    { id: 'PT31', site: '欧罗巴西岸', type: '行星发动机', power: 64, status: '例行检修' },
    { id: 'PT47', site: '美洲大裂谷', type: '转向发动机', power: 95, status: '稳定' },
    { id: 'PT58', site: '南极永昼区', type: '行星发动机', power: 41, status: '负载偏低' },
  ],
  status: {
    totalEngines: 12000,
    active: 9892,
    maintenance: 2108,
    fusionCoreTemp: '1570K',
    thrustAcceleration: '2.1×10⁻⁷',
  },
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {}
  return null
}

export function getDB() {
  const db = load() || JSON.parse(JSON.stringify(DEFAULT_DATA))
  // 迁移：若缺 default 之外的字段，做一次默认合并
  return db
}

export function saveDB(db) {
  try {
    localStorage.setItem(KEY, JSON.stringify(db))
  } catch (e) {}
}

export function resetDB() {
  try {
    localStorage.removeItem(KEY)
  } catch (e) {}
}
