import { screen, within } from '@testing-library/react'
import { vi } from 'vitest'
import Projects from '../Projects'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'
import * as utils from '../../utils'
import { renderWithPortfolio } from '../../features/portfolio/__tests__/testUtils'

describe('Projects', () => {
  beforeEach(() => {
    PortfolioService.reset()
  })

  it('renders a card for each project with title and tags', () => {
    renderWithPortfolio(<Projects />)

    const projects = PortfolioService.getInstance().getProjects()
    projects.forEach((project) => {
      const cardHeading = screen.getByRole('heading', { name: project.title })
      expect(cardHeading).toBeInTheDocument()
      project.tags.forEach((tag) => {
        expect(screen.getAllByText(tag)[0]).toBeInTheDocument()
      })
    })
  })

  it('falls back to generated screenshot URLs when no image is provided', () => {
    const screenshotSpy = vi.spyOn(utils, 'getScreenshotUrl')
    renderWithPortfolio(<Projects />)

    const projects = PortfolioService.getInstance().getProjects()
    const projectWithoutImage = projects.find((project) => !project.imageUrl)
    expect(projectWithoutImage).toBeDefined()

    expect(screenshotSpy).toHaveBeenCalledWith(projectWithoutImage.liveUrl)
    const card = screen
      .getByRole('heading', { name: projectWithoutImage.title })
      .closest('.project-card')
    const image = within(card).getByRole('img', { name: `${projectWithoutImage.title} preview` })
    expect(image).toHaveAttribute('src', screenshotSpy.mock.results[0].value)

    screenshotSpy.mockRestore()
  })
})
