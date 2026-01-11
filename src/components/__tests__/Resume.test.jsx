import { render, screen } from '@testing-library/react'
import Resume from '../Resume'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'

describe('Resume', () => {
  it('renders resume actions with expected destinations from versioned data', () => {
    const profile = PortfolioService.getInstance().getProfile()
    const { resume } = profile

    render(<Resume />)

    expect(screen.getByRole('heading', { name: /resume/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /download resume/i })).toHaveAttribute(
      'href',
      resume.pdfUrl,
    )
    expect(screen.getByRole('link', { name: /view linkedin profile/i })).toHaveAttribute(
      'href',
      resume.linkedinUrl,
    )
    expect(screen.getByRole('link', { name: /google docs version/i })).toHaveAttribute(
      'href',
      resume.docUrl,
    )
  })

  it('renders resume summary paragraphs from versioned data', () => {
    const profile = PortfolioService.getInstance().getProfile()
    const { resume } = profile

    render(<Resume />)

    resume.summaryParagraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    })
  })
})


