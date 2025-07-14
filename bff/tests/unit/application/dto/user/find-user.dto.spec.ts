import { FindUserDto } from '@application/dto/user/find-user.dto'

describe('FindUserDto', () => {
  describe('instantiation', () => {
    it('should create instance with all properties', () => {
      const dto = new FindUserDto()
      dto.id = 'user-123'
      dto.name = 'John Doe'
      dto.salary = 5000
      dto.enterprise = 100000

      expect(dto.id).toBe('user-123')
      expect(dto.name).toBe('John Doe')
      expect(dto.salary).toBe(5000)
      expect(dto.enterprise).toBe(100000)
    })

    it('should create instance without id', () => {
      const dto = new FindUserDto()
      dto.name = 'Jane Smith'
      dto.salary = 3000
      dto.enterprise = 50000

      expect(dto.id).toBeUndefined()
      expect(dto.name).toBe('Jane Smith')
      expect(dto.salary).toBe(3000)
      expect(dto.enterprise).toBe(50000)
    })

    it('should handle different data types correctly', () => {
      const dto = new FindUserDto()
      dto.id = 'user-456'
      dto.name = 'Bob Wilson'
      dto.salary = 7500.5
      dto.enterprise = 250000.75

      expect(dto.id).toBe('user-456')
      expect(dto.name).toBe('Bob Wilson')
      expect(dto.salary).toBe(7500.5)
      expect(dto.enterprise).toBe(250000.75)
    })
  })

  describe('property types', () => {
    it('should accept string for id', () => {
      const dto = new FindUserDto()
      dto.id = 'test-id'
      expect(typeof dto.id).toBe('string')
    })

    it('should accept string for name', () => {
      const dto = new FindUserDto()
      dto.name = 'Test Name'
      expect(typeof dto.name).toBe('string')
    })

    it('should accept number for salary', () => {
      const dto = new FindUserDto()
      dto.salary = 1000
      expect(typeof dto.salary).toBe('number')
    })

    it('should accept number for enterprise', () => {
      const dto = new FindUserDto()
      dto.enterprise = 50000
      expect(typeof dto.enterprise).toBe('number')
    })
  })
})
