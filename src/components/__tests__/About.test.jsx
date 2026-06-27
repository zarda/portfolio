import { screen } from '@testing-library/react'
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'
import { renderWithPortfolio } from '../../features/portfolio/__tests__/testUtils'
import About from '../About'

const okJson = (body) => ({ ok: true, json: async () => body })

describe('About', () => {
  beforeEach(() => {
    PortfolioService.reset()
    localStorage.clear()
    // Default: the live LeetCode fetch resolves with an exact count.
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(okJson({ totalSolved: 903 }))))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('renders summary content and stats', async () => {
    renderWithPortfolio(<About />)

    // Wait for the live value so the async update is flushed inside act().
    expect(await screen.findByText('903')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
    expect(screen.getByText(/software engineer with a phd/i)).toBeInTheDocument()
    expect(screen.getByText('8+')).toBeInTheDocument()
    expect(screen.getByText(/physics, nsysu/i)).toBeInTheDocument()
  })

  it('links to contact section and shows the live LeetCode count', async () => {
    renderWithPortfolio(<About />)

    expect(screen.getByRole('link', { name: /let's talk/i })).toHaveAttribute('href', '#contact')

    await screen.findByText('903')
    const leetCodeLink = screen.getByRole('link', { name: /leetcode solved/i })
    expect(leetCodeLink).toHaveAttribute('href', 'https://leetcode.com/u/hengtai/')
    expect(leetCodeLink).toHaveAttribute('target', '_blank')
    expect(leetCodeLink).toHaveTextContent('903')
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(String(fetch.mock.calls[0][0])).toContain('hengtai')
  })

  it('falls back to the static value when the live fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))))
    renderWithPortfolio(<About />)

    const leetCodeLink = await screen.findByRole('link', { name: /leetcode solved/i })
    expect(leetCodeLink).toHaveTextContent('900+')
    // Let the rejected fetch settle; the fallback must remain.
    await Promise.resolve()
    expect(leetCodeLink).toHaveTextContent('900+')
  })
})
