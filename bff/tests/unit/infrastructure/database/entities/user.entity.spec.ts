import { UserEntity } from '@infrastructure/database/entities/user.entity'

describe('UserEntity', () => {
  let user: UserEntity

  beforeEach(() => {
    user = new UserEntity()
  })

  it('should create an instance with correct properties', () => {
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

  it('should handle all properties correctly', () => {
    user.id = 'test-uuid-123'
    user.name = 'Maria Santos'
    user.salary = 5000.5
    user.enterprise = 250000.75
    user.createdAt = new Date('2023-01-01')

    expect(user.id).toBe('test-uuid-123')
    expect(user.name).toBe('Maria Santos')
    expect(user.salary).toBe(5000.5)
    expect(user.enterprise).toBe(250000.75)
    expect(user.createdAt).toEqual(new Date('2023-01-01'))
  })

  it('should handle zero values', () => {
    user.name = 'Test User'
    user.salary = 0
    user.enterprise = 0

    expect(user.name).toBe('Test User')
    expect(user.salary).toBe(0)
    expect(user.enterprise).toBe(0)
  })

  it('should handle negative values', () => {
    user.name = 'Negative User'
    user.salary = -1000
    user.enterprise = -50000

    expect(user.name).toBe('Negative User')
    expect(user.salary).toBe(-1000)
    expect(user.enterprise).toBe(-50000)
  })

  it('should handle decimal values', () => {
    user.name = 'Decimal User'
    user.salary = 1234.56
    user.enterprise = 987654.32

    expect(user.name).toBe('Decimal User')
    expect(user.salary).toBe(1234.56)
    expect(user.enterprise).toBe(987654.32)
  })

  it('should handle empty string name', () => {
    user.name = ''
    user.salary = 1000
    user.enterprise = 100000

    expect(user.name).toBe('')
    expect(user.salary).toBe(1000)
    expect(user.enterprise).toBe(100000)
  })

  it('should handle special characters in name', () => {
    user.name = 'João Silva & Santos'
    user.salary = 2000
    user.enterprise = 150000

    expect(user.name).toBe('João Silva & Santos')
    expect(user.salary).toBe(2000)
    expect(user.enterprise).toBe(150000)
  })

  it('should handle very large numbers', () => {
    user.name = 'Large Numbers User'
    user.salary = 999999.99
    user.enterprise = 999999999.99

    expect(user.name).toBe('Large Numbers User')
    expect(user.salary).toBe(999999.99)
    expect(user.enterprise).toBe(999999999.99)
  })

  it('should handle null and undefined values', () => {
    user.name = 'Test User'
    user.salary = 1000
    user.enterprise = 100000

    // Test that optional properties can be undefined
    expect(user.id).toBeUndefined()
    expect(user.createdAt).toBeUndefined()

    // Set to null and verify
    user.id = null as any
    user.createdAt = null as any

    expect(user.id).toBeNull()
    expect(user.createdAt).toBeNull()
  })

  it('should create multiple instances independently', () => {
    const user1 = new UserEntity()
    const user2 = new UserEntity()

    user1.name = 'User 1'
    user1.salary = 1000
    user1.enterprise = 100000

    user2.name = 'User 2'
    user2.salary = 2000
    user2.enterprise = 200000

    expect(user1.name).toBe('User 1')
    expect(user1.salary).toBe(1000)
    expect(user1.enterprise).toBe(100000)

    expect(user2.name).toBe('User 2')
    expect(user2.salary).toBe(2000)
    expect(user2.enterprise).toBe(200000)
  })
})
