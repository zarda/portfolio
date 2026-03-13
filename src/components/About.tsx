import { motion } from 'framer-motion'
import { usePortfolio } from '@/features/portfolio/context/PortfolioContext'
import { AnimationPresets } from '@/shared/animations/presets'

function About() {
  const { profile } = usePortfolio()

  return (
    <section className="about section" id="about">
      <div className="container">
        <motion.h2 className="section-title" {...AnimationPresets.fadeInUp()}>About Me</motion.h2>
        <div className="about__content items-center">
          <motion.div
            className="about__image"
            {...AnimationPresets.slideInLeft()}
          >
            <div className="about__image-wrapper rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="about__photo w-full"
              />
            </div>
          </motion.div>
          <motion.div
            className="about__text"
            {...AnimationPresets.slideInRight(0.2)}
          >
            {profile.aboutParagraphs.map((paragraph, index) => (
              <p key={index} className="about__description text-text-light mb-8">
                {paragraph}
              </p>
            ))}
            <div className="about__stats flex gap-4 justify-center">
              {profile.stats.map((stat) => (
                <div key={stat.label} className="about__stat text-center rounded-lg">
                  {stat.link ? (
                    <a
                      href={stat.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="about__stat-link"
                    >
                      <span className="about__stat-number text-gradient font-bold text-2xl mb-1">{stat.value}</span>
                      <span className="about__stat-label text-text-light text-sm font-medium">{stat.label}</span>
                    </a>
                  ) : (
                    <>
                      <span className="about__stat-number text-gradient font-bold text-2xl mb-1">{stat.value}</span>
                      <span className="about__stat-label text-text-light text-sm font-medium">{stat.label}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <a href="#contact" className="btn btn-primary mt-6">
                Let's Talk
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
