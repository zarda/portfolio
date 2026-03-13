import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { StrictMode } from 'react'
import { PortfolioProvider, usePortfolio } from '../context/PortfolioContext'
import { PortfolioService } from '../services/PortfolioService'
import { renderWithPortfolio } from './testUtils'

// Helper components
function VersionDisplay() {
  const { currentVersion } = usePortfolio()
  return <span>{currentVersion}</span>
}

describe('PortfolioContext', () => {
  beforeEach(() => {
    // Reset singleton so each test's PortfolioProvider gets a clean instance
    PortfolioService.reset()
  })

  it('provides currentVersion from the initialized service', () => {
    renderWithPortfolio(<VersionDisplay />)
    expect(screen.getByText('hengtai25')).toBeInTheDocument()
  })

  it('throws when usePortfolio is used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<VersionDisplay />)).toThrow(
      'usePortfolio must be used inside <PortfolioProvider>'
    )
    spy.mockRestore()
  })

  it('switchVersion updates all portfolio data', () => {
    function ProfileName() {
      const { profile, switchVersion } = usePortfolio()
      return (
        <button onClick={() => switchVersion('demo')}>{profile.name}</button>
      )
    }
    renderWithPortfolio(<ProfileName />)
    expect(screen.getByRole('button')).toHaveTextContent('Hengtai Jan')
    act(() => { screen.getByRole('button').click() })
    expect(screen.getByRole('button')).toHaveTextContent('Demo User')
  })

  it('toggleMode flips theme mode', () => {
    function ModeDisplay() {
      const { mode, toggleMode } = usePortfolio()
      return <button onClick={toggleMode}>{mode}</button>
    }
    renderWithPortfolio(<ModeDisplay />)
    const btn = screen.getByRole('button')
    const initialMode = btn.textContent
    act(() => { btn.click() })
    expect(btn.textContent).not.toBe(initialMode)
  })

  it('config prop allows mock themeManager injection', () => {
    const mockThemeManager = {
      getTheme:   () => ({ season: 'summer' as const, mode: 'dark' as const }),
      getSeason:  () => 'summer' as const,
      getMode:    () => 'dark' as const,
      setMode:    vi.fn(),
      setSeason:  vi.fn(),
      toggleMode: vi.fn(),
      subscribe:  vi.fn().mockReturnValue(() => {}),
    }
    function ModeDisplay() {
      const { mode } = usePortfolio()
      return <span>{mode}</span>
    }
    renderWithPortfolio(<ModeDisplay />, { config: { themeManager: mockThemeManager } })
    expect(screen.getByText('dark')).toBeInTheDocument()
  })

  it('is StrictMode safe — initialize() called only once', () => {
    const spy = vi.spyOn(PortfolioService, 'initialize')
    render(
      <StrictMode>
        <PortfolioProvider><VersionDisplay /></PortfolioProvider>
      </StrictMode>
    )
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
})
