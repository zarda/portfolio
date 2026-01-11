import { render, screen } from '@testing-library/react'
import Hero from '../Hero'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'

describe('Hero', () => {
  it('shows primary introduction content from versioned data', () => {
    const profile = PortfolioService.getInstance().getProfile()

    render(<Hero />)

    expect(
      screen.getByRole('heading', { level: 1, name: new RegExp(profile.name, 'i') }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: new RegExp(profile.title, 'i') }),
    ).toBeInTheDocument()
    expect(screen.getByText(profile.description)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: new RegExp(profile.name, 'i') })).toBeInTheDocument()
  })

  it('renders call-to-action links from versioned data', () => {
    const profile = PortfolioService.getInstance().getProfile()

    render(<Hero />)

    expect(
      screen.getByRole('link', { name: new RegExp(profile.heroPrimaryCta.label, 'i') }),
    ).toHaveAttribute('href', profile.heroPrimaryCta.href)
    expect(
      screen.getByRole('link', { name: new RegExp(profile.heroSecondaryCta.label, 'i') }),
    ).toHaveAttribute('href', profile.heroSecondaryCta.href)
    expect(screen.getByText(/scroll down/i)).toBeInTheDocument()
  })
})


