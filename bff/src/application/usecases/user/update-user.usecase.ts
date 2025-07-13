import { UpdateUserDto } from '@application/dto/user/update-user.dto'
import { UserRepository } from '@infrastructure/database/repositories/user-repository'
import { InternalServerErrorException, Injectable } from '@nestjs/common'
import { UpdateResult } from 'typeorm'

@Injectable()
export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, user: UpdateUserDto): Promise<UpdateResult> {
    try {
      return await this.userRepository.update(id, user)
    } catch (error) {
      throw error
    }
  }
}
