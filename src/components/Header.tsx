import { useState, useEffect } from 'react'
import type { ThemeMode } from '@/features/portfolio/services/ThemeManager'
import { NAV_LINKS } from '@/shared/constants/navLinks'

interface HeaderProps {
  theme: ThemeMode
  toggleTheme: () => void
}

function Header({ theme, toggleTheme }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`header glass ${isScrolled ? 'header--scrolled' : ''}`} role="banner">
      <div className="container flex items-center justify-between h-full">
        <a href="#" className="header__logo text-gradient font-bold text-2xl">
          Portfolio
        </a>

        <nav
          className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}
          aria-label="Primary"
        >
          <ul className="header__nav-list flex gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="header__nav-link font-medium"
                  onClick={handleNavClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions flex gap-4 items-center">
          <button
            className="theme-toggle rounded-full flex items-center justify-center"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button
            type="button"
            className={`header__menu-btn ${isMenuOpen ? 'header__menu-btn--open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
