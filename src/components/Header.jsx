import { useState, useEffect } from 'react'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#resume', label: 'Resume' },
    { href: '#contact', label: 'Contact' },
  ]

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`} role="banner">
      <div className="container header__container">
        <a href="#" className="header__logo">
          Portfolio
        </a>

        <nav
          className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}
          aria-label="Primary"
        >
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="header__nav-link"
                  onClick={handleNavClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

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
    </header>
  )
}

export default Header
