import { useState, ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { SiGithub, SiWhatsapp, SiGooglescholar } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdCheckCircle, MdSend } from 'react-icons/md'
import type { IconType } from 'react-icons'
import { usePortfolio } from '@/features/portfolio/context/PortfolioContext'
import { AnimationPresets } from '@/shared/animations/presets'
import type { SocialPlatform } from '@/features/portfolio/models'

interface FormData {
  name: string
  email: string
  message: string
}

const socialIcons: Record<SocialPlatform, IconType> = {
  github:   SiGithub,
  whatsapp: SiWhatsapp,
  linkedin: FaLinkedinIn,
  scholar:  SiGooglescholar,
  email:    MdEmail,
}

function Contact() {
  const { contactInfo } = usePortfolio()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const subject = encodeURIComponent(`New message from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    )

    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`

    setStatus('Opening your email client to send the message...')
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setStatus(''), 5000)
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <motion.h2 className="section-title" {...AnimationPresets.fadeInUp()}>Get In Touch</motion.h2>
        <div className="contact__content grid-2 gap-xl">
          <div className="contact__info">
            <h3 className="text-xl fw-semibold mb-md">Let's talk about your project</h3>
            <p className="text-muted mb-xl lh-relaxed">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions.
            </p>
            <div className="flex-col gap-lg mb-xl">
              <div className="info-card">
                <div className="icon-box" aria-hidden="true">
                  <MdEmail size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted mb-xs">Email</p>
                  <a href={`mailto:${contactInfo.email}`} className="fw-medium hover:text-primary">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <div className="info-card">
                <div className="icon-box" aria-hidden="true">
                  <MdLocationOn size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted mb-xs">Location</p>
                  <span className="fw-medium">{contactInfo.location}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-md">
              {contactInfo.socialLinks.map((link) => {
                const Icon = socialIcons[link.platform]
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    className="social-icon hover-glow"
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {Icon && <Icon size={24} aria-hidden="true" />}
                  </a>
                )
              })}
            </div>
          </div>
          <form className="card rounded-lg shadow-md p-xl" onSubmit={handleSubmit}>
            <h4 className="text-lg fw-semibold mb-lg text-gradient">Send a Message</h4>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-input form-textarea"
                placeholder="Tell me about your project, ideas, or just say hello..."
                rows={6}
                required
              ></textarea>
              <span className="text-sm text-muted d-block mt-xs">
                {formData.message.length > 0 ? `${formData.message.length} characters` : 'Share your thoughts'}
              </span>
            </div>
            {status && (
              <div className="flex gap-sm items-center mb-md text-success fw-medium">
                <MdCheckCircle size={18} aria-hidden="true" />
                {status}
              </div>
            )}
            <button type="submit" className="btn btn-primary w-full">
              <MdSend size={18} aria-hidden="true" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
