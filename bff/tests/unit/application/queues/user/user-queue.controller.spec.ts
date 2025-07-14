import { Test, TestingModule } from '@nestjs/testing'
import { UserQueueController } from '@application/queues/user/user-queue.controller'
import { CreateUserUseCase } from '@application/usecases/user/create-user.usecase'
import { CreateUserDto } from '@application/dto/user/create-user.dto'
import { Logger } from '@nestjs/common'
import { UserProps } from '@domain/entities/user.entity'

describe('UserQueueController', () => {
  let controller: UserQueueController
  let mockCreateUserUseCase: jest.Mocked<CreateUserUseCase>
  let mockLogger: jest.Mocked<Logger>

  beforeEach(async () => {
    mockCreateUserUseCase = {
      execute: jest.fn(),
    } as any

    mockLogger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    } as any

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserQueueController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: mockCreateUserUseCase,
        },
        {
          provide: Logger,
          useValue: mockLogger,
        },
      ],
    }).compile()

    controller = module.get<UserQueueController>(UserQueueController)
  })

  describe('handleMessage', () => {
    it('should handle create-user event successfully', async () => {
      // Arrange
      const mockUserDto: CreateUserDto = {
        name: 'John Doe',
        salary: 5000,
        enterprise: 100000,
      }

      const mockUserResult: UserProps = {
        id: 'user-123',
        name: 'John Doe',
        salary: 5000,
        enterprise: 100000,
        createdAt: new Date(),
      }

      mockCreateUserUseCase.execute.mockResolvedValue(mockUserResult)

      // Act
      const result = await controller.handleMessage(mockUserDto)

      // Assert
      expect(mockLogger.log).toHaveBeenCalledWith('Creating user')
      expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(mockUserDto)
      expect(result).toEqual(mockUserResult)
    })

    it('should handle different user data', async () => {
      // Arrange
      const mockUserDto: CreateUserDto = {
        name: 'Jane Smith',
        salary: 3000,
        enterprise: 50000,
      }

      const mockUserResult: UserProps = {
        id: 'user-456',
        name: 'Jane Smith',
        salary: 3000,
        enterprise: 50000,
        createdAt: new Date(),
      }

      mockCreateUserUseCase.execute.mockResolvedValue(mockUserResult)

      // Act
      const result = await controller.handleMessage(mockUserDto)

      // Assert
      expect(mockLogger.log).toHaveBeenCalledWith('Creating user')
      expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(mockUserDto)
      expect(result).toEqual(mockUserResult)
    })

    it('should log message before executing use case', async () => {
      // Arrange
      const mockUserDto: CreateUserDto = {
        name: 'Bob Wilson',
        salary: 7500,
        enterprise: 150000,
      }

      const mockUserResult: UserProps = {
        id: 'user-789',
        name: 'Bob Wilson',
        salary: 7500,
        enterprise: 150000,
        createdAt: new Date(),
      }

      mockCreateUserUseCase.execute.mockResolvedValue(mockUserResult)

      // Act
      await controller.handleMessage(mockUserDto)

      // Assert
      expect(mockLogger.log).toHaveBeenCalledWith('Creating user')
    })

    it('should propagate errors from use case', async () => {
      // Arrange
      const mockUserDto: CreateUserDto = {
        name: 'Error User',
        salary: 1000,
        enterprise: 20000,
      }

      const error = new Error('Database connection failed')
      mockCreateUserUseCase.execute.mockRejectedValue(error)

      // Act & Assert
      await expect(controller.handleMessage(mockUserDto)).rejects.toThrow(error)
      expect(mockLogger.log).toHaveBeenCalledWith('Creating user')
      expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(mockUserDto)
    })
  })
})
