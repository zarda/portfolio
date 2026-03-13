import { screen, fireEvent, act } from '@testing-library/react'
import { vi } from 'vitest'
import Contact from '../Contact'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'
import { renderWithPortfolio } from '../../features/portfolio/__tests__/testUtils'

const originalLocation = window.location

describe('Contact', () => {
  beforeEach(() => {
    PortfolioService.reset()
  })

  afterEach(() => {
    vi.useRealTimers()
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    })
  })

  it('submits the form via mailto link and resets state', () => {
    vi.useFakeTimers()
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { href: '' },
    })

    renderWithPortfolio(<Contact />)

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello there!' } })

    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    expect(window.location.href).toContain('mailto:hengtaijan@gmail.com')
    expect(window.location.href).toContain('Jane%20Doe')
    expect(screen.getByText(/opening your email client/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toHaveValue('')
    expect(screen.getByLabelText(/email/i)).toHaveValue('')
    expect(screen.getByLabelText(/message/i)).toHaveValue('')

    act(() => {
      vi.runAllTimers()
    })
    expect(screen.queryByText(/opening your email client/i)).not.toBeInTheDocument()
  })

  it('exposes static contact channels', () => {
    renderWithPortfolio(<Contact />)

    expect(screen.getByRole('link', { name: /hengtaijan@gmail.com/i })).toHaveAttribute(
      'href',
      'mailto:hengtaijan@gmail.com',
    )
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/zarda',
    )
    expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute(
      'href',
      'https://wa.me/886928796022',
    )
  })
})
