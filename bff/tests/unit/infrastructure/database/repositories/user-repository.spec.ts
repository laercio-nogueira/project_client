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

  it('test', () => {
    expect(true).toBe(true)
  })
})
