import { UserProps } from '@domain/entities/user.entity'
import { UserRepository } from '@infrastructure/database/repositories/user-repository'
import { Injectable } from '@nestjs/common'
import { FindUserDto } from '@application/dto/user/find-user.dto'

@Injectable()
export class FindUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async findOne(id?: string): Promise<UserProps> {
    try {
      return await this.userRepository.findOne({
        where: { id },
      })
    } catch (error) {
      throw error
    }
  }

  async findAll(
    page?: number,
    limit?: number,
  ): Promise<{
    data: FindUserDto[]
    total: number
    page: number
    limit: number
  }> {
    const skip = (page - 1) * (limit ?? 10)

    try {
      const [user, total] = await this.userRepository.findAndCount({
        ...(page && {
          skip,
          take: limit,
        }),
        order: {
          createdAt: 'DESC',
        },
      })

      return {
        data: user,
        total,
        ...(page && {
          page,
          limit,
        }),
      }
    } catch (error) {
      throw error
    }
  }
}
