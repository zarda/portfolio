import { lazy, Suspense } from 'react'
import Header from './components/Header'
import { PortfolioProvider, usePortfolio } from '@/features/portfolio/context/PortfolioContext'

// Registers all portfolio versions into PortfolioRegistry
import '@/features/portfolio/data'

// Lazy-loaded: each section becomes a separate JS chunk
const Hero     = lazy(() => import('./components/Hero'))
const About    = lazy(() => import('./components/About'))
const Skills   = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Resume   = lazy(() => import('./components/Resume'))
const Contact  = lazy(() => import('./components/Contact'))
const Footer   = lazy(() => import('./components/Footer'))

// AppShell calls usePortfolio() — must be a descendant of PortfolioProvider
function AppShell() {
  const { mode, toggleMode } = usePortfolio()
  return (
    <div className="app">
      <Header theme={mode} toggleTheme={toggleMode} />
      <main>
        <Suspense fallback={<div className="section-loading" aria-busy="true" />}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Resume />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppShell />
    </PortfolioProvider>
  )
}
