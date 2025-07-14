import { Test, TestingModule } from '@nestjs/testing'
import { UserQueueService } from '@application/queues/user/user-queue.service'
import { ClientProxy } from '@nestjs/microservices'

// Mock do ClientProxy
const mockClientProxy = {
  emit: jest.fn(),
  connect: jest.fn(),
  close: jest.fn(),
}

// Mock do ClientProxyFactory
jest.mock('@nestjs/microservices', () => ({
  ClientProxyFactory: {
    create: jest.fn(() => mockClientProxy),
  },
  ClientProxy: jest.fn(),
}))

// Mock do rabbitMQConfig
jest.mock('@infrastructure/config/queues-config/queues-config', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    transport: 'amqp',
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'user-queue',
    },
  })),
}))

describe('UserQueueService', () => {
  let service: UserQueueService
  let clientProxy: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserQueueService],
    }).compile()

    service = module.get<UserQueueService>(UserQueueService)
    clientProxy = mockClientProxy
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('constructor', () => {
    it('should create UserQueueService with client proxy', () => {
      expect(service).toBeDefined()
      expect(clientProxy).toBeDefined()
    })

    it('should initialize client proxy with rabbitMQ config', () => {
      const { ClientProxyFactory } = require('@nestjs/microservices')
      expect(ClientProxyFactory.create).toHaveBeenCalledWith({
        transport: 'amqp',
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'user-queue',
        },
      })
    })
  })

  describe('createUserJob', () => {
    const mockUserData = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
    }

    it('should emit create-user event with user data', async () => {
      const emitSpy = jest
        .spyOn(clientProxy, 'emit')
        .mockResolvedValue(undefined)

      await service.createUserJob(mockUserData)

      expect(emitSpy).toHaveBeenCalledWith('create-user', mockUserData)
      expect(emitSpy).toHaveBeenCalledTimes(1)
    })

    it('should handle different user data types', async () => {
      const emitSpy = jest
        .spyOn(clientProxy, 'emit')
        .mockResolvedValue(undefined)
      const differentUserData = {
        id: 1,
        name: 'Jane Doe',
        email: 'jane@example.com',
        profile: {
          bio: 'Software Developer',
          location: 'New York',
        },
      }

      await service.createUserJob(differentUserData)

      expect(emitSpy).toHaveBeenCalledWith('create-user', differentUserData)
    })

    it('should handle empty user data', async () => {
      const emitSpy = jest
        .spyOn(clientProxy, 'emit')
        .mockResolvedValue(undefined)
      const emptyUserData = {}

      await service.createUserJob(emptyUserData)

      expect(emitSpy).toHaveBeenCalledWith('create-user', emptyUserData)
    })

    it('should propagate errors from client.emit', async () => {
      const error = new Error('Queue connection failed')
      const emitSpy = jest.spyOn(clientProxy, 'emit').mockRejectedValue(error)

      await expect(service.createUserJob(mockUserData)).rejects.toThrow(
        'Queue connection failed',
      )
      expect(emitSpy).toHaveBeenCalledWith('create-user', mockUserData)
    })

    it('should handle client proxy errors gracefully', async () => {
      const error = new Error('Network timeout')
      const emitSpy = jest.spyOn(clientProxy, 'emit').mockRejectedValue(error)

      await expect(service.createUserJob(mockUserData)).rejects.toThrow(
        'Network timeout',
      )
      expect(emitSpy).toHaveBeenCalledTimes(1)
    })
  })
})
