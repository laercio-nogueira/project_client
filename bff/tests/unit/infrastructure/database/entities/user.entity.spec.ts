import { UserEntity } from '@infrastructure/database/entities/user.entity'

describe('UserEntity', () => {
  it('should create an instance with correct properties', () => {
    const user = new UserEntity()
    user.salary = 1200
    user.enterprise = 190000
    user.name = 'João Silva'

    expect(user).toBeDefined()
    expect(user.salary).toBe(1200)
    expect(user.enterprise).toBe(190000)
    expect(user.name).toBe('João Silva')
    expect(user.createdAt).toBeUndefined()
    expect(user.id).toBeUndefined()
  })
})
