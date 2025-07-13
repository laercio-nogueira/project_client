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
    document: '12345678900',
    documentType: 'PF',
  }

  const mockUser: UserProps = {
    id: 'user-id-1',
    name: 'João Silva',
    document: '12345678900',
    documentType: 'PF',
    createdAt: new Date(),
  }

  beforeEach(() => {
    repository = mockUserRepository() as any
    useCase = new CreateUserUseCase(repository)
  })

  it('should create a user if document does not exist', async () => {
    repository.isDocumentExists.mockResolvedValue(false)
    repository.save.mockResolvedValue(mockUser as any)

    const result = await useCase.execute(mockDto)

    expect(repository.isDocumentExists).toHaveBeenCalledWith(mockDto.document)
    expect(repository.save).toHaveBeenCalledWith(mockDto)
    expect(result).toEqual(mockUser)
  })

  it('should throw InternalServerErrorException if document already exists', async () => {
    repository.isDocumentExists.mockResolvedValue(true)

    await expect(useCase.execute(mockDto)).rejects.toThrow(
      InternalServerErrorException,
    )
    await expect(useCase.execute(mockDto)).rejects.toThrow(
      'Já existe outro usuario com este documento',
    )
    expect(repository.save).not.toHaveBeenCalled()
  })
})
