import { screen } from '@testing-library/react'
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import { PortfolioService } from '../services/PortfolioService'
import { renderWithPortfolio } from './testUtils'
import About from '@/components/About'

/**
 * End-to-end smoke test for the live LeetCode count: exercises the whole chain
 * (production profile data -> StatItem -> useLeetCodeSolved -> LeetCodeService
 * -> fetch) through the real About component. Green = the feature is wired up.
 */

const okJson = (body) => ({ ok: true, json: async () => body })

describe('LeetCode live stat (smoke)', () => {
  beforeEach(() => {
    PortfolioService.reset()
    localStorage.clear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('shows the static fallback first, then swaps to the live count from the API', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(okJson({ totalSolved: 903 }))))

    renderWithPortfolio(<About />)

    // Fallback paints immediately...
    expect(screen.getByText('900+')).toBeInTheDocument()
    // ...then the exact live value replaces it.
    expect(await screen.findByText('903')).toBeInTheDocument()
    expect(screen.queryByText('900+')).toBeNull()

    // The API was queried once, for the configured username.
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(String(fetch.mock.calls[0][0])).toContain('hengtai')
  })

  it('keeps the static fallback when the API request fails', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))))

    renderWithPortfolio(<About />)

    expect(await screen.findByText('900+')).toBeInTheDocument()
    await Promise.resolve() // let the rejected fetch settle
    expect(screen.getByText('900+')).toBeInTheDocument()
    expect(screen.queryByText('903')).toBeNull()
  })
})
