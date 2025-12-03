import { render, screen } from '@testing-library/react'
import Skills from '../Skills'
import { skills as skillsData } from '../skillsData'

describe('Skills', () => {
  it('renders every skill category and item', () => {
    render(<Skills />)

    skillsData.forEach((group) => {
      expect(screen.getByRole('heading', { level: 3, name: group.category })).toBeInTheDocument()
      group.items.forEach((skill) => {
        expect(screen.getByText(skill.name)).toBeInTheDocument()
      })
    })
  })

  it('applies inline width based on skill level', () => {
    render(<Skills />)

    const angularElement = screen.getByText('Angular').closest('.skill')
    expect(angularElement).not.toBeNull()
    const progressBar = angularElement.querySelector('.skill__progress')
    expect(progressBar).toHaveStyle({ width: '90%' })
  })
})


