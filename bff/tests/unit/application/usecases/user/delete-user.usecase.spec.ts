import { Test, TestingModule } from '@nestjs/testing'
import { DeleteUserUseCase } from '@application/usecases/user/delete-user.usecase'
import { UserRepository } from '@infrastructure/database/repositories/user-repository'
import { InternalServerErrorException } from '@nestjs/common'

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase
  let userRepository: UserRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase)
    userRepository = module.get<UserRepository>(UserRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    const userId = '1'

    it('should successfully delete a user and return success message', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined)

      const result = await deleteUserUseCase.execute(userId)

      expect(result).toEqual({
        message: 'User deleted successfully',
      })
      expect(userRepository.delete).toHaveBeenCalledWith({ id: userId })
    })

    it('should throw InternalServerErrorException when repository throws an error', async () => {
      const errorMessage = 'Database connection failed'
      jest
        .spyOn(userRepository, 'delete')
        .mockRejectedValue(new Error(errorMessage))

      await expect(deleteUserUseCase.execute(userId)).rejects.toThrow(
        new InternalServerErrorException(errorMessage),
      )
    })
  })
})
