import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from '@infrastructure/http/controllers/user.controller'
import { UserService } from '@domain/services/user.service'
import {
  UserCreateDto,
  UserDeleteResponseDto,
  UserResponseDto,
} from '@application/contracts/user.contract'
import { Logger } from '@nestjs/common'

describe('UserController', () => {
  let controller: UserController
  let service: UserService

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
            verbose: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<UserController>(UserController)
    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should call userService.create and return the result', async () => {
      const dto: UserCreateDto = {
        document: '12345678900',
        documentType: 'PF',
        name: 'John Doe',
      }
      const createdUser: UserResponseDto = { id: 'uuid', ...dto }

      mockUserService.create.mockResolvedValue(createdUser)

      const result = await controller.create(dto as any)

      expect(service.create).toHaveBeenCalledWith(dto)
      expect(result).toEqual(createdUser)
    })
  })

  describe('findAll', () => {
    it('should call userService.findAll and return the result', async () => {
      const users: UserResponseDto[] = [
        { id: 'uuid1', document: '123', documentType: 'CPF', name: 'John Doe' },
      ]

      mockUserService.findAll.mockResolvedValue(users)

      const result = await controller.findAll()

      expect(service.findAll).toHaveBeenCalled()
      expect(result).toEqual(users)
    })
  })

  describe('findOne', () => {
    it('should call userService.findOne and return the result', async () => {
      const userId = 'uuid1'
      const user: UserResponseDto = {
        id: userId,
        document: '12345678900',
        documentType: 'CPF',
        name: 'John Doe',
      }

      mockUserService.findOne.mockResolvedValue(user)

      const result = await controller.findOne(userId)

      expect(service.findOne).toHaveBeenCalledWith(userId)
      expect(result).toEqual(user)
    })
  })

  describe('update', () => {
    it('should call userService.update and return the result', async () => {
      const userId = 'uuid1'
      const dto = {
        document: '98765432100',
        documentType: 'CPF',
        name: 'John Updated',
      }
      const updatedUser: UserResponseDto = { id: userId, ...dto }

      mockUserService.update.mockResolvedValue(updatedUser)

      const result = await controller.update(userId, dto as any)

      expect(service.update).toHaveBeenCalledWith(userId, dto)
      expect(result).toEqual(updatedUser)
    })
  })

  describe('remove', () => {
    it('should call userService.remove and return the result', async () => {
      const userId = 'uuid1'
      const deleteResponse: UserDeleteResponseDto = {
        message: 'Dado cadastrado com sucesso',
      }

      mockUserService.remove.mockResolvedValue(deleteResponse)

      const result = await controller.remove(userId)

      expect(service.remove).toHaveBeenCalledWith(userId)
      expect(result).toEqual(deleteResponse)
    })
  })
})
