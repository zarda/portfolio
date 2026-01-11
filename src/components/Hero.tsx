import { motion } from 'framer-motion'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'
import { AnimationPresets } from '@/shared/animations/presets'

function Hero() {
  const service = PortfolioService.getInstance()
  const profile = service.getProfile()

  return (
    <section className="hero" id="hero">
      <div className="container hero__container">
        <motion.div className="hero__content" {...AnimationPresets.fadeInUpSmall()}>
          <p className="hero__greeting text-gradient fw-semibold text-xl mb-sm">{profile.greeting}</p>
          <h1 className="hero__title mb-sm">{profile.name}</h1>
          <h2 className="hero__subtitle fw-semibold mb-lg">{profile.title}</h2>
          <p className="hero__description text-light mb-xl">
            {profile.description}
          </p>
          <div className="hero__buttons flex gap-md flex-wrap">
            <a href={profile.heroPrimaryCta.href} className="btn btn-primary">
              {profile.heroPrimaryCta.label}
            </a>
            <a href={profile.heroSecondaryCta.href} className="btn btn-outline">
              {profile.heroSecondaryCta.label}
            </a>
          </div>
        </motion.div>
        <motion.div
          className="hero__image flex-center"
          {...AnimationPresets.fadeInScale(0.2)}
        >
          <div className="hero__image-wrapper">
            <img
              src={profile.photoUrl}
              alt={profile.name}
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
