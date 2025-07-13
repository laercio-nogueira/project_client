import { CreateUserDto } from '@application/dto/user/create-user.dto'
import { UserProps } from '@domain/entities/user.entity'
import { UserRepository } from '@infrastructure/database/repositories/user-repository'
import { Injectable, InternalServerErrorException } from '@nestjs/common'

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  // A lógica de envio para fila está no UserService
  async execute(user: CreateUserDto): Promise<UserProps> {
    try {
      return await this.userRepository.save(user)
    } catch (error) {
      throw error
    }
  }
}
