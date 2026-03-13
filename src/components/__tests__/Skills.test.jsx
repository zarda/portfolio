import { screen } from '@testing-library/react'
import Skills from '../Skills'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'
import { renderWithPortfolio } from '../../features/portfolio/__tests__/testUtils'

describe('Skills', () => {
  beforeEach(() => {
    PortfolioService.reset()
  })

  it('renders every skill category and item', () => {
    renderWithPortfolio(<Skills />)

    const skillCategories = PortfolioService.getInstance().getSkillCategories()
    skillCategories.forEach((category) => {
      expect(screen.getByRole('heading', { level: 3, name: category.category })).toBeInTheDocument()
      category.skills.forEach((skill) => {
        expect(screen.getByText(skill.name)).toBeInTheDocument()
      })
    })
  })

  it('applies inline width based on skill level', () => {
    renderWithPortfolio(<Skills />)

    const angularElement = screen.getByText('Angular').closest('.skill')
    expect(angularElement).not.toBeNull()
    const progressBar = angularElement.querySelector('.skill__progress')
    expect(progressBar).toHaveStyle({ width: '90%' })
  })

  it('renders AI & Dev Tools category and new skills', () => {
    renderWithPortfolio(<Skills />)

    expect(screen.getByRole('heading', { level: 3, name: 'AI & Dev Tools' })).toBeInTheDocument()
    expect(screen.getByText('AWS')).toBeInTheDocument()
    expect(screen.getByText('Cursor')).toBeInTheDocument()
    expect(screen.getByText('MCP')).toBeInTheDocument()
    expect(screen.getByText('PyTorch')).toBeInTheDocument()
    expect(screen.getByText('OpenCV (cv2)')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('Serverless')).toBeInTheDocument()
  })

  it('renders an icon for each skill', () => {
    renderWithPortfolio(<Skills />)

    const skillItems = document.querySelectorAll('.skill')
    const icons = document.querySelectorAll('.skill__icon')
    expect(skillItems.length).toBeGreaterThan(0)
    expect(icons.length).toBe(skillItems.length)
  })
})
