import { motion } from 'framer-motion'
import { usePortfolio } from '@/features/portfolio/context/PortfolioContext'
import { AnimationPresets } from '@/shared/animations/presets'

function Hero() {
  const { profile } = usePortfolio()

  return (
    <section className="hero" id="hero">
      <div className="container hero__container">
        <motion.div className="hero__content" {...AnimationPresets.fadeInUpSmall()}>
          <p className="hero__greeting text-gradient font-semibold text-xl mb-2">{profile.greeting}</p>
          <h1 className="hero__title mb-2">{profile.name}</h1>
          <h2 className="hero__subtitle font-semibold mb-6">{profile.title}</h2>
          <p className="hero__description text-text-light mb-8">
            {profile.description}
          </p>
          <div className="hero__buttons flex gap-4 flex-wrap">
            <a href={profile.heroPrimaryCta.href} className="btn btn-primary">
              {profile.heroPrimaryCta.label}
            </a>
            <a href={profile.heroSecondaryCta.href} className="btn btn-outline">
              {profile.heroSecondaryCta.label}
            </a>
          </div>
        </motion.div>
        <motion.div
          className="hero__image flex items-center justify-center"
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
      <div className="hero__scroll-indicator text-text-light text-sm">
        <span>Scroll Down</span>
        <div className="hero__scroll-arrow"></div>
      </div>
    </section>
  )
}

export default Hero
