import { UpdateUserUseCase } from '@application/usecases/user/update-user.usecase'
import { UserRepository } from '@infrastructure/database/repositories/user-repository'
import { UpdateUserDto } from '@application/dto/user/update-user.dto'
import { InternalServerErrorException } from '@nestjs/common'
import { UpdateResult } from 'typeorm'

describe('UpdateUserUseCase', () => {
  let useCase: UpdateUserUseCase
  let userRepository: Partial<UserRepository>

  beforeEach(() => {
    userRepository = {
      update: jest.fn(),
    }
    useCase = new UpdateUserUseCase(userRepository as UserRepository)
  })

  it('should update user if document does not exist', async () => {
    const id = '123'
    const updateDto: UpdateUserDto = {
      name: 'Marcelo',
      salary: 1200,
      enterprise: 190000,
    }
    const updateResult: UpdateResult = { affected: 1, raw: {} } as UpdateResult

    ;(userRepository.update as jest.Mock).mockResolvedValue(updateResult)

    const result = await useCase.execute(id, updateDto)

    expect(userRepository.update).toHaveBeenCalledWith(id, updateDto)
    expect(result).toEqual(updateResult)
  })
})
