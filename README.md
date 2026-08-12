# UEG 行政管理中心 · 地球联合政府行政总署

以 [https://www.uegov.world/](https://www.uegov.world/) 的《流浪地球》地球联合政府世界观为蓝本，参考 [apple.com.cn](https://www.apple.com.cn) 的精致节制排版，重构的管理后台。

> 在线预览：https://xzd1314.github.io/

## 登录凭据
- 用户名：`xzd1314`
- 密码：`123456`

> ⚠️ 纯前端托管无法真正保护密码，该校验仅用于前端演示。真实环境请把认证后移到后端（BFF / Serverless），做哈希 + 会话 + 访问控制。

## 风格与素材
- **视觉**：沉稳蓝金配色（深墨蓝 + 庄重金色），大留白、大圆角、细腻渐变与柔和阴影，去除了过于生硬的网格 / 扫描线风格，体现管理全世界的地球联合政府的庄重与克制。
- **中文字体**：字魂58号-创中黑（`public/fonts/zhonghei.ttf`）
- **英文 / 数字字体**：Rajdhani Medium（`public/fonts/rajdhani-medium.otf`）
- **倒计时数字字体**：DIN 1451 LT W06 Mittelschrift（`public/fonts/din-mittelschrift.otf`）
- **图标**：复用 uegov.world 所用的 RemixIcon（line 风格），编译进 `src/icons.jsx`
- **会徽**：金色地球纹章（`src/EarthEmblem.jsx` 内联 SVG），faviicon 见 `public/img/logo-550w.svg`
- **官员头像**：`public/img/avatar.jpg`（登录账号为官员本人）
- **550W 徽标**：`public/img/logo-550w.png`（黑色 logo，置于登录页浅色条幅上以保证清晰）

## 技术栈
- Vite + React 18
- 手写 CSS（深色科幻 / 苹果式精致）
- Hash 路由（静态托管无 404 回退问题）
- localStorage 模拟数据持久化（页面间增删改查真实交互）

## 本地运行
```bash
npm install
npm run dev        # 开发服务器 http://localhost:5173
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物
```

## 功能模块
- **全局总览**：关键运行指标 + **流浪地球事件倒计时**（DIN 字体大数字实时跳动，可切换目标演示）+ 全局通联广播
- **人口与城市**：地下城节点人口分布（可编辑/保存）
- **行星发动机**：发动机状态看板（可新增/编辑出力/改状态）
- **地下城与空间站**：地下城运行状态登记
- **政务办理**：发起申请 + 待办受理队列 + 服务目录
- **官员与人事**：关键官员名录（搜索 / 保密级别 / **在岗状态可即时切换**）
- **公文与通告**：发布通告 + 公文流转队列
- **法律与宪章**：核心法律文库
- **决策分析**：KPI + 迁移趋势 + MOSS 量子辅助建议
- **系统终端**：MOSS 命令行交互（输入 `help` 查看命令）
- **系统设置**：安全策略 + 数据诊断 / 重置

## 部署
站点已部署到 GitHub Pages（免费，替代 Vercel），详见 https://xzd1314.github.io/ 。

源码仓库：https://github.com/xzd1314/ueg-admin

> 本机若 `github.com` 主域名被污染（仅 api.github.com 可达）而无法 `git push`，可改用 GitHub REST Git Database API 推送；`.github/workflows` 无法通过 API 直接创建（GitHub 保留路径），如需 CI 自动部署请用 `git push` 补充。
