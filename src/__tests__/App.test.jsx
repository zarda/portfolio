import { render, screen, waitFor } from '@testing-library/react'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'
import App from '../App'

describe('App', () => {
  beforeEach(() => {
    PortfolioService.reset()
  })

  it('renders every core section heading', async () => {
    render(<App />)

    await waitFor(
      () => {
        ;['About Me', 'Skills & Technologies', 'Featured Projects', 'Resume', 'Get In Touch'].forEach(
          (title) => {
            expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument()
          },
        )
      },
      { timeout: 3000 },
    )
  })
})
