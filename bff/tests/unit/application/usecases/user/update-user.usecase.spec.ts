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
      isDocumentExists: jest.fn(),
      update: jest.fn(),
    }
    useCase = new UpdateUserUseCase(userRepository as UserRepository)
  })

  it('should throw InternalServerErrorException if document exists', async () => {
    const id = '123'
    const updateDto: UpdateUserDto = {
      document: 'doc-123',
      name: 'Pedro',
      documentType: 'PF',
    }

    ;(userRepository.isDocumentExists as jest.Mock).mockResolvedValue(true)

    await expect(useCase.execute(id, updateDto)).rejects.toThrow(
      InternalServerErrorException,
    )
    expect(userRepository.isDocumentExists).toHaveBeenCalledWith('doc-123', id)
    expect(userRepository.update).not.toHaveBeenCalled()
  })

  it('should update user if document does not exist', async () => {
    const id = '123'
    const updateDto: UpdateUserDto = {
      document: 'doc-123',
      name: 'Marcelo',
      documentType: 'PF',
    }
    const updateResult: UpdateResult = { affected: 1, raw: {} } as UpdateResult

    ;(userRepository.isDocumentExists as jest.Mock).mockResolvedValue(false)
    ;(userRepository.update as jest.Mock).mockResolvedValue(updateResult)

    const result = await useCase.execute(id, updateDto)

    expect(userRepository.isDocumentExists).toHaveBeenCalledWith('doc-123', id)
    expect(userRepository.update).toHaveBeenCalledWith(id, updateDto)
    expect(result).toEqual(updateResult)
  })

  it('should propagate errors from repository', async () => {
    const id = '123'
    const updateDto: UpdateUserDto = {
      document: 'doc-123',
      name: 'Jose',
      documentType: 'PF',
    }
    const error = new Error('DB error')

    ;(userRepository.isDocumentExists as jest.Mock).mockRejectedValue(error)

    await expect(useCase.execute(id, updateDto)).rejects.toThrow(error)
  })
})
