import { CreateUserUseCase } from '@application/usecases/user/create-user.usecase'
import { UserRepository } from '@infrastructure/database/repositories/user-repository'
import { InternalServerErrorException } from '@nestjs/common'
import { CreateUserDto } from '@application/dto/user/create-user.dto'
import { UserProps } from '@domain/entities/user.entity'

const mockUserRepository = () => ({
  isDocumentExists: jest.fn(),
  save: jest.fn(),
})

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase
  let repository: jest.Mocked<UserRepository>

  const mockDto: CreateUserDto = {
    name: 'João Silva',
    salary: 1200,
    enterprise: 190000,
  }

  const mockUser: UserProps = {
    id: 'user-id-1',
    name: 'João Silva',
    salary: 1200,
    enterprise: 190000,
    createdAt: new Date(),
  }

  beforeEach(() => {
    repository = mockUserRepository() as any
    useCase = new CreateUserUseCase(repository)
  })

  describe('execute', () => {
    it('should create a user successfully', async () => {
      // Arrange
      repository.save.mockResolvedValue(mockUser)

      // Act
      const result = await useCase.execute(mockDto)

      // Assert
      expect(repository.save).toHaveBeenCalledWith(mockDto)
      expect(result).toEqual(mockUser)
    })

    it('should throw InternalServerErrorException when repository.save fails', async () => {
      // Arrange
      const error = new Error('Database error')
      repository.save.mockRejectedValue(error)

      // Act & Assert
      await expect(useCase.execute(mockDto)).rejects.toThrow(error)
      expect(repository.save).toHaveBeenCalledWith(mockDto)
    })

    it('should handle different user data correctly', async () => {
      // Arrange
      const differentDto: CreateUserDto = {
        name: 'Maria Santos',
        salary: 5000,
        enterprise: 500000,
      }
      const differentUser: UserProps = {
        id: 'user-id-2',
        name: 'Maria Santos',
        salary: 5000,
        enterprise: 500000,
        createdAt: new Date(),
      }
      repository.save.mockResolvedValue(differentUser)

      // Act
      const result = await useCase.execute(differentDto)

      // Assert
      expect(repository.save).toHaveBeenCalledWith(differentDto)
      expect(result).toEqual(differentUser)
    })
  })
})
