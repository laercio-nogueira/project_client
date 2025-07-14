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
})
