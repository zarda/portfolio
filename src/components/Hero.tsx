import { motion } from 'framer-motion'

import profilePhoto from '../assets/profile-photo.jpg'

function Hero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  return (
    <section className="hero" id="hero">
      <div className="container hero__container">
        <motion.div className="hero__content" {...fadeInUp}>
          <p className="hero__greeting text-gradient fw-semibold text-xl mb-sm">Hello, I'm</p>
          <h1 className="hero__title mb-sm">Hengtai Jan</h1>
          <h2 className="hero__subtitle fw-semibold mb-lg">Software Engineer</h2>
          <p className="hero__description text-light mb-xl">
            I build exceptional web applications with Angular, React, and modern technologies.
            Focused on performance, accessibility, and clean architecture.
          </p>
          <div className="hero__buttons flex gap-md flex-wrap">
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-outline">
              Get In Touch
            </a>
          </div>
        </motion.div>
        <motion.div
          className="hero__image flex-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="hero__image-wrapper">
            <img
              src={profilePhoto}
              alt="Hengtai Jan"
              className="hero__photo rounded-xl shadow-lg"
            />
          </div>
        </motion.div>
      </div>
      <div className="hero__scroll-indicator text-light text-sm">
        <span>Scroll Down</span>
        <div className="hero__scroll-arrow"></div>
      </div>
    </section>
  )
}

export default Hero
