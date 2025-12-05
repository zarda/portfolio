import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'
import {
  Season,
  ThemeMode,
  getCurrentSeason,
  getSeasonFromUrl,
  getStoredThemePreferences,
  storeThemePreferences,
  getSystemThemeMode,
  getThemeClass,
} from './config/themeConfig'

function App() {
  // Initialize season - URL param > stored preference > auto-detect
  const [season] = useState<Season>(() => {
    const urlSeason = getSeasonFromUrl()
    if (urlSeason) return urlSeason

    const { season: storedSeason } = getStoredThemePreferences()
    return storedSeason || getCurrentSeason()
  })

  // Initialize theme mode - check stored preference or system preference
  const [mode, setMode] = useState<ThemeMode>(() => {
    const { mode: storedMode } = getStoredThemePreferences()
    return storedMode || getSystemThemeMode()
  })

  // Apply theme classes to body whenever season or mode changes
  useEffect(() => {
    // Remove all theme classes first
    document.body.classList.remove(
      'theme-spring',
      'theme-summer',
      'theme-autumn',
      'theme-winter',
      'dark-mode'
    )

    // Apply current theme classes
    const themeClass = getThemeClass(season, mode)
    themeClass.split(' ').forEach((cls) => {
      if (cls) document.body.classList.add(cls)
    })

    // Store preferences
    storeThemePreferences(season, mode)
  }, [season, mode])

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  // For Header component compatibility
  const theme = mode

  return (
    <div className="app">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
