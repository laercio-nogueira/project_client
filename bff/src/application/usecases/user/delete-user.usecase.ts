import { ForeingKeyConstraintException } from '@application/exceptions/foreign-key-constraint.exception'
import { UserRepository } from '@infrastructure/database/repositories/user-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    try {
      await this.userRepository.delete({ id })
      return {
        message: 'User deleted successfully',
      }
    } catch (error) {
      throw new ForeingKeyConstraintException(
        error,
        'Usuario não pode ser deletado pois possui usuario(s) relacionada(s).',
      )
    }
  }
}
