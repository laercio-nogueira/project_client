import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '@application/dto/user/create-user.dto'
import { UpdateUserDto } from '@application/dto/user/update-user.dto'
import { CreateUserUseCase } from '@application/usecases/user/create-user.usecase'
import { FindUserUseCase } from '@application/usecases/user/find-user.usecase'
import { DeleteUserUseCase } from '@application/usecases/user/delete-user.usecase'
import { UpdateUserUseCase } from '@application/usecases/user/update-user.usecase'
import { UserProps } from '@domain/entities/user.entity'
import { UserQueueService } from '@application/queues/user/user-queue.service'

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly userQueueService: UserQueueService,
  ) {}
  async create(user: CreateUserDto) {
    return await this.userQueueService.createUserJob(user)
  }

  async findAll(
    page?: number,
    limit?: number,
  ): Promise<{
    data: UserProps[]
    total: number
    page: number
    limit: number
  }> {
    return await this.findUserUseCase.findAll(page, limit)
  }

  async findOne(id: string) {
    return await this.findUserUseCase.findOne(id)
  }

  async update(id: string, user: UpdateUserDto) {
    return await this.updateUserUseCase.execute(id, user)
  }

  async remove(id: string) {
    return await this.deleteUserUseCase.execute(id)
  }
}
