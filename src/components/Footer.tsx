

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__content">
          <a href="#" className="footer__logo">
            Portfolio
          </a>
          <nav className="footer__nav">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#resume">Resume</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} Hengtai Jan. All rights reserved.
          </p>
          <p className="footer__credit">
            Built with React & Vite
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
