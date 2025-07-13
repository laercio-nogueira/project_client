import { UserProps } from '@domain/entities/user.entity'

describe('UserProps structure', () => {
  it('should create a valid UserProps object', () => {
    const user: UserProps = {
      document: '12345678900',
      documentType: 'CPF',
      name: 'João Silva',
    }

    expect(user.name).toBe('João Silva')
    expect(user.document).toMatch(/^\d+$/)
    expect(user.documentType).toBe('CPF')
  })
})
