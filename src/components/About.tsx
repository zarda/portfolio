import { motion } from 'framer-motion'
import { usePortfolio } from '@/features/portfolio/context/PortfolioContext'
import type { ProfileStat } from '@/features/portfolio/models'
import { useLeetCodeSolved } from '@/features/portfolio/hooks/useLeetCodeSolved'
import { AnimationPresets } from '@/shared/animations/presets'

/** A single stat. When `stat.live` is set, the value is refreshed live in the browser. */
function StatItem({ stat }: { stat: ProfileStat }) {
  const { value } = useLeetCodeSolved(stat.live)
  const display = value != null ? String(value) : stat.value

  const content = (
    <>
      <span className="about__stat-number text-gradient font-bold text-2xl mb-1">{display}</span>
      <span className="about__stat-label text-text-light text-sm font-medium">{stat.label}</span>
    </>
  )

  return (
    <div className="about__stat text-center rounded-lg">
      {stat.link ? (
        <a
          href={stat.link}
          target="_blank"
          rel="noopener noreferrer"
          className="about__stat-link"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  )
}

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
                <StatItem key={stat.label} stat={stat} />
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
