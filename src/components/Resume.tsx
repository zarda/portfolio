import { motion } from 'framer-motion'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'
import { AnimationPresets } from '@/shared/animations/presets'
import { ResumeInfo } from '@/features/portfolio/models'

interface ResumeActionsProps {
  resume: ResumeInfo
}

function ResumeActions({ resume }: ResumeActionsProps) {
  return (
    <div className="flex flex-wrap gap-md justify-center mb-md">
      <a href={resume.pdfUrl} className="btn btn-primary" download>
        Download Resume (PDF)
      </a>
      <a href={resume.linkedinUrl} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
        View LinkedIn Profile
      </a>
      <a
        href={resume.docUrl}
        className="btn btn-outline"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Live Google Docs Version
      </a>
    </div>
  )
}

function Resume() {
  const service = PortfolioService.getInstance()
  const profile = service.getProfile()
  const { resume } = profile

  return (
    <section className="resume section" id="resume">
      <div className="container">
        <motion.h2 className="section-title" {...AnimationPresets.fadeInUp()}>Resume</motion.h2>
        <motion.div
          className="resume__content text-center mx-auto"
          {...AnimationPresets.fadeInUp(0.2)}
        >
          <div className="resume__summary flex-col gap-md text-light mb-xl">
            {resume.summaryParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <ResumeActions resume={resume} />
        </motion.div>
      </div>
    </section>
  )
}

export default Resume


