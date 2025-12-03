import { render, screen, within } from '@testing-library/react'
import { vi } from 'vitest'
import Projects from '../Projects'
import { projects as projectsData } from '../projectsData'
import * as utils from '../../utils'

describe('Projects', () => {
  it('renders a card for each project with title and tags', () => {
    render(<Projects />)

    projectsData.forEach((project) => {
      const cardHeading = screen.getByRole('heading', { name: project.title })
      expect(cardHeading).toBeInTheDocument()
      project.tags.forEach((tag) => {
        expect(screen.getAllByText(tag)[0]).toBeInTheDocument()
      })
    })
  })

  it('falls back to generated screenshot URLs when no image is provided', () => {
    const screenshotSpy = vi.spyOn(utils, 'getScreenshotUrl')
    render(<Projects />)

    const projectWithoutImage = projectsData.find((project) => !project.image)
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


