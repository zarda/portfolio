import { NAV_LINKS } from '@/shared/constants/navLinks'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content flex items-center justify-between flex-wrap gap-6">
          <a href="#" className="footer__logo text-gradient font-bold text-2xl">
            Portfolio
          </a>
          <nav className="footer__nav flex flex-wrap gap-6">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>
        </div>
        <div className="footer__bottom flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm text-text-muted">
            &copy; {currentYear} Hengtai Jan. All rights reserved.
          </p>
          <p className="footer__credit text-sm text-text-muted">
            Built with React & Vite
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
