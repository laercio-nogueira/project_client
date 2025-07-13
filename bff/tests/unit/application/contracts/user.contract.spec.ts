import {
  UserResponseDto,
  UserDeleteResponseDto,
  UserCreateDto,
} from '@application/contracts/user.contract'

describe('User DTOs', () => {
  describe('UserResponseDto', () => {
    it('should have the correct properties', () => {
      const dto = new UserResponseDto()
      dto.id = 'fff5c7a4-5d35-4a05-8ec6-31023566b66f'
      dto.name = 'Jose da Silva'
      dto.document = '123.456.789-10'
      dto.documentType = 'PF'
      dto.createdAt = new Date('2023-01-01T00:00:00.000Z')

      expect(dto.id).toBeDefined()
      expect(dto.name).toBeDefined()
      expect(dto.document).toBeDefined()
      expect(dto.documentType).toBeDefined()
      expect(dto.createdAt).toBeDefined()
    })
  })

  describe('UserDeleteResponseDto', () => {
    it('should have the correct properties', () => {
      const dto = new UserDeleteResponseDto()
      dto.message = 'Usuario deletado com sucesso'

      expect(dto.message).toBeDefined()
    })
  })

  describe('UserCreateDto', () => {
    it('should have the correct properties', () => {
      const dto = new UserCreateDto()
      dto.document = '123.456.789-10'
      dto.documentType = 'PF'
      dto.name = 'Jose da Silva'

      expect(dto.document).toBeDefined()
      expect(dto.documentType).toBeDefined()
      expect(dto.name).toBeDefined()
    })
  })
})
