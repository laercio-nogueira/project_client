import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from '@domain/services/user.service'
import { CreateUserUseCase } from '@application/usecases/user/create-user.usecase'
import { FindUserUseCase } from '@application/usecases/user/find-user.usecase'
import { DeleteUserUseCase } from '@application/usecases/user/delete-user.usecase'
import { UpdateUserUseCase } from '@application/usecases/user/update-user.usecase'
import { CreateUserDto } from '@application/dto/user/create-user.dto'
import { UpdateUserDto } from '@application/dto/user/update-user.dto'
import { UserProps } from '@domain/entities/user.entity'
import { UserQueueService } from '@application/queues/user/user-queue.service'

describe('UserService', () => {
  let service: UserService
  let createUserUseCase: jest.Mocked<CreateUserUseCase>
  let findUserUseCase: jest.Mocked<FindUserUseCase>
  let updateUserUseCase: jest.Mocked<UpdateUserUseCase>
  let deleteUserUseCase: jest.Mocked<DeleteUserUseCase>
  let userQueueService: jest.Mocked<UserQueueService>

  beforeEach(async () => {
    createUserUseCase = {
      execute: jest.fn(),
    } as any

    findUserUseCase = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    } as any

    updateUserUseCase = {
      execute: jest.fn(),
    } as any

    deleteUserUseCase = {
      execute: jest.fn(),
    } as any

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: CreateUserUseCase,
          useValue: createUserUseCase,
        },
        {
          provide: FindUserUseCase,
          useValue: findUserUseCase,
        },
        {
          provide: UpdateUserUseCase,
          useValue: updateUserUseCase,
        },
        {
          provide: DeleteUserUseCase,
          useValue: deleteUserUseCase,
        },
        {
          provide: UserQueueService,
          useValue: userQueueService,
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should find all users', async () => {
    const users: {
      data: UserProps[]
      total: number
      page: number
      limit: number
    } = {
      data: [
        { id: '1', salary: 1200, enterprise: 190000, name: 'A' },
        { id: '2', salary: 1200, enterprise: 190000, name: 'B' },
      ],
      total: 2,
      page: 1,
      limit: 10,
    }
    findUserUseCase.findAll.mockResolvedValue(users)

    const result = await service.findAll()
    expect(result).toBe(users)
    expect(findUserUseCase.findAll).toHaveBeenCalled()
  })

  it('should find one user', async () => {
    const user: UserProps = {
      id: '1',
      name: 'João Silva',
      salary: 1200,
      enterprise: 190000,
    }
    findUserUseCase.findOne.mockResolvedValue(user)

    const result = await service.findOne('1')
    expect(result).toBe(user)
    expect(findUserUseCase.findOne).toHaveBeenCalledWith('1')
  })

  it('should update a user', async () => {
    const dto: UpdateUserDto = {
      name: 'João Atualizado',
      salary: 1200,
      enterprise: 190000,
    }

    const updateResult = { affected: 1 }
    updateUserUseCase.execute.mockResolvedValue(updateResult as any)

    const result = await service.update('1', dto)
    expect(result).toBe(updateResult)
    expect(updateUserUseCase.execute).toHaveBeenCalledWith('1', dto)
  })

  it('should remove a user', async () => {
    const response = { message: 'User deleted successfully' }
    deleteUserUseCase.execute.mockResolvedValue(response)

    const result = await service.remove('1')
    expect(result).toBe(response)
    expect(deleteUserUseCase.execute).toHaveBeenCalledWith('1')
  })
})
