import { render, act, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { PortfolioProvider } from '../context/PortfolioContext'
import type { PortfolioServiceConfig } from '../services/PortfolioService'

interface Options extends RenderOptions {
  config?: PortfolioServiceConfig
}

/**
 * Renders a component inside PortfolioProvider.
 * Use for direct component imports — these are NOT lazy-loaded in tests.
 */
export function renderWithPortfolio(ui: ReactElement, { config, ...options }: Options = {}) {
  return render(
    <PortfolioProvider config={config}>{ui}</PortfolioProvider>,
    options
  )
}

/**
 * Same as renderWithPortfolio but flushes any pending async state updates.
 * Use when you need to await state changes (e.g. after version switch).
 */
export async function renderWithPortfolioAsync(ui: ReactElement, options: Options = {}) {
  const result = renderWithPortfolio(ui, options)
  await act(async () => {})
  return result
}
