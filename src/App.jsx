import { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from './auth.jsx'
import Login from './pages/Login.jsx'
import Shell from './pages/Shell.jsx'
import Overview from './pages/Overview.jsx'
import Population from './pages/Population.jsx'
import Engines from './pages/Engines.jsx'
import Shelters from './pages/Shelters.jsx'
import Services from './pages/Services.jsx'
import Personnel from './pages/Personnel.jsx'
import Notices from './pages/Notices.jsx'
import Laws from './pages/Laws.jsx'
import Analytics from './pages/Analytics.jsx'
import Terminal from './pages/Terminal.jsx'
import Settings from './pages/Settings.jsx'

const PAGES = (go) => ({
  overview: <Overview go={go} />,
  population: <Population />,
  engines: <Engines />,
  shelters: <Shelters />,
  services: <Services />,
  personnel: <Personnel />,
  notices: <Notices />,
  laws: <Laws />,
  analytics: <Analytics />,
  terminal: <Terminal />,
  settings: <Settings />,
})

const PAGE_KEYS = ['overview', 'population', 'engines', 'shelters', 'services', 'personnel', 'notices', 'laws', 'analytics', 'terminal', 'settings']

function Gate() {
  const { user } = useAuth()
  const [page, setPage] = useState('overview')

  useEffect(() => {
    const onHash = () => {
      const p = window.location.hash.replace(/^#\//, '').split('/')[0] || 'overview'
      setPage(PAGE_KEYS.includes(p) ? p : 'overview')
    }
    window.addEventListener('hashchange', onHash)
    onHash()
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (!user) return <Login />

  const go = (p) => { window.location.hash = `#/${p}` }
  const pages = PAGES(go)

  return (
    <Shell page={page} setPage={setPage}>
      {pages[page]}
    </Shell>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <div className="grid-bg">
        <Gate />
      </div>
    </AuthProvider>
  )
}
