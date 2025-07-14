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
        salary: 1200,
        enterprise: 190000,
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
            salary: 1200,
            enterprise: 190000,
          },
          {
            id: '2',
            name: 'Empresa X',
            salary: 1200,
            enterprise: 190000,
          },
        ],
        10,
      ]

      repository.findAndCount.mockResolvedValue(mockUsers as any)

      const result = await useCase.findAll(1, 10)

      expect(repository.findAndCount).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
        skip: 0,
        take: 10,
      })

      expect(result).toEqual({
        data: [
          {
            salary: 1200,
            enterprise: 190000,
            id: '1',
            name: 'João',
          },
          {
            salary: 1200,
            enterprise: 190000,
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
