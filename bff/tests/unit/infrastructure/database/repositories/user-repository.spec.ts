import { Test, TestingModule } from '@nestjs/testing'
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm'
import { UserRepository } from '@infrastructure/database/repositories/user-repository'
import { UserEntity } from '@infrastructure/database/entities/user.entity'

describe('UserRepository', () => {
  let dataSource: DataSource
  let repository: UserRepository

  let mockQueryBuilder: Partial<SelectQueryBuilder<UserEntity>>

  beforeEach(() => {
    mockQueryBuilder = {
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getCount: jest.fn(),
    }

    dataSource = {
      createEntityManager: jest.fn(),
    } as unknown as DataSource

    repository = new UserRepository(dataSource)

    jest
      .spyOn(repository, 'createQueryBuilder')
      .mockReturnValue(mockQueryBuilder as SelectQueryBuilder<UserEntity>)
  })

  describe('isDocumentExists', () => {
    it('deve retornar true quando count for maior que zero', async () => {
      ;(mockQueryBuilder.getCount as jest.Mock).mockResolvedValue(2)

      const result = await repository.isDocumentExists('123456789')

      expect(repository.createQueryBuilder).toHaveBeenCalledWith('user')
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'user.document = :document',
        { document: '123456789' },
      )
      expect(mockQueryBuilder.getCount).toHaveBeenCalled()
      expect(result).toBe(true)
    })

    it('deve adicionar filtro excludeId se fornecido', async () => {
      ;(mockQueryBuilder.getCount as jest.Mock).mockResolvedValue(1)

      const result = await repository.isDocumentExists(
        '123456789',
        'id-exclude',
      )

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'user.id != :excludeId',
        { excludeId: 'id-exclude' },
      )
      expect(result).toBe(true)
    })

    it('deve retornar false quando count for zero', async () => {
      ;(mockQueryBuilder.getCount as jest.Mock).mockResolvedValue(0)

      const result = await repository.isDocumentExists('000000000')

      expect(result).toBe(false)
    })
  })

  describe('isIdExists', () => {
    it('deve retornar true quando count for maior que zero', async () => {
      jest.spyOn(repository, 'count').mockResolvedValue(1)

      const result = await repository.isIdExists('some-id')

      expect(repository.count).toHaveBeenCalledWith({
        where: { id: 'some-id' },
      })
      expect(result).toBe(true)
    })

    it('deve retornar false quando count for zero', async () => {
      jest.spyOn(repository, 'count').mockResolvedValue(0)

      const result = await repository.isIdExists('other-id')

      expect(result).toBe(false)
    })
  })
})
