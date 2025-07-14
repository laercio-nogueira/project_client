import { UserProps } from '@domain/entities/user.entity'

describe('UserProps structure', () => {
  it('should create a valid UserProps object', () => {
    const user: UserProps = {
      name: 'João Silva',
      salary: 1200,
      enterprise: 190000,
    }

    expect(user.name).toBe('João Silva')
    expect(user.salary).toBe(1200)
    expect(user.enterprise).toBe(190000)
  })
})
