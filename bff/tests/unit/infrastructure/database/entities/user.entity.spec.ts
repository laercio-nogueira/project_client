import { UserEntity } from '@infrastructure/database/entities/user.entity'

describe('UserEntity', () => {
  it('should create an instance with correct properties', () => {
    const user = new UserEntity()
    user.document = '12345678900'
    user.documentType = 'CPF'
    user.name = 'João Silva'

    expect(user).toBeDefined()
    expect(user.document).toBe('12345678900')
    expect(user.documentType).toBe('CPF')
    expect(user.name).toBe('João Silva')
    expect(user.createdAt).toBeUndefined()
    expect(user.id).toBeUndefined()
  })
})
