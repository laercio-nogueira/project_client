import { Test, TestingModule } from '@nestjs/testing'
import { UserQueueModule } from '@application/queues/user/user-queue.module'
import { UserQueueService } from '@application/queues/user/user-queue.service'
import { UserQueueController } from '@application/queues/user/user-queue.controller'
import { CreateUserUseCase } from '@application/usecases/user/create-user.usecase'
import { UserRepository } from '@infrastructure/database/repositories/user-repository'
import { Logger } from '@nestjs/common'

describe('UserQueueModule', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [UserQueueModule],
    })
      .overrideProvider(UserRepository)
      .useValue({})
      .overrideProvider(Logger)
      .useValue({ log: jest.fn() })
      .overrideProvider('DataSource')
      .useValue({})
      .compile()
  })

  it('should be defined', () => {
    expect(module).toBeDefined()
  })

  it('should provide UserQueueService', () => {
    const service = module.get<UserQueueService>(UserQueueService)
    expect(service).toBeDefined()
  })

  it('should provide UserQueueController', () => {
    const controller = module.get<UserQueueController>(UserQueueController)
    expect(controller).toBeDefined()
  })

  it('should provide CreateUserUseCase', () => {
    const useCase = module.get<CreateUserUseCase>(CreateUserUseCase)
    expect(useCase).toBeDefined()
  })
})
