import { screen } from '@testing-library/react'
import Resume from '../Resume'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'
import { renderWithPortfolio } from '../../features/portfolio/__tests__/testUtils'

describe('Resume', () => {
  beforeEach(() => {
    PortfolioService.reset()
  })

  it('renders resume actions with expected destinations from versioned data', () => {
    renderWithPortfolio(<Resume />)

    const profile = PortfolioService.getInstance().getProfile()
    const { resume } = profile

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
    renderWithPortfolio(<Resume />)

    const profile = PortfolioService.getInstance().getProfile()
    const { resume } = profile

    resume.summaryParagraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    })
  })
})
