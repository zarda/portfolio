import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero__container">
        <div className="hero__content">
          <p className="hero__greeting">Hello, I'm</p>
          <h1 className="hero__title">Hengtai Jan</h1>
          <h2 className="hero__subtitle">Software Engineer</h2>
          <p className="hero__description">
            I build exceptional web applications with Angular, React, and modern technologies.
            Focused on performance, accessibility, and clean architecture.
          </p>
          <div className="hero__buttons">
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-outline">
              Get In Touch
            </a>
          </div>
        </div>
        <div className="hero__image">
          <div className="hero__image-wrapper">
            <img
              src="https://media.licdn.com/dms/image/v2/C5603AQEqYIoOLNmjfg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1589982798100?e=1766620800&v=beta&t=xYM_6t3FM_FW0KJeV9zBFLdCPzJajqLCq7qQyUx56ag"
              alt="Hengtai Jan"
              className="hero__photo"
            />
          </div>
        </div>
      </div>
      <div className="hero__scroll-indicator">
        <span>Scroll Down</span>
        <div className="hero__scroll-arrow"></div>
      </div>
    </section>
  )
}

export default Hero
