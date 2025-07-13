import { FindUserUseCase } from '@application/usecases/user/find-user.usecase'
import { UserRepository } from '@infrastructure/database/repositories/user-repository'

const mockRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  findAndCount: jest.fn(),
})

describe('FindUserUseCase', () => {
  let useCase: FindUserUseCase
  let repository: jest.Mocked<UserRepository>

  beforeEach(() => {
    repository = mockRepository() as any
    useCase = new FindUserUseCase(repository)
  })

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const mockUser = {
        id: '1',
        name: 'João',
        document: '12345678901',
        documentType: 'PF',
      }
      repository.findOne.mockResolvedValue(mockUser)

      const result = await useCase.findOne('1')

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } })
      expect(result).toEqual(mockUser)
    })

    it('should throw if repository throws', async () => {
      repository.findOne.mockRejectedValue(new Error('Database error'))

      await expect(useCase.findOne('1')).rejects.toThrow('Database error')
    })
  })

  describe('findAll', () => {
    it('should return all users with masked documents', async () => {
      const mockUsers = [
        [
          {
            id: '1',
            name: 'João',
            document: '12345678901',
            documentType: 'PF',
          },
          {
            id: '2',
            name: 'Empresa X',
            document: '12345678000199',
            documentType: 'PJ',
          },
        ],
        10,
      ]

      repository.findAndCount.mockResolvedValue(mockUsers as any)

      const result = await useCase.findAll(1, 10)

      expect(repository.findAndCount).toHaveBeenCalledWith()

      expect(result).toEqual({
        data: [
          {
            document: '123.456.789-01',
            documentType: 'PF',
            id: '1',
            name: 'João',
          },
          {
            document: '12.345.678/0001-99',
            documentType: 'PJ',
            id: '2',
            name: 'Empresa X',
          },
        ],
        limit: 10,
        page: 1,
        total: 10,
      })
    })

    it('should throw if repository throws', async () => {
      repository.findAndCount.mockRejectedValue(new Error('Query failed'))

      await expect(useCase.findAll()).rejects.toThrow('Query failed')
    })
  })
})
